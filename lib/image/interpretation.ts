import type { ScenePacket, VariationMode } from "./types";

export function interpretScene(
  scene: ScenePacket,
  mode: VariationMode
): ScenePacket {
  switch (mode) {
    case "default_read":
      return {
        ...scene,
        mainCharacter: { ...scene.mainCharacter },
        socialContext: { ...scene.socialContext },
        comicAngle: { ...scene.comicAngle },
      };

    case "truer_read":
      return {
        ...scene,
        sceneSummary: `An honest, observational portrait: ${scene.sceneSummary}`,
        mainCharacter: {
          ...scene.mainCharacter,
          vibe: `quietly ${scene.mainCharacter.vibe}, stripped of performance`,
        },
        socialContext: { ...scene.socialContext },
        comicAngle: {
          ...scene.comicAngle,
          joke: `The unvarnished truth: ${scene.comicAngle.joke}`,
          exaggerationTarget: `the recognizable ordinariness of ${scene.comicAngle.exaggerationTarget}`,
        },
      };

    case "weirder_read":
      return {
        ...scene,
        sceneSummary: `${scene.sceneSummary}, but something is subtly, inexplicably off`,
        mainCharacter: {
          ...scene.mainCharacter,
          vibe: `${scene.mainCharacter.vibe} with an uncanny undercurrent`,
          expression: `${scene.mainCharacter.expression}, slightly too long`,
        },
        socialContext: {
          ...scene.socialContext,
          backgroundCharacters: scene.socialContext.backgroundCharacters.map(
            (c) => `${c} who doesn't quite fit`
          ),
        },
        comicAngle: {
          ...scene.comicAngle,
          joke: `${scene.comicAngle.joke} Something is wrong but no one acknowledges it.`,
          metaphor: `a fever dream version of ${scene.comicAngle.metaphor}`,
          exaggerationTarget: `the surreal wrongness underneath ${scene.comicAngle.exaggerationTarget}`,
        },
      };

    case "roast_harder":
      return {
        ...scene,
        sceneSummary: `A sharp social autopsy: ${scene.sceneSummary}`,
        mainCharacter: {
          ...scene.mainCharacter,
          vibe: `transparently ${scene.mainCharacter.vibe}, completely unaware`,
          expression: `${scene.mainCharacter.expression} — the expression of someone who has never questioned their own taste`,
        },
        socialContext: { ...scene.socialContext },
        comicAngle: {
          ...scene.comicAngle,
          joke: `${scene.comicAngle.joke} The tragedy is they think this is sophisticated.`,
          exaggerationTarget: `the specific, clinical precision of ${scene.comicAngle.exaggerationTarget}`,
        },
      };

    case "chaos":
      return {
        ...scene,
        sceneSummary: `MAXIMUM CHAOS VERSION: ${scene.sceneSummary} — everything is escalating simultaneously`,
        mainCharacter: {
          ...scene.mainCharacter,
          vibe: `EXTREMELY ${scene.mainCharacter.vibe}, dangerously so`,
          expression: `${scene.mainCharacter.expression} but also somehow on fire (metaphorically)`,
          pose: `${scene.mainCharacter.pose}, everything happening at once`,
        },
        socialContext: {
          ...scene.socialContext,
          energy: `${scene.socialContext.energy} times a thousand, barely contained`,
          backgroundCharacters: [
            ...scene.socialContext.backgroundCharacters,
            "several confused bystanders",
            "a man with a saxophone for no reason",
          ],
        },
        comicAngle: {
          joke: `${scene.comicAngle.joke} Also somehow there is a fire alarm going off.`,
          metaphor: `the complete collapse of ${scene.comicAngle.metaphor}`,
          exaggerationTarget: `absolutely everything about ${scene.comicAngle.exaggerationTarget}`,
        },
      };

    case "cinematic":
      return {
        ...scene,
        sceneSummary: `EPIC CINEMATIC VERSION: ${scene.sceneSummary} — reframed as the pivotal scene of a prestige drama`,
        mainCharacter: {
          ...scene.mainCharacter,
          vibe: `haunted, carrying the full weight of ${scene.mainCharacter.vibe}`,
          expression: `${scene.mainCharacter.expression} — the expression of someone at a crossroads`,
          pose: `${scene.mainCharacter.pose}, lit dramatically from the side`,
        },
        socialContext: {
          ...scene.socialContext,
          energy: `pregnant with tension, the kind of silence before something changes forever`,
        },
        comicAngle: {
          ...scene.comicAngle,
          joke: `${scene.comicAngle.joke} Shot in 4:3. Score by Hans Zimmer.`,
          metaphor: `the grand operatic tragedy of ${scene.comicAngle.metaphor}`,
          exaggerationTarget: `the monumental, civilization-defining stakes of ${scene.comicAngle.exaggerationTarget}`,
        },
      };
  }
}
