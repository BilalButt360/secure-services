import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="nosignal">
      <div className="noise" aria-hidden="true" />
      <div className="container nosignal-inner">
        <p className="nosignal-code">404</p>
        <h1>This page has no signal.</h1>
        <p>The link may be old or the product may have moved. Head back and pick up from the catalog.</p>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <Link to="/" className="btn btn-primary">Back to home</Link>
          <Link to="/shop" className="btn btn-ghost">Browse products</Link>
        </div>
      </div>
    </section>
  );
}
