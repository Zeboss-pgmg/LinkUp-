import { useState } from "react";
import { ArrowUpRight, Check, Repeat2, Coins, ShieldCheck } from "lucide-react";
import { categoryInfo } from "../data";
import { emptyListing, type Listing } from "../listings";
export default function ListingComposer({
  initial,
  onSave,
}: {
  initial: Listing | null;
  onSave: (l: Listing) => void;
}) {
  const [value, setValue] = useState<Listing>(
    initial || { ...emptyListing, id: Date.now() },
  );
  return (
    <form
      className="listing-composer"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          ...value,
          title: value.title.trim(),
          description: value.description.trim(),
          status: "published",
        });
      }}
    >
      <span className="eyebrow">TON SAVOIR A SA PLACE ICI</span>
      <h2>
        {initial ? "Modifier" : "Créer"} ton <em>annonce.</em>
      </h2>
      <div className="listing-kinds">
        <button
          type="button"
          className={value.kind === "offer" ? "selected" : ""}
          onClick={() => setValue({ ...value, kind: "offer" })}
        >
          Je propose un service
        </button>
        <button
          type="button"
          className={value.kind === "request" ? "selected" : ""}
          onClick={() => setValue({ ...value, kind: "request" })}
        >
          Je cherche de l’aide
        </button>
      </div>
      <label className="field-label">
        Titre du service
        <input
          required
          minLength={5}
          maxLength={70}
          placeholder="Ex. : initiation au montage vidéo"
          value={value.title}
          onChange={(e) => setValue({ ...value, title: e.target.value })}
        />
      </label>
      <label className="field-label">
        Catégorie
        <select
          value={value.category}
          onChange={(e) => {
            const c = categoryInfo.find((c) => c.name === e.target.value)!;
            setValue({ ...value, category: c.name, theme: c.color });
          }}
        >
          {categoryInfo.map((c) => (
            <option key={c.name}>{c.name}</option>
          ))}
        </select>
      </label>
      <label className="field-label">
        Ce qu’on fera ensemble
        <textarea
          required
          minLength={20}
          maxLength={500}
          rows={4}
          placeholder="Le service, ce qu’il faut prévoir, le niveau…"
          value={value.description}
          onChange={(e) => setValue({ ...value, description: e.target.value })}
        />
        <span className="field-count">{value.description.length}/500</span>
      </label>
      <div className="composer-fields">
        <label className="field-label">
          Durée prévue
          <select
            value={value.minutes}
            onChange={(e) => setValue({ ...value, minutes: +e.target.value })}
          >
            {[30, 60, 90, 120].map((n) => (
              <option key={n} value={n}>
                {n} minutes
              </option>
            ))}
          </select>
        </label>
        <label className="field-label">
          Points fictifs
          <select
            value={value.credits}
            onChange={(e) => setValue({ ...value, credits: +e.target.value })}
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} point{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </label>
      </div>
      <fieldset className="listing-exchange">
        <legend>Comment échanger ?</legend>
        {[
          { id: "either", name: "Au choix", icon: Check },
          { id: "direct", name: "Service contre service", icon: Repeat2 },
          { id: "coins", name: "Points fictifs", icon: Coins },
        ].map((o) => (
          <button
            type="button"
            key={o.id}
            className={value.exchange === o.id ? "selected" : ""}
            onClick={() =>
              setValue({ ...value, exchange: o.id as Listing["exchange"] })
            }
          >
            <o.icon size={16} />
            {o.name}
          </button>
        ))}
      </fieldset>
      <label className="field-label">
        Ambiance de l’annonce
        <div className="listing-colors">
          {[
            { id: "rose", name: "Rose poudré" },
            { id: "sage", name: "Jardin sauge" },
            { id: "peach", name: "Abricot doux" },
            { id: "lavender", name: "Brume lilas" },
          ].map((t) => (
            <button
              type="button"
              key={t.id}
              className={`theme-${t.id} ${value.theme === t.id ? "selected" : ""}`}
              onClick={() => setValue({ ...value, theme: t.id })}
              aria-label={t.name}
              aria-pressed={value.theme === t.id}
            >
              <span />
              {value.theme === t.id && <Check size={15} />}
            </button>
          ))}
        </div>
      </label>
      <div className="listing-note">
        <ShieldCheck size={17} />
        <span>
          Annonce de démonstration uniquement. Utilise des informations
          fictives. Les contacts se font dans la messagerie, sans coordonnées
          privées.
        </span>
      </div>
      <button
        type="submit"
        className="primary"
        disabled={
          value.title.trim().length < 5 || value.description.trim().length < 20
        }
      >
        {initial
          ? "Enregistrer les modifications"
          : "Publier mon annonce fictive"}
        <ArrowUpRight size={18} />
      </button>
    </form>
  );
}
