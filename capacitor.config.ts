import type { CapacitorConfig } from "@capacitor/cli";
const config: CapacitorConfig = {
  appId: "fr.zeboss.skillswap",
  appName: "SkillSwap",
  webDir: "dist",
  backgroundColor: "#f4f1e8",
  ios: {
    backgroundColor: "#f4f1e8",
    contentInset: "never",
    allowsLinkPreview: false,
  },
  android: { backgroundColor: "#f4f1e8", allowMixedContent: false },
};
export default config;
