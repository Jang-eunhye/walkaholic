import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { calculateDistance } from "../utils/location/calculateDistance";

export function useLocationTracking(isWalking: boolean) {
  const [totalDistance, setTotalDistance] = useState(0); // 총 거리 (미터)
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const previousLocationRef = useRef<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    // if (!isWalking) {
    //   // 산책 종료 시 추적 중지 및 초기화
    //   if (subscriptionRef.current) {
    //     subscriptionRef.current.remove();
    //     subscriptionRef.current = null;
    //   }
    //   previousLocationRef.current = null;
    //   setTotalDistance(0);
    //   setCurrentLocation(null);
    //   return;
    // }

    // 위치 추적 시작
    const startTracking = async () => {
      try {
        console.log("위치 추적 시작 시도...");
        // 위치 권한 요청
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
          console.warn("위치 권한이 거부되었습니다.");
          return;
        }
        console.log("위치 권한 허용됨, watchPositionAsync 시작...");

        // 위치 추적 시작 (3초마다 또는 5미터 이상 이동 시 업데이트)
        subscriptionRef.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 3000, // 3초마다 업데이트
            distanceInterval: 10, // 5미터 이상 이동 시 업데이트
          },
          (location) => {
            console.log("위치 업데이트 콜백 호출됨!", location.coords);
            
            const { latitude, longitude } = location.coords;
            const newLocation = { latitude, longitude };

            setCurrentLocation(newLocation);

            // 이전 위치가 있으면 거리 계산
            if (previousLocationRef.current) {
              const distance = calculateDistance(
                previousLocationRef.current.latitude,
                previousLocationRef.current.longitude,
                latitude,
                longitude
              );

              console.log("계산된 거리:", distance, "m");
              
              // 총 거리에 추가
              setTotalDistance((prev) => prev + distance);
            } else {
              console.log("첫 번째 위치 설정됨");
            }

            // 현재 위치를 이전 위치로 저장
            previousLocationRef.current = newLocation;
          }
        );
        
        console.log("watchPositionAsync 설정 완료");
      } catch (error) {
        console.error("위치 추적 시작 실패:", error);
      }
    };

    startTracking();

    return () => {
      // 정리
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
    };
  }, [isWalking]);

  return {
    totalDistance, // 미터 단위
    currentLocation,
  };
}
