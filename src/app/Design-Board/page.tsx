"use client";
import "../styles/Design.css";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";

const PROFILE = {
  name:    "Zak",
  alias:   "RedLed",
  handle:  "redled.fx",
  role:    "Visual Designer & Creative Director",
  tagline: "Interfaces that feel inevitable.",
  years:   "3+",
  based:   "Algeria",
};

const SKILLS = [
  "UI Design", "Motion Design", "Branding & Identity",
  "Typography", "Grid Systems", "Color Theory",
  "Prototyping", "Visual Storytelling", "Design Systems",
  "Responsive Layouts", "Iconography", "3D & Render",
];

const SOFTWARE = [
  { name: "Figma",             role: "UI & Prototyping",      icon: "◈" },
  { name: "Adobe Photoshop",   role: "Photo & Compositing",   icon: "◧" },
  { name: "Adobe Illustrator", role: "Vector & Illustration", icon: "◭" },
  { name: "After Effects",     role: "Motion & Animation",    icon: "◉" },
  { name: "Blender",           role: "3D & Rendering",        icon: "◎" },
  { name: "Adobe XD",          role: "Wireframing & UX",      icon: "◫" },
];

const PROJECTS = [
  { title: "redled.fx — Portfolio",    year: "2025", tags: ["Brand Identity", "UI Design", "Motion"],          desc: "Full visual identity system — logo, color system, typography, web UI.", accent: "#0071e3" },
  { title: "Music Artist Visual Kit",  year: "2024", tags: ["Branding", "Print", "Social"],                    desc: "Complete brand package — cover arts, banners, animated social assets.", accent: "#bf5af2" },
  { title: "SaaS Dashboard UI",        year: "2024", tags: ["UI Design", "Figma", "Design System"],            desc: "Data-heavy dashboard with component library and dark/light modes.",   accent: "#30d158" },
  { title: "Motion Graphics Showreel", year: "2023", tags: ["Motion", "After Effects", "Typography"],          desc: "60-second reel — animated type, shape transitions, brand stings.",   accent: "#ff9f0a" },
];

const EXPERIENCE = [
  { year: "2025", title: "Creative Director",   place: "redled.fx — Self",       desc: "Full visual direction · brand · web · motion" },
  { year: "2024", title: "UI Designer",          place: "Freelance — Remote",     desc: "Multiple client projects · SaaS · social media" },
  { year: "2023", title: "Visual Designer",      place: "Personal Projects",      desc: "Identity design · illustration · motion graphics" },
  { year: "2022", title: "Design Studies Begin", place: "Self-taught + Courses",  desc: "Figma · Photoshop · fundamentals" },
];

export default function DesignBoard() {
  const router = useRouter();

  return (
    <main className="ds-root">
      <Navbar variant="design" />
      <div className="ds-bg-mesh" aria-hidden="true" />

      {/* ── HERO ── */}
      <section className="ds-hero ds-enter">
        <div className="ds-glass ds-hero-card">
          <div className="ds-hero-meta">
            <span className="ds-chip">{PROFILE.handle}</span>
            <span className="ds-chip ds-chip-outline">{PROFILE.based}</span>
          </div>
          <h1 className="ds-hero-name">{PROFILE.name}</h1>
          <p className="ds-hero-role">{PROFILE.role}</p>
          <p className="ds-hero-tagline">{PROFILE.tagline}</p>
          <div className="ds-hero-stats">
            <div className="ds-stat">
              <span className="ds-stat-num">{PROFILE.years}</span>
              <span className="ds-stat-label">Years</span>
            </div>
            <div className="ds-stat-div" />
            <div className="ds-stat">
              <span className="ds-stat-num">{PROJECTS.length}+</span>
              <span className="ds-stat-label">Projects</span>
            </div>
            <div className="ds-stat-div" />
            <div className="ds-stat">
              <span className="ds-stat-num">{SOFTWARE.length}</span>
              <span className="ds-stat-label">Tools</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section ds-anim-1">
        <h2 className="ds-section-title">Skills</h2>
        <div className="ds-skills-grid">
          {SKILLS.map((skill) => (
            <span className="ds-skill-pill" key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="ds-section ds-anim-2">
        <h2 className="ds-section-title">Software</h2>
        <div className="ds-software-grid">
          {SOFTWARE.map((sw) => (
            <div className="ds-glass ds-sw-card" key={sw.name}>
              <span className="ds-sw-icon">{sw.icon}</span>
              <div>
                <p className="ds-sw-name">{sw.name}</p>
                <p className="ds-sw-role">{sw.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ds-section ds-anim-3">
        <h2 className="ds-section-title">Selected Work</h2>
        <div className="ds-projects-grid">
          {PROJECTS.map((p) => (
            <div className="ds-glass ds-project-card" key={p.title}
                 style={{ "--pa": p.accent } as React.CSSProperties}>
              <div className="ds-project-accent-bar" />
              <div className="ds-project-body">
                <div className="ds-project-top">
                  <h3 className="ds-project-title">{p.title}</h3>
                  <span className="ds-project-year">{p.year}</span>
                </div>
                <p className="ds-project-desc">{p.desc}</p>
                <div className="ds-project-tags">
                  {p.tags.map((tag) => (
                    <span className="ds-project-tag" key={tag} style={{ color: p.accent }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ds-section ds-anim-4">
        <h2 className="ds-section-title">Experience</h2>
        <div className="ds-exp-list">
          {EXPERIENCE.map((e) => (
            <div className="ds-glass ds-exp-card" key={e.title + e.year}>
              <span className="ds-exp-year">{e.year}</span>
              <div className="ds-exp-content">
                <p className="ds-exp-title">{e.title}</p>
                <p className="ds-exp-place">{e.place}</p>
                <p className="ds-exp-desc">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button className="ds-back" onClick={() => router.push("/?view=cards")}>← Back</button>
    </main>
  );
}