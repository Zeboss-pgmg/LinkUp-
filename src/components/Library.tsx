import { useState } from "react";
import {
  Bookmark,
  Heart,
  Plus,
  ArrowUpRight,
  Pencil,
  Archive,
  RotateCcw,
} from "lucide-react";
import { categoryInfo, type Person } from "../data";
import { type Listing } from "../listings";
export default function Library({
  listings,
  saved,
  interests,
  onPublish,
  onEdit,
  onArchive,
  onSimulate,
  onSelect,
  onUnsave,
}: {
  listings: Listing[];
  saved: Person[];
  interests: Person[];
  onPublish: () => void;
  onEdit: (l: Listing) => void;
  onArchive: (id: number) => void;
  onSimulate: (l: Listing) => void;
  onSelect: (id: number) => void;
  onUnsave: (id: number) => void;
}) {
  const [view, setView] = useState("listings");
  const current = view === "saved" ? saved : interests;
  return (
    <section className="profile-library glass">
      <div className="library-tabs" aria-label="Ma bibliothèque">
        {[
          { id: "listings", name: "Mes annonces", n: listings.length },
          { id: "saved", name: "Favoris", n: saved.length },
          { id: "interests", name: "Intérêts", n: interests.length },
        ].map((t) => (
          <button
            key={t.id}
            aria-pressed={view === t.id}
            className={view === t.id ? "active" : ""}
            onClick={() => setView(t.id)}
          >
            {t.name}
            <span>{t.n}</span>
          </button>
        ))}
      </div>
      {view === "listings" ? (
        <>
          <button className="new-listing" onClick={onPublish}>
            <Plus size={19} />
            Créer une annonce
            <ArrowUpRight size={17} />
          </button>
          {!listings.length && (
            <p className="library-empty">
              Ton premier service commence ici. Une compétence à partager ou un
              coup de main à demander ?
            </p>
          )}
          {listings.map((l) => (
            <article
              className={`own-listing ${l.status === "archived" ? "archived" : ""}`}
              key={l.id}
            >
              <img
                src={categoryInfo.find((c) => c.name === l.category)?.cover}
                alt=""
              />
              <div>
                <span>
                  {l.status === "archived"
                    ? "Archivée"
                    : l.kind === "offer"
                      ? "Je propose"
                      : "Je recherche"}{" "}
                  · Démo
                </span>
                <h3>{l.title}</h3>
                <p>
                  {l.category} · {l.minutes} min
                </p>
                <div className="listing-controls">
                  {l.kind === "offer" && l.status === "published" && (
                    <button
                      onClick={() => onSimulate(l)}
                      aria-label={`Tester une demande pour ${l.title}`}
                    >
                      <Plus size={12} />
                      Tester une demande
                    </button>
                  )}
                  <button
                    onClick={() => onEdit(l)}
                    aria-label={`Modifier ${l.title}`}
                  >
                    <Pencil size={12} />
                    Modifier
                  </button>
                  <button
                    onClick={() => onArchive(l.id)}
                    aria-label={`${l.status === "archived" ? "Réactiver" : "Archiver"} ${l.title}`}
                  >
                    {l.status === "archived" ? (
                      <RotateCcw size={12} />
                    ) : (
                      <Archive size={12} />
                    )}
                    {l.status === "archived" ? "Réactiver" : "Archiver"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </>
      ) : (
        <>
          {!current.length ? (
            <div className="library-empty">
              {view === "saved" ? <Bookmark size={24} /> : <Heart size={24} />}
              <p>
                {view === "saved"
                  ? "Enregistre les profils qui te plaisent pour les retrouver ici."
                  : "Tes signes d’intérêt envoyés apparaîtront ici, en attente d’acceptation."}
              </p>
            </div>
          ) : (
            current.map((p) => (
              <div className="saved-row" key={p.id}>
                <button onClick={() => onSelect(p.id)}>
                  <img src={p.avatar} alt="" />
                  <div>
                    <strong>{p.name}</strong>
                    <span>{p.skill}</span>
                    {view === "interests" && (
                      <small>Demande envoyée · en attente</small>
                    )}
                  </div>
                  <ArrowUpRight size={16} />
                </button>
                {view === "saved" && (
                  <button
                    onClick={() => onUnsave(p.id)}
                    aria-label={`Retirer ${p.skill} des favoris`}
                  >
                    <Bookmark size={17} fill="currentColor" />
                  </button>
                )}
              </div>
            ))
          )}
        </>
      )}
    </section>
  );
}
