import * as Location from "expo-location";

/**
 * 현재 위치의 좌표값을 가져옵니다.
 * 위치 권한 요청을 포함합니다.
 * @returns {Promise<{latitude: number, longitude: number} | null>} 좌표값 또는 null (권한 거부 시)
 */
export async function getCurrentLocation(): Promise<{
  latitude: number;
  longitude: number;
} | null> {
  try {
    // 1. 위치 권한 요청
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      console.warn("위치 권한이 거부되었습니다.");
      return null;
    }

    // 2. 현재 위치 좌표 가져오기 (정확도 5로 설정)
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    return { latitude, longitude };
  } catch (error) {
    console.error("위치 좌표 가져오기 실패:", error);
    return null;
  }
}
