import type { Cfg } from "../shared/util";
const z = (ms: number) => new Date(ms).toISOString().replace(/[-:]|\.\d{3}/g, "");
export function saveDate(c: Cfg, i: number) {
  const e = c.events[i];
  const start = Date.parse(`${e.date}T${e.time}:00Z`) - 19800000; // IST -> UTC
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//wedding-invite//EN", "BEGIN:VEVENT",
    `UID:${e.id}@wedding-invite`, `DTSTAMP:${z(Date.now())}`, `DTSTART:${z(start)}`, `DTEND:${z(start + 3 * 3600000)}`,
    `SUMMARY:${e.title} - ${c.couple.bride} & ${c.couple.groom}`,
    `LOCATION:${e.venue.name}\\, ${e.venue.address}`, "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = `${e.id}.ics`;
  a.click();
}
