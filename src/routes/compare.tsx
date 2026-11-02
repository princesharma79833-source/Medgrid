import { createFileRoute } from "@tanstack/react-router";
import { alloPackages } from "@/components/Packages";
export const Route = createFileRoute("/compare")({
  head: () => ({ meta: [{ title: "Compare Packages — MedGrid" }, { name: "description", content: "Compare fixed-price packages side by side on price, stay and accreditation." }, { property: "og:title", content: "Compare Packages — MedGrid" }, { property: "og:description", content: "Compare fixed-price packages side by side on price, stay and accreditation." }] }),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Compare Packages</h1>
      <p className="mt-2 text-muted-foreground">Compare fixed-price packages side by side on price, stay and accreditation.</p>
      <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card"><table className="w-full text-sm"><thead className="bg-allo-soft text-left"><tr><th className="p-3">Package</th><th className="p-3">Hospital</th><th className="p-3">Price (USD)</th><th className="p-3">Stay</th><th className="p-3">Room</th></tr></thead><tbody>{alloPackages.map((p) => <tr key={p.name} className="border-t border-border"><td className="p-3 font-medium">{p.name}</td><td className="p-3">{p.hospital}</td><td className="p-3 text-allo font-semibold">{p.price}</td><td className="p-3">{p.stay}</td><td className="p-3">{p.room}</td></tr>)}</tbody></table></div>
    </main>
  );
}
