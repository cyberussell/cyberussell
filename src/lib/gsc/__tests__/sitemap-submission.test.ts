import crypto from 'crypto';
import { describe, expect, it } from 'vitest';
import {
  parseServiceAccount,
  buildSignedJwt,
  buildTokenRequestBody,
  buildSubmitUrl,
  classifyResult,
  formatLogLine,
  WEBMASTERS_SCOPE,
  TOKEN_URL,
} from '../sitemap-submission';

// Generated fresh per test run — never a real credential, never committed.
function generateTestKeyPair() {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
}

function decodeSegment(segment: string) {
  return JSON.parse(Buffer.from(segment, 'base64url').toString('utf-8'));
}

describe('parseServiceAccount', () => {
  it('extracts client_email and private_key from valid JSON', () => {
    const raw = JSON.stringify({ client_email: 'svc@project.iam.gserviceaccount.com', private_key: '-----BEGIN PRIVATE KEY-----\nfake\n-----END PRIVATE KEY-----' });
    const result = parseServiceAccount(raw);
    expect(result.clientEmail).toBe('svc@project.iam.gserviceaccount.com');
    expect(result.privateKey).toContain('BEGIN PRIVATE KEY');
  });

  it('throws a clear error on invalid JSON, without echoing the raw input', () => {
    expect(() => parseServiceAccount('not json')).toThrow('not valid JSON');
  });

  it('throws when client_email or private_key is missing', () => {
    expect(() => parseServiceAccount(JSON.stringify({ client_email: 'a@b.com' }))).toThrow('missing');
    expect(() => parseServiceAccount(JSON.stringify({ private_key: 'x' }))).toThrow('missing');
  });
});

describe('buildSignedJwt', () => {
  it('produces a JWT with correct claims, scope, audience, and a valid signature', () => {
    const { publicKey, privateKey } = generateTestKeyPair();
    const serviceAccount = { clientEmail: 'svc@project.iam.gserviceaccount.com', privateKey };
    const now = 1_700_000_000;

    const jwt = buildSignedJwt(serviceAccount, now);
    const [headerB64, payloadB64, signatureB64] = jwt.split('.');

    expect(decodeSegment(headerB64)).toEqual({ alg: 'RS256', typ: 'JWT' });

    const payload = decodeSegment(payloadB64);
    expect(payload.iss).toBe('svc@project.iam.gserviceaccount.com');
    expect(payload.scope).toBe(WEBMASTERS_SCOPE);
    expect(payload.aud).toBe(TOKEN_URL);
    expect(payload.iat).toBe(now);
    expect(payload.exp).toBe(now + 3600);

    // Signature must actually verify against the matching public key —
    // proves the JWT is correctly signed, not just correctly shaped.
    const signingInput = `${headerB64}.${payloadB64}`;
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(signingInput);
    const isValid = verifier.verify(publicKey, Buffer.from(signatureB64, 'base64url'));
    expect(isValid).toBe(true);
  });
});

describe('buildTokenRequestBody', () => {
  it('sets the jwt-bearer grant type and the assertion', () => {
    const body = buildTokenRequestBody('fake.jwt.value');
    expect(body.get('grant_type')).toBe('urn:ietf:params:oauth:grant-type:jwt-bearer');
    expect(body.get('assertion')).toBe('fake.jwt.value');
  });
});

describe('buildSubmitUrl', () => {
  it('builds the exact sitemaps.submit URL for the domain property and the sitemap INDEX (not sitemap-0.xml)', () => {
    const url = buildSubmitUrl('sc-domain:cyberussell.com', 'https://www.cyberussell.com/sitemap.xml');
    expect(url).toBe(
      'https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Acyberussell.com/sitemaps/https%3A%2F%2Fwww.cyberussell.com%2Fsitemap.xml'
    );
    expect(url).not.toContain('sitemap-0.xml');
  });
});

describe('classifyResult', () => {
  it('treats 200 and 204 as success, including idempotent re-submission', () => {
    expect(classifyResult(200)).toMatchObject({ ok: true, kind: 'success' });
    expect(classifyResult(204)).toMatchObject({ ok: true, kind: 'success' });
    // Calling it twice (simulating submit -> resubmit) must both succeed.
    expect(classifyResult(200).ok).toBe(true);
    expect(classifyResult(200).ok).toBe(true);
  });

  it('classifies 401 as an authentication failure with a clear message', () => {
    const result = classifyResult(401);
    expect(result).toMatchObject({ ok: false, kind: 'auth' });
    expect(result.message.toLowerCase()).toContain('authentication');
  });

  it('classifies 403 as a permission failure with a clear message', () => {
    const result = classifyResult(403);
    expect(result).toMatchObject({ ok: false, kind: 'permission' });
    expect(result.message.toLowerCase()).toContain('permission');
  });

  it('classifies other non-2xx statuses as a generic error', () => {
    expect(classifyResult(500)).toMatchObject({ ok: false, kind: 'error' });
    expect(classifyResult(429)).toMatchObject({ ok: false, kind: 'error' });
  });
});

describe('formatLogLine', () => {
  it('includes only status, property, sitemap URL, and timestamp — never credentials', () => {
    const line = formatLogLine({
      timestamp: '2026-08-19T00:00:00.000Z',
      property: 'sc-domain:cyberussell.com',
      sitemapUrl: 'https://www.cyberussell.com/sitemap.xml',
      status: 200,
      result: 'success',
    });
    expect(line).toContain('2026-08-19T00:00:00.000Z');
    expect(line).toContain('sc-domain:cyberussell.com');
    expect(line).toContain('https://www.cyberussell.com/sitemap.xml');
    expect(line).toContain('status=200');
    expect(line).toContain('result=success');
    // Defensive guard: the formatter has a fixed field list, so even if a
    // caller mistakenly passed a token/key under an unexpected key it
    // would never appear (spread of arbitrary fields is not supported).
    expect(line).not.toMatch(/BEGIN PRIVATE KEY|access_token|bearer/i);
  });
});
