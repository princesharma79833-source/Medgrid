import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Clock,
  FlaskConical,
  HeartPulse,
  Bone,
  Ribbon,
  Leaf,
  Activity,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { treatments, type Treatment } from "@/lib/catalog";
import ayushDataset from "@/Data/ayushData.json";

export const Route = createFileRoute("/treatments/")({
  head: () => ({
    meta: [
      { title: "Treatments Catalog — MedGrid" },
      {
        name: "description",
        content:
          "Browse Allopathy and AYUSH treatments in India with durations and starting package prices.",
      },
      { property: "og:title", content: "Treatments Catalog — MedGrid" },
      {
        property: "og:description",
        content: "Cardiac, orthopedics, oncology, Panchakarma and more.",
      },
    ],
  }),
  component: Page,
});

export const icons: Record<string, LucideIcon> = {
  cardiac: HeartPulse,
  orthopedics: Bone,
  oncology: Ribbon,
  panchakarma: Leaf,
  "spine-joint": Activity,
  rejuvenation: Sparkles,
};

function Card({ t }: { t: Treatment }) {
  const Icon = icons[t.id] ?? Leaf;
  const allo = t.system === "allo";
  return (
    <Link
      to="/treatments/$id"
      params={{ id: t.id }}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <span
          className={`grid h-11 w-11 place-items-center rounded-lg ${allo ? "bg-allo-soft text-allo" : "bg-ayush-soft text-ayush"}`}
        >
          <Icon className="h-6 w-6" />
        </span>
        <span
          className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${allo ? "border-allo text-allo" : "border-ayush text-ayush"}`}
        >
          <FlaskConical className="h-3 w-3" /> Evidence-Based Care
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold">{t.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{t.summary}</p>
      <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {t.duration}
        </span>
        <span className="text-right">
          <span className="block text-xs text-muted-foreground">From</span>
          <span
            className={`text-lg font-bold ${allo ? "text-allo" : "text-ayush"}`}
          >
            {t.startingPrice}
          </span>
        </span>
      </div>
    </Link>
  );
}

function Page() {
  const [selectedSystem, setSelectedSystem] = useState<"ayush" | "allo" | null>(
    null,
  );

  if (selectedSystem === null) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold">Choose a Care System</h1>
        <p className="mt-2 text-muted-foreground">
          Select AYUSH or Allopathy to view the relevant treatments and data.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setSelectedSystem("ayush")}
            className="rounded-2xl border-2 border-ayush bg-ayush-soft p-8 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-2xl font-bold text-ayush">AYUSH</h2>
            <p className="mt-2 text-muted-foreground">
              Ayurveda, Yoga, Unani, Siddha, Homeopathy, institutions, prices,
              treatment guides, and safety notes.
            </p>
            <span className="mt-5 inline-block rounded-lg bg-ayush px-4 py-2 font-semibold text-primary-foreground">
              Explore AYUSH
            </span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedSystem("allo")}
            className="rounded-2xl border-2 border-allo bg-allo-soft p-8 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-2xl font-bold text-allo">Allopathy</h2>
            <p className="mt-2 text-muted-foreground">
              Cardiac, orthopedic, and oncology treatments from the allopathy
              catalog.
            </p>
            <span className="mt-5 inline-block rounded-lg bg-allo px-4 py-2 font-semibold text-primary-foreground">
              Explore Allopathy
            </span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Treatments Catalog</h1>
      <p className="mt-2 text-muted-foreground">
        {selectedSystem === "ayush"
          ? "AYUSH treatments, institutions, prices, guides, and safety information."
          : "Allopathy treatments and package information."}
      </p>
      <button
        type="button"
        onClick={() => setSelectedSystem(null)}
        className="mt-5 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted"
      >
        ← Choose another care system
      </button>
      <section
        className={`mt-8 rounded-xl border border-border bg-muted/40 p-5 ${selectedSystem === "ayush" ? "" : "hidden"}`}
      >
        <h2 className="text-xl font-bold">AYUSH Dataset Overview</h2>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          {ayushDataset.README.map((item, index) => {
            const [heading, description] = Object.entries(item)[0] ?? [];
            return (
              <p key={`${heading}-${index}`}>
                <strong className="text-foreground">
                  {index === 0 ? "About this dataset" : heading}:
                </strong>{" "}
                {description}
              </p>
            );
          })}
        </div>
      </section>
      {(["allo", "ayush"] as const)
        .filter((sys) => sys === selectedSystem)
        .map((sys) => (
          <section key={sys} className="mt-10">
            <h2
              className={`mb-4 text-xl font-bold ${sys === "allo" ? "text-allo" : "text-ayush"}`}
            >
              {sys === "allo" ? "Allopathy" : "AYUSH & Wellness"}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {treatments
                .filter((t) => t.system === sys)
                .map((t) => (
                  <Card key={t.id} t={t} />
                ))}
            </div>
          </section>
        ))}
      <section
        className={`mt-12 ${selectedSystem === "ayush" ? "" : "hidden"}`}
      >
        <h2 className="mb-4 text-xl font-bold text-ayush">
          AYUSH Treatment Guide
        </h2>
        <p className="mb-6 text-muted-foreground">
          Plain-English treatment information, cautions, evidence notes, and
          typical providers from the dataset.
        </p>
        <div className="space-y-5">
          {ayushDataset["Treatment Guide"].map((guide) => (
            <article
              key={guide.ID}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase text-ayush">
                    {guide.System} · {guide.Category}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">
                    {guide.Treatment}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {guide["Also known as / meaning"]}
                  </p>
                </div>
                <span className="rounded-full bg-ayush-soft px-3 py-1 text-xs font-semibold text-ayush">
                  {guide["Typical duration"]}
                </span>
              </div>
              <div className="mt-4 grid gap-4 text-sm leading-6 md:grid-cols-2">
                <p>
                  <strong>What it is:</strong>{" "}
                  {guide["What it is (plain English)"]}
                </p>
                <p>
                  <strong>What happens:</strong>{" "}
                  {guide["What happens in a session"]}
                </p>
                <p>
                  <strong>Traditionally used for:</strong>{" "}
                  {guide["Traditionally used for (benefits)"]}
                </p>
                <p>
                  <strong>Cautions:</strong>{" "}
                  {guide["Who should avoid it / cautions"]}
                </p>
              </div>
              <p className="mt-4 border-t border-border pt-3 text-sm text-muted-foreground">
                <strong>Evidence:</strong> {guide["Evidence note"]} ·{" "}
                <strong>Typically offered at:</strong>{" "}
                {guide["Typically offered at"]}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section
        className={`mt-12 ${selectedSystem === "ayush" ? "" : "hidden"}`}
      >
        <h2 className="mb-4 text-xl font-bold text-ayush">
          Verified AYUSH Institutions
        </h2>
        <p className="mb-6 text-muted-foreground">
          {ayushDataset.Institutions.length} institutions imported from the
          AYUSH dataset.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ayushDataset.Institutions.map((institution, index) => (
            <article
              key={`${institution.Institution}-${index}`}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <p className="text-xs font-bold uppercase text-ayush">
                {institution.System}
              </p>
              <h3 className="mt-2 text-lg font-semibold">
                {institution.Institution}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {institution["City / Location"]}, {institution.State}
              </p>
              <p className="mt-4 text-sm">
                {institution["Credentials / Notable facts"] ||
                  "AYUSH institution"}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section
        className={`mt-12 ${selectedSystem === "ayush" ? "" : "hidden"}`}
      >
        <h2 className="mb-4 text-xl font-bold text-ayush">
          AYUSH Safety Notes
        </h2>
        <p className="mb-6 text-muted-foreground">
          Important safety information to review before choosing a treatment or
          provider.
        </p>
        <div className="space-y-5">
          {ayushDataset["Safety Notes"].map((note, index) => (
            <article
              key={`${note.Topic}-${index}`}
              className="rounded-xl border border-amber-200 bg-amber-50 p-5"
            >
              <h3 className="text-lg font-semibold text-amber-950">
                {note.Topic}
              </h3>
              <p className="mt-3 text-sm leading-6 text-amber-950">
                {note["What to know"]}
              </p>
              <p className="mt-3 text-sm leading-6 text-amber-900">
                <strong>Recommended action:</strong>{" "}
                {note["Suggested action on your platform"]}
              </p>
              <p className="mt-3 text-xs text-amber-800">
                <strong>Source:</strong> {note.Source}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section
        className={`mt-12 ${selectedSystem === "ayush" ? "" : "hidden"}`}
      >
        <h2 className="mb-4 text-xl font-bold text-ayush">
          AYUSH Price Points
        </h2>
        <p className="mb-6 text-muted-foreground">
          Indicative prices from the dataset. Confirm the final price, currency,
          inclusions, and duration directly with each provider.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                {[
                  "Institution",
                  "Programme",
                  "Price",
                  "Unit",
                  "Duration",
                  "Source",
                ].map((heading) => (
                  <th key={heading} className="p-3 font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ayushDataset["Price Points"].map((price, index) => (
                <tr
                  key={`${price.Institution}-${price.Programme}-${index}`}
                  className="border-t border-border"
                >
                  <td className="p-3 font-medium">{price.Institution}</td>
                  <td className="p-3">{price.Programme}</td>
                  <td className="p-3">
                    {price.Currency} {price["Price (low)"] ?? "—"}
                    {price["Price (high)"] != null
                      ? ` – ${price["Price (high)"]}`
                      : "+"}
                  </td>
                  <td className="p-3">{price.Unit ?? "—"}</td>
                  <td className="p-3">{price["Duration (days)"] ?? "—"}</td>
                  <td className="p-3 text-muted-foreground">{price.Source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
