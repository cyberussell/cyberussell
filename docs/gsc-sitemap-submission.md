# Google Search Console sitemap submission

Automatically notifies Google Search Console that `https://www.cyberussell.com/sitemap.xml`
(the sitemap **index**, not `sitemap-0.xml`) has been updated, using the official
Search Console API's `sitemaps.submit` method — never the deprecated
`google.com/ping?sitemap=` endpoint, and never a per-URL indexing request.

## How it runs

- **Automatically**, via [`.github/workflows/submit-sitemap.yml`](../.github/workflows/submit-sitemap.yml),
  triggered by GitHub's `deployment_status` event. Vercel's GitHub integration posts this
  event whenever a deployment finishes; the workflow only proceeds when
  `state == "success"` **and** `environment == "Production"` — preview/branch deploys never
  trigger a submission.
- **Manually**, two ways:
  - Locally: `npm run gsc:submit-sitemap` (needs `GSC_SERVICE_ACCOUNT_KEY_B64` exported in your shell).
  - From GitHub: open the *Actions* tab → "Submit sitemap to Google Search Console" → *Run workflow*.

Why GitHub Actions rather than a webhook endpoint inside the app: it needs zero new
infrastructure (no new API route, no publicly-reachable endpoint to protect against
abuse), keeps the service-account private key entirely out of the Next.js app's own
runtime/env (smaller blast radius than a Vercel env var shared with the public site),
and gives a free audit trail via the Actions run log. The job also runs under a GitHub
*Environment* (`production`), which you can additionally lock down with required
reviewers or branch restrictions in Settings → Environments if you want a manual
approval gate on top of the `deployment_status` trigger.

## One-time setup

### 1. Create the Google Cloud service account

1. In the [Google Cloud Console](https://console.cloud.google.com/), pick or create a project.
2. Enable the **Google Search Console API** (APIs & Services → Library → search "Search Console API" → Enable).
3. APIs & Services → Credentials → Create Credentials → **Service account**. Any name/ID is fine (e.g. `sitemap-submitter`).
4. Open the new service account → Keys → Add Key → **Create new key** → JSON. This downloads a `.json` file — treat it as a secret. Do not commit it to this or any repo.

### 2. Add the service account to the Search Console property

The service account needs to be added as a **user** on the property before it's allowed to call the API — a Cloud project alone isn't enough.

1. Open [Search Console](https://search.google.com/search-console) → select the `sc-domain:cyberussell.com` property.
2. Settings → Users and permissions → **Add user**.
3. Paste the service account's email (the `client_email` field from the JSON key, looks like `sitemap-submitter@your-project.iam.gserviceaccount.com`).
4. Permission level: **Owner** (or **Full** — either is sufficient for `sitemaps.submit`; Owner also lets it appear/verify without an existing human owner needing to re-approve later).

### 3. Store the credential as an encrypted GitHub secret

Never commit the JSON key. Base64-encode it and store it as a GitHub Actions secret:

```bash
# macOS/Linux
base64 -i path/to/service-account-key.json | tr -d '\n' | pbcopy   # copies to clipboard (macOS)
# or just print it and copy manually:
base64 -i path/to/service-account-key.json
```

Then in GitHub: **Settings → Environments → New environment → name it `production`** (if it
doesn't already exist) → under that environment's secrets, **Add secret** named
`GSC_SERVICE_ACCOUNT_KEY_B64`, paste the base64 string.

(Using an *environment* secret rather than a plain repository secret is what lets you
optionally add required reviewers/branch restrictions to this specific job later.)

### 4. Test it

```bash
export GSC_SERVICE_ACCOUNT_KEY_B64="$(base64 -i path/to/service-account-key.json | tr -d '\n')"
npm run gsc:submit-sitemap
```

Expected output on success:
```
[2026-08-19T00:00:00.000Z] GSC sitemap submit — property=sc-domain:cyberussell.com sitemap=https://www.cyberussell.com/sitemap.xml status=200 result=success
Sitemap submitted (idempotent success, including re-submission of an already-known sitemap).
```

Or trigger the GitHub Actions workflow manually (Actions tab → *Run workflow*) once the
secret is in place — no deployment required to test it that way.

## Failure modes

| Symptom | Meaning | Fix |
|---|---|---|
| `Authentication failed (401)` | Bad/expired/malformed key, or bad JWT signature | Re-generate the service-account key, re-encode, update the GitHub secret |
| `Permission denied (403)` | Service account not added to the property, or insufficient permission level | Redo step 2 above |
| `GSC_SERVICE_ACCOUNT_KEY_B64 is not set` | Secret missing from the environment running the job | Confirm the secret exists in the `production` GitHub Environment and the workflow's `environment:` key matches |

The script exits non-zero on any failure (auth, permission, or otherwise), so a failed
submission shows up as a failed, easy-to-spot GitHub Actions run — it never fails silently.

## What this intentionally does NOT do

- Does not use `http://www.google.com/ping?sitemap=...` (deprecated).
- Does not call the URL Inspection / Indexing API for any of the 232 individual sitemap
  URLs — only the one `sitemaps.submit` call for the sitemap index.
- Does not run on preview/branch deployments, only Production.
- Does not store or log the service-account key, JWT, or access token anywhere — only
  the HTTP status, property, sitemap URL, and timestamp are logged (see
  `formatLogLine` in `src/lib/gsc/sitemap-submission.js`).
