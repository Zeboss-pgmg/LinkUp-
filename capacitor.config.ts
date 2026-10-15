import type { CapacitorConfig } from "@capacitor/cli";
const config: CapacitorConfig = {
  appId: "fr.zeboss.skillswap",
  appName: "SkillSwap",
  webDir: "dist",
  backgroundColor: "#f6edf1",
  ios: {
    backgroundColor: "#f6edf1",
    contentInset: "never",
    allowsLinkPreview: false,
  },
  android: { backgroundColor: "#f6edf1", allowMixedContent: false },
};
export default config;
