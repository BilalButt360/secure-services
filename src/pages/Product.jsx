import { Link, useParams } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { ArrowLeft, PhoneIcon, WhatsAppIcon } from "../components/Icons";
import { allProducts, labelOf, productById } from "../data/catalog";
import { PHONE, PHONE_LINK, waLink } from "../config";
import NotFound from "./NotFound";

function Stage({ product }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 16 });
  const sy = useSpring(y, { stiffness: 120, damping: 16 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="pd-stage" onMouseMove={onMove} onMouseLeave={reset}>
      <motion.img
        key={product.id}
        src={product.image}
        alt={`${labelOf(product.category)} ${product.code}`}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export default function Product() {
  const { id } = useParams();
  const product = productById(id);
  if (!product) return <NotFound />;

  const label = labelOf(product.category);
  const message = `Hello, I'd like to order this product.\nCode: ${product.code}\nCategory: ${label}\nLink: ${window.location.href}`;
  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <section className="pd">
        <div className="container">
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="back">
            <ArrowLeft size={18} /> {label}
          </Link>

          <div className="pd-grid">
            <Stage product={product} />

            <div className="pd-info">
              <p className="pd-cat">{label}</p>
              <h1 className="pd-code">{product.code}</h1>
              <p className="pd-lead">
                Available from Secure Services. Message us for the current price and stock. We reply with both.
              </p>

              <div className="pd-actions">
                <a className="btn btn-wa" href={waLink(message)} target="_blank" rel="noreferrer">
                  <WhatsAppIcon size={18} /> Order on WhatsApp
                </a>
                <a className="btn btn-line" href={PHONE_LINK}>
                  <PhoneIcon size={18} /> {PHONE}
                </a>
              </div>

              <dl className="pd-specs">
                <div><dt>Product code</dt><dd>{product.code}</dd></div>
                <div><dt>Category</dt><dd>{label}</dd></div>
                <div><dt>Ordering</dt><dd>WhatsApp or phone</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>More in {label}</h2>
            </div>
            <div className="grid grid-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
