import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentLocation } from "./getCurrentLocation";
import { getAddressFromCoordinates } from "./getAddressFromCoordinates";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type LocationCache = {
  coordinates: Coordinates;
  address: string;
  fetchedAt: number;
};

const LOCATION_CACHE_KEY = "@walkaholic:locationCache";
const LOCATION_CACHE_TTL_MS = 15 * 60 * 1000;

export async function getCachedLocation(): Promise<LocationCache | null> {
  try {
    const cached = await AsyncStorage.getItem(LOCATION_CACHE_KEY);
    if (cached) {
      const parsed: LocationCache = JSON.parse(cached);
      const isFresh = Date.now() - parsed.fetchedAt < LOCATION_CACHE_TTL_MS;
      if (
        isFresh &&
        parsed.coordinates &&
        typeof parsed.coordinates.latitude === "number" &&
        typeof parsed.coordinates.longitude === "number" &&
        typeof parsed.address === "string"
      ) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("위치 캐시 읽기 실패:", error);
  }

  const coordinates = await getCurrentLocation();
  if (!coordinates) {
    return null;
  }

  const address = await getAddressFromCoordinates(
    coordinates.latitude,
    coordinates.longitude
  );

  const payload: LocationCache = {
    coordinates,
    address,
    fetchedAt: Date.now(),
  };

  try {
    await AsyncStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("위치 캐시 저장 실패:", error);
  }

  return payload;
}

