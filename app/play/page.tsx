"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import WatermarkCanvas from "./WatermarkCanvas";
import AudioRecorder from "./AudioRecorder";
import SiteNav from "../components/SiteNav";
import SignUpGate, { type GateReason } from "./SignUpGate";
import type { AudioIntelligence, HumorFilter, ImageSpec } from "@/lib/audio/types";
import type { ComparisonResult } from "@/lib/image/generateComparisonImages";
import type { ImagePrompt } from "@/lib/audio/imageSpecToPrompt";

export default function PlayPage() {
  return (
    <Suspense>
      <PlayPageInner />
    </Suspense>
  );
}

type PageState = "input" | "loading" | "result" | "locked";
type InputMode = "text" | "record";

const LOCKED_BUTTONS: { label: string; reason: GateReason }[] = [
  { label: "What's actually going on here?", reason: "deeper" },
  { label: "Say it like you mean it", reason: "worse" },
  { label: "Remove the filter", reason: "highres" },
  { label: "Save this", reason: "save" },
];

const INTERSTITIAL_BEATS = [
  { label: "[ FORMING AN OPINION ]", headline: "Forming an opinion.", sub: "Reading between the lines. And the lies." },
  { label: "[ FINDING THE ANGLE ]", headline: "Isolating the defining trait.", sub: "This won't take long." },
  { label: "[ DRAWING IT ]", headline: "Drawing it wrong on purpose.", sub: "The artist has opinions. They are not flattering." },
  { label: "[ ALMOST ]", headline: "The sketch is loading.", sub: "Your dignity is not." },
  { label: "[ IT'S READY ]", headline: "Your drawing is ready.", sub: "You asked for this." },
];

