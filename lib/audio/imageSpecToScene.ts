import type { ImageSpec } from "./types";
import type { ScenePacket } from "../image/types";

export function imageSpecToScene(spec: ImageSpec, read: string): ScenePacket {
  return {
    sceneSummary: `${spec.character.action} in ${spec.setting}. ${spec.exaggeration.description}`,
    mainCharacter: {
      role: spec.character.role,
      vibe: spec.tone,
      expression: spec.character.expression,
      pose: spec.character.action,
      fashion: spec.props.join(", "),
    },
    socialContext: {
      location: spec.setting,
      energy: spec.tone === "absurd" ? "high" : "medium",
      backgroundCharacters: [],
    },
    comicAngle: {
      joke: read,
      metaphor: spec.exaggeration.description,
      exaggerationTarget: spec.exaggeration.target,
    },
    mustAvoid: ["photorealism", "cruelty", "protected attributes"],
  };
}
