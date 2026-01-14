import * as Location from "expo-location";

/**
 * 좌표값을 주소 문자열로 변환합니다 (역지오코딩).
 * @param latitude - 위도
 * @param longitude - 경도
 * @returns {Promise<string>} 주소 문자열 (예: "인천광역시 서구 가정동")
 */
export async function getAddressFromCoordinates(
  latitude: number,
  longitude: number
): Promise<string> {
  try {
    // 좌표를 주소로 변환 (역지오코딩)
    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    // 주소 정보 추출 및 표시용 문자열 생성
    if (location.length > 0) {
      const region = location[0].region || ""; // 시/도
      const district = location[0].district || ""; // 구/군
      const city = location[0].city || ""; // 시/군/구
      const addressString = `${region} ${city} ${district}`.trim();
      return addressString || "위치를 찾을 수 없습니다.";
    } else {
      return "위치를 찾을 수 없습니다.";
    }
  } catch (error) {
    console.error("주소 변환 실패:", error);
    return "위치 정보를 가져올 수 없습니다.";
  }
}
