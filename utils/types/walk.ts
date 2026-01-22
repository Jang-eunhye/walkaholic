export interface WalkHistoryItem {
  startTime: number;
  duration: number;
  distance: number;
  steps: number;
  calories: number;
}

export interface MonthlyStats {
  count: number;
  totalDuration: number; // 초 단위
  totalDistance: number; // 미터 단위
  totalSteps: number;
  totalCalories: number;
}

