import { calculateDistance } from "./calculateDistance";

export type StoredLocation = {
  latitude: number;
  longitude: number;
};

export type LocationCoords = {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
  speed?: number | null;
};

export type DistanceUpdateResult =
  | { kind: "ignore" }
  | { kind: "set-prev"; nextPrev: StoredLocation }
  | { kind: "add-distance"; nextPrev: StoredLocation; distance: number };

// 테스트용 설정값
const MAX_DISTANCE_PER_UPDATE = 1000; // meters - GPS 튐 방지
const MAX_SPEED = 1000; // m/s - 걷기/뛰기 범위 초과 시 무시
const MAX_ACCURACY = 1000; // meters - 정확도가 나쁜 경우 무시
const MIN_DISTANCE = 0; // meters - GPS 오차 제거

// const MAX_DISTANCE_PER_UPDATE = 20; // meters - GPS 튐 방지
// const MAX_SPEED = 6; // m/s - 걷기/뛰기 범위 초과 시 무시
// const MAX_ACCURACY = 20; // meters - 정확도가 나쁜 경우 무시
// const MIN_DISTANCE = 3; // meters - GPS 오차 제거

export const computeDistanceUpdate = (
  prev: StoredLocation | null,
  coords: LocationCoords
): DistanceUpdateResult => {
  const { latitude, longitude, accuracy, speed } = coords;

  if (accuracy && accuracy > MAX_ACCURACY) {
    return { kind: "ignore" };
  }

  const currentSpeed = speed ?? 0;
  if (currentSpeed > MAX_SPEED) {
    return { kind: "ignore" };
  }

  const nextPrev: StoredLocation = { latitude, longitude };

  if (!prev) {
    return { kind: "set-prev", nextPrev };
  }

  const distance = calculateDistance(
    prev.latitude,
    prev.longitude,
    latitude,
    longitude
  );

  if (distance > MAX_DISTANCE_PER_UPDATE) {
    return { kind: "ignore" };
  }

  if (distance <= MIN_DISTANCE) {
    return { kind: "ignore" };
  }

  return { kind: "add-distance", nextPrev, distance };
};

