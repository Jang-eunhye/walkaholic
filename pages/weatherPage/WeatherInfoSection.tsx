import { View, Text, Image } from "react-native";
import { WeatherData } from "../../utils/weather/getWeatherData";
import { formatTemperature } from "../../utils/format/formatWeather";
import { getAqiText } from "../../utils/weather/aqi";

interface WeatherInfoSectionProps {
  weatherData: WeatherData | null;
}

export default function WeatherInfoSection({
  weatherData,
}: WeatherInfoSectionProps) {
  const weatherIconUrl = weatherData?.weatherIcon
    ? `https://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`
    : null;

  return (
    <View className="bg-blue-300 p-5 min-h-[300px] flex-row">
      {/* 기온(왼쪽, 크게) */}
      <View className="flex-1 bg-sky-100 rounded-xl p-5 items-center justify-center mr-2">
        {weatherIconUrl && (
          <Image source={{ uri: weatherIconUrl }} className="w-20 h-20 mb-2" />
        )}
        <Text className="text-base font-semibold text-gray-700 mb-1">기온</Text>
        <Text className="text-4xl font-extrabold text-gray-900">
          {weatherData?.temp ? formatTemperature(weatherData.temp) : "-°"}
        </Text>
        <Text className="text-sm font-medium text-gray-600 mt-1">
          체감{" "}
          {weatherData?.feelsLike
            ? formatTemperature(weatherData.feelsLike)
            : "-°"}
        </Text>
      </View>

      {/* 나머지 3개(오른쪽, 세로 3등분) */}
      <View className="flex-1">
        {/* 1. 바람 */}
        <View className="flex-1 bg-emerald-100 rounded-xl p-5 mb-2 justify-center">
          <Text className="text-sm font-semibold text-gray-700">바람</Text>
          <Text className="text-lg font-bold text-gray-900">
            {weatherData?.windSpeed ? `${weatherData.windSpeed} m/s` : "- m/s"}
          </Text>
        </View>

        {/* 2. 습도 */}
        <View className="flex-1 bg-violet-100 rounded-xl p-5 mb-2 justify-center">
          <Text className="text-sm font-semibold text-gray-700">습도</Text>
          <Text className="text-lg font-bold text-gray-900">
            {weatherData?.humidity ? `${weatherData.humidity}%` : "-%"}
          </Text>
        </View>

        {/* 3. 미세먼지 */}
        <View className="flex-1 bg-yellow-100 rounded-xl p-5 justify-center">
          <Text className="text-sm font-semibold text-gray-700">미세먼지</Text>
          <Text className="text-lg font-bold text-gray-900">
            {weatherData?.aqi ? getAqiText(weatherData.aqi) : "-"}
          </Text>
        </View>
      </View>
    </View>
  );
}
