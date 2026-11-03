import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageHero from "../components/PageHero";
import ProductCard from "../components/ProductCard";
import { SearchIcon, CloseIcon } from "../components/Icons";
import { allProducts, categories, labelOf } from "../data/catalog";

const PAGE = 24;

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "all";
  const q = params.get("q") || "";
  const [limit, setLimit] = useState(PAGE);

  useEffect(() => setLimit(PAGE), [category, q]);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return allProducts.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!t || p.code.toLowerCase().includes(t) || labelOf(p.category).toLowerCase().includes(t))
    );
  }, [category, q]);

  const update = (next) => {
    const merged = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => (v ? merged.set(k, v) : merged.delete(k)));
    setParams(merged, { replace: true });
  };

  const title = category === "all" ? "All products" : labelOf(category);

  return (
    <>
      <PageHero title={title}>
        {list.length} {list.length === 1 ? "product" : "products"}
        {category === "all" ? ` in ${categories.length} categories.` : " in this category."}
      </PageHero>

      <section className="shop">
        <div className="filters">
          <div className="container filters-inner">
            <label className="search-field">
              <SearchIcon size={18} />
              <input
                type="search"
                value={q}
                onChange={(e) => update({ q: e.target.value })}
                placeholder="Search by product code"
                aria-label="Search products"
              />
              {q && (
                <button type="button" onClick={() => update({ q: "" })} aria-label="Clear search">
                  <CloseIcon size={16} />
                </button>
              )}
            </label>
            <div className="chips" role="tablist" aria-label="Categories">
              <button className={`chip ${category === "all" ? "is-on" : ""}`} onClick={() => update({ category: "" })}>
                All <small>{allProducts.length}</small>
              </button>
              {categories.map((c) => (
                <button key={c.name} className={`chip ${category === c.name ? "is-on" : ""}`} onClick={() => update({ category: c.name })}>
                  {c.label} <small>{c.count}</small>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container">
          {list.length === 0 ? (
            <div className="empty">
              <h3>No products match “{q}”.</h3>
              <p>Check the code, or clear the search to see everything in this category.</p>
              <button className="btn btn-dark" onClick={() => update({ q: "", category: "" })}>Clear filters</button>
            </div>
          ) : (
            <>
              <motion.div layout className="grid">
                <AnimatePresence mode="popLayout">
                  {list.slice(0, limit).map((p) => (
                    <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              {limit < list.length && (
                <div className="more">
                  <button className="btn btn-line" onClick={() => setLimit((l) => l + PAGE)}>
                    Show more ({list.length - limit} left)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
