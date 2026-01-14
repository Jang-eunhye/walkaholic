/**
 * OpenWeatherMap API를 사용하여 날씨 정보와 미세먼지 정보를 가져옵니다.
 * @param latitude - 위도
 * @param longitude - 경도
 * @param apiKey - OpenWeatherMap API 키
 * @returns 날씨 정보 객체
 */

export interface WeatherData {
  // 기온 정보
  temp: number; // 현재 기온
  feelsLike: number; // 체감 기온

  // 습도
  humidity: number; // 습도 (%)

  // 바람
  windSpeed: number; // 풍속 (m/s)

  // 날씨 상태
  weatherIcon: string; // 날씨 아이콘 코드

  // 미세먼지 정보
  aqi: number; // 대기질 지수 (1=좋음, 2=보통, 3=나쁨, 4=매우나쁨, 5=최악)
}

export async function getWeatherData(
  latitude: number,
  longitude: number,
  apiKey: string
): Promise<WeatherData | null> {
  try {
    // 날씨 API와 미세먼지 API를 병렬로 호출
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=kr`;
    const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    const [weatherResponse, airPollutionResponse] = await Promise.all([
      fetch(weatherUrl),
      fetch(airPollutionUrl),
    ]);

    if (!weatherResponse.ok) {
      console.error(
        "날씨 API 호출 실패:",
        weatherResponse.status,
        weatherResponse.statusText
      );
      return null;
    }

    const weatherData = await weatherResponse.json();

    // 미세먼지 정보 (실패해도 날씨 정보는 반환)
    let aqi = 0;

    if (airPollutionResponse.ok) {
      const airPollutionData = await airPollutionResponse.json();
      if (airPollutionData.list && airPollutionData.list.length > 0) {
        const pollution = airPollutionData.list[0];
        aqi = pollution.main?.aqi || 0;
      }
    } else {
      console.warn("미세먼지 API 호출 실패 (날씨 정보는 정상)");
    }

    return {
      // 기온 정보
      temp: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,

      // 습도
      humidity: weatherData.main.humidity,

      // 바람
      windSpeed: weatherData.wind?.speed || 0,

      // 날씨 상태
      weatherIcon: weatherData.weather[0]?.icon || "",

      // 미세먼지 정보
      aqi,
    };
  } catch (error) {
    console.error("날씨 정보 가져오기 실패:", error);
    return null;
  }
}
