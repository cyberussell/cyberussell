"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarClock, FolderOpen, Mail, Sparkles } from "lucide-react";
import { applyScrollReveal, gsap, prefersReducedMotion, useGsapScope } from "./useGsap";
import { PipelineStageCard, type StageStatus } from "./PipelineStageCard";

/** Delay between each stage of the post-send reveal — long enough to read as a real handoff, short enough to stay snappy. */
const STAGE_REVEAL_DELAY_MS = 900;
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function formatEventCard(startISO?: string, endISO?: string) {
  if (!startISO) return null;
  const start = new Date(startISO);
  if (Number.isNaN(start.getTime())) return null;
  const end = endISO ? new Date(endISO) : null;
  const startTime = start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const endTime = end && !Number.isNaN(end.getTime()) ? end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : null;
  return {
    month: start.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: start.getDate(),
    weekday: start.toLocaleDateString("en-US", { weekday: "long" }),
    timeRange: endTime ? `${startTime} – ${endTime}` : startTime,
  };
}

const SAMPLE_LEAD =
  "Hi, saw your automation work online — I run a small clinic and our front desk keeps missing follow-ups with new patients. Need something that actually handles this for us. When can we talk? - Jamie";

interface DraftResult {
  contactName: string;
  intent: string;
  urgency: "low" | "medium" | "high";
  subject: string;
  emailBody: string;
  proposedSlotLabel: string;
  proposedStartISO: string;
  proposedEndISO: string;
  proposedTimezone: string;
  logSummary: string;
}

interface RunStageResult {
  ok: boolean;
  error?: string;
  messageId?: string;
  eventLink?: string;
  eventTitle?: string;
  eventStartISO?: string;
  eventEndISO?: string;
  fileLink?: string;
}

interface RunResult {
  send: RunStageResult;
  schedule: RunStageResult;
  log: RunStageResult;
}

type Phase = "checking" | "not_configured" | "disconnected" | "connected";

