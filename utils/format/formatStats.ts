/**
 * 시간 포맷팅 (초 -> 시간 분)
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  }
  return `${minutes}분`;
};

/**
 * 거리 포맷팅 (미터 -> km)
 */
export const formatDistance = (meters: number): string => {
  return `${(meters / 1000).toFixed(1)}km`;
};

/**
 * 거리 포맷팅 (미터 -> km)
 */
export const formatCalories = (calories: number): string => {
  return `${(calories)}kcal`;
};

/**
 * 숫자 포맷팅 (콤마 추가)
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

