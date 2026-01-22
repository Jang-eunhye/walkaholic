import { WeatherData } from "./getWeatherData";

/**
 * 날씨 데이터를 기반으로 경고 메시지 배열을 반환합니다.
 * @param weatherData 날씨 데이터
 * @returns 경고 메시지 배열 (경고가 없으면 기본 메시지 포함)
 */
export const getWeatherWarnings = (weatherData: WeatherData): string[] => {
  const warnings: string[] = [];

  // 날씨 상태 경고
  const weatherMain = weatherData.weatherMain.toUpperCase();
  if (weatherMain === "THUNDERSTORM") {
    warnings.push("천둥번개가 있어요. 실외 활동을 피하세요.");
  } else if (weatherMain === "RAIN") {
    warnings.push("비가 내려요. 우산을 챙기세요.");
  } else if (weatherMain === "DRIZZLE") {
    warnings.push("이슬비가 내려요. 우산을 준비하세요.");
  } else if (weatherMain === "SNOW") {
    warnings.push("눈이 내려요. 미끄럼에 주의하세요.");
  } else if (weatherMain === "MIST" || weatherMain === "FOG") {
    warnings.push("안개가 껴있어요. 시야가 좋지 않으니 주의하세요.");
  }

  // 미세먼지 경고 (매우 나쁨: 4 이상)
  if (weatherData.aqi >= 4) {
    warnings.push(
      "미세먼지 농도가 매우 나쁨 수준이에요. 외출 시 마스크를 착용하세요."
    );
  }

  // 기온 경고
  if (weatherData.temp < 0) {
    warnings.push("기온이 매우 낮아요. 따뜻하게 입고 나가세요.");
  } else if (weatherData.temp > 30) {
    warnings.push("기온이 매우 높아요. 햇빛 차단과 수분 보충이 필요해요.");
  }

  // 바람 경고
  if (weatherData.windSpeed > 10) {
    warnings.push("바람이 매우 강해요. 보온에 유의하세요.");
  } else if (weatherData.windSpeed > 7) {
    warnings.push("바람이 강해요. 얇은 겉옷을 챙기세요.");
  }

  // 습도 경고
  if (weatherData.humidity > 80) {
    warnings.push("습도가 높아요. 불쾌지수가 높을 수 있어요.");
  }

  // 경고 메시지가 없으면 기본 메시지 표시
  if (warnings.length === 0) {
    warnings.push("현재 산책하기 좋은 날씨입니다!");
  }

  return warnings;
};

