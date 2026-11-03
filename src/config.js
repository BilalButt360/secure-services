// Business details — edit here and every page updates.
export const BRAND = "Secure Services";
export const PHONE = "+92 300 9403453";
export const PHONE_LINK = "tel:+923009403453";
export const WHATSAPP_NUMBER = "923009403453";
export const EMAIL = "sohailbuttlhr42@gmail.com";
export const CITY = "Lahore, Pakistan";
export const MAP_LINK = "https://www.google.com/maps?q=Lahore,+Pakistan";

export const waLink = (text = "") =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
