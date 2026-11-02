import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { BadgeCheck, CheckCircle2, FileText, MapPin, ShieldCheck, Siren, UploadCloud, X, ClipboardList } from "lucide-react";
import { comparePackages } from "@/lib/catalog";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Free Locked Quote — MedGrid" },
      { name: "description", content: "Send your medical inquiry and reports to verified Indian hospitals and get a free fixed-price quote within 24 hours." },
      { property: "og:title", content: "Get a Free Locked Quote — MedGrid" },
      { property: "og:description", content: "Verified hospital coordinators reply within 24 hours." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): { package?: string | undefined } => ({
    package: typeof s["package"] === "string" ? s["package"] : undefined,
  }),
  component: Page,
});

const countries = ["UAE", "Oman", "Saudi Arabia", "Bangladesh", "Uzbekistan", "Russia", "Kenya", "Nigeria", "Other"];
const languages = ["English", "Arabic", "Russian"];
const accepted = [".pdf", ".jpg", ".jpeg", ".png", ".dcm"];
const MAX_MB = 20;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^\+\d{1,4}[\s-]?\d{6,14}$/, "Use format +971 501234567"),
  country: z.string().min(1, "Select your country"),
  language: z.string().min(1),
  history: z.string().trim().max(2000, "Max 2000 characters"),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required to submit" }) }),
});

type UploadItem = { id: string; file: File; progress: number };

const field = "w-full rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:border-allo focus:ring-2 focus:ring-allo-soft";

