import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, Siren, X, HeartPulse, Ambulance, Printer, MapPin, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/sos")({
  head: () => ({
    meta: [
      { title: "Emergency SOS — MedGrid" },
      { name: "description", content: "24/7 emergency SOS for international patients in India: instant alert, ER pre-alert card and ambulance tracking." },
      { property: "og:title", content: "Emergency SOS — MedGrid" },
      { property: "og:description", content: "24/7 emergency SOS for international patients in India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

const contacts = [
  { label: "National Emergency", num: "112" },
  { label: "Ambulance", num: "108" },
  { label: "Police", num: "100" },
  { label: "Fire", num: "101" },
  { label: "Tourist Helpline (24/7, multilingual)", num: "1800111363" },
];

const questions = [
  { key: "symptom", q: "What is the main problem?", opts: ["Chest pain", "Shortness of breath", "Severe bleeding / injury", "Unconscious / fainting", "Other"] },
  { key: "conscious", q: "Is the patient awake and responding?", opts: ["Yes, fully alert", "Confused / drowsy", "Not responding"] },
  { key: "history", q: "Any known condition?", opts: ["Heart disease", "Diabetes", "Asthma / COPD", "Recent surgery in India", "None / unknown"] },
] as const;

type Phase = "idle" | "countdown" | "intake" | "card";

function Page() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [left, setLeft] = useState(5);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [caseId, setCaseId] = useState("");

  useEffect(() => {
    if (phase !== "countdown") return;
    if (left <= 0) { setPhase("intake"); return; }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, left]);

  const start = () => { setLeft(5); setStep(0); setAnswers({}); setPhase("countdown"); };
  const answer = (k: string, v: string) => {
    const next = { ...answers, [k]: v };
    setAnswers(next);
    if (step < questions.length - 1) setStep(step + 1);
    else { setCaseId(`ER-${Math.floor(10000 + Math.random() * 90000)}`); setPhase("card"); }
  };

  const critical = answers.conscious === "Not responding" || ["Chest pain", "Shortness of breath", "Unconscious / fainting"].includes(answers.symptom ?? "");

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Emergency SOS</h1>
      <p className="mt-1 text-muted-foreground">For international visitors in India. Press SOS to alert MedGrid's 24/7 response desk.</p>

      <section className="mt-8 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        {phase === "idle" && (
          <button onClick={start} aria-label="Send SOS"
            className="mx-auto grid h-48 w-48 place-items-center rounded-full bg-sos text-primary-foreground shadow-2xl ring-8 ring-sos/20 transition hover:scale-105 animate-pulse">
            <span className="flex flex-col items-center"><Siren className="h-12 w-12" /><span className="mt-1 text-4xl font-black">SOS</span></span>
          </button>
        )}
        {phase === "countdown" && (
          <div>
            <p className="text-lg font-semibold text-sos">Sending SOS alert in {left}s…</p>
            <div className="mx-auto mt-4 h-4 max-w-md overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-sos transition-all duration-1000 ease-linear" style={{ width: `${((5 - left) / 5) * 100}%` }} />
            </div>
            <button onClick={() => setPhase("idle")} className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold hover:bg-muted">
              <X className="h-4 w-4" /> Cancel
            </button>
          </div>
        )}
        {phase === "intake" && (
          <div className="mx-auto max-w-lg text-left">
            <p className="text-sm font-medium text-sos">Alert sent · Quick intake {step + 1} of {questions.length}</p>
            <h2 className="mt-2 text-xl font-bold">{questions[step].q}</h2>
            <div className="mt-4 grid gap-2">
              {questions[step].opts.map((o) => (
                <button key={o} onClick={() => answer(questions[step].key, o)}
                  className="rounded-lg border border-border px-4 py-3 text-left font-medium hover:border-sos hover:bg-sos/5">{o}</button>
              ))}
            </div>
          </div>
        )}
        {phase === "card" && (
          <div className="text-left">
            <div className="grid gap-6 md:grid-cols-2">
              <ERCard caseId={caseId} answers={answers} critical={critical} />
              <TrackingMap />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg bg-allo px-4 py-2 font-semibold text-primary-foreground"><Printer className="h-4 w-4" /> Print ER Card</button>
              <button onClick={() => setPhase("idle")} className="rounded-lg border border-border px-4 py-2 font-semibold hover:bg-muted">Close</button>
            </div>
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Emergency contact numbers (India)</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c) => (
            <a key={c.num} href={`tel:${c.num}`} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-sos">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sos/10 text-sos"><Phone className="h-5 w-5" /></span>
              <span><span className="block text-sm text-muted-foreground">{c.label}</span><span className="text-lg font-bold">{c.num}</span></span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

function ERCard({ caseId, answers, critical }: { caseId: string; answers: Record<string, string>; critical: boolean }) {
  return (
    <article className="rounded-xl border-2 border-sos bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold"><HeartPulse className="h-5 w-5 text-sos" /> Digital ER Pre-Alert Card</div>
        <span className="rounded bg-sos px-2 py-0.5 text-xs font-bold text-primary-foreground">{critical ? "PRIORITY: CRITICAL" : "PRIORITY: URGENT"}</span>
      </div>
      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        <dt className="text-muted-foreground">Case ID</dt><dd className="font-mono font-semibold">#{caseId}</dd>
        <dt className="text-muted-foreground">Issued</dt><dd>{new Date().toLocaleString()}</dd>
        <dt className="text-muted-foreground">Chief complaint</dt><dd className="font-semibold">{answers.symptom}</dd>
        <dt className="text-muted-foreground">Consciousness</dt><dd>{answers.conscious}</dd>
        <dt className="text-muted-foreground">Known history</dt><dd>{answers.history}</dd>
        <dt className="text-muted-foreground">Patient type</dt><dd>International visitor</dd>
        <dt className="text-muted-foreground">Receiving ER</dt><dd>Nearest NABH-accredited emergency unit</dd>
      </dl>
      <p className="mt-4 flex items-center gap-2 rounded-lg bg-muted p-3 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 shrink-0" /> Show this card to paramedics and ER staff on arrival.</p>
    </article>
  );
}

function TrackingMap() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => Math.min(v + 1, 60)), 1000);
    return () => clearInterval(id);
  }, []);
  const p = t / 60;
  const x = 40 + (260 - 40) * p;
  const y = 200 - (200 - 60) * p;
  const eta = Math.max(0, Math.ceil(8 * (1 - p)));
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between font-bold">
        <span className="flex items-center gap-2"><Ambulance className="h-5 w-5 text-sos" /> Ambulance tracking</span>
        <span className="text-sm text-sos">{eta > 0 ? `ETA ${eta} min` : "Arrived"}</span>
      </div>
      <svg viewBox="0 0 300 240" className="mt-3 w-full rounded-lg bg-muted">
        {[60, 120, 180].map((v) => <line key={`h${v}`} x1="0" y1={v} x2="300" y2={v} className="stroke-border" strokeWidth="10" />)}
        {[80, 160, 240].map((v) => <line key={`v${v}`} x1={v} y1="0" x2={v} y2="240" className="stroke-border" strokeWidth="10" />)}
        <line x1="40" y1="200" x2="260" y2="60" className="stroke-sos" strokeWidth="3" strokeDasharray="6 6" />
        <circle cx="260" cy="60" r="10" className="fill-allo" />
        <circle cx={x} cy={y} r="9" className="fill-sos transition-all duration-1000 ease-linear" />
        <circle cx={x} cy={y} r="16" className="fill-sos/20 transition-all duration-1000 ease-linear" />
      </svg>
      <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> Simulated route — blue pin is your location.</p>
    </div>
  );
}
