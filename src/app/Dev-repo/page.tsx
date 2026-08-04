"use client";
import "../styles/Dev.css";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";

/* ══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const PROFILE = {
  name:     "H.Zakaria",
  alias:    "Zak",
  role:     "Front-End Developer",
  Studies:  "University of Algiers 1 - La Fac Centrale",
  degree:   "1st year Computer Science — Web",
  location: "Algeria · DZ",
  status:   "available",
};

const SKILLS: { category: string; color: "blue" | "green" | "yellow" | "red"; items: string[] }[] = [
  { category: "Languages",        color: "blue",   items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "C"] },
  { category: "Frameworks",       color: "green",  items: ["React", "Next.js", "Tailwind CSS"] },
  { category: "Tools & Workflow", color: "yellow", items: ["Git", "GitHub", "VS Code", "Vite", "npm", "Code Blocks"] },
  { category: "Concepts",         color: "red",    items: ["Responsive Design", "Component Architecture", "UI/UX Fundamentals"] },
];

const EXPERIENCE = [
  { hash: "s2a2l4p", year: "2026", type: "build", msg: "built my first deployed project with my uni club" },
  { hash: "f4a2c9e", year: "2025", type: "feat",  msg: "learned more about technologies — React, Next" },
  { hash: "b3d8f12", year: "2025", type: "build", msg: "built my first Next.js + TypeScript app" },
  { hash: "7e1c403", year: "2024", type: "build", msg: "built my 1st animated UI" },
  { hash: "a0c5d77", year: "2023", type: "init",  msg: "learned the basics HTML CSS — built first landing page" },
];

const CONTACT = [
  { label: "github  ", value: "github.com/Zakaria-Ham",        href: "https://github.com/Zakaria-Ham" },
  { label: "pro     ", value: "linkedin.com/in/Zakaria-ham/",  href: "https://www.linkedin.com/in/Zakaria-ham/" },
  { label: "email   ", value: "contact.zakariaham@gmail.com",  href: "mailto:contact.zakariaham@gmail.com" },
];

const TYPE_CLASS: Record<string, string> = {
  feat:  "git-feat",
  build: "git-build",
  init:  "git-init",
};

/* ══════════════════════════════════════════════
   TERMINAL OUTPUT LINES
   Each line is { type, text, href? }
   types: default | green | blue | yellow | red | dim | error | success
═══════════════════════════════════════════════ */
type LineType = "default" | "green" | "blue" | "yellow" | "red" | "dim" | "error" | "success" | "gap";
interface Line { type: LineType; text: string; href?: string }