export default function LiveDemo() {
  const scopeRef = useGsapScope<HTMLElement>((scope) => {
    applyScrollReveal(scope.querySelectorAll("[data-reveal]"));
    const wrap = scope.querySelector("[data-demo-wrap]");
    if (wrap) {
      gsap.fromTo(
        wrap,
        { opacity: 0, y: 34, scale: 0.975 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: wrap, start: "top 85%" },
        }
      );
    }
  }, []);

  const [phase, setPhase] = useState<Phase>("checking");
  const [email, setEmail] = useState<string | undefined>();
  const [leadText, setLeadText] = useState(SAMPLE_LEAD);
  const [draft, setDraft] = useState<DraftResult | null>(null);
  const [draftLoading, setDraftLoading] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [runLoading, setRunLoading] = useState(false);
  const [runError, setRunError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Cascading post-send reveal: 0 = nothing resolved yet, 1 = send resolved (schedule now running),
  // 2 = schedule resolved (log now running), 3 = log resolved — sequence complete.
  const [stageReveal, setStageReveal] = useState<0 | 1 | 2 | 3>(0);
  const runIdRef = useRef(0);

  // Typewriter reveal of the draft preview instead of an instant paste-in.
  const [typedSubject, setTypedSubject] = useState("");
  const [typedBody, setTypedBody] = useState("");
  const [draftTyping, setDraftTyping] = useState(false);

  useEffect(() => {
    if (!draft) {
      setTypedSubject("");
      setTypedBody("");
      setDraftTyping(false);
      return;
    }
    if (prefersReducedMotion()) {
      setTypedSubject(draft.subject);
      setTypedBody(draft.emailBody);
      setDraftTyping(false);
      return;
    }
    setDraftTyping(true);
    setTypedSubject("");
    setTypedBody("");
    const counters = { subject: 0, body: 0 };
    const tl = gsap.timeline({ onComplete: () => setDraftTyping(false) });
    tl.to(counters, {
      subject: draft.subject.length,
      duration: Math.min(1, Math.max(0.3, draft.subject.length / 45)),
      ease: "none",
      onUpdate: () => setTypedSubject(draft.subject.slice(0, Math.round(counters.subject))),
    }).to(
      counters,
      {
        body: draft.emailBody.length,
        duration: Math.min(2.4, Math.max(0.6, draft.emailBody.length / 55)),
        ease: "none",
        onUpdate: () => setTypedBody(draft.emailBody.slice(0, Math.round(counters.body))),
      },
      "+=0.15"
    );
    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  const refreshStatus = async () => {
    try {
      const res = await fetch("/api/automation-demo/status");
      const data = await res.json();
      if (!data.configured) setPhase("not_configured");
      else setPhase(data.connected ? "connected" : "disconnected");
      setEmail(data.email);
    } catch {
      setPhase("not_configured");
    }
  };

  useEffect(() => {
    refreshStatus();
    const params = new URLSearchParams(window.location.search);
    if (params.get("connected") === "1") setNotice("Connected — you can run the pipeline for real now.");
    if (params.get("error") === "oauth_failed") setNotice("Google connection failed. Please try again.");
    if (params.get("error") === "not_configured") setNotice("Google integration isn't configured yet.");
    if (params.has("connected") || params.has("error")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("connected");
      url.searchParams.delete("error");
      window.history.replaceState({}, "", url.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runDraft = async () => {
    setDraftError(null);
    setRunResult(null);
    setRunError(null);
    setDraftLoading(true);
    try {
      const res = await fetch("/api/automation-demo/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadText }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? "Draft failed");
      setDraft(await res.json());
    } catch (e) {
      setDraftError(e instanceof Error ? e.message : "Draft failed");
    } finally {
      setDraftLoading(false);
    }
  };

  const runPipeline = async () => {
    if (!draft) return;
    const runId = ++runIdRef.current;
    setRunError(null);
    setRunResult(null);
    setStageReveal(0);
    setRunLoading(true);
    try {
      const res = await fetch("/api/automation-demo/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? "Run failed");
      const result: RunResult = await res.json();
      if (runId !== runIdRef.current) return;
      setRunLoading(false);
      setRunResult(result);

      // Cascade the reveal — send resolves, then schedule lights up and resolves, then log —
      // rather than flipping all three stage cards at once.
      if (prefersReducedMotion()) {
        setStageReveal(3);
        return;
      }
      for (const stage of [1, 2, 3] as const) {
        await wait(STAGE_REVEAL_DELAY_MS);
        if (runId !== runIdRef.current) return;
        setStageReveal(stage);
      }
    } catch (e) {
      if (runId !== runIdRef.current) return;
      setRunLoading(false);
      setRunError(e instanceof Error ? e.message : "Run failed");
    }
  };

  const disconnect = async () => {
    runIdRef.current++;
    await fetch("/api/automation-demo/disconnect", { method: "POST" });
    setDraft(null);
    setRunResult(null);
    setStageReveal(0);
    await refreshStatus();
  };

  const startOver = () => {
    runIdRef.current++;
    setDraft(null);
    setRunResult(null);
    setRunError(null);
    setDraftError(null);
    setStageReveal(0);
  };

  const draftStatus: StageStatus = draftLoading ? "active" : draft ? "done" : draftError ? "error" : "idle";

  // Send lights up as soon as the pipeline starts running (whether that's the real network
  // wait or the cascading reveal after it). Schedule and log stay idle until it's their turn.
  const sendStatus: StageStatus = !runResult
    ? runLoading
      ? "active"
      : "idle"
    : stageReveal >= 1
      ? runResult.send.ok
        ? "done"
        : "error"
      : "active";
  const scheduleStatus: StageStatus =
    !runResult || stageReveal < 1
      ? "idle"
      : stageReveal >= 2
        ? runResult.schedule.ok
          ? "done"
          : "error"
        : "active";
  const logStatus: StageStatus =
    !runResult || stageReveal < 2
      ? "idle"
      : stageReveal >= 3
        ? runResult.log.ok
          ? "done"
          : "error"
        : "active";

  const scheduledEvent =
    scheduleStatus === "done" && runResult?.schedule.eventStartISO
      ? formatEventCard(runResult.schedule.eventStartISO, runResult.schedule.eventEndISO)
      : null;

  return (
    <section id="demo" ref={scopeRef} className="px-6 md:px-[clamp(24px,6vw,88px)] pt-[100px] pb-[120px]">
      <div data-reveal className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#4B5265] mb-5">
        Live demo
      </div>
      <h2
        data-reveal
        className="font-[family-name:var(--font-syne)] font-bold text-[clamp(28px,4.4vw,48px)] tracking-[-0.025em] max-w-[26ch] mb-4 text-[#E7EAF2]"
      >
        Not a video. Run it yourself.
      </h2>
      <p data-reveal className="max-w-[58ch] text-[16px] text-[#8A93A6] mb-8">
        It calls Claude and reaches Gmail, Google Calendar and Google Drive through your own connected Google
        account. For safety, the email always sends to <em>your own</em> inbox, and the calendar event and log
        file are created on <em>your own</em> account — never a third party.
      </p>

      <div
        data-demo-wrap
        className="relative max-w-[1180px] rounded-2xl overflow-hidden"
        style={{
          background: "#230B45",
          boxShadow:
            "0 0 0 1px rgba(216,142,255,0.4), 0 20px 50px rgba(0,0,0,0.55), 0 0 90px rgba(168,85,247,0.28)",
        }}
      >
        <div className="flex items-center gap-2 px-4 py-[11px] border-b border-[#D88EFF]/[0.2] bg-[#1B0938]/80">
          <span className="w-[9px] h-[9px] rounded-full bg-[#3F424D]" />
          <span className="w-[9px] h-[9px] rounded-full bg-[#3F424D]" />
          <span className="w-[9px] h-[9px] rounded-full bg-[#A855F7]/70" />
          <span className="ml-[10px] font-mono text-[12px] text-[#8A7FA6]">lead-follow-up-agent</span>
        </div>

        <div className="p-6 md:p-8">
          {notice && (
            <div className="mb-6 rounded-md border border-[#22D3EE]/30 bg-[#22D3EE]/[0.06] px-4 py-3 font-mono text-[13px] text-[#67E8F9]">
              {notice}
            </div>
          )}

          {phase === "not_configured" && (
            <div className="text-center py-10">
              <div className="text-[16px] mb-2 text-[#E7EAF2]">Google integration coming soon</div>
              <div className="text-[14px] text-[#6B7385] max-w-[46ch] mx-auto">
                This demo needs a connected Google OAuth client before it can run for real. Once that&rsquo;s
                configured, this panel lets you connect your own account and run the pipeline live.
              </div>
            </div>
          )}

          {phase !== "not_configured" && phase !== "checking" && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                {phase === "connected" ? (
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-[12px] text-[#67E8F9]">Connected as {email}</span>
                    <button
                      onClick={disconnect}
                      className="font-mono text-[12px] text-[#6B7385] underline underline-offset-2 hover:text-[#8A93A6]"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <a
                    href="/api/automation-demo/oauth/start"
                    className="inline-flex items-center rounded-md border border-[#22D3EE] px-5 py-[11px] text-[14px] font-[family-name:var(--font-syne)] font-medium text-[#22D3EE] no-underline transition-colors hover:bg-[#22D3EE]/10"
                  >
                    Connect Google to run this for real
                  </a>
                )}
              </div>

              <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-[#4B5265] mb-2">
                Lead message
              </label>
              <textarea
                value={leadText}
                onChange={(e) => setLeadText(e.target.value)}
                rows={4}
                disabled={phase !== "connected" || draftLoading || Boolean(draft)}
                className="w-full rounded-md bg-[#1B0938] border border-[#D88EFF]/[0.25] px-4 py-3 text-[14px] text-[#CBD5E8] font-mono focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-0 disabled:opacity-60"
              />

              <div className="flex flex-wrap gap-3 mt-4 mb-8">
                {!draft ? (
                  <button
                    onClick={runDraft}
                    disabled={phase !== "connected" || draftLoading || leadText.trim().length < 5}
                    className="inline-flex items-center rounded-md border border-[#22D3EE] px-5 py-[11px] text-[14px] font-[family-name:var(--font-syne)] font-medium text-[#22D3EE] transition-colors hover:bg-[#22D3EE]/10 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {draftLoading ? "Drafting…" : "Draft with Claude"}
                  </button>
                ) : runResult ? (
                  <button
                    onClick={startOver}
                    className="font-mono text-[13px] text-[#22D3EE] underline underline-offset-2"
                  >
                    Run it again
                  </button>
                ) : null}
              </div>

              {draftError && <p className="text-[13px] text-[#F87171] mb-6 font-mono">{draftError}</p>}
              {runError && <p className="text-[13px] text-[#F87171] mb-6 font-mono">{runError}</p>}

              {draft && (
                <div className="mb-8 rounded-lg border border-[#D88EFF]/[0.22] bg-[#1B0938] p-5">
                  <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#4B5265] mb-3">
                    Draft preview
                  </div>
                  <div className="text-[14px] text-[#E7EAF2] mb-1">
                    <span className="text-[#6B7385]">Subject: </span>
                    {typedSubject}
                    {draftTyping && typedSubject.length < draft.subject.length && (
                      <span className="inline-block w-[7px] h-[14px] bg-[#22D3EE] ml-[2px] align-middle motion-safe:animate-[demo-caret-blink_0.85s_step-end_infinite]" />
                    )}
                  </div>
                  <p className="text-[14px] text-[#B7BECC] whitespace-pre-wrap mb-4">
                    {typedBody}
                    {draftTyping && typedSubject.length >= draft.subject.length && (
                      <span className="inline-block w-[7px] h-[14px] bg-[#22D3EE] ml-[2px] align-middle motion-safe:animate-[demo-caret-blink_0.85s_step-end_infinite]" />
                    )}
                  </p>
                  {!draftTyping && (
                    <>
                      <div className="text-[13px] text-[#67E8F9] font-mono mb-1">
                        Proposed slot: {draft.proposedSlotLabel}
                      </div>
                      <div className="text-[13px] text-[#6B7385] font-mono">{draft.logSummary}</div>
                    </>
                  )}
                  {!runResult && (
                    <div className="flex flex-wrap items-center justify-end gap-4 mt-5 pt-4 border-t border-[#A855F7]/[0.12]">
                      <button
                        onClick={startOver}
                        disabled={runLoading}
                        className="font-mono text-[13px] text-[#6B7385] underline underline-offset-2 hover:text-[#8A93A6]"
                      >
                        Start over
                      </button>
                      <button
                        onClick={runPipeline}
                        disabled={runLoading || draftTyping}
                        className="inline-flex items-center rounded-md bg-[#22D3EE] px-5 py-[11px] text-[14px] font-[family-name:var(--font-syne)] font-semibold text-[#0A0E17] transition-opacity hover:opacity-90 disabled:opacity-40"
                      >
                        {runLoading ? "Sending for real…" : `Send for real — to ${email}`}
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
                <PipelineStageCard
                  n="01"
                  title="Draft"
                  body="Claude reads the lead and writes the reply."
                  tool="Claude API"
                  icon={Sparkles}
                  status={draftStatus}
                />
                <PipelineStageCard
                  n="02"
                  title="Send"
                  body="The reply is sent to your own inbox."
                  tool="Gmail API"
                  icon={Mail}
                  status={sendStatus}
                  errorMessage={stageReveal >= 1 ? runResult?.send.error : undefined}
                />
                <PipelineStageCard
                  n="03"
                  title="Schedule"
                  body="A follow-up slot is booked on your calendar."
                  tool="Google Calendar API"
                  icon={CalendarClock}
                  status={scheduleStatus}
                  errorMessage={stageReveal >= 2 ? runResult?.schedule.error : undefined}
                />
                <PipelineStageCard
                  n="04"
                  title="Log"
                  body="A record is filed to your Drive."
                  tool="Google Drive API"
                  icon={FolderOpen}
                  status={logStatus}
                  link={stageReveal >= 3 ? runResult?.log.fileLink : undefined}
                  linkLabel="View file"
                  errorMessage={stageReveal >= 3 ? runResult?.log.error : undefined}
                />
              </div>

              {scheduledEvent && (
                <div className="mt-5 flex items-center gap-4 rounded-lg border border-[#D88EFF]/[0.3] bg-[#1B0938] p-4">
                  <div className="shrink-0 w-14 overflow-hidden rounded-md border border-[#22D3EE]/40 text-center">
                    <div className="bg-[#22D3EE] py-[3px] font-mono text-[10px] font-bold uppercase tracking-wide text-[#0A0E17]">
                      {scheduledEvent.month}
                    </div>
                    <div className="bg-[#0A0E17] py-[6px] font-[family-name:var(--font-syne)] text-[20px] font-bold text-[#E7EAF2]">
                      {scheduledEvent.day}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-medium text-[#E7EAF2]">{runResult?.schedule.eventTitle}</div>
                    <div className="mt-[2px] font-mono text-[12px] text-[#C9A8F0]">
                      {scheduledEvent.weekday} · {scheduledEvent.timeRange}
                    </div>
                  </div>
                  {runResult?.schedule.eventLink && (
                    <a
                      href={runResult.schedule.eventLink}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 font-mono text-[12px] text-[#22D3EE] underline underline-offset-2"
                    >
                      Open ↗
                    </a>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
