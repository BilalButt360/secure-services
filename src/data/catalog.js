import { products } from "./products";

import cctv from "../Images/cctv.png";
import wifi from "../Images/wifi.png";
import fire from "../Images/fire.png";
import control from "../Images/controll.png";
import doorphone from "../Images/product76.png";
import attendance from "../Images/product79.png";
import counter from "../Images/product85.png";
import metal from "../Images/product87.png";
import router from "../Images/product94.png";
import printer from "../Images/product95.png";
import drive from "../Images/product96.png";
import wireless from "../Images/wireless.png";
import telephone from "../Images/product112.png";
import solar from "../Images/product122.png";

// Display order + friendly labels. `name` must match the category in products.js.
const META = [
  { name: "CCTV Camera", label: "CCTV cameras", cover: cctv, tile: "hero" },
  { name: "Fire & Safety", label: "Fire & safety", cover: fire, tile: "wide" },
  { name: "Wifi Camera", label: "WiFi cameras", cover: wifi, tile: "wide" },
  { name: "Access Control", label: "Access control", cover: control, tile: "wide" },
  { name: "Solar Camera", label: "Solar cameras", cover: solar },
  { name: "Door Phone Audio Video", label: "Door phones", cover: doorphone },
  { name: "Attendance Machine", label: "Attendance machines", cover: attendance },
  { name: "Cash Counter Machine", label: "Cash counters", cover: counter },
  { name: "Matel Detecter", label: "Metal detectors", cover: metal },
  { name: "Signal Router", label: "Routers", cover: router },
  { name: "Printer", label: "Printers", cover: printer },
  { name: "External Hard Drive", label: "Hard drives", cover: drive },
  { name: "Wireless Set & Accessories", label: "Wireless sets", cover: wireless },
  { name: "Telephone Exchange", label: "Telephones", cover: telephone },
];

export const categories = META.map((m) => ({
  ...m,
  count: products.filter((p) => p.category === m.name).length,
}));

export const categoryByName = Object.fromEntries(categories.map((c) => [c.name, c]));
export const labelOf = (name) => categoryByName[name]?.label ?? name;

export const allProducts = products;
export const productById = (id) => products.find((p) => String(p.id) === String(id));

// One product from every category — used for the home page rail.
// Hand-picked ids where the first product in a category isn't the best showcase.
const PICK_OVERRIDE = { "Fire & Safety": "27", "Access Control": "66" };
export const picks = categories
  .map((c) =>
    PICK_OVERRIDE[c.name]
      ? productById(PICK_OVERRIDE[c.name])
      : products.find((p) => p.category === c.name)
  )
  .filter(Boolean);
