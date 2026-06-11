// Konversi proba_default (0-1) -> credit score 300-850 + grade.
// Metode: scorecard log-odds + PDO (Siddiqi, 2006). Lihat SPEC_CreditScore_App.md.

const BASE_SCORE = 600;
const BASE_ODDS = 50;
const PDO = 20;

export function probaToCreditScore(proba: number): number {
  const p = Math.min(Math.max(proba, 1e-6), 1 - 1e-6);
  const odds = (1 - p) / p;
  const factor = PDO / Math.log(2);
  const offset = BASE_SCORE - factor * Math.log(BASE_ODDS);
  const score = offset + factor * Math.log(odds);
  return Math.round(Math.min(Math.max(score, 300), 850));
}

export type Grade = "A" | "B" | "C" | "D" | "E";

export type GradeInfo = {
  grade: Grade;
  label: string;
  interpretation: string;
  color: string;
};

export function scoreToGrade(score: number): GradeInfo {
  if (score >= 750) return { grade: "A", label: "Sangat Baik", interpretation: "Risiko sangat rendah", color: "#16a34a" };
  if (score >= 700) return { grade: "B", label: "Baik", interpretation: "Risiko rendah", color: "#65a30d" };
  if (score >= 650) return { grade: "C", label: "Cukup", interpretation: "Risiko sedang", color: "#d97706" };
  if (score >= 600) return { grade: "D", label: "Berisiko", interpretation: "Risiko tinggi, perlu ditinjau", color: "#ea580c" };
  return { grade: "E", label: "Sangat Berisiko", interpretation: "Risiko sangat tinggi", color: "#dc2626" };
}
