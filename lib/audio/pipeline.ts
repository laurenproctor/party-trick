import { transcribeAudio } from "./transcribe";
import { extractIntelligence } from "./extractIntelligence";
import { intelligenceToScene } from "./intelligenceToScene";
import type { AudioIntelligence } from "./types";
import type { ScenePacket } from "../image/types";

export type PipelineResult = {
  intelligence: AudioIntelligence;
  scenePacket: ScenePacket;
};

export async function runAudioIntelligencePipeline(
  audioBuffer: Buffer,
  mimeType: string,
  durationSeconds: number
): Promise<PipelineResult> {
  const transcript = await transcribeAudio(audioBuffer, mimeType);
  const intelligence = await extractIntelligence(transcript, durationSeconds);
  const scenePacket = intelligenceToScene(intelligence);
  return { intelligence, scenePacket };
}
