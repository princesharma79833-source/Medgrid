import { createFileRoute } from "@tanstack/react-router";
import { AlloCard, AyushCard, alloPackages, ayushPackages } from "@/components/Packages";
export const Route = createFileRoute("/treatments")({
  head: () => ({ meta: [{ title: "Treatments — MedGrid" }, { name: "description", content: "Browse verified surgical and AYUSH treatment packages across India." }, { property: "og:title", content: "Treatments — MedGrid" }, { property: "og:description", content: "Browse verified surgical and AYUSH treatment packages across India." }] }),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Treatments</h1>
      <p className="mt-2 text-muted-foreground">Browse verified surgical and AYUSH treatment packages across India.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{alloPackages.map((p) => <AlloCard key={p.name} p={p} />)}{ayushPackages.map((p) => <AyushCard key={p.name} p={p} />)}</div>
    </main>
  );
}
