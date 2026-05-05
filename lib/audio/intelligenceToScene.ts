import type { HumorFilter } from "./types";
import type { ScenePacket } from "../image/types";

export function intelligenceToScene(filter: HumorFilter): ScenePacket {
  const visual_spec = filter?.visual_spec ?? {} as HumorFilter["visual_spec"];
  const core_insight = filter?.core_insight ?? {} as HumorFilter["core_insight"];
  const tone = filter?.tone ?? {} as HumorFilter["tone"];
  const key_elements: string[] = visual_spec?.key_elements ?? [];
  const exaggeration = visual_spec?.exaggeration ?? {} as HumorFilter["visual_spec"]["exaggeration"];
  const main_character = visual_spec?.main_character ?? {} as HumorFilter["visual_spec"]["main_character"];

  return {
    sceneSummary: `${visual_spec?.scene_summary ?? ""} ${core_insight?.read ?? ""}`.trim() || "A person being exactly themselves",
    mainCharacter: {
      role: main_character?.role ?? "subject",
      vibe: core_insight?.dominant_trait ?? "unguarded",
      expression: main_character?.expression ?? "caught mid-thought",
      pose: main_character?.pose ?? "mid-action",
      fashion: "whatever they had on",
    },
    socialContext: {
      location: visual_spec?.setting ?? "the scene",
      energy: tone?.intensity ?? "medium",
      backgroundCharacters: key_elements.slice(1),
    },
    comicAngle: {
      joke: core_insight?.read ?? "being exactly who they are",
      metaphor: exaggeration?.method ?? "exaggeration",
      exaggerationTarget: exaggeration?.target ?? "their defining trait",
    },
    mustAvoid: ["photorealism", "cruelty", "protected attributes"],
  };
}
