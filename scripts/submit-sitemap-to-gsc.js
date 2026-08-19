#!/usr/bin/env node
/**
 * Submits the Cyberussell.com sitemap index to Google Search Console via
 * the official Search Console (Webmasters v3) API's sitemaps.submit
 * method — never the deprecated google.com/ping sitemap-ping endpoint,
 * and never the per-URL Indexing/URL-Inspection APIs (this submits the
 * sitemap index exactly once; it does not request indexing for
 * individual URLs).
 *
 * Intended to run:
 *   - automatically, from .github/workflows/submit-sitemap.yml, only
 *     after a successful PRODUCTION deployment (Vercel's GitHub
 *     integration posts a `deployment_status` event; the workflow is
 *     gated on state == "success" and environment == "Production"), or
 *   - manually, for testing: `npm run gsc:submit-sitemap`
 *     (see docs/gsc-sitemap-submission.md for full setup instructions).
 *
 * Credentials: read ONLY from the GSC_SERVICE_ACCOUNT_KEY_B64
 * environment variable (a base64-encoded service-account JSON key,
 * stored as an encrypted GitHub Actions secret in CI, or exported
 * locally in your own shell for a manual test run). This script never
 * writes that value anywhere, never logs it, and nothing under this
 * repo commits a credential file.
 */

const {
  parseServiceAccount,
  buildSignedJwt,
  buildTokenRequestBody,
  buildSubmitUrl,
  classifyResult,
  formatLogLine,
  TOKEN_URL,
} = require('../src/lib/gsc/sitemap-submission');

const PROPERTY = 'sc-domain:cyberussell.com';
const SITEMAP_URL = 'https://www.cyberussell.com/sitemap.xml'; // the sitemap INDEX — not sitemap-0.xml

function fail(kind, message) {
  const timestamp = new Date().toISOString();
  console.log(formatLogLine({ timestamp, property: PROPERTY, sitemapUrl: SITEMAP_URL, status: kind, result: 'failure' }));
  console.error(`\n${message}\n`);
  process.exitCode = 1;
}

async function main() {
  const raw = process.env.GSC_SERVICE_ACCOUNT_KEY_B64;
  if (!raw) {
    fail('config', 'GSC_SERVICE_ACCOUNT_KEY_B64 is not set. Export a base64-encoded service-account JSON key before running this script — see docs/gsc-sitemap-submission.md.');
    return;
  }

  let serviceAccount;
  try {
    const decoded = Buffer.from(raw, 'base64').toString('utf-8');
    serviceAccount = parseServiceAccount(decoded);
  } catch (err) {
    fail('config', `Could not read the service-account credential: ${err.message}`);
    return;
  }

  let accessToken;
  try {
    const jwt = buildSignedJwt(serviceAccount);
    const tokenResponse = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: buildTokenRequestBody(jwt),
    });
    if (!tokenResponse.ok) {
      fail(
        401,
        `Authentication failed while exchanging the service-account JWT for an access token (HTTP ${tokenResponse.status}). ` +
          'Check that the key is current and not revoked in Google Cloud, and that the system clock is correct (JWT exp/iat are time-sensitive).'
      );
      return;
    }
    const tokenBody = await tokenResponse.json();
    accessToken = tokenBody.access_token;
    if (!accessToken) {
      fail(401, 'Token exchange succeeded but no access_token was returned.');
      return;
    }
  } catch (err) {
    fail(401, `Authentication request failed: ${err.message}`);
    return;
  }

  let response;
  try {
    const submitUrl = buildSubmitUrl(PROPERTY, SITEMAP_URL);
    response = await fetch(submitUrl, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (err) {
    fail('network', `Request to the Search Console API failed: ${err.message}`);
    return;
  }

  const timestamp = new Date().toISOString();
  const { ok, kind, message } = classifyResult(response.status);
  console.log(formatLogLine({ timestamp, property: PROPERTY, sitemapUrl: SITEMAP_URL, status: response.status, result: ok ? 'success' : 'failure' }));

  if (!ok) {
    console.error(`\n${message}\n`);
    process.exitCode = 1;
    return;
  }

  if (kind === 'success') {
    console.log(message);
  }
}

main();
