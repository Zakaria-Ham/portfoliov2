"use client";
import "../styles/Navbar.css";
import { useRouter } from "next/navigation";

export type NavVariant = "dev" | "editor" | "design";

interface NavbarProps {
  variant: NavVariant;
}

/* ── Icons ─────────────────────────────────────── */
const TerminalIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const FilmIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <line x1="7"  y1="2"  x2="7"  y2="22" />
    <line x1="17" y1="2"  x2="17" y2="22" />
    <line x1="2"  y1="12" x2="22" y2="12" />
    <line x1="2"  y1="7"  x2="7"  y2="7" />
    <line x1="2"  y1="17" x2="7"  y2="17" />
    <line x1="17" y1="7"  x2="22" y2="7" />
    <line x1="17" y1="17" x2="22" y2="17" />
  </svg>
);

const PenIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const ROUTES = {
  dev:    "/Dev-repo",
  editor: "/Editing-Timeline",
  design: "/Design-Board",
} as const;

export default function Navbar({ variant }: NavbarProps) {
  const router = useRouter();

  const go = (target: NavVariant) => {
    if (target !== variant) router.push(ROUTES[target]);
  };

  return (
    <div className={`nb-fixed nb-fixed--${variant}`}>
      <nav className="nb-island" aria-label="Section navigation">

        <button
          className={`nb-btn ${variant === "dev" ? "nb-btn--active" : ""}`}
          onClick={() => go("dev")}
          aria-label="Developer page"
          title="Developer"
        >
          <TerminalIcon />
        </button>

        <div className="nb-divider" role="separator" />

        <button
          className={`nb-btn ${variant === "editor" ? "nb-btn--active" : ""}`}
          onClick={() => go("editor")}
          aria-label="Editor page"
          title="Editor"
        >
          <FilmIcon />
        </button>

        <div className="nb-divider" role="separator" />

        <button
          className={`nb-btn ${variant === "design" ? "nb-btn--active" : ""}`}
          onClick={() => go("design")}
          aria-label="Design page"
          title="Design"
        >
          <PenIcon />
        </button>

      </nav>
    </div>
  );
}