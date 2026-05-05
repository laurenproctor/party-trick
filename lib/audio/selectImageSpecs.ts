import type { ImageSpec } from "./types";

type ScoredSpec = {
  spec: ImageSpec;
  score: number;
};

function isValidSpec(spec: ImageSpec) {
  if (!spec.character.action) return false;
  if (!spec.props || spec.props.length < 2) return false;
  if (!spec.exaggeration?.description) return false;

  const vagueWords = ["feels", "seems", "kind of", "sort of"];
  if (vagueWords.some((w) => spec.exaggeration.description.includes(w))) return false;

  return true;
}

function scoreSpec(spec: ImageSpec) {
  let clarity = 0;
  let contrast = 0;
  let simplicity = 0;

  if (spec.character.action && spec.props.length >= 2) clarity = 1;

  if (spec.exaggeration.method === "contrast") contrast = 1;
  else if (spec.exaggeration.method === "repetition") contrast = 0.85;
  else if (spec.exaggeration.method === "scale") contrast = 0.75;
  else contrast = 0.65;

  if (spec.props.length <= 4) simplicity = 1;
  else simplicity = 0.6;

  return clarity + contrast + simplicity;
}

function diversityDistance(a: ImageSpec, b: ImageSpec) {
  let distance = 0;

  if (a.exaggeration.method !== b.exaggeration.method) distance += 1;
  if (a.character.action !== b.character.action) distance += 1;

  const propOverlap = a.props.filter((p) => b.props.includes(p)).length;
  if (propOverlap === 0) distance += 1;

  return distance;
}

export function pickTopTwoSpecs(specs: ImageSpec[]): ImageSpec[] {
  const valid = specs.filter(isValidSpec);

  const scored: ScoredSpec[] = valid
    .map((spec) => ({ spec, score: scoreSpec(spec) }))
    .sort((a, b) => b.score - a.score);

  if (scored.length <= 2) return scored.map((s) => s.spec);

  const first = scored[0].spec;

  let bestSecond = scored[1].spec;
  let bestDistance = 0;

  for (let i = 1; i < scored.length; i++) {
    const candidate = scored[i].spec;
    const distance = diversityDistance(first, candidate);

    if (distance > bestDistance) {
      bestDistance = distance;
      bestSecond = candidate;
    }
  }

  return [first, bestSecond];
}
