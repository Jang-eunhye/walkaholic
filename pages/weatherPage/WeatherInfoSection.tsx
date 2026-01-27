import { View, Text, Image } from "react-native";
import { WeatherData } from "../../utils/weather/getWeatherData";
import { formatTemperature } from "../../utils/format/formatWeather";
import { getAqiText } from "../../utils/weather/aqi";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
    <View className="flex-row gap-3 mb-6">
      {/* 기온(왼쪽, 크게) */}
      <View className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-5 items-center justify-center">
        {weatherIconUrl && (
          <Image source={{ uri: weatherIconUrl }} className="w-16 h-16" />
        )}
        <Text className="text-5xl font-bold text-gray-900 mt-1">
          {weatherData?.temp ? formatTemperature(weatherData.temp) : "-°"}
        </Text>
        <Text className="text-base text-gray-500 mt-2">
          체감{" "}
          {weatherData?.feelsLike
            ? formatTemperature(weatherData.feelsLike)
            : "-°"}
        </Text>
      </View>

      {/* 나머지 3개(오른쪽, 세로 3등분) */}
      <View className="flex-1 gap-3">
        {/* 1. 바람 */}
        <View className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 flex-row items-center">
          <View className="w-9 h-9 bg-emerald-100 rounded-full items-center justify-center mr-3">
            <MaterialCommunityIcons name="weather-windy" size={18} color="#059669" />
          </View>
          <View>
            <Text className="text-sm text-gray-500">바람</Text>
            <Text className="text-xl font-semibold text-gray-900">
              {weatherData?.windSpeed ? `${weatherData.windSpeed} m/s` : "-"}
            </Text>
          </View>
        </View>

        {/* 2. 습도 */}
        <View className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 flex-row items-center">
          <View className="w-9 h-9 bg-blue-100 rounded-full items-center justify-center mr-3">
            <MaterialCommunityIcons name="water" size={18} color="#2563eb" />
          </View>
          <View>
            <Text className="text-sm text-gray-500">습도</Text>
            <Text className="text-xl font-semibold text-gray-900">
              {weatherData?.humidity ? `${weatherData.humidity}%` : "-"}
            </Text>
          </View>
        </View>

        {/* 3. 미세먼지 */}
        <View className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 flex-row items-center">
          <View className="w-9 h-9 bg-amber-100 rounded-full items-center justify-center mr-3">
            <MaterialCommunityIcons name="weather-dust" size={18} color="#d97706" />
          </View>
          <View>
            <Text className="text-sm text-gray-500">미세먼지</Text>
            <Text className="text-xl font-semibold text-gray-900">
              {weatherData?.aqi ? getAqiText(weatherData.aqi) : "-"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
