import { DeepgramClient } from "@deepgram/sdk";
import type { AudioIntelligence } from "./types";

type UtteranceItem = {
  speaker?: number;
  transcript?: string;
  start?: number;
  end?: number;
  confidence?: number;
};

type TranscriptResult = {
  results: {
    channels: { alternatives?: { transcript?: string; confidence?: number }[] }[];
    utterances?: UtteranceItem[];
  };
};

export async function transcribeAudio(
  audioBuffer: Buffer,
  _mimeType: string
): Promise<AudioIntelligence["transcript"]> {
  const deepgram = new DeepgramClient({ apiKey: process.env.DEEPGRAM_API_KEY! });

  const raw = await deepgram.listen.v1.media.transcribeFile(audioBuffer, {
    model: "nova-2",
    diarize: true,
    utterances: true,
    punctuate: true,
    detect_language: true,
  });

  const result = raw as unknown as TranscriptResult;
  const channel = result.results.channels[0]?.alternatives?.[0];
  const utterances = result.results.utterances ?? [];

  const fullText = channel?.transcript ?? "";
  const overallConfidence = channel?.confidence ?? 0;

  const segments = utterances.map((u: UtteranceItem) => ({
    speaker_id: `speaker_${u.speaker ?? 0}`,
    text: u.transcript ?? "",
    start: u.start ?? 0,
    end: u.end ?? 0,
    confidence: u.confidence ?? 0,
  }));

  if (segments.length === 0 && fullText) {
    segments.push({
      speaker_id: "speaker_0",
      text: fullText,
      start: 0,
      end: 0,
      confidence: overallConfidence,
    });
  }

  return { full_text: fullText, segments, overall_confidence: overallConfidence };
}
