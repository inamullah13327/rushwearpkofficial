import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import logoAsset from "@/assets/rushwear-logo.png.asset.json";
import { formatPKR, mergeProducts } from "@/lib/products";
import { useStore, waLink } from "@/lib/store";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const { count, setCartOpen, adminProducts } = useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const navigate = useNavigate();

  const allProducts = useMemo(() => mergeProducts(adminProducts), [adminProducts]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return allProducts
      .filter((p) =>
        [p.name, p.category, p.fabricColor].some((f) => f.toLowerCase().includes(t)),
      )
      .slice(0, 5);
  }, [q, allProducts]);

  const logoSrc = logoError ? "/favicon.png" : logoAsset.url;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-surface/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img
            src={logoSrc}
            alt="rushwear PK logo"
            width={40}
            height={40}
            onError={() => setLogoError(true)}
            className="h-10 w-10 rounded-full ring-2 ring-primary/60 object-cover"
          />
          <span className="hidden font-display text-xl font-bold tracking-wide sm:block">
            RUSH<span className="text-primary">WEAR</span>
          </span>
        </Link>

        {/* search */}
        <div className="relative ml-1 hidden max-w-xs flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search t-shirts by name…"
            className="h-10 w-full rounded-full border border-border bg-secondary/70 pl-9 pr-3 text-sm outline-none transition focus:border-primary/70 focus:bg-secondary"
          />
          <AnimatePresence>
            {results.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute left-0 right-0 top-12 overflow-hidden rounded-xl border border-border bg-popover shadow-xl"
              >
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => {
                        setQ("");
                        navigate({ to: "/shop", search: { q: p.name } });
                      }}
                      className="flex w-full items-center gap-3 px-3 py-2 text-left transition hover:bg-accent"
                    >
                      <img src={p.image} alt="" className="h-9 w-9 rounded object-cover" />
                      <span className="flex-1 truncate text-sm">{p.name}</span>
                      <span className="text-xs text-muted-foreground">{formatPKR(p.price)}</span>
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <motion.a
            href={waLink(encodeURIComponent("Hi rushwear PK! I'd like to ask about your apparel."))}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            whileHover={{ scale: 1.05 }}
            className="grid h-10 w-10 place-items-center rounded-full bg-whatsapp/15 text-whatsapp transition hover:bg-whatsapp/25"
          >
            <WhatsAppIcon size={18} />
          </motion.a>

          <button
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-secondary transition hover:bg-accent"
          >
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-full bg-secondary lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-surface lg:hidden"
          >
            <div className="flex flex-col p-3 gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={cn("rounded-lg px-3 py-2.5 text-sm hover:bg-secondary")}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
