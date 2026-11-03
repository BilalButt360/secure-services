const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const make = (children) =>
  function Icon({ size, ...props }) {
    return (
      <svg {...base} {...(size ? { width: size, height: size } : {})} {...props}>
        {children}
      </svg>
    );
  };

export const SearchIcon = make(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);
export const ArrowRight = make(<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>);
export const ArrowLeft = make(<><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></>);
export const ArrowUpRight = make(<><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>);
export const CloseIcon = make(<><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>);
export const PhoneIcon = make(
  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
);
export const MailIcon = make(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>);
export const PinIcon = make(<><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></>);
export const WhatsAppIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3.1.9.9-3-.2-.3a8.1 8.1 0 1 1 6.8 3.7Zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.47c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.88 2.4 1 2.57c.12.16 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
  </svg>
);
export const ShieldMark = ({ size = 28, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <defs>
      <clipPath id="ss-left"><rect x="0" y="0" width="16" height="32" /></clipPath>
    </defs>
    <path d="M16 2.5 4.5 6.8v8.2c0 7 4.6 12.2 11.5 14.5 6.9-2.3 11.5-7.5 11.5-14.5V6.8L16 2.5Z" fill="#2f6bff" />
    <path d="M16 2.5 4.5 6.8v8.2c0 7 4.6 12.2 11.5 14.5 6.9-2.3 11.5-7.5 11.5-14.5V6.8L16 2.5Z" fill="#0a1d52" clipPath="url(#ss-left)" />
    <path d="M16 2.5 4.5 6.8v8.2c0 7 4.6 12.2 11.5 14.5 6.9-2.3 11.5-7.5 11.5-14.5V6.8L16 2.5Z" stroke="#e8eefc" strokeWidth="1.4" strokeLinejoin="round" />
    <rect x="12" y="15.2" width="8" height="6.4" rx="1.4" fill="#fff" />
    <path d="M13.8 15.2v-1.9a2.2 2.2 0 0 1 4.4 0v1.9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
