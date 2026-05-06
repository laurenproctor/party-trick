import { transcribeAudio } from "./transcribe";
import { extractIntelligence } from "./extractIntelligence";
import { filterHumor } from "./filterHumor";
import { generateImageSpecs } from "./generateImageSpecs";
import { pickTopTwoSpecs } from "./selectImageSpecs";
import { imageSpecToPrompt } from "./imageSpecToPrompt";
import { generateComparisonImages } from "../image/generateComparisonImages";
import type { AudioIntelligence, HumorFilter, ImageSpec } from "./types";
import type { ComparisonResult } from "../image/generateComparisonImages";
import type { ImagePrompt } from "./imageSpecToPrompt";

export type PipelineResult = {
  intelligence: AudioIntelligence;
  humorFilter: HumorFilter;
  imageSpecs: ImageSpec[];
  prompts: ImagePrompt[];
  comparison: ComparisonResult;
};

export async function runTextPipeline(moment: string): Promise<PipelineResult> {
  const transcript = { full_text: moment, segments: [], overall_confidence: 1 };
  const intelligence = await extractIntelligence(transcript, 0);
  const humorFilter = await filterHumor(intelligence);
  const imageSpecs = await generateImageSpecs(humorFilter);

  const [specA, specB] = pickTopTwoSpecs(imageSpecs);
  const prompts = await imageSpecToPrompt([specA, specB]);
  const comparison = await generateComparisonImages(prompts[0].prompt);

  return { intelligence, humorFilter, imageSpecs, prompts, comparison };
}

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
  const prompts = await imageSpecToPrompt([specA, specB]);

  // Same prompt → two models → comparison. No variation.
  const comparison = await generateComparisonImages(prompts[0].prompt);

  return { intelligence, humorFilter, imageSpecs, prompts, comparison };
}
