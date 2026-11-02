import { BadgeCheck, BedDouble, Clock, Leaf, Salad, FlaskConical } from "lucide-react";

export const alloPackages = [
  { name: "Total Knee Replacement", hospital: "Apollo Hospitals, Delhi", price: "$4,500 – $6,800", stay: "7 days hospital + 14 days recovery", room: "Private", badges: ["NABH", "JCI"] },
  { name: "Cardiac CABG Surgery", hospital: "Fortis Escorts, Delhi", price: "$5,200 – $8,000", stay: "10 days (3 in ICU)", room: "ICU + Private", badges: ["NABH", "JCI"] },
  { name: "Hip Replacement", hospital: "Medanta, Gurugram", price: "$5,000 – $7,200", stay: "6 days + 10 days recovery", room: "Private", badges: ["JCI"] },
];

export const ayushPackages = [
  { name: "14-Day Panchakarma Detox", center: "Kerala Ayurveda Retreat", price: "$1,400 – $2,100", duration: "14 days", grade: "NABH-AYUSH Full", diet: "3 sattvic meals + herbal teas daily" },
  { name: "Spine & Joint Care", center: "AyurVaid Hospital, Bengaluru", price: "$1,800 – $2,600", duration: "21 days", grade: "NABH-AYUSH Full", diet: "Personalised vata-balancing diet" },
  { name: "Stress & Sleep Reset", center: "Rishikesh Wellness Ashram", price: "$900 – $1,300", duration: "10 days", grade: "NABH-AYUSH Entry", diet: "Organic vegetarian meals daily" },
];

export function AlloCard({ p }: { p: (typeof alloPackages)[number] }) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex gap-2">
        {p.badges.map((b) => (
          <span key={b} className="flex items-center gap-1 rounded-full bg-allo-soft px-2 py-0.5 text-xs font-semibold text-allo">
            <BadgeCheck className="h-3.5 w-3.5" /> {b} Verified
          </span>
        ))}
      </div>
      <h3 className="text-lg font-semibold">{p.name}</h3>
      <p className="text-sm text-muted-foreground">{p.hospital}</p>
      <p className="my-4 text-2xl font-bold text-allo">{p.price}<span className="ml-1 text-xs font-normal text-muted-foreground">USD</span></p>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="flex gap-2"><Clock className="h-4 w-4 text-allo" />{p.stay}</li>
        <li className="flex gap-2"><BedDouble className="h-4 w-4 text-allo" />Room: {p.room}</li>
      </ul>
      <a href="/quote" className="mt-5 rounded-md bg-allo py-2 text-center text-sm font-semibold text-primary-foreground hover:opacity-90">Get Quote</a>
    </article>
  );
}

export function AyushCard({ p }: { p: (typeof ayushPackages)[number] }) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex flex-wrap gap-2">
        <span className="flex items-center gap-1 rounded-full bg-ayush-soft px-2 py-0.5 text-xs font-semibold text-ayush"><Leaf className="h-3.5 w-3.5" />{p.grade}</span>
        <span className="flex items-center gap-1 rounded-full border border-ayush px-2 py-0.5 text-xs font-semibold text-ayush"><FlaskConical className="h-3.5 w-3.5" />Evidence-based care</span>
      </div>
      <h3 className="text-lg font-semibold">{p.name}</h3>
      <p className="text-sm text-muted-foreground">{p.center}</p>
      <p className="my-4 text-2xl font-bold text-ayush">{p.price}<span className="ml-1 text-xs font-normal text-muted-foreground">USD</span></p>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="flex gap-2"><Clock className="h-4 w-4 text-ayush" />{p.duration}</li>
        <li className="flex gap-2"><Salad className="h-4 w-4 text-ayush" />{p.diet}</li>
      </ul>
      <a href="/quote" className="mt-5 rounded-md bg-ayush py-2 text-center text-sm font-semibold text-primary-foreground hover:opacity-90">Get Quote</a>
    </article>
  );
}
