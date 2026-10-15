import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  Sparkles,
  Compass,
  MessageCircle,
  UserRound,
  ArrowUpRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Heart,
  X,
  Plus,
  CalendarDays,
  Clock3,
  Check,
  Send,
  SlidersHorizontal,
  ShieldCheck,
  Flag,
  Ban,
  ChevronLeft,
  ChevronRight,
  Repeat2,
  Coins,
  Palette,
  MapPin,
  Bookmark,
  Search,
  Smartphone,
  Download,
} from "lucide-react";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/bricolage-grotesque/latin-600.css";
import "@fontsource/bricolage-grotesque/latin-700.css";
import Welcome from "./Welcome";
import { Capacitor } from "@capacitor/core";
import WebUpdates from "./components/WebUpdates";
import "./style.css";
import "./experience.css";

import {
  people,
  categoryNames as categories,
  categoryInfo,
  demoMembers,
  type Person,
} from "./data";
import Explore from "./components/Explore";
import ListingComposer from "./components/ListingComposer";
import TalentAvatar from "./components/TalentAvatar";
import Library from "./components/Library";
import BottomNav from "./components/BottomNav";
import { type Listing } from "./listings";
import "./complete.css";
import "./identity.css";
type Msg = { text: string; mine: boolean };
type Booking = {
  id: number;
  person: number;
  day: number;
  mode: string;
  completed: boolean;
  role?: "provider" | "receiver";
  credits?: number;
  title?: string;
};
function read<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}
function App() {
  const [welcome, setWelcome] = useState<boolean>(
    () =>
      new URLSearchParams(window.location.search).get("guide") === "1" ||
      !read("ss-onboarded-v2", false),
  );
  function enterApp() {
    setWelcome(false);
    const url = new URL(window.location.href);
    if (url.searchParams.has("guide")) {
      url.searchParams.delete("guide");
      window.history.replaceState(
        null,
        "",
        url.pathname + url.search + url.hash,
      );
    }
    try {
      localStorage.setItem("ss-onboarded-v2", "true");
    } catch {
      /* Session remains usable. */
    }
    window.scrollTo(0, 0);
  }

  const [keyboardOpen, setKeyboardOpen] = useState(false);
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const resize = () => {
      if (viewport.scale !== 1) return;
      document.documentElement.style.setProperty(
        "--app-height",
        `${viewport.height}px`,
      );
      setKeyboardOpen(window.innerHeight - viewport.height > 150);
    };
    resize();
    viewport.addEventListener("resize", resize);
    return () => viewport.removeEventListener("resize", resize);
  }, []);
  const [tab, setTab] = useState("discover");
  const [category, setCategory] = useState("Tout explorer");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [drag, setDrag] = useState(0);
  const [verticalDrag, setVerticalDrag] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const transition = useRef(false);
  const mainElement = useRef<HTMLElement>(null);
  const wheelGesture = useRef({ delta: 0, lastEvent: 0, lastStep: 0, locked: false });
  const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const direction = useRef<"turn" | "next" | "scroll" | null>(null);
  const cardElement = useRef<HTMLDivElement>(null);
  const backElement = useRef<HTMLElement>(null);
  const restoreCardFocus = useRef(false);
  const chatScroll = useRef<HTMLDivElement>(null);
  const composerInput = useRef<HTMLInputElement>(null);
  useEffect(
    () => () => {
      if (nextTimer.current) clearTimeout(nextTimer.current);
    },
    [],
  );
  const [likes, setLikes] = useState<number[]>(() => read("ss-likes", []));
  const [saved, setSaved] = useState<number[]>(() => read("ss-saved", []));
  const [listings, setListings] = useState<Listing[]>(() =>
    read("ss-listings", []),
  );
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [skillComposer, setSkillComposer] = useState(false);
  const [postDraft, setPostDraft] = useState<Listing | null>(null);
  const [skillDraft, setSkillDraft] = useState<Listing | null>(null);
  const [incomingListing, setIncomingListing] = useState<Listing | null>(null);
  const completedOnce = useRef(new Set<number>());
  const [blocked, setBlocked] = useState<number[]>(() =>
    read("ss-blocked", []),
  );
  const [messages, setMessages] = useState<Record<number, Msg[]>>(() =>
    read("ss-messages", {}),
  );
  const [bookings, setBookings] = useState<Booking[]>(() =>
    read("ss-bookings", []),
  );
  const [balance, setBalance] = useState(() => read("ss-balance", 4));
  const [ownTheme, setOwnTheme] = useState(() => read("ss-theme", "lavender"));
  const [chat, setChat] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  useEffect(() => {
    const node = chatScroll.current;
    if (node)
      node.scrollTo({
        top: node.scrollHeight,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }, [messages, chat, tab]);

  const [modal, setModal] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [day, setDay] = useState(16);
  const [mode, setMode] = useState("direct");
  const [month, setMonth] = useState(0);
  const [profile, setProfile] = useState(() =>
    read("ss-profile", {
      name: "Gabriel",
      avatar: "./images/noah.webp",
      bio: "Curieux de tout. Toujours partant pour apprendre.",
      skills: "Montage vidéo, Informatique, Créativité",
      looking: "Photographie, guitare et un peu de tout le reste.",
    }),
  );
  const [profileDraft, setProfileDraft] = useState(profile);
  useEffect(() => {
    if (!modal) return;
    const previous = document.activeElement as HTMLElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trap = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModal(null);
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".modal button,.modal input,.modal select,.modal textarea",
        ),
      ).filter(
        (x) => !x.hasAttribute("disabled") && x.getClientRects().length > 0,
      );
      if (!items.length) return;
      const first = items[0],
        last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", trap);
      previous?.focus();
    };
  }, [modal]);
  const start = useRef({ x: 0, y: 0, scrollTop: 0 });
  const moved = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filtered = people.filter(
    (p) =>
      !blocked.includes(p.id) &&
      (category === "Tout explorer" || p.category === category),
  );
  const person = filtered[index % Math.max(filtered.length, 1)];
  useEffect(() => {
    if (restoreCardFocus.current) {
      cardElement.current?.focus({ preventScroll: true });
      restoreCardFocus.current = false;
    }
  }, [person?.id]);
  const chatting = people.find((p) => p.id === chat);
  const theme = tab === "discover" ? person?.theme || "rose" : ownTheme;
  const persist = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      notify("Le stockage local est indisponible. La démo reste utilisable.");
    }
  };
  function notify(s: string) {
    setToast(s);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 3500);
  }
  function publish() {
    setSkillComposer(false);
    setEditingListing(null);
    setTab("create");
  }
  function saveListing(listing: Listing) {
    const value = listings.some((l) => l.id === listing.id)
      ? listings.map((l) => (l.id === listing.id ? listing : l))
      : [listing, ...listings];
    setListings(value);
    persist("ss-listings", value);
    if (tab === "create") {
      if (skillComposer) setSkillDraft(null);
      else setPostDraft(null);
    }
    setModal(null);
    setTab("profile");
    notify(
      skillComposer
        ? "Compétence ajoutée à ton profil"
        : "Annonce fictive enregistrée dans ton profil",
    );
  }
  function acceptDemoRequest() {
    if (!incomingListing) return;
    const member = people.find((p) => !blocked.includes(p.id));
    if (!member) {
      notify("Aucun profil disponible dans cette démo");
      return;
    }
    const value = [
      ...bookings,
      {
        id: Date.now(),
        person: member.id,
        day: 16,
        mode: incomingListing.exchange === "direct" ? "direct" : "coins",
        completed: false,
        role: "provider" as const,
        credits: incomingListing.credits,
        title: incomingListing.title,
      },
    ];
    setBookings(value);
    persist("ss-bookings", value);
    setModal("calendar");
    notify(
      "Demande fictive acceptée · confirme la réalisation après l’échange",
    );
  }
  function archiveListing(id: number) {
    const value = listings.map((l) =>
      l.id === id
        ? {
            ...l,
            status: (l.status === "archived"
              ? "published"
              : "archived") as Listing["status"],
          }
        : l,
    );
    setListings(value);
    persist("ss-listings", value);
  }
  function toggleSaved(id: number) {
    const value = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    setSaved(value);
    persist("ss-saved", value);
    notify(
      saved.includes(id)
        ? "Profil retiré des favoris"
        : "Profil enregistré dans tes favoris",
    );
  }
  function selectPerson(id: number) {
    if (nextTimer.current) clearTimeout(nextTimer.current);
    transition.current = false;
    setLeaving(false);
    setCategory("Tout explorer");
    setIndex(
      Math.max(
        0,
        people
          .filter((p) => !blocked.includes(p.id))
          .findIndex((p) => p.id === id),
      ),
    );
    setFlipped(false);
    setDrag(0);
    setVerticalDrag(0);
    setTab("discover");
  }
  function next(step = 1) {
    if (transition.current) return;
    transition.current = true;
    setLeaving(true);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 170;
    nextTimer.current = setTimeout(() => {
      setIndex((i) => (i + step + filtered.length) % Math.max(filtered.length, 1));
      setFlipped(false);
      setDrag(0);
      setVerticalDrag(0);
      setLeaving(false);
      transition.current = false;
    }, delay);
  }
  // A wheel burst is one card change, including a trackpad's momentum events.
  // Use a non-passive listener only on this gesture surface, never on the feed.
  useEffect(() => {
    const main = mainElement.current;
    if (!main || welcome || tab !== "discover" || modal) return;
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if ((event.target as HTMLElement).closest(".category-rail")) return;
      const back = (event.target as HTMLElement).closest<HTMLElement>(
        ".card-back",
      );
      if (back && flipped && back.scrollHeight > back.clientHeight + 1) return;
      event.preventDefault();
      const now = performance.now();
      const gesture = wheelGesture.current;
      if (now - gesture.lastEvent > 180 && now - gesture.lastStep > 500) {
        gesture.delta = 0;
        gesture.locked = false;
      }
      gesture.lastEvent = now;
      if (gesture.locked || transition.current) return;
      const unit = event.deltaMode === 1
        ? 16
        : event.deltaMode === 2 ? main.clientHeight : 1;
      gesture.delta += event.deltaY * unit;
      if (Math.abs(gesture.delta) >= 45) {
        gesture.locked = true;
        gesture.lastStep = now;
        next(gesture.delta > 0 ? 1 : -1);
      }
    };
    main.addEventListener("wheel", onWheel, { passive: false });
    return () => main.removeEventListener("wheel", onWheel);
  });
  useEffect(() => {
    mainElement.current?.scrollTo({ top: 0, behavior: "instant" });
    wheelGesture.current = { delta: 0, lastEvent: 0, lastStep: 0, locked: false };
  }, [tab, welcome]);
  function like(p: Person) {
    if (likes.includes(p.id)) {
      notify("Ta demande est déjà envoyée. Tu peux lui écrire.");
      return;
    }
    const v = [...likes, p.id];
    setLikes(v);
    persist("ss-likes", v);
    notify(`Intérêt envoyé à ${p.name} · en attente d’acceptation`);
  }
  function openChat(id: number) {
    setChat(id);
    setTab("messages");
    if (!messages[id]) {
      const v = {
        ...messages,
        [id]: [
          {
            text: "Salut ! Dis-moi ce que tu aimerais apprendre ✨",
            mine: false,
          },
        ],
      };
      setMessages(v);
      persist("ss-messages", v);
    }
  }
  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || chat === null) return;
    const v = {
      ...messages,
      [chat]: [...(messages[chat] || []), { text: draft.trim(), mine: true }],
    };
    setMessages(v);
    persist("ss-messages", v);
    setDraft("");
  }
  function reserve() {
    if (!chatting) return;
    if (mode === "coins" && balance < chatting.cost) {
      notify("Pas assez de points fictifs. Choisis un échange direct.");
      return;
    }
    const v = [
      ...bookings,
      { id: Date.now(), person: chatting.id, day, mode, completed: false },
    ];
    setBookings(v);
    persist("ss-bookings", v);
    if (mode === "coins") {
      const b = balance - chatting.cost;
      setBalance(b);
      persist("ss-balance", b);
    }
    setModal(null);
    notify("Réservation de démonstration ajoutée au calendrier");
  }
  function complete(b: Booking) {
    if (b.completed || completedOnce.current.has(b.id)) return;
    completedOnce.current.add(b.id);
    if (b.role === "provider" && b.mode === "coins") {
      const nextBalance = balance + (b.credits || 0);
      setBalance(nextBalance);
      persist("ss-balance", nextBalance);
    }
    const v = bookings.map((x) =>
      x.id === b.id ? { ...x, completed: true } : x,
    );
    setBookings(v);
    persist("ss-bookings", v);
    notify("Échange confirmé comme terminé dans la démo");
  }
  function cancel(b: Booking) {
    const v = bookings.filter((x) => x.id !== b.id);
    setBookings(v);
    persist("ss-bookings", v);
    if (b.mode === "coins" && !b.completed && b.role !== "provider") {
      const n = balance + (people.find((p) => p.id === b.person)?.cost || 0);
      setBalance(n);
      persist("ss-balance", n);
    }
    notify("Réservation annulée");
  }
  function onPointerDown(e: React.PointerEvent) {
    if (transition.current || (e.target as HTMLElement).closest("button"))
      return;
    direction.current = null;
    start.current = {
      x: e.clientX,
      y: e.clientY,
      scrollTop: backElement.current?.scrollTop || 0,
    };
    moved.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!moved.current) return;
    const dx = e.clientX - start.current.x,
      dy = e.clientY - start.current.y;
    if (!direction.current && Math.max(Math.abs(dx), Math.abs(dy)) > 10) {
      const back = backElement.current;
      const scrollingInfo = flipped && back &&
        back.scrollHeight > back.clientHeight + 1 &&
        (dy < 0 || start.current.scrollTop > 0);
      direction.current = Math.abs(dx) > Math.abs(dy) * 0.55
        ? "turn"
        : scrollingInfo ? "scroll" : "next";
    }
    if (direction.current === "turn")
      setDrag(Math.max(-55, Math.min(55, dx / 3)));
    if (direction.current === "scroll" && backElement.current)
      backElement.current.scrollTop = start.current.scrollTop - dy;
    if (direction.current === "next")
      setVerticalDrag(Math.max(-110, Math.min(110, dy * 0.55)));
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!moved.current) return;
    moved.current = false;
    const dx = e.clientX - start.current.x,
      dy = e.clientY - start.current.y;
    if (direction.current === "turn" && ((!flipped && dx > 55) || (flipped && dx < -55))) {
      setFlipped(!flipped);
    } else if (
      direction.current !== "scroll" &&
      Math.abs(dy) > 65 && Math.abs(dy) > Math.abs(dx)
    ) {
      next();
    }
    setDrag(0);
    setVerticalDrag(0);
    direction.current = null;
  }
  return (
    <div
      className={`app ${welcome ? "mode-welcome" : "mode-app"} page-${tab} ${keyboardOpen ? "keyboard-open" : ""} theme-${welcome ? "rose" : theme}`}
    >
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar" inert={!!modal} aria-hidden={!!modal}>
        <button
          className="brand"
          onClick={() => {
            setTab("discover");
            if (welcome) window.scrollTo(0, 0);
          }}
          aria-label="Accueil SkillSwap"
        >
          <img className="brand-symbol" src="./icon.svg" alt="" />
          <span className="brand-word">
            skill<strong>swap</strong>
          </span>
        </button>
        <span className="header-note">
          Des talents à partager. Des liens à créer.
        </span>
        <div className="header-right">
          <button className="demo-pill" onClick={() => setModal("about")}>
            <span />
            Démo scolaire
          </button>
          {!welcome && (
            <button
              className="quick-publish round"
              onClick={publish}
              aria-label="Publier une annonce"
            >
              <Plus size={20} />
            </button>
          )}
          <button
            className="mini-avatar"
            onClick={() => setTab("profile")}
            aria-label="Mon profil"
          >
            <img src={profile.avatar || "./images/noah.webp"} alt="" />
          </button>
        </div>
      </header>
      <main ref={mainElement} inert={!!modal} aria-hidden={!!modal}>
        {welcome && <Welcome onEnter={enterApp} />}
        {!welcome && tab === "discover" && (
          <section className="discover">
            <div className="discovery-stage">
              <div className="stage-top">
                <div className="discovery-heading">
                  <h1>
                    Découvrir<span>.</span>
                  </h1>
                </div>
                <button
                  className="filter-button"
                  onClick={() => setModal("filters")}
                  aria-label="Filtrer les profils"
                >
                  <SlidersHorizontal size={17} />
                  <span>
                    {category === "Tout explorer" ? "Pour toi" : category}
                  </span>
                </button>
              </div>
              <div
                className="category-rail"
                aria-label="Catégories de services"
              >
                <button
                  aria-pressed={category === "Tout explorer"}
                  className={category === "Tout explorer" ? "selected" : ""}
                  onClick={() => {
                    setCategory("Tout explorer");
                    setIndex(0);
                    setFlipped(false);
                  }}
                >
                  Pour toi
                </button>
                {categoryInfo.map((c) => (
                  <button
                    key={c.name}
                    aria-pressed={category === c.name}
                    className={category === c.name ? "selected" : ""}
                    onClick={() => {
                      setCategory(c.name);
                      setIndex(0);
                      setFlipped(false);
                    }}
                  >
                    {c.short}
                  </button>
                ))}
              </div>
              {person ? (
                <>
                  <div
                    key={person.id}
                    className={`card-perspective ${leaving ? "is-leaving" : ""}`}
                  >
                    {(Math.abs(verticalDrag) > 12 || Math.abs(drag) > 8) && (
                      <div className="gesture-cue" aria-hidden="true">
                        {Math.abs(verticalDrag) > 12 ? (
                          <>
                            <ArrowDown size={17} />
                            Profil suivant
                          </>
                        ) : (
                          <>
                            <Repeat2 size={17} />
                            Retourner
                          </>
                        )}
                      </div>
                    )}
                    <div
                      ref={cardElement}
                      className={`profile-card ${flipped ? "is-flipped" : ""}`}
                      tabIndex={0}
                      role="group"
                      aria-label={`Profil de ${person.name}. Flèche droite pour retourner, flèche bas pour le profil suivant.`}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                          e.preventDefault();
                          setFlipped(!flipped);
                        }
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          restoreCardFocus.current = true;
                          next();
                        }
                      }}
                      onPointerDown={onPointerDown}
                      onPointerMove={onPointerMove}
                      onPointerUp={onPointerUp}
                      onPointerCancel={() => {
                        moved.current = false;
                        setDrag(0);
                        setVerticalDrag(0);
                        direction.current = null;
                      }}
                      style={{
                        transform: `translate3d(0, ${verticalDrag}px, 0) rotateY(${(flipped ? 180 : 0) + drag}deg)`,
                      }}
                    >
                      <article className="card-face card-front" inert={flipped}>
                        <img
                          className="hero-image"
                          src={person.image}
                          alt={`Illustration de ${person.category.toLowerCase()}`}
                          draggable={false}
                        />
                        <div className="photo-shade" />
                        <div className="card-top">
                          <span className="glass-tag">
                            <span className="availability-dot" />
                            Disponible pour échanger
                          </span>
                          <div className="card-top-actions">
                            <button
                              className="round glass save-profile"
                              onClick={() => toggleSaved(person.id)}
                              aria-label={`${saved.includes(person.id) ? "Retirer des favoris" : "Enregistrer"} le profil de ${person.name}`}
                              aria-pressed={saved.includes(person.id)}
                            >
                              <Bookmark
                                size={17}
                                fill={
                                  saved.includes(person.id)
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            </button>
                            <button
                              className="round glass"
                              onClick={() => setModal("safety")}
                              aria-label="Signaler ou bloquer"
                            >
                              <ShieldCheck size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="card-content">
                          <span className="category-tag">
                            {person.category}
                          </span>
                          <h2>{person.skill}</h2>
                          <div className="person-row">
                            <TalentAvatar src={person.avatar} />
                            <div>
                              <strong>{person.name}</strong>
                              <span>
                                Profil fictif · à distance ou en atelier
                              </span>
                            </div>
                            <span className="person-spark">
                              <Sparkles size={19} />
                            </span>
                          </div>
                        </div>
                      </article>
                      <article
                        ref={backElement}
                        className="card-face card-back glass"
                        inert={!flipped}
                      >
                        <div className="back-heading">
                          <TalentAvatar src={person.avatar} size={48} />
                          <div>
                            <span>LE PROFIL</span>
                            <h2>{person.name}</h2>
                          </div>
                        </div>
                        <p className="bio">{person.description}</p>
                        <div className="detail-label">JE PEUX T’AIDER AVEC</div>
                        <h3>{person.category}</h3>
                        <div className="offer-meta">
                          <span>
                            <Clock3 size={16} />
                            {person.duration}
                          </span>
                          <span>
                            <Coins size={16} />
                            {person.cost} point fictif
                            {person.cost > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="looking-box">
                          <Repeat2 size={20} />
                          <div>
                            <span>EN ÉCHANGE, J’AIMERAIS…</span>
                            <p>{person.looking}</p>
                          </div>
                        </div>
                        <p className="back-note">
                          Échange direct ou points LinkUp : à vous de choisir
                          ensemble.
                        </p>
                        {person.takeaway && (
                          <p className="profile-outcome">
                            <strong>Tu repars avec</strong>
                            <span>{person.takeaway}</span>
                          </p>
                        )}
                        <span className="back-hint">
                          ← Glisse pour retrouver la photo
                        </span>
                      </article>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button
                      className="round skip"
                      onClick={() => next()}
                      aria-label="Profil suivant"
                    >
                      <X size={23} />
                    </button>
                    <button
                      className={`interest-button ${likes.includes(person.id) ? "is-liked" : ""}`}
                      onClick={() => like(person)}
                    >
                      <Heart
                        size={20}
                        fill={
                          likes.includes(person.id) ? "currentColor" : "none"
                        }
                      />
                      {likes.includes(person.id)
                        ? "Intérêt envoyé"
                        : "Ça m’intéresse"}
                      <ArrowUpRight size={18} />
                    </button>
                    <button
                      className="round message-action"
                      onClick={() => openChat(person.id)}
                      aria-label={`Écrire à ${person.name}`}
                    >
                      <MessageCircle size={23} />
                    </button>
                  </div>
                  <div className="gesture-hint">
                    <span>→ Retourne la carte</span>
                    <span className="hint-dot" />
                    <span className="touch-scroll-hint">Glisse · profil suivant</span>
                    <span className="wheel-scroll-hint">Molette · changer de profil</span>
                  </div>
                </>
              ) : (
                <div className="empty">
                  <Sparkles />
                  <h2>Un nouveau départ.</h2>
                  <p>Aucun profil dans cette sélection.</p>
                  <button
                    onClick={() => {
                      setCategory("Tout explorer");
                      setIndex(0);
                    }}
                  >
                    Tout explorer
                  </button>
                </div>
              )}
            </div>
            <aside className="discover-aside">
              <span className="vertical-label">
                PLUS QU’UN SWAP. UN DÉCLIC.
              </span>
              <span className="profile-count">
                {String(
                  filtered.length ? (index % filtered.length) + 1 : 0,
                ).padStart(2, "0")}
                <small> / {String(filtered.length).padStart(2, "0")}</small>
              </span>
            </aside>
          </section>
        )}
        {!welcome && tab === "explore" && (
          <Explore
            people={people.filter((p) => !blocked.includes(p.id))}
            category={category}
            onCategory={(name) => {
              setCategory(name);
              setIndex(0);
              setFlipped(false);
            }}
            onSelect={selectPerson}
            onPublish={publish}
            saved={saved}
            onSave={toggleSaved}
          />
        )}
        {!welcome && tab === "create" && (
          <section className="create-page" aria-label="Création de posts">
            <div className="creation-types" role="group" aria-label="Type de création">
              <button
                aria-label="Créer un post"
                aria-pressed={!skillComposer}
                onClick={() => setSkillComposer(false)}
              >
                <Plus size={18} /> Un post
              </button>
              <button
                aria-label="Créer une compétence"
                aria-pressed={skillComposer}
                onClick={() => setSkillComposer(true)}
              >
                <Sparkles size={18} /> Une compétence
              </button>
            </div>
            <ListingComposer
              key={skillComposer ? "skill" : "post"}
              initial={skillComposer ? skillDraft : postDraft}
              asSkill={skillComposer}
              isDraft
              onDraftChange={skillComposer ? setSkillDraft : setPostDraft}
              onSave={saveListing}
            />
          </section>
        )}
        {!welcome && tab === "messages" && (
          <section className={`messages-page ${chat ? "chat-open" : ""}`}>
            <div className="inbox">
              <div className="eyebrow">LES LIENS COMMENCENT ICI</div>
              <h1>
                Tes <em>conversations.</em>
              </h1>
              <p className="muted">
                Une question, une idée, un premier bonjour.
              </p>
              {Object.keys(messages).length === 0 ? (
                <div className="empty glass">
                  <MessageCircle />
                  <h3>Tout commence par un bonjour.</h3>
                  <p>Découvre un talent et lance la conversation.</p>
                  <button onClick={() => setTab("discover")}>
                    Explorer les profils <ArrowUpRight size={16} />
                  </button>
                </div>
              ) : (
                Object.keys(messages).map((id) => {
                  const p = people.find((x) => x.id === +id)!;
                  if (blocked.includes(p.id)) return null;
                  return (
                    <button
                      className={`conversation glass ${chat === p.id ? "selected" : ""}`}
                      onClick={() => setChat(p.id)}
                      key={id}
                    >
                      <img src={p.avatar} alt="" />
                      <div>
                        <strong>{p.name}</strong>
                        <p>{messages[p.id].at(-1)?.text}</p>
                      </div>
                      <ChevronRight size={18} />
                    </button>
                  );
                })
              )}
              <div className="chat-disclaimer">
                <ShieldCheck size={16} />
                Conversations fictives, enregistrées sur cet appareil.
              </div>
            </div>
            <div className="chat-panel glass">
              {chatting ? (
                <>
                  <div className="chat-header">
                    <button
                      className="mobile-back round"
                      onClick={() => setChat(null)}
                      aria-label="Retour aux conversations"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <img src={chatting.avatar} alt="" />
                    <div>
                      <strong>{chatting.name}</strong>
                      <span>Compte de démonstration</span>
                    </div>
                    <button
                      className="round"
                      onClick={() => {
                        setDay(16);
                        setMode("direct");
                        setModal("booking");
                      }}
                      aria-label="Planifier un échange"
                    >
                      <CalendarDays size={20} />
                    </button>
                    <button
                      className="round"
                      onClick={() => setModal("chat-safety")}
                      aria-label="Sécurité de la conversation"
                    >
                      <ShieldCheck size={18} />
                    </button>
                  </div>
                  <div className="chat-service-strip">
                    <img src={chatting.image} alt="" />
                    <div>
                      <span>VOTRE ÉCHANGE</span>
                      <strong>{chatting.category}</strong>
                    </div>
                    <button
                      onClick={() => {
                        setDay(16);
                        setMode("direct");
                        setModal("booking");
                      }}
                    >
                      Proposer un créneau <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <div
                    className="chat-messages"
                    ref={chatScroll}
                    role="log"
                    aria-label="Messages de la conversation"
                    aria-live="polite"
                  >
                    <span className="chat-date">
                      Une rencontre, de nouvelles idées.
                    </span>
                    {(messages[chatting.id] || []).map((m, i) => (
                      <div key={i} className={`bubble ${m.mine ? "mine" : ""}`}>
                        {m.text}
                      </div>
                    ))}
                    <p className="simulation-note">
                      Démo : les messages ne sont pas envoyés à une personne
                      réelle.
                    </p>
                  </div>
                  {!(messages[chatting.id] || []).some((m) => m.mine) && (
                    <div
                      className="conversation-starters"
                      aria-label="Idées pour commencer la conversation"
                    >
                      {[
                        "Comment ça se passe ?",
                        "Quelles sont tes dispos ?",
                      ].map((text) => (
                        <button
                          key={text}
                          onClick={() => {
                            setDraft(text);
                            composerInput.current?.focus();
                          }}
                        >
                          {text}
                          <Plus size={13} />
                        </button>
                      ))}
                    </div>
                  )}
                  <form className="composer" onSubmit={send}>
                    <input
                      ref={composerInput}
                      aria-label="Ton message"
                      placeholder="Écris un petit bonjour…"
                      value={draft}
                      maxLength={1000}
                      onChange={(e) => setDraft(e.target.value)}
                    />
                    <button
                      disabled={!draft.trim()}
                      aria-label="Envoyer le message"
                    >
                      <Send size={19} />
                    </button>
                  </form>
                </>
              ) : (
                <div className="chat-welcome">
                  <MessageCircle size={42} />
                  <h2>
                    Place à la <em>conversation.</em>
                  </h2>
                  <p>Choisis une discussion pour commencer.</p>
                </div>
              )}
            </div>
          </section>
        )}
        {!welcome && tab === "profile" && (
          <section className="own-profile">
            <div className="profile-cover glass">
              <span className="eyebrow">TON PETIT UNIVERS</span>
              <button className="theme-edit" onClick={() => setModal("themes")}>
                <Palette size={17} />
                Mon ambiance
              </button>
              <div className="own-avatar">
                <img
                  src={profile.avatar || "./images/noah.webp"}
                  alt="Photo du profil fictif"
                />
                <span>
                  <Sparkles size={17} />
                </span>
              </div>
              <h1>
                {profile.name}
                <em>.</em>
              </h1>
              <p>{profile.bio}</p>
              <button
                className="edit-profile"
                onClick={() => {
                  setProfileDraft(profile);
                  setModal("edit-profile");
                }}
              >
                Modifier mon profil
              </button>
              <span className="small-label">PROFIL DE DÉMONSTRATION</span>
            </div>
            <div className="profile-columns">
              <div className="profile-details glass">
                <div className="section-heading">
                  <h2>
                    Ce que je <em>partage.</em>
                  </h2>
                  <Sparkles size={21} />
                </div>
                <div className="skill-chips">
                  {Array.from(
                    new Set<string>([
                      ...profile.skills
                        .split(",")
                        .map((s: string) => s.trim())
                        .filter(Boolean),
                      ...listings
                        .filter(
                          (l) => l.kind === "offer" && l.status === "published",
                        )
                        .map((l) => l.title),
                    ]),
                  ).map((skill, i) => (
                    <span key={i}>{skill}</span>
                  ))}
                </div>
                <h3>Et ce que j’aimerais apprendre</h3>
                <p>{profile.looking}</p>
                <button
                  className="calendar-link"
                  onClick={() => setModal("calendar")}
                >
                  <CalendarDays size={20} />
                  <div>
                    <strong>Mon calendrier</strong>
                    <span>
                      {bookings.filter((b) => !b.completed).length} échange(s) à
                      venir
                    </span>
                  </div>
                  <ArrowUpRight size={20} />
                </button>
              </div>
              <div className="points-card glass">
                <div className="section-heading">
                  <span>TES POINTS LINKUP</span>
                  <Coins size={21} />
                </div>
                <div className="balance">
                  {balance}
                  <span>points fictifs</span>
                </div>
                <p>
                  Un coup de main aujourd’hui.
                  <br />
                  Une nouvelle compétence demain.
                </p>
                <div className="points-foot">
                  <Repeat2 size={17} />
                  Utilisables pour les échanges de la démo.
                </div>
              </div>
            </div>
            <Library
              listings={listings}
              saved={people.filter(
                (p) => saved.includes(p.id) && !blocked.includes(p.id),
              )}
              interests={people.filter(
                (p) => likes.includes(p.id) && !blocked.includes(p.id),
              )}
              onPublish={publish}
              onEdit={(l) => {
                setSkillComposer(false);
                setEditingListing(l);
                setModal("listing");
              }}
              onArchive={archiveListing}
              onSimulate={(l) => {
                setIncomingListing(l);
                setModal("incoming");
              }}
              onSelect={selectPerson}
              onUnsave={toggleSaved}
            />
            <div className="profile-progress glass">
              <span>{bookings.filter((b) => b.completed).length}</span>
              <div>
                <strong>échange(s) terminé(s)</strong>
                <p>Chaque échange est une occasion d’apprendre.</p>
              </div>
              <Check size={20} />
            </div>
            <div className="profile-tools">
              <button onClick={() => setModal("install")}>
                <Smartphone size={19} />
                Installer sur mon téléphone
                <ArrowUpRight size={16} />
              </button>
              <button onClick={() => setModal("blocked")}>
                <Ban size={19} />
                Profils bloqués
                <ArrowUpRight size={16} />
              </button>
              <button onClick={() => setModal("data")}>
                <Download size={19} />
                Mes données de démonstration
                <ArrowUpRight size={16} />
              </button>
              <a href="./privacy.html">
                <ShieldCheck size={19} />
                Confidentialité
                <ArrowUpRight size={16} />
              </a>
            </div>
            <button className="replay-guide" onClick={() => setWelcome(true)}>
              <Repeat2 size={16} />
              Revoir le petit guide
            </button>
            <button className="about-link" onClick={() => setModal("about")}>
              À propos de SkillSwap et du projet scolaire{" "}
              <ArrowUpRight size={15} />
            </button>
          </section>
        )}
      </main>
      {!welcome && (
        <BottomNav
          tab={tab}
          onChange={(nextTab) => {
            if (nextTab === "create") setSkillComposer(false);
            setTab(nextTab);
          }}
          inert={!!modal}
        />
      )}
      {!welcome && (
        <span className="desktop-footer">SKILLSWAP · UN PEU PLUS HUMAIN.</span>
      )}
      {!Capacitor.isNativePlatform() && <WebUpdates />}
      {toast && (
        <div className="toast glass" role="status">
          <Check size={18} />
          {toast}
        </div>
      )}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <section
            className={`modal glass modal-${modal}`}
            role="dialog"
            aria-modal="true"
            aria-label={modal === "calendar" ? "Mon calendrier" : "Options"}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Escape") setModal(null);
            }}
          >
            <button
              autoFocus
              className="modal-close round"
              onClick={() => setModal(null)}
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
            {modal === "edit-profile" && (
              <>
                <span className="eyebrow">TON PROFIL, TON HISTOIRE</span>
                <h2>
                  Un peu plus de <em>toi.</em>
                </h2>
                <p>
                  Utilise uniquement des informations fictives pour cette
                  démonstration.
                </p>
                <fieldset className="portrait-picker">
                  <legend>Photo du profil fictif</legend>
                  {demoMembers.map((p) => (
                    <button
                      key={p.id}
                      className={
                        (profileDraft.avatar || "./images/noah.webp") ===
                        p.avatar
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setProfileDraft({ ...profileDraft, avatar: p.avatar })
                      }
                      aria-label={`Choisir le portrait fictif de ${p.name}`}
                      aria-pressed={
                        (profileDraft.avatar || "./images/noah.webp") ===
                        p.avatar
                      }
                    >
                      <img src={p.avatar} alt="" />
                      {(profileDraft.avatar || "./images/noah.webp") ===
                        p.avatar && <Check size={13} />}
                    </button>
                  ))}
                </fieldset>
                {[
                  { key: "name", label: "Prénom ou pseudo fictif" },
                  { key: "bio", label: "Ta petite présentation" },
                  {
                    key: "skills",
                    label: "Compétences, séparées par des virgules",
                  },
                  { key: "looking", label: "Ce que tu aimerais apprendre" },
                ].map((f) => (
                  <label className="field-label" key={f.key}>
                    {f.label}
                    <input
                      maxLength={f.key === "name" ? 30 : 180}
                      value={profileDraft[f.key as keyof typeof profileDraft]}
                      onChange={(e) =>
                        setProfileDraft({
                          ...profileDraft,
                          [f.key]: e.target.value,
                        })
                      }
                    />
                  </label>
                ))}
                <button
                  className="primary"
                  disabled={!profileDraft.name.trim()}
                  onClick={() => {
                    setProfile(profileDraft);
                    persist("ss-profile", profileDraft);
                    setModal(null);
                    notify("Profil de démonstration mis à jour");
                  }}
                >
                  Enregistrer <Check size={18} />
                </button>
              </>
            )}
            {modal === "blocked" && (
              <>
                <h2>
                  Profils <em>bloqués.</em>
                </h2>
                <p>
                  Tu peux les réafficher à tout moment dans la démonstration.
                </p>
                {!blocked.length ? (
                  <p>Aucun profil bloqué.</p>
                ) : (
                  people
                    .filter((p) => blocked.includes(p.id))
                    .map((p) => (
                      <div className="unblock-row" key={p.id}>
                        <img src={p.avatar} alt="" />
                        <span>
                          {p.name} · {p.category}
                        </span>
                        <button
                          onClick={() => {
                            const value = blocked.filter((id) => id !== p.id);
                            setBlocked(value);
                            persist("ss-blocked", value);
                          }}
                        >
                          Débloquer
                        </button>
                      </div>
                    ))
                )}
              </>
            )}
            {modal === "incoming" && incomingListing && (
              <>
                <span className="eyebrow">
                  TESTER L’AUTRE CÔTÉ DE L’ÉCHANGE
                </span>
                <h2>
                  Une demande <em>fictive.</em>
                </h2>
                <p>
                  Un membre de démonstration aimerait découvrir ton service «{" "}
                  {incomingListing.title} ».
                </p>
                <div className="incoming-summary">
                  <span>
                    <Clock3 size={17} />
                    {incomingListing.minutes} minutes
                  </span>
                  <span>
                    {incomingListing.exchange === "direct" ? (
                      <>
                        <Repeat2 size={17} />
                        Échange direct
                      </>
                    ) : (
                      <>
                        <Coins size={17} />
                        {incomingListing.credits} point(s) fictif(s) à gagner
                      </>
                    )}
                  </span>
                </div>
                <p>
                  Accepte la demande, puis confirme sa réalisation dans le
                  calendrier. Les points sont crédités une seule fois, à la fin
                  du service simulé.
                </p>
                <button className="primary" onClick={acceptDemoRequest}>
                  Accepter la demande fictive <Check size={17} />
                </button>
              </>
            )}
            {modal === "data" && (
              <>
                <span className="eyebrow">TU GARDES LA MAIN</span>
                <h2>
                  Tes données, <em>ton choix.</em>
                </h2>
                <p>
                  Les annonces, messages et points de cette démonstration
                  restent sur cet appareil. Ils ne sont pas partagés avec
                  d’autres membres.
                </p>
                <p>
                  Tu peux recommencer la démo. Cette action efface les profils
                  personnalisés, annonces, favoris, conversations et
                  réservations enregistrés ici.
                </p>
                <button
                  className="primary reset-demo"
                  onClick={() => {
                    for (const key of [
                      "ss-onboarded-v2",
                      "ss-profile",
                      "ss-likes",
                      "ss-saved",
                      "ss-blocked",
                      "ss-messages",
                      "ss-bookings",
                      "ss-balance",
                      "ss-theme",
                      "ss-listings",
                    ])
                      localStorage.removeItem(key);
                    window.location.assign(
                      window.location.pathname + "?guide=1",
                    );
                  }}
                >
                  Effacer mes données et recommencer
                </button>
              </>
            )}
            {modal === "listing" && (
              <ListingComposer
                key={editingListing?.id || "new"}
                initial={editingListing}
                asSkill={skillComposer}
                onSave={saveListing}
              />
            )}
            {modal === "install" && (
              <>
                <span className="eyebrow">SKILLSWAP, À PORTÉE DE MAIN</span>
                <h2>
                  Une place sur ton <em>écran.</em>
                </h2>
                <div className="install-icon">
                  <img src="./icon-192.png" alt="Icône SkillSwap" />
                </div>
                <p>
                  Sur iPhone, ouvre SkillSwap dans Safari, touche le bouton de
                  partage, puis « Sur l’écran d’accueil » et « Ajouter ».
                </p>
                <ol className="install-steps">
                  <li>Ouvre le menu de partage de Safari.</li>
                  <li>Choisis « Sur l’écran d’accueil ».</li>
                  <li>Lance SkillSwap depuis sa nouvelle icône.</li>
                </ol>
                <p>
                  Sur Android, utilise « Installer l’application » ou « Ajouter
                  à l’écran d’accueil » dans le menu du navigateur.
                </p>
                <p className="simulation-note">
                  L’installation web ne passe pas par l’App Store. Le prototype
                  conserve ses données sur ton appareil.
                </p>
              </>
            )}
            {modal === "filters" && (
              <>
                <span className="eyebrow">SUIVRE SA CURIOSITÉ</span>
                <h2>
                  Qu’est-ce qui
                  <br />
                  te <em>tente ?</em>
                </h2>
                <div className="filter-options">
                  {categories.map((c) => (
                    <button
                      className={category === c ? "selected" : ""}
                      onClick={() => {
                        setCategory(c);
                        setIndex(0);
                        setFlipped(false);
                        setModal(null);
                      }}
                      key={c}
                    >
                      {c}
                      <ArrowUpRight size={18} />
                    </button>
                  ))}
                </div>
              </>
            )}
            {modal === "themes" && (
              <>
                <span className="eyebrow">UNE AMBIANCE À TOI</span>
                <h2>
                  Choisis ta <em>couleur.</em>
                </h2>
                <p>Elle habille ton profil, tes messages et ton calendrier.</p>
                <div className="theme-options">
                  {[
                    { id: "rose", name: "Rose poudré" },
                    { id: "lavender", name: "Brume lilas" },
                    { id: "sage", name: "Jardin sauge" },
                    { id: "peach", name: "Abricot doux" },
                  ].map((t) => (
                    <button
                      className={`theme-${t.id} ${ownTheme === t.id ? "selected" : ""}`}
                      onClick={() => {
                        setOwnTheme(t.id);
                        persist("ss-theme", t.id);
                      }}
                      key={t.id}
                    >
                      <span />
                      {t.name}
                      {ownTheme === t.id && <Check size={17} />}
                    </button>
                  ))}
                </div>
              </>
            )}
            {modal === "calendar" && (
              <>
                <span className="eyebrow">DU TEMPS BIEN PARTAGÉ</span>
                <h2>
                  Ton <em>calendrier.</em>
                </h2>
                <div className="month-heading">
                  <button
                    className="round"
                    onClick={() => setMonth((m) => m - 1)}
                    aria-label="Mois précédent"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <strong>
                    {new Intl.DateTimeFormat("fr", {
                      month: "long",
                      year: "numeric",
                    }).format(new Date(2026, 9 + month, 1))}
                  </strong>
                  <button
                    className="round"
                    onClick={() => setMonth((m) => m + 1)}
                    aria-label="Mois suivant"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="calendar-grid">
                  {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                    <span className="weekday" key={"w" + i}>
                      {d}
                    </span>
                  ))}
                  {Array.from(
                    { length: (new Date(2026, 9 + month, 1).getDay() + 6) % 7 },
                    (_, i) => (
                      <span key={"empty" + i} />
                    ),
                  )}
                  {Array.from(
                    { length: new Date(2026, 10 + month, 0).getDate() },
                    (_, i) => (
                      <span
                        className={
                          month === 0 && bookings.some((b) => b.day === i + 1)
                            ? "booked-day"
                            : ""
                        }
                        key={i}
                      >
                        {i + 1}
                      </span>
                    ),
                  )}
                </div>
                <h3>Mes échanges</h3>
                {bookings.length === 0 ? (
                  <p className="muted">
                    Ton calendrier attend sa première rencontre. Planifie un
                    échange depuis une conversation.
                  </p>
                ) : (
                  bookings.map((b) => {
                    const p = people.find((p) => p.id === b.person)!;
                    return (
                      <div className="booking-row" key={b.id}>
                        <span className="booking-day">
                          {b.day}
                          <small>OCT.</small>
                        </span>
                        <div>
                          <strong>
                            {b.title || `${p.name} · ${p.category}`}
                          </strong>
                          <span>
                            {b.role === "provider" ? "Tu proposes · " : ""}
                            Octobre 2026 · 14 h ·{" "}
                            {b.completed
                              ? "Terminé"
                              : b.mode === "coins"
                                ? "Points fictifs"
                                : "Échange direct"}
                          </span>
                          <div className="booking-controls">
                            {!b.completed && (
                              <>
                                <button onClick={() => complete(b)}>
                                  Confirmer la réalisation
                                </button>
                                <button onClick={() => cancel(b)}>
                                  Annuler
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => {
                                setModal(null);
                                openChat(p.id);
                              }}
                            >
                              Conversation
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <p className="simulation-note">
                  Dates fixes d’exemple pour la présentation scolaire.
                </p>
              </>
            )}
            {modal === "booking" && chatting && (
              <>
                <span className="eyebrow">UN RENDEZ-VOUS POUR APPRENDRE</span>
                <h2>
                  Un échange avec <em>{chatting.name}.</em>
                </h2>
                <p>
                  {chatting.category} · {chatting.duration}
                </p>
                <label className="field-label">
                  Date de démonstration
                  <select value={day} onChange={(e) => setDay(+e.target.value)}>
                    {[16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map(
                      (d) => (
                        <option key={d} value={d}>
                          {d} octobre 2026 à 14 h
                        </option>
                      ),
                    )}
                  </select>
                </label>
                <div className="exchange-modes">
                  <button
                    className={mode === "direct" ? "selected" : ""}
                    onClick={() => setMode("direct")}
                  >
                    <Repeat2 />
                    Échange direct<small>Je partage aussi une compétence</small>
                  </button>
                  <button
                    className={mode === "coins" ? "selected" : ""}
                    onClick={() => setMode("coins")}
                  >
                    <Coins />
                    {chatting.cost} point(s) fictif(s)
                    <small>Solde : {balance} points</small>
                  </button>
                </div>
                <p className="simulation-note">
                  Dans la démo, la réservation est acceptée automatiquement.
                  Aucun vrai service n’est réservé.
                </p>
                <button className="primary" onClick={reserve}>
                  Confirmer la réservation fictive <ArrowUpRight size={18} />
                </button>
              </>
            )}
            {(modal === "safety" || modal === "chat-safety") && (
              <>
                <ShieldCheck size={32} />
                <h2>
                  Des échanges avec <em>attention.</em>
                </h2>
                <p>
                  Ne partage pas tes coordonnées privées. Pour une rencontre,
                  privilégie un lieu public et préviens un proche. Si tu es
                  mineur, implique un adulte de confiance. SkillSwap ne garantit
                  pas la sécurité.
                </p>
                <button
                  className="safety-option"
                  onClick={() => {
                    setModal(null);
                    notify(
                      "Signalement simulé enregistré · aucun modérateur réel dans cette démo",
                    );
                  }}
                >
                  <Flag size={18} />
                  Signaler ce profil
                </button>
                <button
                  className="safety-option"
                  onClick={() => {
                    const id = modal === "chat-safety" ? chat : person?.id;
                    if (!id) return;
                    const v = [...blocked, id];
                    setBlocked(v);
                    persist("ss-blocked", v);
                    setModal(null);
                    setChat(null);
                    next();
                    notify("Profil masqué dans cette démo");
                  }}
                >
                  <Ban size={18} />
                  Bloquer ce profil
                </button>
              </>
            )}
            {modal === "about" && (
              <>
                <span className="eyebrow">UNE IDÉE QUI SE PARTAGE</span>
                <h2>
                  Le talent est partout.
                  <br />
                  <em>Créons les liens.</em>
                </h2>
                <p>
                  SkillSwap est une startup fictive imaginée pour un projet de
                  gestion au lycée. Notre idée : rendre l’apprentissage
                  accessible grâce à l’entraide et à l’échange de compétences.
                </p>
                <h3>Deux façons de partager</h3>
                <p>
                  Échanger directement un service contre un autre, ou utiliser
                  des points fictifs pour recevoir de l’aide d’un autre membre.
                </p>
                <h3>Un modèle à construire ensemble</h3>
                <p>
                  Piste de modèle économique à discuter : des partenariats avec
                  des établissements et des ateliers accompagnés, tout en
                  préservant l’accès aux échanges. Aucun revenu ou résultat réel
                  n’est annoncé.
                </p>
                <div className="about-notice">
                  <ShieldCheck size={20} />
                  Prototype scolaire : profils fictifs, photos illustratives,
                  messages locaux et crédits sans valeur monétaire. Ne saisis
                  aucune donnée privée.
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
