import type { ScenePacket, VariationMode } from "./types";
import { STYLES, type StyleName } from "./styles";

const VARIATION_STYLE_MAP: Record<VariationMode, StyleName> = {
  escalate: "bad_courtroom_sketch",
  reframe: "bar_napkin",
  absurdify: "full_chaos",
  localize: "bar_napkin",
};

export function buildPrompt(packet: ScenePacket, mode: VariationMode): string {
  const style = STYLES[VARIATION_STYLE_MAP[mode]];
  const { mainCharacter: c, socialContext: s, comicAngle: a } = packet;

  const avoid =
    packet.mustAvoid.length > 0
      ? `Avoid: ${packet.mustAvoid.join(", ")}.`
      : "";

  return [
    `Scene: ${packet.sceneSummary}.`,
    `Main character: a ${c.role} with a ${c.vibe} vibe, ${c.expression} expression, in a ${c.pose} pose, wearing ${c.fashion}.`,
    `Setting: ${s.location}, ${s.energy} energy. Background: ${s.backgroundCharacters.join(", ") || "nobody"}.`,
    `Comic angle: ${a.joke} The central metaphor is ${a.metaphor}. Exaggerate: ${a.exaggerationTarget}.`,
    `Style: ${style.descriptor}.`,
    `The image must be recognizable but exaggerated, intentionally imperfect, and not photorealistic.`,
    avoid,
  ]
    .filter(Boolean)
    .join(" ");
}
