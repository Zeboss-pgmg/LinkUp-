import {
  Sparkles,
  Camera,
  Palette,
  Music2,
  Languages,
  Laptop,
  ChefHat,
  BriefcaseBusiness,
} from "lucide-react";
const icons: Record<string, typeof Sparkles> = {
  sparkles: Sparkles,
  camera: Camera,
  palette: Palette,
  music: Music2,
  languages: Languages,
  laptop: Laptop,
  chef: ChefHat,
  briefcase: BriefcaseBusiness,
};
export default function CategoryIcon({
  name,
  size = 24,
}: {
  name: string;
  size?: number;
}) {
  const Icon = icons[name] || Sparkles;
  return <Icon size={size} strokeWidth={1.5} />;
}
