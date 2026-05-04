"use client";

import { useState, useRef, useEffect } from "react";

type RecorderState = "idle" | "recording" | "done";

type Props = {
  onComplete: (blob: Blob, durationSeconds: number, liveTranscript: string) => void;
};

// Extend window for SpeechRecognition cross-browser
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}

export default function AudioRecorder({ onComplete }: Props) {
  const [recState, setRecState] = useState<RecorderState>("idle");
  const [transcript, setTranscript] = useState("");
  const [permissionError, setPermissionError] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      mediaRecorderRef.current?.stop();
    };
  }, []);

  async function startRecording() {
    setPermissionError(false);
    setTranscript("");

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setPermissionError(true);
      return;
    }

    // MediaRecorder for the audio blob
    const mimeType = MediaRecorder.isTypeSupported("audio/webm")
      ? "audio/webm"
      : "audio/mp4";
    const recorder = new MediaRecorder(stream, { mimeType });
    chunksRef.current = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    mediaRecorderRef.current = recorder;
    recorder.start(250);
    startTimeRef.current = Date.now();

    // SpeechRecognition for live transcript display only
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (SR) {
      const recognition = new SR();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      let final = "";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const t = event.results[i][0].transcript;
          if (event.results[i].isFinal) final += t + " ";
          else interim = t;
        }
        setTranscript((final + interim).trim());
      };
      recognition.start();
      recognitionRef.current = recognition;
    }

    setRecState("recording");
  }

  function stopRecording() {
    const duration = (Date.now() - startTimeRef.current) / 1000;

    recognitionRef.current?.stop();

    const recorder = mediaRecorderRef.current;
    if (!recorder) return;

    recorder.onstop = () => {
      const mimeType = recorder.mimeType || "audio/webm";
      const blob = new Blob(chunksRef.current, { type: mimeType });
      setRecState("done");
      onComplete(blob, duration, transcript);
    };
    recorder.stop();
    recorder.stream.getTracks().forEach((t) => t.stop());
  }

  function handleButtonClick() {
    if (recState === "idle") startRecording();
    else if (recState === "recording") stopRecording();
  }

  const isRecording = recState === "recording";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--s-6)" }}>
      {/* record button */}
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={recState === "done"}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
        style={{
          width: 88,
          height: 88,
          borderRadius: "50%",
          border: "3px solid var(--ink)",
          background: isRecording ? "var(--red)" : "var(--paper)",
          cursor: recState === "done" ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s, transform 0.1s",
          transform: isRecording ? "scale(1.05)" : "scale(1)",
          flexShrink: 0,
        }}
      >
        {isRecording ? (
          // stop square
          <span style={{ width: 24, height: 24, background: "#fff", borderRadius: 3, display: "block" }} />
        ) : (
          // mic dot
          <span style={{ width: 28, height: 28, background: "var(--red)", borderRadius: "50%", display: "block" }} />
        )}
      </button>

      {/* status label */}
      <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", letterSpacing: "0.08em", textTransform: "uppercase", color: isRecording ? "var(--red)" : "var(--ink-soft)", margin: 0 }}>
        {recState === "idle" && "Tap to record"}
        {recState === "recording" && <span className="blink">● Recording</span>}
        {recState === "done" && "Got it."}
      </p>

      {/* live transcript */}
      {transcript && (
        <p style={{
          fontFamily: "var(--mono)",
          fontSize: "var(--t-body)",
          lineHeight: 1.7,
          color: "var(--ink)",
          maxWidth: 440,
          textAlign: "center",
          margin: 0,
          minHeight: "3em",
        }}>
          {transcript}
        </p>
      )}

      {/* permission error */}
      {permissionError && (
        <p className="field-error" style={{ textAlign: "center", maxWidth: 360 }}>
          Microphone access denied. Check your browser settings and try again.
        </p>
      )}
    </div>
  );
}
