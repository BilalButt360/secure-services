import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchPalette from "./components/SearchPalette";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// Old links like /category/CCTV%20Camera keep working.
function CategoryRedirect() {
  const { categoryName } = useParams();
  return <Navigate to={`/shop?category=${encodeURIComponent(categoryName)}`} replace />;
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onKey = (e) => {
      const typing = ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);
      if ((e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navbar onSearch={() => setSearchOpen(true)} />
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <motion.main key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/category/:categoryName" element={<CategoryRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
      <Footer />
    </>
  );
}
