import "dotenv/config";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const LOCALHOST = process.env.LOCALHOST;

export default {
  name: "vambora",
  slug: "vambora",
  version: "1.0.3",
  orientation: "portrait",
  icon: "./src/assets/logoLight.png",
  assetBundlePatterns: ["**/*"],
  splash: {
    image: "./src/assets/logoLight.png",
    backgroundColor: "#8257E5",
  },
  extra: {
    GOOGLE_MAPS_API_KEY: GOOGLE_MAPS_API_KEY,
    LOCALHOST: LOCALHOST,
    eas: {
      projectId: "e149013d-137b-4d16-959e-17f92b902ef9",
      GOOGLE_MAPS_API_KEY: GOOGLE_MAPS_API_KEY,
      LOCALHOST: LOCALHOST,
    },
  },
  android: {
    package: "com.vamboramds.vambora",
    versionCode: 4,
    adaptiveIcon: {
      foregroundImage: "./src/assets/logoLight.png",
      backgroundColor: "#8257E5",
    },
  },
};
