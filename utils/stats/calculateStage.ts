/**
 * 주간 총 거리(km)를 기준으로 stage 계산
 * @param totalDistance 주간 총 거리 (km)
 * @returns stage (1~5)
 */
export const calculateStage = (totalDistance: number): number => {
  if (totalDistance < 1000) return 0; // 씨앗
  if (totalDistance < 4000) return 1; // 새싹 
  if (totalDistance < 8000) return 2; // 꽃
  if (totalDistance < 12000) return 3; // 나무
  if (12000 <= totalDistance) return 4; // 숲
  return 4;
};