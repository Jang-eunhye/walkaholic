/**
 * 온도 포맷팅 (소수점 첫째자리 + 도 기호)
 * @param temp 온도 (섭씨)
 * @returns 포맷된 온도 문자열 (예: "25.5°")
 */
export const formatTemperature = (temp: number): string => {
  return `${temp.toFixed(1)}°`;
};

