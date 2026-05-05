import type { HumorFilter } from "./types";
import type { ScenePacket } from "../image/types";

export function intelligenceToScene(filter: HumorFilter): ScenePacket {
  const { visual_spec, core_insight, tone } = filter;

  return {
    sceneSummary: `${visual_spec.scene_summary} ${core_insight.read}.`,
    mainCharacter: {
      role: visual_spec.main_character.role,
      vibe: core_insight.dominant_trait,
      expression: visual_spec.main_character.expression,
      pose: visual_spec.main_character.pose,
      fashion: "whatever they had on",
    },
    socialContext: {
      location: visual_spec.setting,
      energy: tone.intensity,
      backgroundCharacters: visual_spec.key_elements.slice(1),
    },
    comicAngle: {
      joke: core_insight.read,
      metaphor: visual_spec.exaggeration.method,
      exaggerationTarget: visual_spec.exaggeration.target,
    },
    mustAvoid: ["photorealism", "cruelty", "protected attributes"],
  };
}
