/**
 * AQI 등급 텍스트 매핑 (1~5 사용)
 */
export const AQI_LABELS = ["", "좋음", "보통", "나쁨", "매우 나쁨", "최악"];

/**
 * AQI 등급 텍스트 변환 함수
 * @param aqi AQI 값 (1~5)
 * @returns AQI 등급 텍스트
 */
export const getAqiText = (aqi: number): string => {
  return AQI_LABELS[aqi] || "-";
};

