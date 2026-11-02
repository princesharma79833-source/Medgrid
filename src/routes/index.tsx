import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Stethoscope, Leaf } from "lucide-react";
import { AlloCard, AyushCard, alloPackages, ayushPackages } from "@/components/Packages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedGrid — Verified Healthcare & AYUSH Wellness in India" },
      { name: "description", content: "Compare fixed-price surgical and Ayurveda packages in India with transparent pricing and emergency support." },
      { property: "og:title", content: "MedGrid — Verified Healthcare & AYUSH Wellness in India" },
      { property: "og:description", content: "Fixed-price surgical and Ayurveda packages with transparent pricing." },
    ],
  }),
  component: Index,
});

function Index() {
  const [tab, setTab] = useState<"allo" | "ayush">("allo");
  const [q, setQ] = useState("");
  const allo = alloPackages.filter((p) => (p.name + p.hospital).toLowerCase().includes(q.toLowerCase()));
  const ayush = ayushPackages.filter((p) => (p.name + p.center).toLowerCase().includes(q.toLowerCase()));
  return (
    <main>
      <section className="border-b border-border bg-gradient-to-b from-allo-soft to-background">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-24">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Verified Healthcare & <span className="text-ayush">AYUSH Wellness</span> in <span className="text-allo">India</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Compare fixed-price surgical & Ayurveda packages with transparent pricing and instant emergency support.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-2xl gap-2 rounded-xl border border-border bg-card p-2 shadow-sm">
            <div className="flex flex-1 items-center gap-2 px-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by treatment, specialty, or hospital" className="w-full bg-transparent py-2 outline-none" />
            </div>
            <button className="rounded-lg bg-allo px-6 font-semibold text-primary-foreground hover:opacity-90">Search</button>
          </form>
          <div className="mt-6 inline-flex rounded-xl border border-border bg-card p-1">
            <button onClick={() => setTab("allo")} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${tab === "allo" ? "bg-allo text-primary-foreground" : "text-muted-foreground"}`}>
              <Stethoscope className="h-4 w-4" /> Allopathy Care
            </button>
            <button onClick={() => setTab("ayush")} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${tab === "ayush" ? "bg-ayush text-primary-foreground" : "text-muted-foreground"}`}>
              <Leaf className="h-4 w-4" /> AYUSH & Wellness
            </button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold">{tab === "allo" ? "Featured Surgical Packages" : "Featured AYUSH Programs"}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tab === "allo" ? allo.map((p) => <AlloCard key={p.name} p={p} />) : ayush.map((p) => <AyushCard key={p.name} p={p} />)}
        </div>
        {(tab === "allo" ? allo : ayush).length === 0 && <p className="text-muted-foreground">No packages match your search.</p>}
      </section>
    </main>
  );
}
