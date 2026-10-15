import { useState } from "react";
import {
  Search,
  X,
  ArrowUpRight,
  Plus,
  Bookmark,
  SlidersHorizontal,
  Repeat2,
} from "lucide-react";
import { categoryInfo, normalize, type Person } from "../data";
import CategoryIcon from "./CategoryIcon";
import TalentAvatar from "./TalentAvatar";
type Props = {
  people: Person[];
  category: string;
  onCategory: (name: string) => void;
  onSelect: (id: number) => void;
  onPublish: () => void;
  saved: number[];
  onSave: (id: number) => void;
};
export default function Explore({
  people,
  category,
  onCategory,
  onSelect,
  onPublish,
  saved,
  onSave,
}: Props) {
  const [query, setQuery] = useState("");
  const [onlySaved, setOnlySaved] = useState(false);
  const results = people.filter(
    (p) =>
      (category === "Tout explorer" || p.category === category) &&
      (!onlySaved || saved.includes(p.id)) &&
      normalize(`${p.skill} ${p.category} ${p.name} ${p.description}`).includes(
        normalize(query),
      ),
  );
  return (
    <section className="explore-page">
      <div className="page-heading">
        <h1>
          Ça s’apprend<span>.</span>
        </h1>
        <p>Choisis un domaine. Ou partage ce que tu sais faire.</p>
      </div>
      <div className="explore-search">
        <Search size={19} />
        <input
          type="search"
          placeholder="Guitare, anglais, montage…"
          aria-label="Rechercher une compétence"
          value={query}
          maxLength={100}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Effacer la recherche"
          >
            <X size={17} />
          </button>
        )}
      </div>
      <div className="explore-heading">
        <h2>Les domaines</h2>
        <button
          className={onlySaved ? "saved-filter active" : "saved-filter"}
          onClick={() => setOnlySaved(!onlySaved)}
          aria-pressed={onlySaved}
        >
          <Bookmark size={15} fill={onlySaved ? "currentColor" : "none"} />
          Mes favoris
        </button>
      </div>
      <div className="category-grid">
        {categoryInfo.map((c) => (
          <button
            key={c.name}
            className={`category-tile theme-${c.color} ${category === c.name ? "selected" : ""}`}
            onClick={() =>
              onCategory(category === c.name ? "Tout explorer" : c.name)
            }
            aria-label={c.name}
            aria-pressed={category === c.name}
          >
            <div className="category-tile-top">
              <ArrowUpRight size={15} />
            </div>
            <div className="category-symbol">
              <CategoryIcon name={c.icon} size={34} />
            </div>
            <strong>{c.short}</strong>
            <span className="category-count">
              {people.filter((p) => p.category === c.name).length} service
              {people.filter((p) => p.category === c.name).length > 1
                ? "s"
                : ""}{" "}
              à découvrir
            </span>
          </button>
        ))}
      </div>
      <div className="explore-heading results-heading">
        <h2>
          {category === "Tout explorer" ? "Les talents à découvrir" : category}
        </h2>
        <span>
          {results.length} résultat{results.length !== 1 ? "s" : ""}
        </span>
      </div>
      {(category !== "Tout explorer" || query || onlySaved) && (
        <button
          className="clear-filters"
          onClick={() => {
            onCategory("Tout explorer");
            setQuery("");
            setOnlySaved(false);
          }}
        >
          <X size={13} />
          Réinitialiser les filtres
        </button>
      )}
      <div className="talent-grid">
        {results.map((p) => (
          <article className={`talent-tile theme-${p.theme}`} key={p.id}>
            <button
              className="talent-open"
              onClick={() => onSelect(p.id)}
              aria-label={`Découvrir ${p.skill} avec ${p.name}`}
            >
              <div className="talent-cover">
                <img src={p.image} alt="" loading="lazy" />
                <span>{p.duration}</span>
              </div>
              <div className="talent-copy">
                <span>{p.category}</span>
                <h3>{p.skill}</h3>
                <div>
                  <TalentAvatar src={p.avatar} size={24} />
                  <span>{p.name}</span>
                  <ArrowUpRight size={15} />
                </div>
                <p className="talent-exchange">
                  <Repeat2 size={13} aria-hidden="true" />
                  <span>En échange : {p.looking}</span>
                </p>
              </div>
            </button>
            <button
              className="talent-save"
              onClick={() => onSave(p.id)}
              aria-label={`${saved.includes(p.id) ? "Retirer des favoris" : "Enregistrer"} ${p.skill}`}
              aria-pressed={saved.includes(p.id)}
            >
              <Bookmark
                size={16}
                fill={saved.includes(p.id) ? "currentColor" : "none"}
              />
            </button>
          </article>
        ))}
      </div>
      {!results.length && (
        <div className="empty glass">
          <SlidersHorizontal size={28} />
          <h3>On élargit la recherche ?</h3>
          <p>Essaie une autre compétence ou retire un filtre.</p>
          <button
            onClick={() => {
              onCategory("Tout explorer");
              setQuery("");
              setOnlySaved(false);
            }}
          >
            Tout explorer <ArrowUpRight size={15} />
          </button>
        </div>
      )}
      <button className="publish-invitation" onClick={onPublish}>
        <div className="publish-plus">
          <Plus size={25} />
        </div>
        <div>
          <strong>Et toi, qu’est-ce que tu partages ?</strong>
          <span>Propose un service ou demande un coup de main.</span>
        </div>
        <ArrowUpRight size={20} />
      </button>
      <p className="catalog-note">
        Catalogue de démonstration · Profils et services fictifs.
      </p>
    </section>
  );
}
