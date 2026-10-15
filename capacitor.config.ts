import type { CapacitorConfig } from "@capacitor/cli";
const config: CapacitorConfig = {
  appId: "fr.zeboss.skillswap",
  appName: "SkillSwap",
  webDir: "dist",
  backgroundColor: "#f8f6f7",
  ios: {
    backgroundColor: "#f8f6f7",
    contentInset: "never",
    allowsLinkPreview: false,
  },
  android: { backgroundColor: "#f8f6f7", allowMixedContent: false },
};
export default config;
