/**
 * 걸음수를 기반으로 칼로리 계산
 * @param steps 걸음수
 * @returns 계산된 칼로리 (소수점 반올림)
 */
export const calculateCalories = (steps: number): number => {
  return Math.round(steps * 0.04);
};


