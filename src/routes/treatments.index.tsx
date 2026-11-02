import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, FlaskConical, HeartPulse, Bone, Ribbon, Leaf, Activity, Sparkles, type LucideIcon } from "lucide-react";
import { treatments, type Treatment } from "@/lib/catalog";

export const Route = createFileRoute("/treatments/")({
  head: () => ({
    meta: [
      { title: "Treatments Catalog — MedGrid" },
      { name: "description", content: "Browse Allopathy and AYUSH treatments in India with durations and starting package prices." },
      { property: "og:title", content: "Treatments Catalog — MedGrid" },
      { property: "og:description", content: "Cardiac, orthopedics, oncology, Panchakarma and more." },
    ],
  }),
  component: Page,
});

export const icons: Record<string, LucideIcon> = {
  cardiac: HeartPulse, orthopedics: Bone, oncology: Ribbon, panchakarma: Leaf, "spine-joint": Activity, rejuvenation: Sparkles,
};

function Card({ t }: { t: Treatment }) {
  const Icon = icons[t.id];
  const allo = t.system === "allo";
  return (
    <Link to="/treatments/$id" params={{ id: t.id }}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <span className={`grid h-11 w-11 place-items-center rounded-lg ${allo ? "bg-allo-soft text-allo" : "bg-ayush-soft text-ayush"}`}><Icon className="h-6 w-6" /></span>
        <span className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${allo ? "border-allo text-allo" : "border-ayush text-ayush"}`}>
          <FlaskConical className="h-3 w-3" /> Evidence-Based Care
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold">{t.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{t.summary}</p>
      <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
        <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{t.duration}</span>
        <span className="text-right"><span className="block text-xs text-muted-foreground">From</span><span className={`text-lg font-bold ${allo ? "text-allo" : "text-ayush"}`}>{t.startingPrice}</span></span>
      </div>
    </Link>
  );
}

function Page() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Treatments Catalog</h1>
      <p className="mt-2 text-muted-foreground">Choose a specialty to see details and compare packages.</p>
      {(["allo", "ayush"] as const).map((sys) => (
        <section key={sys} className="mt-10">
          <h2 className={`mb-4 text-xl font-bold ${sys === "allo" ? "text-allo" : "text-ayush"}`}>{sys === "allo" ? "Allopathy" : "AYUSH & Wellness"}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.filter((t) => t.system === sys).map((t) => <Card key={t.id} t={t} />)}
          </div>
        </section>
      ))}
    </main>
  );
}
