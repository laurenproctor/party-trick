import { transcribeAudio } from "./transcribe";
import { extractIntelligence } from "./extractIntelligence";
import { filterHumor } from "./filterHumor";
import { intelligenceToScene } from "./intelligenceToScene";
import type { AudioIntelligence, HumorFilter } from "./types";
import type { ScenePacket } from "../image/types";

export type PipelineResult = {
  intelligence: AudioIntelligence;
  humorFilter: HumorFilter;
  scenePacket: ScenePacket;
};

export async function runAudioIntelligencePipeline(
  audioBuffer: Buffer,
  mimeType: string,
  durationSeconds: number
): Promise<PipelineResult> {
  const transcript = await transcribeAudio(audioBuffer, mimeType);
  const intelligence = await extractIntelligence(transcript, durationSeconds);
  const humorFilter = await filterHumor(intelligence);
  const scenePacket = intelligenceToScene(humorFilter);
  return { intelligence, humorFilter, scenePacket };
}
