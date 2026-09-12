"use client";
import "../styles/Dev.css";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import ProjectDetailes from "../components/projectDetailes";

const PROFILE = {
  name: "H.Zakaria",
  alias: "Zak",
  role: "Front-End Developer",
  Studies: "University of Algiers 1 - La Fac Centrale",
  degree: "1st date Computer Science — Web",
  location: "Algeria · DZ",
  status: "available",
};

const SKILLS: {
  category: string;
  color: "blue" | "green" | "yellow" | "red";
  items: string[];
}[] = [
  {
    category: "Languages",
    color: "blue",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "C"],
  },
  {
    category: "Frameworks & Libraries",
    color: "green",
    items: [
      "React",
      "Next.js",
      "Electron",
      "Tailwind CSS",
      "React Native",
      "Expo",
    ],
  },
  {
    category: "Tools & Workflow",
    color: "yellow",
    items: ["Git", "GitHub", "VS Code", "Vite", "npm"],
  },
  {
    category: "Concepts",
    color: "red",
    items: [
      "Cross-Platform Mobile Development",
      "Component Architecture",
      "State Management (Context API)",
      "File-Based Routing",
      "Custom Theming Systems (Light/Dark)",
      "TypeScript Data Modeling",
      "Geolocation & Maps Integration",
      "Interactive UI & Animation",
      "Complex Client-Side Game/State Logic",
    ],
  },
];

const EXPERIENCE = [
  {
    hash: "8hdf8wq",
    date: "september 2026",
    type: "build",
    msg: "ACTV app",
    appUrl: "https://mega.nz/file/REJk0AoQ#VtPeLzycEg4TBUf1EKtGy_VT7noOVuJ30Wpzt-pMfns",
    githubUrl: "https://github.com/Zakaria-Ham/Active",
    description:
      "A local-first activity planner built with React Native and Expo. It combines tasks, scheduling, and an interactive map to organize sport, study, and everyday activities.",
  },
  {
    hash: "sadie3w",
    date: "July 26",
    type: "build",
    msg: "15 Tiles game on web",
    appUrl: "https://15-tiles-game.vercel.app",
    githubUrl: "https://github.com/Zakaria-Ham/15-Tiles-Game",
    description:
      "A browser-based 15 Tiles puzzle game where the goal is to rearrange the numbered tiles into their solved order. Built as an interactive web game with a custom solver and gameplay features.",
  },
  {
    hash: "j2h1l41",
    date: "june 26",
    type: "build",
    msg: "Smart Color picker in Hex",
    appUrl: "",
    githubUrl: "https://github.com/Zakaria-Ham/Color-Picker",
    description: "",
  },
  {
    hash: "08f3s2c",
    date: "May 26",
    type: "front-end",
    msg: "My Own online Portfolio",
    appUrl: "https://zaksshowroom.vercel.app",
    githubUrl: "https://github.com/Zakaria-Ham/portfoliov2",
    description:
      "A personal interactive portfolio showcasing development, visual editing, and design work through a cinematic, experience-focused interface.",
  },
  {
    hash: "s1a2l4p",
    date: "April 26",
    type: "init",
    msg: "Hackathon Website",
    appUrl: "https://hack2night-4bea3.firebaseapp.com",
    githubUrl: "",
    description: "A registration webstie for Hack2Night hackathon 2nd edition built with next.js. node.js and firebase for participant's regestrations.",
  },
  {
    hash: "32jsl4d",
    date: "March 26",
    type: "feat",
    msg: "WebGame competition Winners (ft.Akram S)",
    appUrl: "https://broken-internet.netlify.app",
    githubUrl: "https://github.com/Zakaria-Ham/Broken-Game",
    description:
      "A web game project created for a competition, built around the concept of a deliberately broken internet experience.",
  },
  {
    hash: "b3d8f12",
    date: "December 25",
    type: "front-end",
    msg: "Hackathon Participant 5th place",
    appUrl: "",
    githubUrl: "",
    description: "A web-based app to recieve and handle client's tickets and divide them between support team and 24/7 AI-Agent.",
  },
];

const CONTACT = [
  {
    label: "github  ",
    value: "github.com/Zakaria-Ham",
    href: "https://github.com/Zakaria-Ham",
  },
  {
    label: "pro     ",
    value: "linkedin.com/in/Zakaria-ham/",
    href: "https://www.linkedin.com/in/Zakaria-ham/",
  },
  {
    label: "email   ",
    value: "contact.zakariaham@gmail.com",
    href: "mailto:contact.zakariaham@gmail.com",
  },
];

function detailsPopUp(item: (typeof EXPERIENCE)[number], onClose: () => void) {
  return (
    <ProjectDetailes
      hash={item.hash}
      date={item.date}
      title={item.msg}
      description={item.description}
      appUrl={item.appUrl}
      githubUrl={item.githubUrl}
      onClose={onClose}
    />
  );
}