/* ── Command processor ── */
function runCommand(raw: string): Line[] {
  const cmd = raw.trim().toLowerCase();
  const args = cmd.split(/\s+/);

  switch (args[0]) {

    case "help":
      return [
        { type: "green",   text: "Available commands:" },
        { type: "dim",     text: "  whoami            — identity & status" },
        { type: "dim",     text: "  cat profile.json  — full profile as JSON" },
        { type: "dim",     text: "  ls skills/        — skill tree" },
        { type: "dim",     text: "  git log           — experience log" },
        { type: "dim",     text: "  cat contact.txt   — contact info" },
        { type: "dim",     text: "  pwd               — current path" },
        { type: "dim",     text: "  uname             — system info" },
        { type: "dim",     text: "  echo [text]       — print text" },
        { type: "dim",     text: "  clear             — clear terminal" },
        { type: "dim",     text: "  download          — export portfolio .txt" },
        { type: "gap",     text: "" },
        { type: "dim",     text: "  ↑ ↓  history  ·  Tab  autocomplete" },
      ];

    case "whoami":
      return [
        { type: "default", text: `${PROFILE.name}` },
        { type: "green",   text: `  role     ${PROFILE.role}` },
        { type: "blue",    text: `  alias    ${PROFILE.alias}` },
        { type: "dim",     text: `  location ${PROFILE.location}` },
        { type: "dim",     text: `  studies  ${PROFILE.Studies}` },
        { type: "success", text: `  ● ${PROFILE.status}` },
      ];

    case "cat":
      if (args[1] === "profile.json" || args[1] === "profile") {
        return [
          { type: "default", text: "{" },
          { type: "blue",    text: `  "name"      : "${PROFILE.name}",` },
          { type: "blue",    text: `  "alias"     : "${PROFILE.alias}",` },
          { type: "blue",    text: `  "role"      : "${PROFILE.role}",` },
          { type: "blue",    text: `  "studies"   : "${PROFILE.Studies}",` },
          { type: "blue",    text: `  "degree"    : "${PROFILE.degree}",` },
          { type: "yellow",  text: `  "available" : true,` },
          { type: "blue",    text: `  "location"  : "${PROFILE.location}"` },
          { type: "default", text: "}" },
        ];
      }
      if (args[1] === "contact.txt" || args[1] === "contact") {
        return CONTACT.map(c => ({ type: "blue" as LineType, text: `  ${c.label}  ${c.value}`, href: c.href }));
      }
      return [{ type: "error", text: `cat: ${args[1] ?? "?"}: No such file or directory` }];

    case "ls": {
      const flat = SKILLS.flatMap(g => g.items);
      return [
        { type: "dim",    text: "total " + flat.length },
        ...SKILLS.map(g => ({
          type: (g.color === "blue" ? "blue" : g.color === "green" ? "green" : g.color === "yellow" ? "yellow" : "red") as LineType,
          text: `  ${g.category}/  (${g.items.join(", ")})`,
        })),
      ];
    }

    case "git":
      if (args[1] === "log") {
        return EXPERIENCE.map(e => ({
          type: (e.type === "feat" ? "green" : e.type === "build" ? "blue" : "yellow") as LineType,
          text: `* ${e.hash} (${e.year}) ${e.type}: ${e.msg}`,
        }));
      }
      if (args[1] === "status") {
        return [
          { type: "green",   text: "On branch main" },
          { type: "success", text: "nothing to commit, working tree clean" },
        ];
      }
      return [{ type: "error", text: `git: '${args[1]}' is not a git command` }];

    case "pwd":
      return [{ type: "default", text: "/home/zak/showroom/dev-repo" }];

    case "uname":
      return [
        { type: "dim",    text: "RedLed-OS  v2.0.0  dev-build" },
        { type: "dim",    text: "Kernel: React 19 · Next.js 15 · TypeScript" },
        { type: "dim",    text: "Uptime: 3+ years" },
      ];

    case "echo":
      return [{ type: "default", text: args.slice(1).join(" ") || "" }];

    case "clear":
      return [{ type: "gap", text: "__CLEAR__" }]; // sentinel handled in component

    case "download":
    case "export":
      return [{ type: "success", text: "__DOWNLOAD__" }]; // sentinel

    case "":
      return [];

    default:
      return [
        { type: "error",   text: `zsh: command not found: ${args[0]}` },
        { type: "dim",     text: "type 'help' to see available commands" },
      ];
  }
}

/* ── Tab autocomplete hints ── */
const COMMANDS = [
  "help", "whoami", "cat profile.json", "cat contact.txt",
  "ls skills/", "git log", "git status", "pwd", "uname", "echo", "clear", "download",
];

function autocomplete(val: string): string {
  if (!val) return val;
  const match = COMMANDS.find(c => c.startsWith(val.toLowerCase()));
  return match ?? val;
}

