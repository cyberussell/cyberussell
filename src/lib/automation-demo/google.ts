import { google } from "googleapis";

export const SCOPES = [
  "openid",
  "email",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/drive.file",
];

export function isConfigured(): boolean {
  return Boolean(
    process.env.AUTOMATION_DEMO_GOOGLE_CLIENT_ID && process.env.AUTOMATION_DEMO_GOOGLE_CLIENT_SECRET
  );
}

function oauthClient(redirectUri: string) {
  return new google.auth.OAuth2(
    process.env.AUTOMATION_DEMO_GOOGLE_CLIENT_ID,
    process.env.AUTOMATION_DEMO_GOOGLE_CLIENT_SECRET,
    redirectUri
  );
}

export function getAuthUrl(redirectUri: string, state: string): string {
  const client = oauthClient(redirectUri);
  return client.generateAuthUrl({
    access_type: "online",
    scope: SCOPES,
    state,
    prompt: "consent select_account",
  });
}

export async function exchangeCode(
  code: string,
  redirectUri: string
): Promise<{ accessToken: string; email: string; expiresAt: number }> {
  const client = oauthClient(redirectUri);
  const { tokens } = await client.getToken({ code, redirect_uri: redirectUri });
  if (!tokens.access_token) throw new Error("Google did not return an access token");
  client.setCredentials(tokens);
  const oauth2 = google.oauth2({ auth: client, version: "v2" });
  const { data } = await oauth2.userinfo.get();
  return {
    accessToken: tokens.access_token,
    email: data.email ?? "unknown",
    expiresAt: tokens.expiry_date ?? Date.now() + 3500 * 1000,
  };
}

export async function revokeToken(accessToken: string): Promise<void> {
  const client = new google.auth.OAuth2();
  await client.revokeToken(accessToken).catch(() => {});
}

function clientFor(accessToken: string) {
  const client = new google.auth.OAuth2();
  client.setCredentials({ access_token: accessToken });
  return client;
}

export async function sendGmail(
  accessToken: string,
  opts: { to: string; subject: string; body: string }
): Promise<string | undefined> {
  const gmail = google.gmail({ version: "v1", auth: clientFor(accessToken) });
  const message = [
    `To: ${opts.to}`,
    `Subject: =?UTF-8?B?${Buffer.from(opts.subject).toString("base64")}?=`,
    "Content-Type: text/plain; charset=UTF-8",
    "",
    opts.body,
  ].join("\n");
  const raw = Buffer.from(message).toString("base64url");
  const res = await gmail.users.messages.send({ userId: "me", requestBody: { raw } });
  return res.data.id ?? undefined;
}

export async function createCalendarEvent(
  accessToken: string,
  opts: { summary: string; description: string; startISO: string; endISO: string; timeZone?: string }
): Promise<string | undefined> {
  const calendar = google.calendar({ version: "v3", auth: clientFor(accessToken) });
  // Google rejects a dateTime with no UTC offset unless timeZone is also set — always send one,
  // even if the caller's ISO string is well-formed, so a naive/offset-less datetime never breaks this.
  const timeZone = opts.timeZone || "Asia/Manila";
  const res = await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: opts.summary,
      description: opts.description,
      start: { dateTime: opts.startISO, timeZone },
      end: { dateTime: opts.endISO, timeZone },
    },
  });
  return res.data.htmlLink ?? undefined;
}

const DEMO_LOGS_FOLDER_NAME = "demo-logs";

async function getOrCreateDemoLogsFolder(drive: ReturnType<typeof google.drive>): Promise<string> {
  // drive.file scope only ever sees files this app itself created, so this search can't leak
  // visibility into the rest of the user's Drive — it only ever finds a folder we made before.
  const existing = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder' and name='${DEMO_LOGS_FOLDER_NAME}' and trashed=false`,
    fields: "files(id)",
    spaces: "drive",
    pageSize: 1,
  });
  const foundId = existing.data.files?.[0]?.id;
  if (foundId) return foundId;

  const created = await drive.files.create({
    requestBody: { name: DEMO_LOGS_FOLDER_NAME, mimeType: "application/vnd.google-apps.folder" },
    fields: "id",
  });
  if (!created.data.id) throw new Error("Failed to create demo-logs folder");
  return created.data.id;
}

export async function createDriveLog(
  accessToken: string,
  opts: { title: string; content: string }
): Promise<string | undefined> {
  const drive = google.drive({ version: "v3", auth: clientFor(accessToken) });
  const folderId = await getOrCreateDemoLogsFolder(drive);
  const res = await drive.files.create({
    requestBody: {
      name: opts.title,
      mimeType: "application/vnd.google-apps.document",
      parents: [folderId],
    },
    media: { mimeType: "text/plain", body: opts.content },
    fields: "id, webViewLink",
  });
  return res.data.webViewLink ?? undefined;
}