const TYPE_CLASS: Record<string, string> = {
  feat: "git-feat",
  "front-end": "git-front-end",
  build: "git-build",
  init: "git-init",
};

type LineType =
  | "default"
  | "green"
  | "blue"
  | "yellow"
  | "red"
  | "dim"
  | "error"
  | "success"
  | "gap";
interface Line {
  type: LineType;
  text: string;
  href?: string;
}

function runCommand(raw: string): Line[] {
  const cmd = raw.trim().toLowerCase();
  const args = cmd.split(/\s+/);

  switch (args[0]) {
    case "help":
      return [
        { type: "green", text: "Available commands:" },
        { type: "dim", text: "  whoami            — identity & status" },
        { type: "dim", text: "  cat profile.json  — full profile as JSON" },
        { type: "dim", text: "  ls skills/        — skill tree" },
        { type: "dim", text: "  git log           — experience log" },
        { type: "dim", text: "  cat contact.txt   — contact info" },
        { type: "dim", text: "  pwd               — current path" },
        { type: "dim", text: "  uname             — system info" },
        { type: "dim", text: "  echo [text]       — print text" },
        { type: "dim", text: "  clear             — clear terminal" },
        { type: "dim", text: "  download          — export portfolio .txt" },
        { type: "gap", text: "" },
        { type: "dim", text: "  ↑ ↓  history  ·  Tab  autocomplete" },
      ];

    case "whoami":
      return [
        { type: "default", text: `${PROFILE.name}` },
        { type: "green", text: `  role     ${PROFILE.role}` },
        { type: "blue", text: `  alias    ${PROFILE.alias}` },
        { type: "dim", text: `  location ${PROFILE.location}` },
        { type: "dim", text: `  studies  ${PROFILE.Studies}` },
        { type: "success", text: `  ● ${PROFILE.status}` },
      ];

    case "cat":
      if (args[1] === "profile.json" || args[1] === "profile") {
        return [
          { type: "default", text: "{" },
          { type: "blue", text: `  "name"      : "${PROFILE.name}",` },
          { type: "blue", text: `  "alias"     : "${PROFILE.alias}",` },
          { type: "blue", text: `  "role"      : "${PROFILE.role}",` },
          { type: "blue", text: `  "studies"   : "${PROFILE.Studies}",` },
          { type: "blue", text: `  "degree"    : "${PROFILE.degree}",` },
          { type: "yellow", text: `  "available" : true,` },
          { type: "blue", text: `  "location"  : "${PROFILE.location}"` },
          { type: "default", text: "}" },
        ];
      }
      if (args[1] === "contact.txt" || args[1] === "contact") {
        return CONTACT.map((c) => ({
          type: "blue" as LineType,
          text: `  ${c.label}  ${c.value}`,
          href: c.href,
        }));
      }
      return [
        {
          type: "error",
          text: `cat: ${args[1] ?? "?"}: No such file or directory`,
        },
      ];

    case "ls": {
      const flat = SKILLS.flatMap((g) => g.items);
      return [
        { type: "dim", text: "total " + flat.length },
        ...SKILLS.map((g) => ({
          type: (g.color === "blue"
            ? "blue"
            : g.color === "green"
              ? "green"
              : g.color === "yellow"
                ? "yellow"
                : "red") as LineType,
          text: `  ${g.category}/  (${g.items.join(", ")})`,
        })),
      ];
    }

    case "git":
      if (args[1] === "log") {
        return EXPERIENCE.map((e) => ({
          type: (e.type === "feat"
            ? "green"
            : e.type === "build"
              ? "blue"
              : "yellow") as LineType,
          text: `* ${e.hash} (${e.date}) ${e.type}: ${e.msg}`,
        }));
      }
      if (args[1] === "status") {
        return [
          { type: "green", text: "On branch main" },
          { type: "success", text: "nothing to commit, working tree clean" },
        ];
      }
      return [
        { type: "error", text: `git: '${args[1]}' is not a git command` },
      ];

    case "pwd":
      return [{ type: "default", text: "/home/zak/showroom/dev-repo" }];

    case "uname":
      return [
        { type: "dim", text: "RedLed-OS  v2.0.0  dev-build" },
        { type: "dim", text: "Kernel: React 19 · Next.js 15 · TypeScript" },
        { type: "dim", text: "Uptime: 3+ dates" },
      ];

    case "echo":
      return [{ type: "default", text: args.slice(1).join(" ") || "" }];

    case "clear":
      return [{ type: "gap", text: "__CLEAR__" }];

    case "download":
    case "export":
      return [{ type: "success", text: "__DOWNLOAD__" }];

    case "":
      return [];

    default:
      return [
        { type: "error", text: `zsh: command not found: ${args[0]}` },
        { type: "dim", text: "type 'help' to see available commands" },
      ];
  }
}

