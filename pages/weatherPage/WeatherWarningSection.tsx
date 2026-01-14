import { View, Text } from "react-native";

const warningDummy = [
  { id: "w1", text: "미세먼지 농도가 높아요. 마스크를 챙기세요." },
  { id: "w2", text: "바람이 강해요. 보온에 유의하세요." },
  { id: "w3", text: "강수 확률이 있어요. 우산을 준비하세요." },
  { id: "w4", text: "기온이 낮아요. 장갑/모자를 추천해요." },
  { id: "w5", text: "미세먼지 농도가 높아요. 마스크를 챙기세요." },
  { id: "w6", text: "바람이 강해요. 보온에 유의하세요." },
  { id: "w7", text: "강수 확률이 있어요. 우산을 준비하세요." },
  { id: "w8", text: "기온이 낮아요. 장갑/모자를 추천해요." },
];

const warningBg = ["bg-rose-100", "bg-amber-100", "bg-lime-100", "bg-cyan-100"];

export default function WeatherWarningSection() {
  return (
    <View className="bg-green-300 py-4">
      <View className="gap-3">
        {warningDummy.map((item, idx) => (
          <View
            key={item.id}
            className={`${
              warningBg[idx % warningBg.length]
            } rounded-xl p-4 border border-gray-200`}
          >
            <Text className="text-base font-semibold text-gray-900">
              {item.text}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
