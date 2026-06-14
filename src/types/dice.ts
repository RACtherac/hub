export interface AnalysisResult {
  totalRolls: number;
  fairnessScore: number;
  chiSquare: number;
  bootstrapPValue: number;
  rating: string;
  confidence: string;
}