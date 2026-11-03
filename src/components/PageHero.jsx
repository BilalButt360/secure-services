import { motion } from "framer-motion";

export default function PageHero({ title, children, aside }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <div>
          <motion.h1 initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            {title}
          </motion.h1>
          {children && (
            <motion.p className="page-hero-sub" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
              {children}
            </motion.p>
          )}
        </div>
        {aside}
      </div>
    </section>
  );
}
