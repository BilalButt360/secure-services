import { useState } from "react";
import PageHero from "../components/PageHero";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "../components/Icons";
import { CITY, EMAIL, MAP_LINK, PHONE, PHONE_LINK, waLink } from "../config";

const METHODS = [
  { icon: <WhatsAppIcon />, label: "WhatsApp", value: "Fastest way to get a price", href: waLink("Hello, I'd like to ask about your products."), external: true },
  { icon: <PhoneIcon />, label: "Phone", value: PHONE, href: PHONE_LINK },
  { icon: <MailIcon />, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: <PinIcon />, label: "Location", value: CITY, href: MAP_LINK, external: true },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const text = `Hello, my name is ${form.name}.\nPhone: ${form.phone}\n\n${form.message}`;
    window.open(waLink(text), "_blank", "noopener");
  };

  return (
    <>
      <PageHero title="Tell us what you need.">
        Send a message and we will reply with a price and what is in stock.
      </PageHero>

      <section className="section">
        <div className="container contact-grid">
          <ul className="methods">
            {METHODS.map((m) => (
              <li key={m.label}>
                <a href={m.href} {...(m.external ? { target: "_blank", rel: "noreferrer" } : {})}>
                  <span className="method-icon">{m.icon}</span>
                  <span>
                    <strong>{m.label}</strong>
                    <small>{m.value}</small>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <form className="form" onSubmit={submit}>
            <h2>Send a message</h2>
            <p>This opens WhatsApp with your message filled in.</p>
            <label>
              Your name
              <input required value={form.name} onChange={set("name")} autoComplete="name" />
            </label>
            <label>
              Phone number
              <input required type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
            </label>
            <label>
              What do you need?
              <textarea required rows={5} value={form.message} onChange={set("message")} placeholder="For example: 4 cameras for a two-floor shop" />
            </label>
            <button className="btn btn-primary" type="submit">Send on WhatsApp</button>
          </form>
        </div>

        <div className="container">
          <div className="map">
            <iframe
              title="Secure Services location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435519.2274176661!2d74.00472264497056!3d31.48310365972336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1729605401699!5m2!1sen!2s"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
