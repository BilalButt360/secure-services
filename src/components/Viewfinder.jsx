import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { categoryByName } from "../data/catalog";

// Free-to-use photos from Pexels (Pexels License). If a photo can't load, the
// product cut-out of the same category is shown instead.
const px = (id, w = 1400) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const CHANNELS = [
  { cat: "CCTV Camera", photo: px(430208), alt: "Two bullet security cameras on a concrete wall" },
  { cat: "Fire & Safety", photo: px(12997193), alt: "Red fire alarm on a wall" },
  { cat: "Access Control", photo: px(37538043), alt: "Biometric access control reader at an entrance" },
  { cat: "Attendance Machine", photo: px(13657523, 1260), alt: "Employee scanning a fingerprint at an office door" },
].map((c) => ({ ...c, ...categoryByName[c.cat] }));

const pad = (n) => String(n).padStart(2, "0");
const stamp = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}  ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

export default function Viewfinder() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [broken, setBroken] = useState({});
  const ch = CHANNELS[i];
  const noPhoto = broken[ch.name];

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Warm the cache so channel switches don't flash.
  useEffect(() => {
    CHANNELS.forEach((c) => {
      const img = new Image();
      img.onerror = () => setBroken((b) => ({ ...b, [c.name]: true }));
      img.src = c.photo;
    });
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(() => setI((v) => (v + 1) % CHANNELS.length), 5600);
    return () => clearTimeout(t);
  }, [i, paused]);

  return (
    <div className="vf" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="vf-screen">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={ch.name}
            className="vf-feed"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.7 }, scale: { duration: 6.5, ease: "linear" } }}
          >
            {!noPhoto && <img className="vf-photo" src={ch.photo} alt={ch.alt} />}
            {noPhoto && <img className="vf-cutout" src={ch.cover} alt={ch.label} />}
          </motion.div>
        </AnimatePresence>

        <div className="vf-tint" />
        <div className="vf-grid" />
        <div className="vf-scan" />
        <span className="vf-corner tl" /><span className="vf-corner tr" /><span className="vf-corner bl" /><span className="vf-corner br" />

        <div className="vf-osd vf-osd-tl"><i className="rec-dot" /> REC <span>CAM {pad(i + 1)}</span></div>
        <div className="vf-osd vf-osd-tr">{stamp(now)}</div>
        <div className="vf-osd vf-osd-bl">SECURE SERVICES</div>

        <AnimatePresence mode="wait">
          <motion.div
            key={ch.name}
            className="vf-box"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="b tl" /><span className="b tr" /><span className="b bl" /><span className="b br" />
            <Link to={`/shop?category=${encodeURIComponent(ch.name)}`} className="vf-chip">
              {ch.label} · {ch.count} models
            </Link>
          </motion.div>
        </AnimatePresence>

        {!noPhoto && (
          <AnimatePresence mode="wait">
            <motion.div key={ch.name} className="vf-product" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.7, duration: 0.6 }}>
              <img src={ch.cover} alt="" />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="vf-channels" role="tablist" aria-label="Product channels">
        {CHANNELS.map((c, n) => (
          <button key={c.name} role="tab" aria-selected={n === i} className={`vf-ch ${n === i ? "is-on" : ""}`} onClick={() => setI(n)}>
            <img src={c.cover} alt="" />
            <span>CH {n + 1}</span>
            {n === i && <i key={i} className={`vf-progress ${paused ? "is-paused" : ""}`} />}
          </button>
        ))}
      </div>
    </div>
  );
}
