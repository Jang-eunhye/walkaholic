import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { computeDistanceUpdate, StoredLocation } from "../utils/location/computeDistanceUpdate";
import { STORAGE_KEY_BG_LAST_LOCATION, STORAGE_KEY_CURRENT_WALK } from "../stores/useWalkStore";

export const BACKGROUND_LOCATION_TASK_NAME = "walk-location-task";

const addDistanceToCurrentWalk = async (distance: number) => {
  const currentData = await AsyncStorage.getItem(STORAGE_KEY_CURRENT_WALK);
  if (!currentData) return;
  
  const walkData = JSON.parse(currentData);
  walkData.distance = (walkData.distance ?? 0) + distance;
  await AsyncStorage.setItem(STORAGE_KEY_CURRENT_WALK, JSON.stringify(walkData));
};

TaskManager.defineTask(
  BACKGROUND_LOCATION_TASK_NAME,
  async (
    body: TaskManager.TaskManagerTaskBody<{ locations?: Location.LocationObject[] }>
  ) => {
  const { data, error } = body;
  if (error) {
    console.error("백그라운드 위치 작업 에러:", error);
    return;
  }

  const locations = (data as { locations?: Location.LocationObject[] })?.locations;
  if (!locations || locations.length === 0) {
    return;
  }

  const previousData = await AsyncStorage.getItem(STORAGE_KEY_BG_LAST_LOCATION);
  const previousLocation: StoredLocation | null = previousData ? JSON.parse(previousData) : null;
  const latest = locations[locations.length - 1];
  const result = computeDistanceUpdate(previousLocation, latest.coords);

  if (result.kind === "set-prev") {
    await AsyncStorage.setItem(STORAGE_KEY_BG_LAST_LOCATION, JSON.stringify(result.nextPrev));
  }
  if (result.kind === "add-distance") {
    await addDistanceToCurrentWalk(result.distance);
    await AsyncStorage.setItem(STORAGE_KEY_BG_LAST_LOCATION, JSON.stringify(result.nextPrev));
  }
  }
);

