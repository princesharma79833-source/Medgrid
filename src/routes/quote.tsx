import { createFileRoute } from "@tanstack/react-router";
import { comparePackages } from "@/lib/catalog";

export const Route = createFileRoute("/quote")({
  head: () => ({ meta: [{ title: "Travel Help & Quote — MedGrid" }, { name: "description", content: "Get a personalised quote plus visa, travel and stay assistance." }, { property: "og:title", content: "Travel Help & Quote — MedGrid" }, { property: "og:description", content: "Get a personalised quote plus visa, travel and stay assistance." }] }),
  validateSearch: (s: Record<string, unknown>): { package?: string | undefined } => ({ package: typeof s["package"] === "string" ? s["package"] : undefined }),
  component: Page,
});

function Page() {
  const { package: pkgId } = Route.useSearch();
  const pkg = comparePackages.find((p) => p.id === pkgId);
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Travel Help & Quote</h1>
      <p className="mt-2 text-muted-foreground">Get a personalised quote plus visa, travel and stay assistance.</p>
      {pkg && <div className="mt-6 max-w-xl rounded-xl border border-allo bg-allo-soft p-4 text-sm"><p className="font-semibold text-allo">Selected package</p><p>{pkg.provider} · {pkg.title} · {pkg.price}</p></div>}
      <form onSubmit={(e) => e.preventDefault()} className="mt-8 grid max-w-xl gap-4 rounded-xl border border-border bg-card p-6"><input required placeholder="Full name" className="rounded-md border border-input px-3 py-2" /><input required type="email" placeholder="Email" className="rounded-md border border-input px-3 py-2" /><textarea placeholder="Treatment needed & travel dates" className="min-h-28 rounded-md border border-input px-3 py-2" /><button className="rounded-md bg-allo py-2 font-semibold text-primary-foreground">Request Quote</button></form>
    </main>
  );
}
