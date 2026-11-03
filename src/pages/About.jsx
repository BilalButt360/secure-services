import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { categories } from "../data/catalog";
import { allProducts } from "../data/catalog";
import { waLink } from "../config";
import { WhatsAppIcon } from "../components/Icons";
import logo from "../Images/logo.png";
import aboutVideo from "../Videos/about.mp4";

const GROUPS = [
  {
    title: "Watch",
    text: "Round-the-clock monitoring, indoors, outdoors and off the grid.",
    cats: ["CCTV Camera", "Wifi Camera", "Solar Camera"],
  },
  {
    title: "Protect",
    text: "Early warning for fire and controlled entry for every door.",
    cats: ["Fire & Safety", "Access Control", "Door Phone Audio Video", "Matel Detecter"],
  },
  {
    title: "Run the workplace",
    text: "The everyday equipment a shop or office depends on.",
    cats: ["Attendance Machine", "Cash Counter Machine", "Printer", "External Hard Drive", "Signal Router", "Wireless Set & Accessories", "Telephone Exchange"],
  },
];

const label = (n) => categories.find((c) => c.name === n)?.label ?? n;

export default function About() {
  return (
    <>
      <PageHero title="Security equipment you can rely on." aside={<img className="hero-logo" src={logo} alt="Secure Services, we secure, you relax" />}>
        Secure Services supplies cameras, fire safety, access control and workplace equipment to homes, shops and businesses.
      </PageHero>

      <section className="section">
        <div className="container about-grid">
          <div className="about-text">
            <h2>Safer places start with the right products.</h2>
            <p>
              We stock {allProducts.length} products across {categories.length} categories, so one supplier can cover the whole job: cameras at the gate, alarms in the corridor, readers on the door and the counter at the till.
            </p>
            <p>
              Every item is chosen for lasting quality and day-to-day performance. If you are not sure what suits your place, tell us about it and we will point you to the right model.
            </p>
            <a className="btn btn-dark" href={waLink("Hello, I need help choosing security equipment.")} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={18} /> Ask us what fits
            </a>
          </div>
          <div className="about-video">
            <video controls preload="metadata" playsInline>
              <source src={aboutVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="groups">
            {GROUPS.map((g) => (
              <div className="group" key={g.title}>
                <div>
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                </div>
                <div className="group-chips">
                  {g.cats.map((c) => (
                    <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`} className="chip">
                      {label(c)}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
