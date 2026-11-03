import { Link } from "react-router-dom";
import { labelOf } from "../data/catalog";
import { ArrowUpRight } from "./Icons";

export default function ProductCard({ product }) {
  return (
    <Link to={`/shop/${product.id}`} className="pcard">
      <div className="pcard-stage">
        <img src={product.image} alt={`${labelOf(product.category)} ${product.code}`} loading="lazy" />
        <span className="pcard-go" aria-hidden="true"><ArrowUpRight size={18} /></span>
      </div>
      <div className="pcard-meta">
        <strong>{product.code}</strong>
        <span>{labelOf(product.category)}</span>
      </div>
    </Link>
  );
}
