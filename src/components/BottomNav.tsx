import { Compass, Search, MessageCircle, UserRound } from "lucide-react";
const tabs = [
  { id: "discover", label: "Découverte", icon: Compass },
  { id: "explore", label: "Explorer", icon: Search },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "profile", label: "Profil", icon: UserRound },
];
export default function BottomNav({
  tab,
  onChange,
  inert,
}: {
  tab: string;
  onChange: (tab: string) => void;
  inert: boolean;
}) {
  const index = tabs.findIndex((t) => t.id === tab);
  return (
    <nav
      className="bottom-nav glass four-tabs"
      aria-label="Navigation principale"
      inert={inert}
      aria-hidden={inert}
    >
      <span
        className="nav-selection"
        aria-hidden="true"
        style={{
          transform: `translateX(${Math.max(0, index) * 100}%) translateX(${Math.max(0, index) * 3}px)`,
        }}
      />
      {tabs.map((t) => (
        <button
          key={t.id}
          className={tab === t.id ? "active" : ""}
          aria-current={tab === t.id ? "page" : undefined}
          onClick={() => onChange(t.id)}
        >
          <t.icon size={21} strokeWidth={tab === t.id ? 1.9 : 1.5} />
          <span>{t.label}</span>
          {tab === t.id && <i />}
        </button>
      ))}
    </nav>
  );
}