function Page() {
  const { package: pkgId } = Route.useSearch();
  const pkg = comparePackages.find((p) => p.id === pkgId);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [drag, setDrag] = useState(false);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!uploads.some((u) => u.progress < 100)) return;
    const t = setInterval(() => {
      setUploads((us) => us.map((u) => (u.progress < 100 ? { ...u, progress: Math.min(100, u.progress + 8 + Math.random() * 15) } : u)));
    }, 200);
    return () => clearInterval(t);
  }, [uploads]);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    setFileError("");
    const next: UploadItem[] = [];
    for (const f of Array.from(list)) {
      const ext = "." + (f.name.split(".").pop() ?? "").toLowerCase();
      if (!accepted.includes(ext)) { setFileError(`${f.name}: only PDF, JPG, PNG or DICOM files`); continue; }
      if (f.size > MAX_MB * 1024 * 1024) { setFileError(`${f.name}: larger than ${MAX_MB} MB`); continue; }
      next.push({ id: crypto.randomUUID(), file: f, progress: 0 });
    }
    setUploads((u) => [...u, ...next]);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = schema.safeParse({
      name: fd.get("name"), email: fd.get("email"), phone: fd.get("phone"),
      country: fd.get("country"), language: fd.get("language"),
      history: fd.get("history") ?? "", consent: fd.get("consent") === "on",
    });
    if (!res.success) {
      const errs: Record<string, string> = {};
      for (const i of res.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setInquiryId(`#MQ-${Math.floor(10000 + Math.random() * 90000)}`);
  };

  const Err = ({ k }: { k: string }) => (errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null);
  const tone = pkg?.system === "ayush" ? "ayush" : "allo";

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Request a Free Locked Quote</h1>
      <p className="mt-2 text-muted-foreground">Share your details and reports — no payment or commitment required.</p>

      <section className={`mt-6 rounded-xl border bg-card p-5 shadow-sm ${tone === "ayush" ? "border-ayush" : "border-allo"}`}>
        <div className="flex items-start gap-3">
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${tone === "ayush" ? "bg-ayush-soft text-ayush" : "bg-allo-soft text-allo"}`}><ClipboardList className="h-5 w-5" /></span>
          <div className="flex-1">
            {pkg ? (
              <>
                <p className="text-sm text-muted-foreground">Inquiry for:</p>
                <p className="text-lg font-bold">{pkg.title} at {pkg.provider}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{pkg.location}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-lg font-bold">{pkg.price}</span>
                  <span className="rounded bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">Fixed Package Estimate</span>
                  {pkg.accreditations.map((a) => (
                    <span key={a} className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${tone === "ayush" ? "bg-ayush-soft text-ayush" : "bg-allo-soft text-allo"}`}><BadgeCheck className="h-3 w-3" />{a}</span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-lg font-bold">General Treatment Inquiry</p>
                <p className="text-sm text-muted-foreground">No package selected. <Link to="/compare" className="text-allo underline">Compare packages</Link> or describe your needs below.</p>
              </>
            )}
          </div>
        </div>
      </section>

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-8 rounded-xl border border-border bg-card p-6 shadow-sm">
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-allo">Patient basic info</legend>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Full Name</label>
            <input name="name" maxLength={100} className={field} placeholder="As on passport" /><Err k="name" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input name="email" type="email" maxLength={255} className={field} placeholder="you@example.com" /><Err k="email" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">WhatsApp Number (with country code)</label>
            <input name="phone" type="tel" maxLength={20} className={field} placeholder="+971 501234567" /><Err k="phone" />
          </div>
        </fieldset>

        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-allo">Location & language</legend>
          <div>
            <label className="mb-1 block text-sm font-medium">Country of Origin</label>
            <select name="country" defaultValue="" className={field}>
              <option value="" disabled>Select country</option>
              {countries.map((c) => <option key={c}>{c}</option>)}
            </select><Err k="country" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Preferred Language</label>
            <select name="language" defaultValue="English" className={field}>
              {languages.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-allo">Medical context</legend>
          <textarea name="history" maxLength={2000} className={`${field} min-h-32`} placeholder="Describe current health symptoms or medical history" /><Err k="history" />
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-allo">Medical records</legend>
          <div
            role="button" tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
            className={`flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed p-8 text-center transition ${drag ? "border-allo bg-allo-soft" : "border-border bg-muted/40 hover:border-allo"}`}>
            <UploadCloud className="h-10 w-10 text-allo" />
            <p className="mt-2 font-semibold">Drag & drop reports here, or click to browse</p>
            <p className="text-xs text-muted-foreground">PDF, JPG, PNG, DICOM (.dcm) · up to {MAX_MB} MB each</p>
            <input ref={inputRef} type="file" multiple accept={accepted.join(",")} className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
          </div>
          {fileError && <p className="mt-2 text-xs text-destructive">{fileError}</p>}
          {uploads.length > 0 && (
            <ul className="mt-4 space-y-2">
              {uploads.map((u) => (
                <li key={u.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-allo" />
                    <span className="flex-1 truncate font-medium">{u.file.name}</span>
                    <span className="text-xs text-muted-foreground">{(u.file.size / 1024 / 1024).toFixed(2)} MB</span>
                    {u.progress >= 100 && <span className="rounded-full bg-ayush-soft px-2 py-0.5 text-xs font-semibold text-ayush">Uploaded</span>}
                    <button type="button" aria-label={`Remove ${u.file.name}`} onClick={() => setUploads((us) => us.filter((x) => x.id !== u.id))}><X className="h-4 w-4 text-muted-foreground" /></button>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full transition-all ${u.progress >= 100 ? "bg-ayush" : "bg-allo"}`} style={{ width: `${u.progress}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </fieldset>

        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <label className="flex items-start gap-3 text-sm">
            <input name="consent" type="checkbox" className="mt-0.5 h-4 w-4 accent-allo" />
            <span><ShieldCheck className="mr-1 inline h-4 w-4 text-ayush" />I consent to securely share my uploaded medical summary with verified healthcare providers and facilitators under MedGrid Privacy Rules.</span>
          </label>
          <Err k="consent" />
        </div>

        <button type="submit" disabled={uploads.some((u) => u.progress < 100)}
          className="w-full rounded-lg bg-allo py-3 font-bold text-primary-foreground shadow hover:opacity-90 disabled:opacity-50">
          {uploads.some((u) => u.progress < 100) ? "Uploading files…" : "Submit Inquiry for Free Quote"}
        </button>
      </form>

      {inquiryId && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl bg-card p-8 text-center shadow-2xl">
            <CheckCircle2 className="mx-auto h-16 w-16 text-ayush" />
            <h2 className="mt-4 text-2xl font-bold">Quote Request Submitted Successfully!</h2>
            <p className="mt-3 text-sm text-muted-foreground">Your Inquiry ID</p>
            <p className="font-mono text-2xl font-bold text-allo">{inquiryId}</p>
            <p className="mt-4 text-muted-foreground">Verified hospital coordinators will reply within 24 hours.</p>
            <Link to="/sos" className="mt-6 flex items-center justify-center gap-2 rounded-lg border-2 border-sos py-3 font-semibold text-sos hover:bg-sos hover:text-primary-foreground">
              <Siren className="h-4 w-4" /> Explore Emergency SOS Safety Net
            </Link>
            <button onClick={() => setInquiryId(null)} className="mt-3 text-sm text-muted-foreground underline">Close</button>
          </div>
        </div>
      )}
    </main>
  );
}
