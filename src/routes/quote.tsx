import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quote")({
  head: () => ({ meta: [{ title: "Travel Help & Quote — MedGrid" }, { name: "description", content: "Get a personalised quote plus visa, travel and stay assistance." }, { property: "og:title", content: "Travel Help & Quote — MedGrid" }, { property: "og:description", content: "Get a personalised quote plus visa, travel and stay assistance." }] }),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Travel Help & Quote</h1>
      <p className="mt-2 text-muted-foreground">Get a personalised quote plus visa, travel and stay assistance.</p>
      <form onSubmit={(e) => e.preventDefault()} className="mt-8 grid max-w-xl gap-4 rounded-xl border border-border bg-card p-6"><input required placeholder="Full name" className="rounded-md border border-input px-3 py-2" /><input required type="email" placeholder="Email" className="rounded-md border border-input px-3 py-2" /><textarea placeholder="Treatment needed & travel dates" className="min-h-28 rounded-md border border-input px-3 py-2" /><button className="rounded-md bg-allo py-2 font-semibold text-primary-foreground">Request Quote</button></form>
    </main>
  );
}
