import { useRegisterSW } from "virtual:pwa-register/react";
import { RefreshCw, X } from "lucide-react";
export default function WebUpdates() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();
  if (!needRefresh) return null;
  return (
    <aside className="update-banner glass" role="status">
      <span>Une nouvelle version est disponible.</span>
      <button onClick={() => void updateServiceWorker(true)}>
        <RefreshCw size={14} />
        Mettre à jour
      </button>
      <button onClick={() => setNeedRefresh(false)} aria-label="Plus tard">
        <X size={16} />
      </button>
    </aside>
  );
}
