import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Heart,
  MessageCircle,
  Repeat2,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Trouve ton prochain déclic.",
    text: "Glisse vers le haut ou le bas. Sur ordinateur, utilise la molette.",
    icon: ArrowDown,
  },
  {
    number: "02",
    title: "Passe de l’autre côté.",
    text: "À droite, les infos. À gauche, la photo. Essaie : la carte suit ton geste.",
    icon: Repeat2,
  },
  {
    number: "03",
    title: "Un intérêt. Un bonjour.",
    text: "Un intérêt ou un message, puis un échange à votre rythme.",
    icon: MessageCircle,
  },
];
export default function Welcome({ onEnter }: { onEnter: () => void }) {
  const [step, setStep] = useState(0);
  const current = steps[step];
  return (
    <section
      className={`welcome tutorial-step-${step}`}
      aria-label="Bienvenue et guide de SkillSwap"
    >
      <div className="welcome-copy">
        <span className="welcome-kicker">
          <span />
          LE SAVOIR SE PARTAGE.
        </span>
        <h1>
          Un talent.
          <br />
          Une <em>rencontre.</em>
        </h1>
        <p className="welcome-description">
          Tu sais faire quelque chose. Quelqu’un aimerait l’apprendre.
        </p>
        <div className="mini-guide" aria-label="Guide de prise en main">
          <div className="guide-topline">
            <span>Le mode d’emploi</span>
            <span>20 secondes suffisent</span>
          </div>
          <div className="guide-progress">
            {steps.map((s, i) => (
              <button
                key={s.number}
                className={i === step ? "current" : ""}
                onClick={() => setStep(i)}
                aria-label={`Étape ${i + 1} : ${s.title}`}
                aria-pressed={i === step}
              >
                <s.icon size={17} strokeWidth={1.7} />
                <span>{["Découvrir", "Retourner", "Échanger"][i]}</span>
                <small>{s.number}</small>
              </button>
            ))}
          </div>
          <div className="guide-content" key={step} aria-live="polite">
            <div className="guide-symbol">
              <current.icon size={21} strokeWidth={1.6} />
            </div>
            <div>
              <h2>{current.title}</h2>
              <p>{current.text}</p>
            </div>
          </div>
          <button
            className="guide-next"
            onClick={() => setStep((step + 1) % steps.length)}
            aria-label="Étape suivante du guide"
          >
            <ArrowRight size={18} />
          </button>
        </div>
        <button className="enter-app" onClick={onEnter}>
          Accéder à l’appli <ArrowUpRight size={20} />
        </button>
        <span className="welcome-footnote">
          Pas d’inscription. Juste de la curiosité.
        </span>
      </div>
      <div className="welcome-visual" aria-hidden="true">
        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />
        <span className="visual-caption">
          UN PETIT APERÇU DE CE QUI T’ATTEND
        </span>
        <div className="preview-card">
          <div className={`preview-rotator ${step === 1 ? "is-flipped" : ""}`}>
            <div className="preview-front">
              <img src="./images/nails.webp" alt="" />
              <div className="preview-shade" />
              <span className="preview-tag">Beauté & création</span>
              <div className="preview-copy">
                <span>À PARTAGER AVEC LÉA</span>
                <h2>
                  Au bout
                  <br />
                  des doigts.
                </h2>
                <div className="preview-person">
                  <img src="./images/lea.webp" alt="" />
                  <span>
                    Léa<small>Créative jusque dans les détails.</small>
                  </span>
                  <Heart size={20} />
                </div>
              </div>
            </div>
            <div className="preview-back">
              <img src="./images/lea.webp" alt="" />
              <span>LE PROFIL</span>
              <h2>Léa</h2>
              <p>
                Je partage mes astuces
                <br />
                de nail art.
              </p>
              <div>
                <Repeat2 size={17} />
                Un service contre un autre.
              </div>
            </div>
          </div>
          {step === 2 && (
            <span className="preview-like">
              <Heart size={23} fill="currentColor" />
            </span>
          )}
        </div>
        <div className="floating-note">
          <Repeat2 size={18} />
          <div>
            Ton temps a de la valeur.
            <span>Échange direct ou points fictifs.</span>
          </div>
        </div>
        <span className="visual-index">
          01 <span>/ une infinité de possibles</span>
        </span>
      </div>
      <div className="welcome-safety">
        <ShieldCheck size={14} />
        <span>Prototype scolaire · Profils fictifs · Aucun paiement réel</span>
      </div>
    </section>
  );
}
