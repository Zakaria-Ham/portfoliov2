"use client";
import "../styles/Editor.css";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";

const PROFILE = {
  name:    "Zak",
  alias:   "RedLed",
  handle:  "redled.fx",
  title:   "Video Editor & Motion Designer",
  tagline: "Cinematic storytelling through motion & VFX",
  years:   "5+",
};

const SOCIALS = [
  { platform: "Instagram", handle: "@ redled.fx", href: "https://instagram.com/redled.fx",  color: "#e1306c" },
  { platform: "YouTube",   handle: "@ RedLed.",   href: "https://www.youtube.com/@RedLed.", color: "#ff0000" },
  { platform: "TikTok",    handle: "@ redled.fx", href: "https://tiktok.com/redled.fx",     color: "#69c9d0" },
];

const STYLES = [
  { label: "Cinematic",       color: "#ff8500", desc: "widescreen story-driven sequences" },
  { label: "Motion Graphics", color: "#a78bfa", desc: "animated titles · vfx" },
  { label: "Long Format",     color: "#ff4e6a", desc: "podcasts · concepts" },
  { label: "Shortform",       color: "#34d399", desc: "reels · tiktoks · fast edits · games edits" },
  { label: "Music Video",     color: "#fbbf24", desc: "sync · beat-matched · visual narrative" },
];

const SOFTWARE = [
  { name: "DaVinci Resolve",            role: "Scenes & Fusion",                abbr: "DR" },
  { name: "CapCut (Main)",              role: "Short/long form & mobile",       abbr: "CC" },
  { name: "BandLab",                    role: "Music & Audio mixing",           abbr: "BL" },
  { name: "Artificial Intelligence",    role: "Maximize Productivity/Quality",  abbr: "AI" },
];

const EXPERIENCE = [
  { year: "Current", label: "COLLAB",   project: "The Chief",               desc: "Editor's Leader for the podcast · Teaser Maker" },
  { year: "Recent",  label: "COLLAB",   project: "The Teaser",              desc: "Made an animated shortform Podcast assets" },
  { year: "2024",    label: "COLLAB",   project: "First Collab",            desc: "Edit for a small E-Sport team · Remixed some Audio" },
  { year: "2024",    label: "PERSONAL", project: "Efficiency",              desc: "Improved workflow on mobile · Categorized editing style" },
  { year: "2023",    label: "CLIENT",   project: "Short Highlight",         desc: "A 1-year resume highlight in 1min" },
  { year: "2022",    label: "PERSONAL", project: "Short Film — Highlights", desc: "Vacation trip video +1hr timeline" },
  { year: "2021",    label: "PERSONAL", project: "Game Clips Editing",      desc: "Masks · Background changes · Audio + VFX matching" },
];

export default function EditingTimeline() {
  const router = useRouter();

  return (
    <main className="ed-root">
      <Navbar variant="editor" />
      <div className="ed-grain" aria-hidden="true" />

      {/* ── HERO ── */}
      <section className="ed-hero ed-enter">
        <div className="ed-monitor">
          <div className="ed-monitor-screen">
            <div className="ed-monitor-noise" aria-hidden="true" />
            <div className="ed-monitor-inner">
              <p className="ed-monitor-tc">23:01:20:08</p>
              <h1 className="ed-monitor-name">{PROFILE.alias}</h1>
              <p className="ed-monitor-sub">{PROFILE.title}</p>
              <p className="ed-monitor-handle">{PROFILE.handle}</p>
            </div>
            <div className="ed-monitor-bars" aria-hidden="true">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="ed-bar"  
                  style={{ animationDelay: `${i * 0.07}s`, height: `${3.1415290324 * 7 + (Math.sin(i)* 5)*(Math.sin(i)* 3) + (Math.cos(i)/3.14233939) * 12 }px` }} />
              ))}
            </div>
          </div>
          <div className="ed-monitor-labels">
            <span className="ed-monitor-label">SRC: {PROFILE.alias.toUpperCase()}_PORTFOLIO</span>
            <span className="ed-monitor-label ed-label-r">{PROFILE.years} YEARS EXP</span>
          </div>
        </div>

        <div className="ed-socials ed-anim-1">
          <p className="ed-section-label">◈ SOCIALS &amp; CHANNELS</p>
          <div className="ed-social-track">
            {SOCIALS.map((s) => (
              <a className="ed-social-marker" key={s.platform} href={s.href}
                 target="_blank" rel="noreferrer"
                 style={{ "--mc": s.color } as React.CSSProperties}>
                <span className="ed-marker-dot" />
                <span className="ed-marker-platform">{s.platform}</span>
                <span className="ed-marker-handle">{s.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ruler ── */}
      <div className="ed-timeline-bar" aria-hidden="true">
        <div className="ed-tl-head" />
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="ed-tl-tick" style={{ left: `${i * 2.5}%` }}>
            {i % 5 === 0 && <span className="ed-tl-num">{String(i).padStart(2, "0")}</span>}
          </span>
        ))}
        <div className="ed-tl-playhead" />
      </div>

      {/* ── Editing styles ── */}
      <section className="ed-section ed-anim-2">
        <p className="ed-section-label">◈ EDITING STYLES &amp; DISCIPLINES</p>
        <div className="ed-clips">
          {STYLES.map((s) => (
            <div className="ed-clip" key={s.label} style={{ "--cc": s.color } as React.CSSProperties}>
              <div className="ed-clip-handle" />
              <div className="ed-clip-body">
                <p className="ed-clip-label">{s.label}</p>
                <p className="ed-clip-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Software ── */}
      <section className="ed-section ed-anim-3">
        <p className="ed-section-label">◈ SOFTWARE &amp; TOOLS</p>
        <div className="ed-software-row">
          {SOFTWARE.map((sw) => (
            <div className="ed-sw-card" key={sw.name}>
              <div className="ed-sw-abbr">{sw.abbr}</div>
              <div className="ed-sw-info">
                <p className="ed-sw-name">{sw.name}</p>
                <p className="ed-sw-role">{sw.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="ed-section ed-anim-4">
        <p className="ed-section-label">◈ TIMELINE · EXPERIENCE</p>
        <div className="ed-exp-track">
          {EXPERIENCE.map((e) => (
            <div className="ed-exp-entry" key={e.project}>
              <div className="ed-exp-year-col"><span className="ed-exp-year">{e.year}</span></div>
              <div className="ed-exp-line-col">
                <div className="ed-exp-dot" />
                <div className="ed-exp-line" />
              </div>
              <div className="ed-exp-content">
                <span className="ed-exp-label">{e.label}</span>
                <p className="ed-exp-project">{e.project}</p>
                <p className="ed-exp-desc">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button className="ed-back" onClick={() => router.push("/?view=cards")}>← BACK</button>
    </main>
  );
}