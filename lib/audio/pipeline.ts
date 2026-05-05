import { transcribeAudio } from "./transcribe";
import { extractIntelligence } from "./extractIntelligence";
import { filterHumor } from "./filterHumor";
import { generateImageSpecs } from "./generateImageSpecs";
import { pickTopTwoSpecs } from "./selectImageSpecs";
import { imageSpecToScene } from "./imageSpecToScene";
import type { AudioIntelligence, HumorFilter, ImageSpec } from "./types";
import type { ScenePacket } from "../image/types";

export type PipelineResult = {
  intelligence: AudioIntelligence;
  humorFilter: HumorFilter;
  imageSpecs: ImageSpec[];
  scenes: [ScenePacket, ScenePacket];
};

export async function runAudioIntelligencePipeline(
  audioBuffer: Buffer,
  mimeType: string,
  durationSeconds: number
): Promise<PipelineResult> {
  const transcript = await transcribeAudio(audioBuffer, mimeType);
  const intelligence = await extractIntelligence(transcript, durationSeconds);
  const humorFilter = await filterHumor(intelligence);
  const imageSpecs = await generateImageSpecs(humorFilter);

  const [specA, specB] = pickTopTwoSpecs(imageSpecs);
  const sceneA = imageSpecToScene(specA, humorFilter.core_insight.read);
  const sceneB = imageSpecToScene(specB, humorFilter.core_insight.read);

  return { intelligence, humorFilter, imageSpecs, scenes: [sceneA, sceneB] };
}
