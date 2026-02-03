import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { calculateDistance } from "../utils/location/calculateDistance";

// 테스트용 설정값
const MAX_DISTANCE_PER_UPDATE = 1000; // meters - GPS 튐 방지
const MAX_SPEED = 1000; // m/s - 걷기/뛰기 범위 초과 시 무시
const MAX_ACCURACY = 1000; // meters - 정확도가 나쁜 경우 무시
const MIN_DISTANCE = 0; // meters - GPS 오차 제거

// const MAX_DISTANCE_PER_UPDATE = 20; // meters - GPS 튐 방지
// const MAX_SPEED = 6; // m/s - 걷기/뛰기 범위 초과 시 무시
// const MAX_ACCURACY = 20; // meters - 정확도가 나쁜 경우 무시
// const MIN_DISTANCE = 3; // meters - GPS 오차 제거

export function useLocationTracking(isWalking: boolean, initialDistance: number = 0) {
  const [totalDistance, setTotalDistance] = useState(initialDistance);
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
    if (!isWalking) {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      previousLocationRef.current = null;
      setTotalDistance(0);
      setCurrentLocation(null);
      return;
    }

    const startTracking = async () => {
      try {
        
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
          console.warn("위치 권한이 거부되었습니다.");
          return;
        }

        const backgroundPermission = await Location.requestBackgroundPermissionsAsync();
        if (!backgroundPermission.granted) {
          console.warn("백그라운드 위치 권한이 거부되었습니다.");
        }

        subscriptionRef.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000,
            // distanceInterval: 5,
            distanceInterval: 0,
          },
          (location) => {
            const { latitude, longitude, accuracy, speed } = location.coords;
            
            // 1. 정확도 검증
            if (accuracy && accuracy > MAX_ACCURACY) {
              return; // 신뢰 불가 → previousLocation 업데이트 안 함
            }
        
            // 2. 속도 검증
            const currentSpeed = speed ?? 0;
            if (currentSpeed > MAX_SPEED) {
              return; // 신뢰 불가 → previousLocation 업데이트 안 함
            }
        
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
        
              // 3. GPS 튐 검증
              if (distance > MAX_DISTANCE_PER_UPDATE) {
                return; // 신뢰 불가 → previousLocation 업데이트 안 함
              }
        
              // 4. 최소 거리 필터링
              if (distance > MIN_DISTANCE) {
                setTotalDistance((prev) => prev + distance);
                // ✅ 거리 추가된 경우에만 previousLocation 업데이트
                previousLocationRef.current = newLocation;
              }
              // MIN_DISTANCE 미만이면 previousLocation 업데이트 안 함
            } else {
              // 첫 번째 위치는 항상 저장
              previousLocationRef.current = newLocation;
            }
          }
        );
        
      } catch (error) {
        console.error("위치 추적 시작 실패:", error);
      }
    };

    startTracking();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
    };
  }, [isWalking]);

  return {
    totalDistance,
    currentLocation,
  };
}