/* ── Portfolio download ── */
function downloadPortfolio() {
  const lines = [
    "═══════════════════════════════════════════",
    "  DEV PORTFOLIO — H.Zakaria (Zak)",
    "═══════════════════════════════════════════",
    "",
    "ROLE        Front-End Developer",
    "STUDIES     " + PROFILE.Studies,
    "DEGREE      " + PROFILE.degree,
    "LOCATION    " + PROFILE.location,
    "STATUS      ● available",
    "",
    "─── SKILLS ─────────────────────────────────",
    ...SKILLS.map(g => `\n[${g.category}]\n  ${g.items.join(" · ")}`),
    "",
    "─── EXPERIENCE ──────────────────────────────",
    ...EXPERIENCE.map(e => `${e.year}  ${e.type.padEnd(6)}  ${e.msg}`),
    "",
    "─── CONTACT ─────────────────────────────────",
    ...CONTACT.map(c => `${c.label.trim().padEnd(8)}  ${c.value}`),
    "",
    "Generated by redled.fx · " + new Date().toLocaleDateString(),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "zak-dev-portfolio.txt";
  a.click();
  URL.revokeObjectURL(url);
}

/* ══════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════ */
interface HistoryEntry { cmd: string; lines: Line[] }

export default function DevRepo() {
  const router = useRouter();
  const ps1 = PROFILE.alias.toLowerCase();

  const [input,   setInput]   = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [cmdHist, setCmdHist] = useState<string[]>([]);   // arrow-key history
  const [histIdx, setHistIdx] = useState(-1);

  const inputRef   = useRef<HTMLInputElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const bodyRef    = useRef<HTMLDivElement>(null);

  /* Auto-scroll to bottom on new output */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  /* Focus input when clicking anywhere in terminal body */
  const focusInput = () => inputRef.current?.focus();

  /* Handle keydown inside the input */
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = input.trim();
      const lines   = runCommand(trimmed);

      /* Sentinel: clear */
      if (lines[0]?.text === "__CLEAR__") {
        setHistory([]);
        setInput("");
        setHistIdx(-1);
        return;
      }

      /* Sentinel: download */
      if (lines[0]?.text === "__DOWNLOAD__") {
        downloadPortfolio();
        setHistory(h => [...h, {
          cmd: trimmed,
          lines: [{ type: "success", text: "  ✓ downloading zak-dev-portfolio.txt …" }],
        }]);
        setInput("");
        setHistIdx(-1);
        if (trimmed) setCmdHist(h => [trimmed, ...h.slice(0, 49)]);
        return;
      }

      setHistory(h => [...h, { cmd: trimmed, lines }]);
      if (trimmed) setCmdHist(h => [trimmed, ...h.slice(0, 49)]);
      setInput("");
      setHistIdx(-1);
    }

    /* Arrow-key command history */
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(next);
      setInput(cmdHist[next] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInput(""); }
      else          { setHistIdx(next); setInput(cmdHist[next] ?? ""); }
    }

    /* Tab autocomplete */
    if (e.key === "Tab") {
      e.preventDefault();
      setInput(autocomplete(input));
    }
  };

  return (
    <main className="dev-root">
      <Navbar variant="dev" />
      <div className="dev-scanlines" aria-hidden="true" />

      <div className="dev-terminal dev-enter">
        {/* Title bar */}
        <header className="dev-titlebar">
          <div className="dev-dots">
            <span className="dev-dot dot-close" onClick={() => router.push("/?view=cards")} title="Back" />
            <span className="dev-dot dot-min" />
            <span className="dev-dot dot-max" />
          </div>
          <span className="dev-title-text">{ps1}@hmd — ~/showroom/dev-repo</span>
          <span className="dev-title-right">zsh</span>
        </header>

        {/* ── Static boot sections ── */}
        <div className="dev-body" ref={bodyRef} onClick={focusInput}>

          {/* whoami */}
          <section className="dev-block dev-anim-1">
            <p className="dev-cmd"><span className="dev-ps1">{ps1}@redled</span><span className="dev-ps2">:~/dev$</span> whoami</p>
            <div className="dev-whoami">
              <p className="dev-out-name">{PROFILE.name} — <span className="dev-green">{PROFILE.role}</span></p>
              <p className="dev-out-sub">alias <span className="dev-blue">{PROFILE.alias}</span>&nbsp;·&nbsp;<span className="dev-dim">{PROFILE.location}</span></p>
              <span className={`dev-status ${PROFILE.status === "available" ? "status-on" : "status-off"}`}>● {PROFILE.status}</span>
            </div>
          </section>

          {/* profile.json */}
          <section className="dev-block dev-anim-2">
            <p className="dev-cmd"><span className="dev-ps1">{ps1}@redled</span><span className="dev-ps2">:~/dev$</span> cat profile.json</p>
            <div className="dev-json">
              <p><span className="jb">{"{"}</span></p>
              <p>&nbsp;&nbsp;<span className="jk">&quot;name&quot;</span><span className="jp">:</span> <span className="js">&quot;{PROFILE.name}&quot;</span><span className="jp">,</span></p>
              <p>&nbsp;&nbsp;<span className="jk">&quot;alias&quot;</span><span className="jp">:</span> <span className="js">&quot;{PROFILE.alias}&quot;</span><span className="jp">,</span></p>
              <p>&nbsp;&nbsp;<span className="jk">&quot;role&quot;</span><span className="jp">:</span> <span className="js">&quot;{PROFILE.role}&quot;</span><span className="jp">,</span></p>
              <p>&nbsp;&nbsp;<span className="jk">&quot;studies&quot;</span><span className="jp">:</span> <span className="js">&quot;{PROFILE.Studies}&quot;</span><span className="jp">,</span></p>
              <p>&nbsp;&nbsp;<span className="jk">&quot;degree&quot;</span><span className="jp">:</span> <span className="js">&quot;{PROFILE.degree}&quot;</span><span className="jp">,</span></p>
              <p>&nbsp;&nbsp;<span className="jk">&quot;available&quot;</span><span className="jp">:</span> <span className="jbool">true</span><span className="jp">,</span></p>
              <p>&nbsp;&nbsp;<span className="jk">&quot;location&quot;</span><span className="jp">:</span> <span className="js">&quot;{PROFILE.location}&quot;</span></p>
              <p><span className="jb">{"}"}</span></p>
            </div>
          </section>

          {/* skills */}
          <section className="dev-block dev-anim-3">
            <p className="dev-cmd"><span className="dev-ps1">{ps1}@redled</span><span className="dev-ps2">:~/dev$</span> ls -la skills/</p>
            <div className="dev-skills-grid">
              {SKILLS.map((group) => (
                <div className="dev-skill-group" key={group.category} data-color={group.color}>
                  <p className="dev-skill-cat"><span className="dev-comment">// </span>{group.category}</p>
                  <div className="dev-skill-tags">
                    {group.items.map((item) => (
                      <span className="dev-skill-tag" key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* git log */}
          <section className="dev-block dev-anim-4">
            <p className="dev-cmd"><span className="dev-ps1">{ps1}@redled</span><span className="dev-ps2">:~/dev$</span> git log --oneline --graph</p>
            <div className="dev-gitlog">
              {EXPERIENCE.map((e) => (
                <div className="dev-git-row" key={e.hash}>
                  <span className="dev-git-tree">*</span>
                  <span className="dev-git-hash">{e.hash}</span>
                  <span className="dev-git-year">({e.year})</span>
                  <span className={`dev-git-type ${TYPE_CLASS[e.type] ?? ""}`}>{e.type}:</span>
                  <span className="dev-git-msg">{e.msg}</span>
                </div>
              ))}
            </div>
          </section>

          {/* contact */}
          <section className="dev-block dev-anim-5">
            <p className="dev-cmd"><span className="dev-ps1">{ps1}@redled</span><span className="dev-ps2">:~/dev$</span> cat contact.txt</p>
            <div className="dev-contact">
              {CONTACT.map((c) => (
                <p key={c.label}>
                  <span className="dev-contact-label">{c.label}</span>
                  <a className="dev-contact-link" href={c.href} target="_blank" rel="noreferrer">{c.value}</a>
                </p>
              ))}
            </div>
          </section>

          {/* ── Dynamic command history ── */}
          {history.map((entry, i) => (
            <div className="dev-block" key={i}>
              {/* The command that was typed */}
              <p className="dev-cmd">
                <span className="dev-ps1">{ps1}@redled</span>
                <span className="dev-ps2">:~/dev$</span>
                &nbsp;
                <span className="dev-typed-cmd">{entry.cmd}</span>
              </p>
              {/* Its output */}
              <div className="dev-output">
                {entry.lines.map((line, j) => (
                  <p key={j} className={`dev-out-line dev-out-${line.type}`}>
                    {line.href
                      ? <a href={line.href} target="_blank" rel="noreferrer" className="dev-contact-link">{line.text}</a>
                      : line.text
                    }
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* ── Live input prompt ── */}
          <div className="dev-block dev-prompt-live" ref={bottomRef}>
            <label className="dev-cmd dev-prompt-row" htmlFor="term-input">
              <span className="dev-ps1">{ps1}@redled</span>
              <span className="dev-ps2">:~/dev$</span>
              &nbsp;
              <input
                id="term-input"
                ref={inputRef}
                className="dev-term-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
              <span className="dev-cursor" aria-hidden="true" />
            </label>
            <p className="dev-hint">type <span className="dev-green">help</span> for commands &nbsp;·&nbsp; <span className="dev-dim">↑↓ history · Tab autocomplete</span></p>
          </div>

        </div>
      </div>

      {/* ── Download button ── */}
      <div className="dev-download-row">
        <button className="dev-download-btn" onClick={downloadPortfolio}>
          <span className="dev-download-icon">⬇</span>
          <span>export portfolio</span>
          <span className="dev-dim">.txt</span>
        </button>
      </div>

      <button className="dev-back" onClick={() => router.push("/?view=cards")}>
        <span className="dev-dim">$</span> cd ..
      </button>
    </main>
  );
}