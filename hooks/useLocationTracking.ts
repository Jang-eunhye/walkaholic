import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { computeDistanceUpdate } from "../utils/location/computeDistanceUpdate";
import { STORAGE_KEY_BG_LAST_LOCATION, STORAGE_KEY_CURRENT_WALK } from "../stores/useWalkStore";
import { BACKGROUND_LOCATION_TASK_NAME } from "../tasks/backgroundLocationTask";

export function useLocationTracking(isWalking: boolean, initialDistance: number = 0) {
  const [totalDistance, setTotalDistance] = useState(initialDistance);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isAppActive, setIsAppActive] = useState(AppState.currentState === "active");

  const previousLocationRef = useRef<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      setIsAppActive(nextState === "active");
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
          const { latitude, longitude } = location.coords;
          const newLocation = { latitude, longitude };
          setCurrentLocation(newLocation);

          const result = computeDistanceUpdate(previousLocationRef.current, location.coords);
          if (result.kind === "set-prev") {
            previousLocationRef.current = result.nextPrev;
          }
          if (result.kind === "add-distance") {
            setTotalDistance((prev) => prev + result.distance);
            previousLocationRef.current = result.nextPrev;
          }
        }
      );
      
    } catch (error) {
      console.error("위치 추적 시작 실패:", error);
    }
  };

  const stopForegroundTracking = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.remove();
      subscriptionRef.current = null;
    }
    previousLocationRef.current = null;
  };

  const startBackgroundTracking = async () => {
    try {
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        BACKGROUND_LOCATION_TASK_NAME
      );
      if (hasStarted) return;
      
      await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 0,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: "산책 거리 측정 중",
          notificationBody: "백그라운드에서 산책 거리를 기록하고 있어요.",
        },
      });
    } catch (error) {
      console.error("백그라운드 위치 추적 시작 실패:", error);
    }
  };

  const stopBackgroundTracking = async () => {
    try {
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        BACKGROUND_LOCATION_TASK_NAME
      );
      if (!hasStarted) return;
      await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK_NAME);
    } catch (error) {
      console.error("백그라운드 위치 추적 중지 실패:", error);
    }
  };

  useEffect(() => {
    if (!isWalking) {
      stopForegroundTracking();
      setTotalDistance(0);
      setCurrentLocation(null);
      const cleanup = async () => {
        await stopBackgroundTracking();
        await AsyncStorage.removeItem(STORAGE_KEY_BG_LAST_LOCATION);
      };
      cleanup();
      return;
    }
  }, [isWalking]);

  useEffect(() => {
    if (!isWalking || !isAppActive) {
      stopForegroundTracking();
      return;
    }

    const run = async () => {
      try {
        await startTracking();
      } catch (error) {
        console.error("포그라운드 위치 추적 시작 실패:", error);
      }
    };

    run();
    return () => {
      stopForegroundTracking();
    };
  }, [isWalking, isAppActive]);

  useEffect(() => {
    if (!isWalking || isAppActive) {
      const stop = async () => {
        await stopBackgroundTracking();
      };
      stop();
      return;
    }

    const start = async () => {
      await startBackgroundTracking();
    };
    start();

    return () => {
      const stop = async () => {
        await stopBackgroundTracking();
      };
      stop();
    };
  }, [isWalking, isAppActive]);

  useEffect(() => {
    if (!isWalking || !isAppActive) {
      return;
    }

    const syncDistance = async () => {
      const currentData = await AsyncStorage.getItem(STORAGE_KEY_CURRENT_WALK);
      if (!currentData) return;
      try {
        const walkData = JSON.parse(currentData);
        if (typeof walkData.distance === "number") {
          setTotalDistance(walkData.distance);
        }
      } catch (error) {
        console.error("거리 동기화 실패:", error);
      }
    };

    syncDistance();
  }, [isWalking, isAppActive]);

  return {
    totalDistance,
    currentLocation,
  };
}