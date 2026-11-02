import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, Check, X, MapPin, Lock } from "lucide-react";
import { comparePackages, type ComparePackage } from "@/lib/catalog";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Packages — MedGrid" },
      { name: "description", content: "Compare surgical and Ayurveda packages side by side on price, stay, ICU days and inclusions." },
      { property: "og:title", content: "Compare Packages — MedGrid" },
      { property: "og:description", content: "Side-by-side fixed-price package comparison for medical travel in India." },
    ],
  }),
  component: Page,
});

const inclusionKeys = ["Pre-op diagnostics", "Daily meals", "Airport transfer", "Interpreter support"] as const;
const exclusionKeys = ["Special implants", "Extra ICU stay", "Home medicines"];

function Row({ label, items, render }: { label: string; items: ComparePackage[]; render: (p: ComparePackage) => React.ReactNode }) {
  return (
    <tr className="border-t border-border">
      <th className="w-48 bg-muted/50 p-3 text-left text-sm font-medium text-muted-foreground">{label}</th>
      {items.map((p) => <td key={p.id} className="p-3 text-sm">{render(p)}</td>)}
    </tr>
  );
}

function Section({ title, cols }: { title: string; cols: number }) {
  return <tr className="border-t border-border bg-allo-soft"><th colSpan={cols + 1} className="p-2 text-left text-xs font-bold uppercase tracking-wide text-allo">{title}</th></tr>;
}

function Page() {
  const [selected, setSelected] = useState<string[]>(["apollo-tkr", "max-tkr", "somatheeram-pk14"]);
  const items = comparePackages.filter((p) => selected.includes(p.id));
  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? (s.length > 2 ? s.filter((x) => x !== id) : s) : s.length < 3 ? [...s, id] : s));

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Compare Packages</h1>
      <p className="mt-2 text-muted-foreground">Select 2 or 3 packages to compare side by side.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {comparePackages.map((p) => {
          const on = selected.includes(p.id);
          return (
            <button key={p.id} onClick={() => toggle(p.id)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium ${on ? (p.system === "allo" ? "border-allo bg-allo text-primary-foreground" : "border-ayush bg-ayush text-primary-foreground") : "border-border bg-card text-muted-foreground"}`}>
              {on && <Check className="mr-1 inline h-3.5 w-3.5" />}{p.provider} · {p.title}
            </button>
          );
        })}
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr>
              <th className="w-48 p-3" />
              {items.map((p) => {
                const tone = p.system === "allo" ? "text-allo bg-allo-soft" : "text-ayush bg-ayush-soft";
                return (
                  <th key={p.id} className="p-4 text-left align-top">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">{p.system === "allo" ? "Allopathy" : "AYUSH"}</p>
                    <p className="text-lg font-bold">{p.provider}</p>
                    <p className="text-sm font-medium">{p.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs font-normal text-muted-foreground"><MapPin className="h-3 w-3" />{p.location}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.accreditations.map((a) => (
                        <span key={a} className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${tone}`}><BadgeCheck className="h-3 w-3" />{a}</span>
                      ))}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <Row label="Expected price (USD)" items={items} render={(p) => (
              <div><p className="text-xl font-bold">{p.price}</p><span className="mt-1 inline-block rounded bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">Fixed Package Estimate</span></div>
            )} />
            <Section title="Itemized costs" cols={items.length} />
            <Row label="Procedure / Surgeon fees" items={items} render={(p) => p.procedureFee} />
            <Row label="Room category" items={items} render={(p) => p.room} />
            <Row label="Stay duration" items={items} render={(p) => `${p.hospitalDays} hospital days + ${p.hotelDays} hotel days`} />
            <Row label="ICU days included" items={items} render={(p) => (p.icuDays ? `${p.icuDays} day${p.icuDays > 1 ? "s" : ""}` : "Not required")} />
            <Section title="Inclusions" cols={items.length} />
            {inclusionKeys.map((k) => (
              <Row key={k} label={k} items={items} render={(p) => p.inclusions[k]
                ? <Check className="h-5 w-5 text-ayush" aria-label="Included" />
                : <X className="h-5 w-5 text-destructive" aria-label="Not included" />} />
            ))}
            <Section title="Exclusions (billed separately)" cols={items.length} />
            {exclusionKeys.map((k) => (
              <Row key={k} label={k} items={items} render={(p) => p.exclusions.includes(k)
                ? <span className="text-destructive">Excluded</span>
                : <span className="text-muted-foreground">N/A</span>} />
            ))}
            <tr className="border-t border-border">
              <th className="p-3" />
              {items.map((p) => (
                <td key={p.id} className="p-4">
                  <Link to="/quote" search={{ package: p.id }}
                    className="flex items-center justify-center gap-2 rounded-lg bg-allo px-4 py-3 text-sm font-bold text-primary-foreground shadow hover:opacity-90">
                    <Lock className="h-4 w-4" /> Get Free Locked Quote
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
