import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
export const Route = createFileRoute("/sos")({
  head: () => ({ meta: [{ title: "Emergency SOS — MedGrid" }, { name: "description", content: "Instant 24/7 emergency support for international patients in India." }, { property: "og:title", content: "Emergency SOS — MedGrid" }, { property: "og:description", content: "Instant 24/7 emergency support for international patients in India." }] }),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Emergency SOS</h1>
      <p className="mt-2 text-muted-foreground">Instant 24/7 emergency support for international patients in India.</p>
      <a href="tel:112" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sos px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg"><Phone /> Call Emergency 112</a>
    </main>
  );
}
