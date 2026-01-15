/**
 * 시작 시간부터 현재까지의 경과 시간을 초 단위로 계산
 * @param startTime 시작 시간 (밀리초 타임스탬프)
 * @returns 경과 시간 (초 단위), startTime이 null이면 0 반환
 */
export function calculateElapsedTime(startTime: number | null): number {
  if (!startTime) {
    return 0;
  }
  return Math.floor((Date.now() - startTime) / 1000); // 초 단위로 계산
}