// Legacy types — kept for backwards compatibility with inferScene.ts
export type Session = {
  id: string;
  createdAt: Date;
  audioEvidence: AudioEvidence;
  inference: HumanInference;
};

export type AudioEvidence = {
  transcript: string;
  durationSeconds: number;
  language?: string;
};

export type HumanInference = {
  name?: string;
  age?: string;
  occupation?: string;
  personality: string[];
  quirks: string[];
  rawQuotes: string[];
};

// Audio Intelligence — full structured output from the intake pipeline
export type AudioIntelligence = {
  transcript: {
    full_text: string;
    segments: {
      speaker_id: string;
      text: string;
      start: number;
      end: number;
      confidence: number;
    }[];
    overall_confidence: number;
  };

  speakers: {
    total_count: number;
    primary_speaker_id: string;
    profiles: {
      speaker_id: string;
      estimated_age_range: "child" | "young_adult" | "adult" | "older";
      perceived_gender: string;
      vocal_characteristics: {
        pitch: "low" | "mid" | "high";
        stability: "stable" | "variable";
        clarity: "clear" | "slurred" | "mumbled";
        energy: "low" | "medium" | "high";
      };
      accent: {
        detected: string;
        confidence: number;
        notes: string;
      };
      communication_style: {
        directness: "direct" | "indirect";
        assertiveness: "low" | "medium" | "high";
        tone: "neutral" | "performative" | "expressive" | "restrained";
      };
      emotional_state: {
        primary: string;
        secondary: string | null;
        intensity: "low" | "medium" | "high";
      };
      cognitive_state: {
        clarity: "clear" | "distracted" | "confused";
        intoxication_likelihood: "low" | "medium" | "high";
      };
    }[];
  };

  environment: {
    setting: string;
    background_noise: string[];
    density: "quiet" | "moderate" | "crowded";
    movement: "stationary" | "moving";
    time_context_guess: "day" | "night" | "unclear";
    confidence: number;
  };

  interaction: {
    type: string;
    intent: string;
    dynamics: {
      dominance_pattern: "single_speaker_dominant" | "balanced" | "unclear";
      interruptions: boolean;
      engagement_level: "low" | "medium" | "high";
    };
  };

  linguistics: {
    key_phrases: string[];
    vocabulary_level: "basic" | "moderate" | "advanced";
    filler_usage: "low" | "medium" | "high";
    notable_patterns: string[];
  };

  paralinguistics: {
    speech_rate: "slow" | "moderate" | "fast";
    rhythm: "smooth" | "choppy";
    emphasis_style: string;
    pauses: "minimal" | "moderate" | "frequent";
  };

  behavioral_analysis: {
    decision_style: string;
    social_positioning: string;
    notable_behaviors: string[];
  };

  archetypes: {
    primary: string;
    secondary: string | null;
    confidence: number;
  };

  meta: {
    signal_quality: number;
    inference_confidence: number;
    notes: string;
  };
};
