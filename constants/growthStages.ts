import type { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export const GROWTH_STAGES = [
  { icon: "seed" as IconName, label: "씨앗", minKm: 0, color: "#D2B48C" },
  { icon: "sprout" as IconName, label: "새싹", minKm: 1, color: "#C9E265" },
  { icon: "flower" as IconName, label: "꽃", minKm: 4, color: "#F4A9C2" },
  { icon: "tree" as IconName, label: "나무", minKm: 8, color: "#4CAF50" },
  { icon: "forest" as IconName, label: "숲", minKm: 12, color: "#1B5E20" },
] as const;


