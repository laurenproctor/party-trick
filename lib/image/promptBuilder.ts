import type { ScenePacket, VariationMode } from "./types";
import type { Style } from "./styles";

const VARIATION_DIRECTIVES: Record<VariationMode, string> = {
  default_read:
    "Render this faithfully as a comedic illustration. Exaggerate proportions and expression slightly but keep the scene immediately recognizable. Let the humor emerge from accurate observation.",

  truer_read:
    "Strip away performance. Render the moment as it actually is — no heightening, no spectacle. The comedy comes from how ordinary and human this is. Understated. Observational.",

  weirder_read:
    "Something is slightly, inexplicably wrong — not absurd, just off. A detail that doesn't belong. An expression held a beat too long. The scene is correct but unsettling in a way no one acknowledges.",

  roast_harder:
    "Render this as a precise social autopsy. Every status signal, every contradiction, every gap between self-image and reality should be visible and legible. Ruthless specificity. No cruelty toward appearance — only toward choices.",

  chaos:
    "Maximum escalation. Every element should be exaggerated to its logical extreme simultaneously. Contradictions are fine. Visual noise is the point. The scene should feel like it is actively falling apart.",

  cinematic:
    "Reframe this as the pivotal scene in a prestige drama. Epic scale applied to a mundane moment. Dramatic side lighting. The subject carries the full weight of their decision. The stakes feel civilization-defining. Played completely straight.",
};

export function buildPrompt(
  packet: ScenePacket,
  style: Style,
  mode: VariationMode
): string {
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
    `Interpretation directive: ${VARIATION_DIRECTIVES[mode]}`,
    `Style: ${style.descriptor}.`,
    avoid,
  ]
    .filter(Boolean)
    .join(" ");
}
