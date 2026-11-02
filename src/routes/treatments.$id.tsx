import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, FlaskConical, Check, Columns3 } from "lucide-react";
import { treatments } from "@/lib/catalog";

export const Route = createFileRoute("/treatments/$id")({
  loader: ({ params }) => {
    const t = treatments.find((x) => x.id === params.id);
    if (!t) throw notFound();
    return t;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} in India — MedGrid` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: `${loaderData.name} in India — MedGrid` },
          { property: "og:description", content: loaderData.summary },
        ]
      : [{ title: "Treatment not found — MedGrid" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Treatment not found</h1>
      <Link to="/treatments" className="mt-4 inline-block text-allo underline">Back to treatments</Link>
    </main>
  ),
  component: Page,
});

function Page() {
  const t = Route.useLoaderData();
  const allo = t.system === "allo";
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Link to="/treatments" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> All treatments</Link>
      <div className="mt-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className={`text-xs font-bold uppercase ${allo ? "text-allo" : "text-ayush"}`}>{allo ? "Allopathy" : "AYUSH & Wellness"}</p>
        <h1 className="mt-1 text-3xl font-bold">{t.name}</h1>
        <span className={`mt-3 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${allo ? "border-allo text-allo" : "border-ayush text-ayush"}`}><FlaskConical className="h-3 w-3" /> Evidence-Based Care</span>
        <p className="mt-4 text-muted-foreground">{t.summary}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-muted p-4"><p className="text-xs text-muted-foreground">Average duration</p><p className="flex items-center gap-1 font-semibold"><Clock className="h-4 w-4" />{t.duration}</p></div>
          <div className="rounded-lg bg-muted p-4"><p className="text-xs text-muted-foreground">Packages from</p><p className={`text-xl font-bold ${allo ? "text-allo" : "text-ayush"}`}>{t.startingPrice}</p></div>
        </div>
        <h2 className="mt-8 font-semibold">What's covered</h2>
        <ul className="mt-2 space-y-2">
          {t.highlights.map((h) => <li key={h} className="flex gap-2 text-sm"><Check className={`h-4 w-4 ${allo ? "text-allo" : "text-ayush"}`} />{h}</li>)}
        </ul>
        <Link to="/compare" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-allo px-6 py-3 font-bold text-primary-foreground shadow hover:opacity-90">
          <Columns3 className="h-5 w-5" /> Compare Packages
        </Link>
      </div>
    </main>
  );
}
