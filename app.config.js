export default {
  expo: {
    name: "walkaholic",
    slug: "walkaholic",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    extra: {
      openweatherApiKey: process.env.OPENWEATHER_API_KEY,
      eas: {
        projectId: "2b338467-77a2-4db0-90ff-efb4546f5152",
      },
    },
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSLocationAlwaysAndWhenInUseUsageDescription: "위치 권한을 허용해주세요.",
        NSLocationAlwaysUsageDescription: "위치 권한을 허용해주세요.",
        NSLocationWhenInUseUsageDescription: "위치 권한을 허용해주세요.",
        UIBackgroundModes: ["location"],
      },
    },
    android: {
      package: "com.eunhye99.walkaholic", // 추가
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      permissions: [
        "ACTIVITY_RECOGNITION", // 걸음수 측정 권한
        "ACCESS_FINE_LOCATION", // 위치 권한
        "ACCESS_COARSE_LOCATION", // 위치 권한
        "ACCESS_BACKGROUND_LOCATION", // 백그라운드 위치 권한
        "FOREGROUND_SERVICE", // 포그라운드 서비스 권한
        "FOREGROUND_SERVICE_LOCATION", // 포그라운드 서비스 위치 권한
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-sensors",
        {
          motionPermission:
            "걸음수를 측정하기 위해 동작 및 피트니스 데이터에 접근합니다.",
        },
      ],
    ],
  },
};
