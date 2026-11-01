import cfg from "../../invite.config.json";
export type Cfg = typeof cfg;
export type Page = { k: "cover" | "event" | "closing"; i?: number };

export const pagesOf = (c: Cfg): Page[] => [
  { k: "cover" },
  ...c.events.map((_, i) => ({ k: "event" as const, i })),
  { k: "closing" },
];
export const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
export const fmtTime = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"} IST`;
};
export const mapUrl = (v: { name: string; address: string }) =>
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(`${v.name}, ${v.address}`);
export const rsvpUrl = (c: Cfg) =>
  c.rsvp.type === "whatsapp" ? `https://wa.me/${c.rsvp.number}?text=${encodeURIComponent(c.rsvp.text)}` : c.rsvp.url;
