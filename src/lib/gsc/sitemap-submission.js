// Pure, network-free logic for submitting the sitemap index to Google
// Search Console via the official Search Console (Webmasters v3) API's
// sitemaps.submit method. Kept free of fetch/network calls so it can be
// unit tested without hitting Google's servers — see
// scripts/submit-sitemap-to-gsc.js for the CLI that actually performs the
// network calls using these helpers.
'use strict';

const crypto = require('crypto');

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const WEBMASTERS_SCOPE = 'https://www.googleapis.com/auth/webmasters';
const GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:jwt-bearer';

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

/**
 * Parse and validate a service-account JSON string. Throws a clear error
 * (never leaking the raw input) if required fields are missing.
 * @param {string} raw
 */
function parseServiceAccount(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('Service account credential is not valid JSON.');
  }
  const { client_email: clientEmail, private_key: privateKey } = parsed;
  if (!clientEmail || !privateKey) {
    throw new Error('Service account JSON is missing client_email or private_key.');
  }
  return { clientEmail, privateKey };
}

/**
 * Build the unsigned + signed RS256 JWT assertion used for the OAuth2
 * service-account (JWT bearer) token exchange.
 * @param {{ clientEmail: string, privateKey: string }} serviceAccount
 * @param {number} [nowSeconds] injectable for tests
 * @returns {string} signed JWT
 */
function buildSignedJwt(serviceAccount, nowSeconds = Math.floor(Date.now() / 1000)) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const claims = {
    iss: serviceAccount.clientEmail,
    scope: WEBMASTERS_SCOPE,
    aud: TOKEN_URL,
    iat: nowSeconds,
    exp: nowSeconds + 3600,
  };
  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
  const signature = crypto.createSign('RSA-SHA256').update(signingInput).sign(serviceAccount.privateKey, 'base64url');
  return `${signingInput}.${signature}`;
}

/** Body for the token-exchange POST to oauth2.googleapis.com/token. */
function buildTokenRequestBody(signedJwt) {
  return new URLSearchParams({ grant_type: GRANT_TYPE, assertion: signedJwt });
}

/**
 * Build the sitemaps.submit REST URL.
 * PUT https://www.googleapis.com/webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}
 * Both path segments must be percent-encoded per the API reference.
 * @param {string} siteUrl e.g. "sc-domain:cyberussell.com"
 * @param {string} feedpath e.g. "https://www.cyberussell.com/sitemap.xml"
 */
function buildSubmitUrl(siteUrl, feedpath) {
  return `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(feedpath)}`;
}

/**
 * Classify an HTTP response from the sitemaps.submit call into an
 * unambiguous result the CLI can act on and log. A bare 2xx (including a
 * re-submission of an already-known sitemap) is success — Search Console
 * has no separate "already submitted" error, PUT is idempotent by design.
 * @param {number} status
 * @returns {{ ok: boolean, kind: 'success'|'auth'|'permission'|'error', message: string }}
 */
function classifyResult(status) {
  if (status >= 200 && status < 300) {
    return { ok: true, kind: 'success', message: 'Sitemap submitted (idempotent success, including re-submission of an already-known sitemap).' };
  }
  if (status === 401) {
    return {
      ok: false,
      kind: 'auth',
      message: 'Authentication failed (401). The service-account credential is missing, malformed, expired, or the JWT signature is invalid.',
    };
  }
  if (status === 403) {
    return {
      ok: false,
      kind: 'permission',
      message: 'Permission denied (403). The service account has not been added as a user on the Search Console property, or lacks sufficient permission. See docs/gsc-sitemap-submission.md.',
    };
  }
  return { ok: false, kind: 'error', message: `Unexpected response (${status}) from the Search Console API.` };
}

/**
 * Build a single-line, credential-free log entry.
 * @param {{ timestamp: string, property: string, sitemapUrl: string, status: number, result: string }} fields
 */
function formatLogLine({ timestamp, property, sitemapUrl, status, result }) {
  return `[${timestamp}] GSC sitemap submit — property=${property} sitemap=${sitemapUrl} status=${status} result=${result}`;
}

module.exports = {
  WEBMASTERS_SCOPE,
  TOKEN_URL,
  parseServiceAccount,
  buildSignedJwt,
  buildTokenRequestBody,
  buildSubmitUrl,
  classifyResult,
  formatLogLine,
};