function PlayPageInner() {
  const { isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<PageState>("input");
  const [inputMode, setInputMode] = useState<InputMode>("record");
  const [moment, setMoment] = useState("");
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [audioIntelligence, setAudioIntelligence] = useState<AudioIntelligence | null>(null);
  const [humorFilter, setHumorFilter] = useState<HumorFilter | null>(null);
  const [imageSpecs, setImageSpecs] = useState<ImageSpec[] | null>(null);
  const [prompts, setPrompts] = useState<ImagePrompt[] | null>(null);
  const [accordionOpen, setAccordionOpen] = useState<"intelligence" | "humor" | "transcript" | "imagespecs" | "imageprompts" | null>(null);
  const [gate, setGate] = useState<GateReason | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [beat, setBeat] = useState(0);
  const pipelineDoneRef = useRef(false);
  const beatRef = useRef(0);

  useEffect(() => {
    if (searchParams.get("success") === "1") {
      setShowSuccess(true);
      router.replace("/play");
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [searchParams, router]);

  // Interstitial beat timer — runs while loading
  useEffect(() => {
    if (state !== "loading") { setBeat(0); beatRef.current = 0; pipelineDoneRef.current = false; return; }

    const interval = setInterval(() => {
      beatRef.current += 1;
      const next = beatRef.current;
      setBeat(next);

      // If pipeline already resolved and we've shown beat 4+, show done screen then transition
      if (pipelineDoneRef.current && next >= 4) {
        clearInterval(interval);
        setTimeout(() => setState("result"), 1800);
      }

      // Stop cycling at beat 4 (index 4 = "ready" screen) and wait for pipeline
      if (next >= 4 && !pipelineDoneRef.current) {
        clearInterval(interval);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [state]);

  function onPipelineComplete(result: ComparisonResult) {
    setComparison(result);
    pipelineDoneRef.current = true;
    if (beatRef.current >= 4) {
      setTimeout(() => setState("result"), 1800);
    }
  }

  async function runAudioPipeline(blob: Blob, durationSeconds: number) {
    try {
      const createRes = await fetch("/api/session/create", { method: "POST" });
      if (!createRes.ok) throw new Error("session failed");
      const { sessionId } = await createRes.json();

      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      formData.append("duration", String(Math.round(durationSeconds)));

      const analyzeRes = await fetch(`/api/session/${sessionId}/analyze`, {
        method: "POST",
        body: formData,
      });
      if (!analyzeRes.ok) throw new Error("analysis failed");
      const { intelligence, humorFilter: hf, imageSpecs: specs, prompts: pts, comparison: comp } = await analyzeRes.json();
      if (intelligence) setAudioIntelligence(intelligence);
      if (hf) setHumorFilter(hf);
      if (specs) setImageSpecs(specs);
      if (pts) setPrompts(pts);
      onPipelineComplete(comp);
    } catch {
      setError("Something went wrong. Try again.");
      setState("input");
    }
  }

  function handleRecordingComplete(blob: Blob, durationSeconds: number) {
    setState("loading");
    setError(null);
    runAudioPipeline(blob, durationSeconds);
  }

  async function handleTextSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!moment.trim()) return;

    setState("loading");
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moment: moment.trim() }),
      });


      if (!res.ok) throw new Error("generation failed");

      const { intelligence: intel, humorFilter: hf, imageSpecs: specs, prompts: pts, comparison: comp, error: apiError, detail } = await res.json();
      if (apiError) throw new Error(detail ?? apiError);
      if (intel) setAudioIntelligence(intel);
      if (hf) setHumorFilter(hf);
      if (specs) setImageSpecs(specs);
      if (pts) setPrompts(pts);
      onPipelineComplete(comp);
    } catch {
      setError("Something went wrong. Try again.");
      setState("input");
    }
  }

  if (!isLoaded) return null;

  const currentBeat = INTERSTITIAL_BEATS[Math.min(beat, INTERSTITIAL_BEATS.length - 1)];

  return (
    <>
      <SiteNav page="PLAY" activeLink="play" />

      {showSuccess && (
        <div style={{ background: "var(--red)", color: "#fff", fontFamily: "var(--mono)", fontSize: "var(--t-small)", padding: "var(--s-3) var(--margin)", textAlign: "center", fontWeight: 700, letterSpacing: "0.05em" }}>
          You&apos;re in. Go.
        </div>
      )}

      <main style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "var(--s-8) var(--margin) var(--s-10)" }}>

        {/* ── INPUT STATE ── */}
        {state === "input" && (
          <div className="grid-2" style={{ gap: "var(--s-10)", alignItems: "start" }}>
            <div>
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-5)" }}>[ YOUR MOMENT ]</p>
              <h1 className="shout" style={{ marginBottom: "var(--s-5)", maxWidth: "90%" }}>
                Describe the{" "}
                <span style={{ color: "var(--red)" }}>moment.</span>
              </h1>
              <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: "var(--s-6)" }}>
                Where were they? What happened? The less filtered, the better it works.
              </p>

              {/* mode toggle */}
              <div style={{ display: "flex", gap: 0, marginBottom: "var(--s-6)", borderBottom: "2px solid var(--ink)" }}>
                {(["record", "text"] as InputMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => { setInputMode(mode); setError(null); }}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "var(--t-small)",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "var(--s-2) var(--s-5)",
                      background: "none",
                      border: "none",
                      borderBottom: inputMode === mode ? "3px solid var(--red)" : "3px solid transparent",
                      marginBottom: -2,
                      color: inputMode === mode ? "var(--red)" : "var(--ink-soft)",
                      cursor: "pointer",
                    }}
                  >
                    {mode === "record" ? "Record it" : "Type it"}
                  </button>
                ))}
              </div>

              {/* text form */}
              {inputMode === "text" && (
                <form onSubmit={handleTextSubmit}>
                  <label className="field-label" htmlFor="moment-input">The moment</label>
                  <textarea
                    id="moment-input"
                    className="textarea"
                    rows={5}
                    placeholder="Describe the moment"
                    value={moment}
                    onChange={(e) => setMoment(e.target.value)}
                    style={{ marginBottom: "var(--s-5)", resize: "vertical" }}
                    autoFocus
                  />
                  {error && (
                    <p className="field-error" style={{ marginBottom: "var(--s-4)" }}>{error}</p>
                  )}
                  <button
                    type="submit"
                    className="btn btn-lg btn-red"
                    disabled={!moment.trim()}
                    style={{ opacity: moment.trim() ? 1 : 0.5 }}
                  >
                    Get My Party Trick <span className="arrow">→</span>
                  </button>
                </form>
              )}

              {/* record mode */}
              {inputMode === "record" && (
                <div style={{ paddingTop: "var(--s-4)" }}>
                  {error && (
                    <p className="field-error" style={{ marginBottom: "var(--s-4)", textAlign: "center" }}>{error}</p>
                  )}
                  <AudioRecorder onComplete={handleRecordingComplete} />
                </div>
              )}

              <p className="scrawl scrawl-sm" style={{ transform: "rotate(-1.5deg)", display: "inline-block", fontSize: 18, marginTop: "var(--s-5)", color: "var(--ink-soft)" }}>
                First one&apos;s free. No sign-up required.
              </p>
            </div>

            {/* placeholder polaroid */}
            <div className="polaroid-tf02" style={{ transform: "rotate(1.5deg)", width: "100%", position: "relative" }}>
              <img src="/assets/tape-green-1.png" alt="" style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%) rotate(-5deg)", width: 160, opacity: 0.9, pointerEvents: "none", zIndex: 2 }} />
              <div style={{ width: "100%", aspectRatio: "3/4", background: "repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0 6px, transparent 6px 12px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--ink-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>yours here</span>
              </div>
              <p style={{ fontFamily: "var(--hand)", fontSize: 18, lineHeight: 1.3, textAlign: "center", margin: "10px 0 4px", color: "var(--ink)" }}>the portrait you deserve</p>
            </div>
          </div>
        )}

        {/* ── LOADING / INTERSTITIAL STATE ── */}
        {state === "loading" && (
          <div className="grid-2" style={{ gap: "var(--s-10)", alignItems: "start" }}>
            <div style={{ paddingTop: "var(--s-8)" }}>
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-5)", transition: "opacity 0.4s" }}>
                {currentBeat.label}
              </p>
              <h2 style={{ fontFamily: "var(--display-cond)", fontSize: "var(--t-d2)", textTransform: "uppercase", lineHeight: 1, marginBottom: "var(--s-5)", transition: "opacity 0.4s" }}>
                {currentBeat.headline}
              </h2>
              <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", color: "var(--ink-soft)", lineHeight: 1.6 }}>
                {currentBeat.sub}
              </p>
            </div>

            <div className="polaroid-tf02" style={{ transform: "rotate(1deg)", width: "100%", position: "relative" }}>
              <img src="/assets/tape-black-1.png" alt="" style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%) rotate(3deg)", width: 160, opacity: 0.9, pointerEvents: "none", zIndex: 2 }} />
              <div style={{ width: "100%", aspectRatio: "3/4", background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="blink" style={{ color: "var(--red)", fontFamily: "var(--display-bebas)", fontSize: 48, letterSpacing: "0.05em" }}>●</span>
              </div>
              <p style={{ fontFamily: "var(--hand)", fontSize: 18, lineHeight: 1.3, textAlign: "center", margin: "10px 0 4px", color: "var(--ink)" }}>
                {currentBeat.headline.toLowerCase()}
              </p>
            </div>
          </div>
        )}

        {/* ── RESULT STATE ── */}
        {state === "result" && comparison && (
          <div className="grid-2" style={{ gap: "var(--s-10)", alignItems: "start" }}>
            <div>
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-5)" }}>[ FRESH READ ]</p>
              <h2 className="shout" style={{ marginBottom: "var(--s-4)" }}>
                There it is.
              </h2>
              <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: "var(--s-7)" }}>
                Sign up to go deeper, get the full version, or save it.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
                {LOCKED_BUTTONS.map(({ label, reason }) => (
                  <button
                    key={reason}
                    className="btn btn-lg"
                    style={{ justifyContent: "space-between", background: "var(--paper)", color: "var(--ink)", position: "relative" }}
                    onClick={() => {
                      setGate(reason);
                      console.log("paywall_opened");
                    }}
                  >
                    <span>{label}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--red)", letterSpacing: "0.1em" }}>SIGN UP →</span>
                  </button>
                ))}
              </div>

              <p className="scrawl scrawl-sm" style={{ transform: "rotate(-1deg)", display: "inline-block", fontSize: 18, marginTop: "var(--s-5)", color: "var(--ink-soft)" }}>
                or it disappears when you close this tab
              </p>

              {/* Intelligence accordion — always shown when result is available */}
              {comparison && (
                <div style={{ marginTop: "var(--s-7)", borderTop: "1px solid var(--ink-faint)", paddingTop: "var(--s-5)" }}>
                  <p className="t-cap" style={{ color: "var(--ink-faint)", marginBottom: "var(--s-3)" }}>[ UNDER THE HOOD ]</p>

                  {!prompts && !imageSpecs && !humorFilter && !audioIntelligence && (
                    <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-faint)", lineHeight: 1.6 }}>
                      Switch to <strong>Record it</strong> mode to see the full pipeline — audio intelligence, humor filter, image specs, and prompts.
                    </p>
                  )}

                  {prompts && (
                    <div style={{ marginBottom: "var(--s-2)" }}>
                      <button
                        type="button"
                        onClick={() => setAccordionOpen(accordionOpen === "imageprompts" ? null : "imageprompts")}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "1px solid var(--ink-faint)", padding: "var(--s-3) var(--s-4)", fontFamily: "var(--mono)", fontSize: "var(--t-small)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-soft)", cursor: "pointer" }}
                      >
                        <span>Pass 4 — Image Prompts</span>
                        <span style={{ color: "var(--red)" }}>{accordionOpen === "imageprompts" ? "▲" : "▼"}</span>
                      </button>
                      {accordionOpen === "imageprompts" && (
                        <div style={{ background: "var(--paper)", border: "1px solid var(--ink-faint)", borderTop: "none", padding: "var(--s-4)", fontFamily: "var(--mono)", fontSize: 12, lineHeight: 1.7, color: "var(--ink-soft)" }}>
                          {prompts.map((p, i) => (
                            <div key={i} style={{ marginBottom: i < prompts.length - 1 ? "var(--s-4)" : 0, paddingBottom: i < prompts.length - 1 ? "var(--s-4)" : 0, borderBottom: i < prompts.length - 1 ? "1px solid var(--ink-faint)" : "none" }}>
                              <p style={{ fontWeight: 700, color: "var(--red)", marginBottom: "var(--s-2)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Prompt {i + 1}</p>
                              <p style={{ margin: 0 }}>{p.prompt}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {imageSpecs && (
                    <div style={{ marginBottom: "var(--s-2)" }}>
                      <button
                        type="button"
                        onClick={() => setAccordionOpen(accordionOpen === "imagespecs" ? null : "imagespecs")}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "1px solid var(--ink-faint)", padding: "var(--s-3) var(--s-4)", fontFamily: "var(--mono)", fontSize: "var(--t-small)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-soft)", cursor: "pointer" }}
                      >
                        <span>Pass 3 — Image Specs</span>
                        <span style={{ color: "var(--red)" }}>{accordionOpen === "imagespecs" ? "▲" : "▼"}</span>
                      </button>
                      {accordionOpen === "imagespecs" && (
                        <pre style={{ background: "var(--paper)", border: "1px solid var(--ink-faint)", borderTop: "none", padding: "var(--s-4)", fontFamily: "var(--mono)", fontSize: 11, lineHeight: 1.6, overflowX: "auto", margin: 0, color: "var(--ink-soft)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                          {JSON.stringify(imageSpecs, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}

                  {humorFilter && (
                    <div style={{ marginBottom: "var(--s-2)" }}>
                      <button
                        type="button"
                        onClick={() => setAccordionOpen(accordionOpen === "humor" ? null : "humor")}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "1px solid var(--ink-faint)", padding: "var(--s-3) var(--s-4)", fontFamily: "var(--mono)", fontSize: "var(--t-small)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-soft)", cursor: "pointer" }}
                      >
                        <span>Pass 2 — Selective Humor Filter</span>
                        <span style={{ color: "var(--red)" }}>{accordionOpen === "humor" ? "▲" : "▼"}</span>
                      </button>
                      {accordionOpen === "humor" && (
                        <pre style={{ background: "var(--paper)", border: "1px solid var(--ink-faint)", borderTop: "none", padding: "var(--s-4)", fontFamily: "var(--mono)", fontSize: 11, lineHeight: 1.6, overflowX: "auto", margin: 0, color: "var(--ink-soft)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                          {JSON.stringify(humorFilter, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}

                  {audioIntelligence && (
                    <div style={{ marginBottom: "var(--s-2)" }}>
                      <button
                        type="button"
                        onClick={() => setAccordionOpen(accordionOpen === "intelligence" ? null : "intelligence")}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "1px solid var(--ink-faint)", padding: "var(--s-3) var(--s-4)", fontFamily: "var(--mono)", fontSize: "var(--t-small)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-soft)", cursor: "pointer" }}
                      >
                        <span>Pass 1 — Audio Intelligence</span>
                        <span style={{ color: "var(--red)" }}>{accordionOpen === "intelligence" ? "▲" : "▼"}</span>
                      </button>
                      {accordionOpen === "intelligence" && (
                        <pre style={{ background: "var(--paper)", border: "1px solid var(--ink-faint)", borderTop: "none", padding: "var(--s-4)", fontFamily: "var(--mono)", fontSize: 11, lineHeight: 1.6, overflowX: "auto", margin: 0, color: "var(--ink-soft)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                          {JSON.stringify(audioIntelligence, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}

                  {audioIntelligence?.transcript?.full_text && (
                    <div>
                      <button
                        type="button"
                        onClick={() => setAccordionOpen(accordionOpen === "transcript" ? null : "transcript")}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "1px solid var(--ink-faint)", padding: "var(--s-3) var(--s-4)", fontFamily: "var(--mono)", fontSize: "var(--t-small)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-soft)", cursor: "pointer" }}
                      >
                        <span>Transcript</span>
                        <span style={{ color: "var(--red)" }}>{accordionOpen === "transcript" ? "▲" : "▼"}</span>
                      </button>
                      {accordionOpen === "transcript" && (
                        <div style={{ background: "var(--paper)", border: "1px solid var(--ink-faint)", borderTop: "none", padding: "var(--s-4)", fontFamily: "var(--mono)", fontSize: 13, lineHeight: 1.7, margin: 0, color: "var(--ink-soft)" }}>
                          {audioIntelligence.transcript.full_text}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-7)" }}>
              <p className="t-micro" style={{ color: "var(--ink-faint)", letterSpacing: "0.12em" }}>SAME PROMPT — TWO MODELS</p>
              <div>
                <div className="polaroid-tf02" style={{ transform: "rotate(-1.5deg)", width: "100%", position: "relative" }}>
                  <img src="/assets/tape-red-1.png" alt="" style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%) rotate(4deg)", width: 160, opacity: 0.9, pointerEvents: "none", zIndex: 2 }} />
                  <WatermarkCanvas imageUrl={comparison.openai.url} />
                  <p style={{ fontFamily: "var(--hand)", fontSize: 18, lineHeight: 1.3, textAlign: "center", margin: "10px 0 4px", color: "var(--ink)" }}>{comparison.caption}</p>
                </div>
                <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center", marginTop: "var(--s-3)" }}>{comparison.openai.label}</p>
              </div>
              <div>
                <div className="polaroid-tf02" style={{ transform: "rotate(1deg)", width: "100%", position: "relative" }}>
                  <img src="/assets/tape-black-1.png" alt="" style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%) rotate(-3deg)", width: 160, opacity: 0.9, pointerEvents: "none", zIndex: 2 }} />
                  {comparison.replicate.url ? (
                    <WatermarkCanvas imageUrl={comparison.replicate.url} />
                  ) : (
                    <div style={{ width: "100%", aspectRatio: "1/1", background: "repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0 6px, transparent 6px 12px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--ink-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>unavailable</span>
                    </div>
                  )}
                  <p style={{ fontFamily: "var(--hand)", fontSize: 18, lineHeight: 1.3, textAlign: "center", margin: "10px 0 4px", color: "var(--ink)" }}>{comparison.caption}</p>
                </div>
                <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center", marginTop: "var(--s-3)" }}>{comparison.replicate.label}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── LOCKED STATE ── */}
        {state === "locked" && (
          <div className="grid-2" style={{ gap: "var(--s-10)", alignItems: "start" }}>
            <div>
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-5)" }}>[ YOU'VE HAD YOUR FREE ONE ]</p>
              <h1 className="shout" style={{ marginBottom: "var(--s-5)" }}>
                That was the{" "}
                <span style={{ color: "var(--red)" }}>polite version.</span>
              </h1>
              <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: "var(--s-7)" }}>
                Sign up to get more Party Tricks, unlock Fresh Reads, and see the full unfiltered version.
              </p>
              <div style={{ display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
                <a href="/sign-up" className="btn btn-lg btn-red" onClick={() => console.log("cta_signup_clicked")}>
                  See the real read <span className="arrow">→</span>
                </a>
                <a href="/pricing" className="btn btn-lg">
                  See Pricing <span className="arrow">→</span>
                </a>
              </div>

              {/* Accordion — show analysis even on locked state */}
              {(audioIntelligence || humorFilter) && (
                <div style={{ marginTop: "var(--s-7)", borderTop: "1px solid var(--ink-faint)", paddingTop: "var(--s-5)" }}>
                  <p className="t-cap" style={{ color: "var(--ink-faint)", marginBottom: "var(--s-3)" }}>[ UNDER THE HOOD ]</p>

                  {imageSpecs && (
                    <div style={{ marginBottom: "var(--s-2)" }}>
                      <button type="button" onClick={() => setAccordionOpen(accordionOpen === "imageprompts" ? null : "imageprompts")} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "1px solid var(--ink-faint)", padding: "var(--s-3) var(--s-4)", fontFamily: "var(--mono)", fontSize: "var(--t-small)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-soft)", cursor: "pointer" }}>
                        <span>Image Prompts — All 5 Specs</span>
                        <span style={{ color: "var(--red)" }}>{accordionOpen === "imageprompts" ? "▲" : "▼"}</span>
                      </button>
                      {accordionOpen === "imageprompts" && (
                        <div style={{ background: "var(--paper)", border: "1px solid var(--ink-faint)", borderTop: "none", padding: "var(--s-4)", fontFamily: "var(--mono)", fontSize: 12, lineHeight: 1.7, color: "var(--ink-soft)" }}>
                          {imageSpecs.map((spec, i) => (
                            <div key={i} style={{ marginBottom: i < imageSpecs.length - 1 ? "var(--s-5)" : 0, paddingBottom: i < imageSpecs.length - 1 ? "var(--s-5)" : 0, borderBottom: i < imageSpecs.length - 1 ? "1px solid var(--ink-faint)" : "none" }}>
                              <p style={{ fontWeight: 700, color: "var(--red)", marginBottom: "var(--s-2)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Spec {i + 1} — {spec.exaggeration.method} / {spec.tone}</p>
                              <p style={{ marginBottom: 4 }}><strong>Scene:</strong> {spec.character.action} in {spec.setting}</p>
                              <p style={{ marginBottom: 4 }}><strong>Character:</strong> {spec.character.role} — {spec.character.expression}</p>
                              <p style={{ marginBottom: 4 }}><strong>Props:</strong> {spec.props.join(", ")}</p>
                              <p style={{ marginBottom: 0 }}><strong>Exaggeration:</strong> {spec.exaggeration.description} (target: {spec.exaggeration.target})</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {imageSpecs && (
                    <div style={{ marginBottom: "var(--s-2)" }}>
                      <button type="button" onClick={() => setAccordionOpen(accordionOpen === "imagespecs" ? null : "imagespecs")} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "1px solid var(--ink-faint)", padding: "var(--s-3) var(--s-4)", fontFamily: "var(--mono)", fontSize: "var(--t-small)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-soft)", cursor: "pointer" }}>
                        <span>Pass 3 — Image Specs</span>
                        <span style={{ color: "var(--red)" }}>{accordionOpen === "imagespecs" ? "▲" : "▼"}</span>
                      </button>
                      {accordionOpen === "imagespecs" && (
                        <pre style={{ background: "var(--paper)", border: "1px solid var(--ink-faint)", borderTop: "none", padding: "var(--s-4)", fontFamily: "var(--mono)", fontSize: 11, lineHeight: 1.6, overflowX: "auto", margin: 0, color: "var(--ink-soft)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                          {JSON.stringify(imageSpecs, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}

                  {humorFilter && (
                    <div style={{ marginBottom: "var(--s-2)" }}>
                      <button type="button" onClick={() => setAccordionOpen(accordionOpen === "humor" ? null : "humor")} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "1px solid var(--ink-faint)", padding: "var(--s-3) var(--s-4)", fontFamily: "var(--mono)", fontSize: "var(--t-small)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-soft)", cursor: "pointer" }}>
                        <span>Pass 2 — Selective Humor Filter</span>
                        <span style={{ color: "var(--red)" }}>{accordionOpen === "humor" ? "▲" : "▼"}</span>
                      </button>
                      {accordionOpen === "humor" && (
                        <pre style={{ background: "var(--paper)", border: "1px solid var(--ink-faint)", borderTop: "none", padding: "var(--s-4)", fontFamily: "var(--mono)", fontSize: 11, lineHeight: 1.6, overflowX: "auto", margin: 0, color: "var(--ink-soft)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                          {JSON.stringify(humorFilter, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}

                  {audioIntelligence && (
                    <div style={{ marginBottom: "var(--s-2)" }}>
                      <button type="button" onClick={() => setAccordionOpen(accordionOpen === "intelligence" ? null : "intelligence")} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "1px solid var(--ink-faint)", padding: "var(--s-3) var(--s-4)", fontFamily: "var(--mono)", fontSize: "var(--t-small)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-soft)", cursor: "pointer" }}>
                        <span>Pass 1 — Audio Intelligence</span>
                        <span style={{ color: "var(--red)" }}>{accordionOpen === "intelligence" ? "▲" : "▼"}</span>
                      </button>
                      {accordionOpen === "intelligence" && (
                        <pre style={{ background: "var(--paper)", border: "1px solid var(--ink-faint)", borderTop: "none", padding: "var(--s-4)", fontFamily: "var(--mono)", fontSize: 11, lineHeight: 1.6, overflowX: "auto", margin: 0, color: "var(--ink-soft)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                          {JSON.stringify(audioIntelligence, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}

                  {audioIntelligence?.transcript?.full_text && (
                    <div>
                      <button type="button" onClick={() => setAccordionOpen(accordionOpen === "transcript" ? null : "transcript")} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "1px solid var(--ink-faint)", padding: "var(--s-3) var(--s-4)", fontFamily: "var(--mono)", fontSize: "var(--t-small)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-soft)", cursor: "pointer" }}>
                        <span>Transcript</span>
                        <span style={{ color: "var(--red)" }}>{accordionOpen === "transcript" ? "▲" : "▼"}</span>
                      </button>
                      {accordionOpen === "transcript" && (
                        <div style={{ background: "var(--paper)", border: "1px solid var(--ink-faint)", borderTop: "none", padding: "var(--s-4)", fontFamily: "var(--mono)", fontSize: 13, lineHeight: 1.7, color: "var(--ink-soft)" }}>
                          {audioIntelligence.transcript.full_text}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="polaroid-tf02" style={{ transform: "rotate(1deg)", width: "100%", position: "relative" }}>
              <img src="/assets/tape-black-1.png" alt="" style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%) rotate(-3deg)", width: 160, opacity: 0.9, pointerEvents: "none", zIndex: 2 }} />
              <div style={{ width: "100%", aspectRatio: "3/4", background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "var(--s-3)" }}>
                <span style={{ color: "var(--red)", fontFamily: "var(--display-bebas)", fontSize: 32, letterSpacing: "0.05em" }}>LOCKED</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--ink-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>sign up to see it</span>
              </div>
              <p style={{ fontFamily: "var(--hand)", fontSize: 18, lineHeight: 1.3, textAlign: "center", margin: "10px 0 4px", color: "var(--ink)" }}>the one that got away</p>
            </div>
          </div>
        )}

      </main>

      {gate && <SignUpGate reason={gate} onDismiss={() => setGate(null)} />}

      {/* footer */}
      <footer>
        <div className="marquee" style={{ background: "#0044ff", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)", color: "#fff" }}>
          <div className="marquee-track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>
                <span>THE PORTRAIT YOU DESERVE. DRAWN WRONG. READ RIGHT.</span>
                <span style={{ color: "var(--red)" }}>✦</span>
                <span>DESCRIBE A MOMENT · GET A CURSED IMAGE</span>
                <span style={{ color: "var(--red)" }}>✦</span>
                <span>PASS THE PHONE · EVERYONE PLAYS</span>
                <span style={{ color: "var(--red)" }}>✦</span>
                <span>INTENTIONALLY BAD · SPECIFICALLY YOU</span>
                <span style={{ color: "var(--red)" }}>✦</span>
              </span>
            ))}
          </div>
        </div>
        <div className="pt-foot">
          <div>
            <div className="colofon">P<span className="art">ART</span>y Tr<span className="x">i</span>ck</div>
            <div className="ascii">{"the portrait you deserve"}</div>
          </div>
          <div>
            <h5>Product</h5>
            <a href="/play">Play</a>
            <a href="/how-it-works">How It Works</a>
            <a href="/pricing">Pricing</a>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <h5>Legal</h5>
            <a href="/privacy-policy">Privacy</a>
            <a href="/terms-of-service">Terms</a>
            <a href="/refunds">Refunds</a>
          </div>
          <div>
            <h5>Status</h5>
            <a href="#">All systems go</a>
          </div>
        </div>
        <div className="pt-foot-bar">
          <span>© 2026 P<span className="art">ART</span>y Trick</span>
          <span className="blink">●</span>
          <span>MADE IN NYC WITH ♥︎ & CHAOS</span>
        </div>
      </footer>
    </>
  );
}
