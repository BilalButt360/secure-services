import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { allProducts, labelOf } from "../data/catalog";
import { SearchIcon } from "./Icons";

export default function SearchPalette({ open, onClose }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    const list = t
      ? allProducts.filter(
          (p) => p.code.toLowerCase().includes(t) || labelOf(p.category).toLowerCase().includes(t) || p.category.toLowerCase().includes(t)
        )
      : allProducts.slice(0, 6);
    return list.slice(0, 8);
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => setIdx(0), [q]);

  const go = (p) => {
    onClose();
    navigate(`/shop/${p.id}`);
  };

  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[idx]) go(results[idx]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="palette"
            role="dialog"
            aria-label="Search products"
            initial={{ y: -20, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -10, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            onKeyDown={onKey}
          >
            <div className="palette-input">
              <SearchIcon />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by product code or category" aria-label="Search" />
            </div>
            <div className="palette-list">
              {results.length === 0 && <p className="palette-empty">No product matches “{q}”. Try a code like SS-CC-001 or a category like fire.</p>}
              {results.map((p, i) => (
                <button key={p.id} className={`palette-item ${i === idx ? "is-on" : ""}`} onMouseEnter={() => setIdx(i)} onClick={() => go(p)}>
                  <img src={p.image} alt="" />
                  <span>
                    <strong>{p.code}</strong>
                    <small>{labelOf(p.category)}</small>
                  </span>
                </button>
              ))}
            </div>
            <div className="palette-foot">
              <span><span className="kbd">↑↓</span> to move</span>
              <span><span className="kbd">Enter</span> to open</span>
              <span><span className="kbd">Esc</span> to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
