import { Link } from "@tanstack/react-router";
import { HeartPulse, Siren, Globe, Menu } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/treatments", label: "Treatments" },
  { to: "/compare", label: "Compare Packages" },
  { to: "/quote", label: "Travel Help" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-allo text-primary-foreground">
            <HeartPulse className="h-5 w-5" />
          </span>
          Med<span className="text-allo">Grid</span>
        </Link>
        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: true }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              activeProps={{ className: "text-allo bg-allo-soft" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <label className="hidden items-center gap-1 rounded-md border border-border px-2 py-1.5 text-sm sm:flex">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <select aria-label="Language" className="bg-transparent outline-none">
              <option>English</option><option>Arabic</option><option>Russian</option>
            </select>
          </label>
          <Link to="/sos" className="flex items-center gap-1.5 rounded-md bg-sos px-3 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90">
            <Siren className="h-4 w-4" /> Emergency SOS
          </Link>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu"><Menu /></button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-border px-4 py-2 md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 text-sm font-medium">{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
