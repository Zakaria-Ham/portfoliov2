"use client";
import "./styles/App.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouch(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  return isTouch;
}

function FluidCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const glowPos = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const mouse = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (outerRef.current) {
        outerRef.current.style.left = `${e.clientX}px`;
        outerRef.current.style.top = `${e.clientY}px`;
      }
      if (innerRef.current) {
        innerRef.current.style.left = `${e.clientX}px`;
        innerRef.current.style.top = `${e.clientY}px`;
      }
    };

    const loop = () => {
      glowPos.current.x += (mouse.current.x - glowPos.current.x) * 0.05;
      glowPos.current.y += (mouse.current.y - glowPos.current.y) * 0.05;
      if (glowRef.current) {
        glowRef.current.style.left = `${glowPos.current.x}px`;
        glowRef.current.style.top = `${glowPos.current.y}px`;
      }
      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={outerRef} className="cursor-outer" />
      <div ref={innerRef} className="cursor-inner" />
    </>
  );
}

const CARDS = [
  {
    id: "Dev-card",
    tag: "Code",
    title: "Developer",
    desc: "Building interactive scalable products",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    alt: "Code on screen",
    route: "/Dev-repo",
  },
  {
    id: "Editing-card",
    tag: "Visual",
    title: "Editor",
    desc: "Crafting stories through cuts",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
    alt: "Video editing timeline",
    route: "/Editing-Timeline",
  },
  {
    id: "Design-card",
    tag: "Inspire",
    title: "Designer",
    desc: "Shaping ideas into Creatives",
    img: "https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=600&q=80",
    alt: "Design workspace",
    route: "/Design-Board",
  },
];

function Home() {
  const router = useRouter();
  const isTouch = useIsTouchDevice();
  const [showCards, setShowCards] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const saved = window.sessionStorage.getItem("portfolio-view");
    if (saved === "cards") setShowCards(true);
  }, []);

  useEffect(() => {
    if (!showCards) {
      const timer = window.setTimeout(() => setIsClosing(false), 300);
      return () => window.clearTimeout(timer);
    }
  }, [showCards]);

  const handleExplore = () => {
    setIsClosing(false);
    setShowCards(true);
    window.sessionStorage.setItem("portfolio-view", "cards");
  };

  const handleBack = () => {
    setIsClosing(true);
    window.sessionStorage.setItem("portfolio-view", "landing");
    window.setTimeout(() => {
      setShowCards(false);
    }, 850);
  };

  const handleCardClick = (route: string) => {
    window.sessionStorage.setItem("portfolio-view", "cards");
    router.push(route);
  };

  return (
    <>
      {!isTouch && <FluidCursor />}

      <div
        className={`home-scene ${showCards ? "cards-active" : ""} ${isClosing ? "cards-closing" : ""}`}
      >
        <div className={`landing-layer ${showCards ? "is-blurred" : ""}`}>
          <div className="landing-container page-enter">
            <div className="Landing-background">
              <div className="grid-lines" />
              <div className="landing-content">
                <h1>Zak's ShowRoom</h1>
                <p className="subtitle">also known as RedLed.</p>
                <button className="Experience-button" onClick={handleExplore}>
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`cards-overlay ${showCards ? "visible" : ""}`}>
          <div className="Cards-page page-enter">
            <div className="Cards-container">
              {CARDS.map((c) => (
                <div
                  className={`card ${isClosing ? "card-exit" : ""}`}
                  id={c.id}
                  key={c.id}
                  onClick={() => handleCardClick(c.route)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleCardClick(c.route)
                  }
                >
                  <span className="card-tag">{c.tag}</span>
                  <div className="card-image">
                    <img src={c.img} alt={c.alt} />
                  </div>
                  <div className="card-details">
                    <h2>{c.title}</h2>
                    <div className="card-accent-line" />
                    <p>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <nav className="back-nav">
              <button className="back-button" onClick={handleBack}>
                ← Back
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return <Home />;
}
