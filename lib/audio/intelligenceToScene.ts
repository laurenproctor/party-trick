import type { AudioIntelligence } from "./types";
import type { ScenePacket } from "../image/types";

export function intelligenceToScene(intel: AudioIntelligence): ScenePacket {
  const primary =
    intel.speakers.profiles.find(
      (p) => p.speaker_id === intel.speakers.primary_speaker_id
    ) ?? intel.speakers.profiles[0];

  const backgroundCharacters =
    intel.speakers.total_count > 1
      ? [
          `${intel.speakers.total_count - 1} other person${intel.speakers.total_count > 2 ? "s" : ""}`,
        ]
      : [];

  return {
    sceneSummary: `${intel.interaction.intent}. ${intel.environment.setting}. ${intel.archetypes.primary}.`,
    mainCharacter: {
      role: intel.archetypes.primary,
      vibe: primary.emotional_state.primary,
      expression: `${primary.communication_style.tone}, ${primary.emotional_state.intensity} intensity`,
      pose: "mid-conversation",
      fashion: "whatever they had on",
    },
    socialContext: {
      location: intel.environment.setting,
      energy: intel.environment.density,
      backgroundCharacters,
    },
    comicAngle: {
      joke: intel.behavioral_analysis.social_positioning,
      metaphor: intel.archetypes.secondary ?? intel.archetypes.primary,
      exaggerationTarget:
        intel.behavioral_analysis.notable_behaviors[0] ?? intel.archetypes.primary,
    },
    mustAvoid: ["photorealism", "cruelty", "protected attributes"],
  };
}
