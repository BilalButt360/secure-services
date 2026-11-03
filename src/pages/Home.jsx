import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Viewfinder from "../components/Viewfinder";
import ProductCard from "../components/ProductCard";
import { ArrowLeft, ArrowRight, ArrowUpRight, PhoneIcon, WhatsAppIcon } from "../components/Icons";
import { allProducts, categories, picks } from "../data/catalog";
import { PHONE, PHONE_LINK, waLink } from "../config";

const HEADLINE = "Everything to keep your place secure.".split(" ");

// Drop your own clip at public/hero.mp4 and it plays behind the hero.
// Until then (or if it fails to load) the animated camera-beam backdrop shows.
function HeroMedia() {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.pause();
  }, []);

  return (
    <div className="hero-media" aria-hidden="true">
      <div className="hero-fallback">
        <i className="glow" />
        <i className="beam" />
        <i className="beam b2" />
      </div>
      {!failed && (
        <video
          ref={ref}
          className={ready ? "is-ready" : ""}
          src={`${process.env.PUBLIC_URL}/hero.mp4`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}
      <div className="hero-shade" />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <HeroMedia />
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title" aria-label={HEADLINE.join(" ")}>
            {HEADLINE.map((w, n) => (
              <span className="word-mask" key={n} aria-hidden="true">
                <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + n * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8 }}>
            CCTV, fire alarms, access control and office equipment. {allProducts.length} products in {categories.length} categories, ordered in one WhatsApp message.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>
            <Link to="/shop" className="btn btn-primary">Browse products</Link>
            <a className="btn btn-ghost" href={waLink("Hello, I'd like to ask about your products.")} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={18} /> Message us
            </a>
          </motion.div>
        </div>

        <motion.div className="hero-visual" initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <Viewfinder />
        </motion.div>
      </div>
    </section>
  );
}

function Tile({ c }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      className={`tile-wrap ${c.tile ? `is-${c.tile}` : ""}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/shop?category=${encodeURIComponent(c.name)}`} className="tile" onMouseMove={onMove}>
        <div className="tile-text">
          <h3>{c.label}</h3>
          <span>{c.count} {c.count === 1 ? "model" : "models"}</span>
        </div>
        <img src={c.cover} alt="" loading="lazy" />
        <span className="tile-go" aria-hidden="true"><ArrowUpRight size={18} /></span>
      </Link>
    </motion.div>
  );
}

function Categories() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Shop by category</h2>
          <p>From a single camera to a full fire panel. Pick a category to see every model we stock.</p>
        </div>
        <div className="bento">
          {categories.map((c) => (
            <Tile key={c.name} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Rail() {
  const ref = useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * 520, behavior: "smooth" });
  return (
    <section className="section section-tight">
      <div className="container">
        <div className="section-head section-head-row">
          <div>
            <h2>One from every category</h2>
            <p>A quick look at the range. The full catalog has {allProducts.length} products.</p>
          </div>
          <div className="rail-nav">
            <button className="icon-btn light" onClick={() => scroll(-1)} aria-label="Scroll back"><ArrowLeft size={18} /></button>
            <button className="icon-btn light" onClick={() => scroll(1)} aria-label="Scroll forward"><ArrowRight size={18} /></button>
          </div>
        </div>
      </div>
      <div className="rail" ref={ref} tabIndex={0} aria-label="Featured products">
        {picks.map((p) => (
          <div className="rail-item" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
        <div className="rail-item rail-end">
          <Link to="/shop" className="rail-all">
            <span>See all {allProducts.length} products</span>
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { t: "Find your product", d: "Browse by category, or press Ctrl K and type a product code." },
  { t: "Send it on WhatsApp", d: "Tap “Order on WhatsApp” on any product page. The code and category are already in the message." },
  { t: "Get price and availability", d: "We reply with the price and what's in stock, so you can decide before anything else." },
];

function Steps() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section className="steps">
      <div className="container steps-inner">
        <div className="steps-head">
          <h2>Ordering takes one message.</h2>
          <p>No account, no checkout. Pick a product and talk to us directly.</p>
        </div>
        <ol className="steps-list" ref={ref}>
          <span className="steps-track" aria-hidden="true"><motion.span style={{ scaleY }} /></span>
          {STEPS.map((s, n) => (
            <motion.li key={s.t} initial={{ opacity: 0.25 }} whileInView={{ opacity: 1 }} viewport={{ margin: "-35% 0px -35% 0px" }} transition={{ duration: 0.5 }}>
              <span className="step-n">{n + 1}</span>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta">
          <div>
            <h2>Not sure what you need?</h2>
            <p>Tell us about your home, shop or office and we'll suggest what fits.</p>
          </div>
          <div className="cta-actions">
            <a className="btn btn-dark" href={waLink("Hello, I need help choosing security equipment.")} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={18} /> Ask on WhatsApp
            </a>
            <a className="btn btn-line" href={PHONE_LINK}>
              <PhoneIcon size={18} /> {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Rail />
      <Steps />
      <Cta />
    </>
  );
}
