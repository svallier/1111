// Scoring thresholds
const YIELD_THRESHOLDS = {
  A: 8, // >= 8%
  B: 6, // >= 6%
  C: 4, // >= 4%
  D: 0  // < 4%
};

const RENTAL_TENSION_THRESHOLDS = {
  A: 0.95, // >= 95% occupation rate
  B: 0.90, // >= 90%
  C: 0.85, // >= 85%
  D: 0    // < 85%
};

interface ScoringResult {
  score: 'A' | 'B' | 'C' | 'D';
  color: string;
  details: {
    yieldScore: 'A' | 'B' | 'C' | 'D';
    tensionScore: 'A' | 'B' | 'C' | 'D';
  };
}

function getScoreFromValue(value: number, thresholds: typeof YIELD_THRESHOLDS): 'A' | 'B' | 'C' | 'D' {
  if (value >= thresholds.A) return 'A';
  if (value >= thresholds.B) return 'B';
  if (value >= thresholds.C) return 'C';
  return 'D';
}

function getScoreColor(score: 'A' | 'B' | 'C' | 'D'): string {
  switch (score) {
    case 'A': return 'bg-green-500';
    case 'B': return 'bg-blue-500';
    case 'C': return 'bg-orange-500';
    case 'D': return 'bg-red-500';
  }
}

export function calculatePropertyScore(
  netYield: number,
  rentalTension: number,
  propertyType: string,
  city: string
): ScoringResult {
  // Calculate individual scores
  const yieldScore = getScoreFromValue(netYield, YIELD_THRESHOLDS);
  const tensionScore = getScoreFromValue(rentalTension, RENTAL_TENSION_THRESHOLDS);

  // Calculate final score (weighted average)
  const scores = { A: 4, B: 3, C: 2, D: 1 };
  const finalScore = (scores[yieldScore] * 0.6 + scores[tensionScore] * 0.4);

  let score: 'A' | 'B' | 'C' | 'D';
  if (finalScore >= 3.5) score = 'A';
  else if (finalScore >= 2.5) score = 'B';
  else if (finalScore >= 1.5) score = 'C';
  else score = 'D';

  return {
    score,
    color: getScoreColor(score),
    details: {
      yieldScore,
      tensionScore
    }
  };
}