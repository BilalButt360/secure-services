import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { BRAND, waLink } from "../config";
import { CloseIcon, SearchIcon, WhatsAppIcon } from "./Icons";
import logo from "../Images/logo.png";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-bar">
          <Link to="/" className="brand" aria-label={`${BRAND} home`}>
            <img className="brand-logo" src={logo} alt={BRAND} />
          </Link>

          <nav className="nav-links" aria-label="Main">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}>
                {({ isActive }) => (
                  <>
                    {isActive && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                    {l.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="nav-search" onClick={onSearch} aria-label="Search products">
              <SearchIcon size={19} />
              <span className="ns-text">Search products</span>
              <span className="kbd">Ctrl K</span>
            </button>
            <a className="btn btn-wa nav-cta" href={waLink("Hello, I'd like to ask about your products.")} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={18} /> Order on WhatsApp
            </a>
            <button className="icon-btn nav-toggle" onClick={() => setOpen(true)} aria-label="Open menu">
              <span aria-hidden="true" style={{ display: "grid", gap: 5 }}>
                <i style={{ width: 18, height: 2, background: "currentColor", borderRadius: 2 }} />
                <i style={{ width: 12, height: 2, background: "currentColor", borderRadius: 2, justifySelf: "end" }} />
              </span>
            </button>
          </div>
          <motion.span className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="icon-btn mobile-close" onClick={() => setOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </button>
            {LINKS.map((l, i) => (
              <motion.div key={l.to} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}>
                <Link to={l.to} className={`m-link ${pathname === l.to ? "is-active" : ""}`}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <a className="btn btn-wa" style={{ marginTop: "auto" }} href={waLink("Hello, I'd like to ask about your products.")} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={18} /> Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