const COMMANDS = [
  "help",
  "whoami",
  "cat profile.json",
  "cat contact.txt",
  "ls skills/",
  "git log",
  "git status",
  "pwd",
  "uname",
  "echo",
  "clear",
  "download",
];

function autocomplete(val: string): string {
  if (!val) return val;
  const match = COMMANDS.find((c) => c.startsWith(val.toLowerCase()));
  return match ?? val;
}

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
    ...SKILLS.map((g) => `\n[${g.category}]\n  ${g.items.join(" · ")}`),
    "",
    "─── EXPERIENCE ──────────────────────────────",
    ...EXPERIENCE.map((e) => `${e.date}  ${e.type.padEnd(6)}  ${e.msg}`),
    "",
    "─── CONTACT ─────────────────────────────────",
    ...CONTACT.map((c) => `${c.label.trim().padEnd(8)}  ${c.value}`),
    "",
    "Generated by redled.fx · " + new Date().toLocaleDateString(),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "zak-dev-portfolio.txt";
  a.click();
  URL.revokeObjectURL(url);
}

interface HistoryEntry {
  cmd: string;
  lines: Line[];
}

export default function DevRepo() {
  const router = useRouter();
  const ps1 = PROFILE.alias.toLowerCase();

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<(typeof EXPERIENCE)[number] | null>(
    null,
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const focusInput = () => {
    if (!selected) inputRef.current?.focus();
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = input.trim();
      const lines = runCommand(trimmed);

      if (lines[0]?.text === "__CLEAR__") {
        setHistory([]);
        setInput("");
        setHistIdx(-1);
        return;
      }

      if (lines[0]?.text === "__DOWNLOAD__") {
        downloadPortfolio();
        setHistory((h) => [
          ...h,
          {
            cmd: trimmed,
            lines: [
              {
                type: "success",
                text: "  ✓ downloading zak-dev-portfolio.txt …",
              },
            ],
          },
        ]);
        setInput("");
        setHistIdx(-1);
        if (trimmed) setCmdHist((h) => [trimmed, ...h.slice(0, 49)]);
        return;
      }

      setHistory((h) => [...h, { cmd: trimmed, lines }]);
      if (trimmed) setCmdHist((h) => [trimmed, ...h.slice(0, 49)]);
      setInput("");
      setHistIdx(-1);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(next);
      setInput(cmdHist[next] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(next);
        setInput(cmdHist[next] ?? "");
      }
    }

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
        <header className="dev-titlebar">
          <div className="dev-dots">
            <span
              className="dev-dot dot-close"
              onClick={() => router.push("/?view=cards")}
              title="Back"
            />
            <span className="dev-dot dot-min" />
            <span className="dev-dot dot-max" />
          </div>
          <span className="dev-title-text">
            {ps1}@hmd — ~/showroom/dev-repo
          </span>
          <span className="dev-title-right">zsh</span>
        </header>

        <div className="dev-body" ref={bodyRef} onClick={focusInput}>
          <section className="dev-block dev-anim-1">
            <p className="dev-cmd">
              <span className="dev-ps1">{ps1}@redled</span>
              <span className="dev-ps2">:~/dev$</span> whoami
            </p>
            <div className="dev-whoami">
              <p className="dev-out-name">
                {PROFILE.name} —{" "}
                <span className="dev-green">{PROFILE.role}</span>
              </p>
              <p className="dev-out-sub">
                alias <span className="dev-blue">{PROFILE.alias}</span>
                &nbsp;·&nbsp;<span className="dev-dim">{PROFILE.location}</span>
              </p>
              <span
                className={`dev-status ${PROFILE.status === "available" ? "status-on" : "status-off"}`}
              >
                ● {PROFILE.status}
              </span>
            </div>
          </section>

          <section className="dev-block dev-anim-2">
            <p className="dev-cmd">
              <span className="dev-ps1">{ps1}@redled</span>
              <span className="dev-ps2">:~/dev$</span> cat profile.json
            </p>
            <div className="dev-json">
              <p>
                <span className="jb">{"{"}</span>
              </p>
              <p>
                &nbsp;&nbsp;<span className="jk">&quot;name&quot;</span>
                <span className="jp">:</span>{" "}
                <span className="js">&quot;{PROFILE.name}&quot;</span>
                <span className="jp">,</span>
              </p>
              <p>
                &nbsp;&nbsp;<span className="jk">&quot;alias&quot;</span>
                <span className="jp">:</span>{" "}
                <span className="js">&quot;{PROFILE.alias}&quot;</span>
                <span className="jp">,</span>
              </p>
              <p>
                &nbsp;&nbsp;<span className="jk">&quot;role&quot;</span>
                <span className="jp">:</span>{" "}
                <span className="js">&quot;{PROFILE.role}&quot;</span>
                <span className="jp">,</span>
              </p>
              <p>
                &nbsp;&nbsp;<span className="jk">&quot;studies&quot;</span>
                <span className="jp">:</span>{" "}
                <span className="js">&quot;{PROFILE.Studies}&quot;</span>
                <span className="jp">,</span>
              </p>
              <p>
                &nbsp;&nbsp;<span className="jk">&quot;degree&quot;</span>
                <span className="jp">:</span>{" "}
                <span className="js">&quot;{PROFILE.degree}&quot;</span>
                <span className="jp">,</span>
              </p>
              <p>
                &nbsp;&nbsp;<span className="jk">&quot;available&quot;</span>
                <span className="jp">:</span>{" "}
                <span className="jbool">true</span>
                <span className="jp">,</span>
              </p>
              <p>
                &nbsp;&nbsp;<span className="jk">&quot;location&quot;</span>
                <span className="jp">:</span>{" "}
                <span className="js">&quot;{PROFILE.location}&quot;</span>
              </p>
              <p>
                <span className="jb">{"}"}</span>
              </p>
            </div>
          </section>

          <section className="dev-block dev-anim-3">
            <p className="dev-cmd">
              <span className="dev-ps1">{ps1}@redled</span>
              <span className="dev-ps2">:~/dev$</span> ls -la skills/
            </p>
            <div className="dev-skills-grid">
              {SKILLS.map((group) => (
                <div
                  className="dev-skill-group"
                  key={group.category}
                  data-color={group.color}
                >
                  <p className="dev-skill-cat">
                    <span className="dev-comment">// </span>
                    {group.category}
                  </p>
                  <div className="dev-skill-tags">
                    {group.items.map((item) => (
                      <span className="dev-skill-tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dev-block dev-anim-4">
            <p className="dev-cmd">
              <span className="dev-ps1">{ps1}@redled</span>
              <span className="dev-ps2">:~/dev$</span> git log --oneline --graph
            </p>
            <div className="dev-gitlog">
              {EXPERIENCE.map((e) => (
                <div
                  className="dev-git-row"
                  key={e.hash}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setSelected(e);
                  }}
                >
                  <span className="dev-git-tree">*</span>
                  <span className="dev-git-hash">{e.hash}</span>
                  <span className="dev-git-date">({e.date})</span>
                  <span className={`dev-git-type ${TYPE_CLASS[e.type] ?? ""}`}>
                    {e.type}:
                  </span>

                  <span className="dev-git-msg">
                    {e.msg}

                    {(e.appUrl || e.githubUrl) && (
                      <a
                        href={e.appUrl || e.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="dev-experience-link"
                        onClick={(ev) => ev.stopPropagation()}
                      >
                        click here
                      </a>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="dev-block dev-anim-5">
            <p className="dev-cmd">
              <span className="dev-ps1">{ps1}@redled</span>
              <span className="dev-ps2">:~/dev$</span> cat contact.txt
            </p>
            <div className="dev-contact">
              {CONTACT.map((c) => (
                <p key={c.label}>
                  <span className="dev-contact-label">{c.label}</span>
                  <a
                    className="dev-contact-link"
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {c.value}
                  </a>
                </p>
              ))}
            </div>
          </section>

          {history.map((entry, i) => (
            <div className="dev-block" key={i}>
              <p className="dev-cmd">
                <span className="dev-ps1">{ps1}@redled</span>
                <span className="dev-ps2">:~/dev$</span>
                &nbsp;
                <span className="dev-typed-cmd">{entry.cmd}</span>
              </p>
              <div className="dev-output">
                {entry.lines.map((line, j) => (
                  <p key={j} className={`dev-out-line dev-out-${line.type}`}>
                    {line.href ? (
                      <a
                        href={line.href}
                        target="_blank"
                        rel="noreferrer"
                        className="dev-contact-link"
                      >
                        {line.text}
                      </a>
                    ) : (
                      line.text
                    )}
                  </p>
                ))}
              </div>
            </div>
          ))}

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
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
              <span className="dev-cursor" aria-hidden="true" />
            </label>

            <p className="dev-hint">
              type <span className="dev-green">help</span> for commands
              &nbsp;·&nbsp;
              <span className="dev-dim">↑↓ history · Tab autocomplete</span>
            </p>
          </div>
        </div>
      </div>

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

      {selected && (
        <div className="dev-modal-backdrop" onClick={() => setSelected(null)}>
          <div onClick={(ev) => ev.stopPropagation()}>
            {detailsPopUp(selected, () => setSelected(null))}
          </div>
        </div>
      )}
    </main>
  );
}
