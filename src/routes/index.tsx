import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Truck, Shield } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import about1 from "@/assets/about-1.jpg";
import ProductCard from "@/components/ProductCard";
import { mergeProducts } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "rushwear PK — Wear The Rush | Custom T-Shirts Only" },
      {
        name: "description",
        content:
          "Shop premium streetwear t-shirts, design your own print in our live customizer, and send your order straight to WhatsApp.",
      },
      { property: "og:title", content: "rushwear PK — Wear The Rush" },
      {
        property: "og:description",
        content: "Custom-printed t-shirts from Pakistan. Design live, order on WhatsApp.",
      },
    ],
  }),
  component: Home,
});

const SLIDES = [
  {
    img: hero1,
    tag: "New Season",
    title: "WEAR THE RUSH",
    sub: "Heavyweight oversized tees built for the street.",
  },
  {
    img: hero2,
    tag: "Graphic Drop",
    title: "STATEMENT TEES",
    sub: "Bold graphic t-shirts in onyx, olive and navy.",
  },
  {
    img: about1,
    tag: "Custom Print",
    title: "YOUR ART, OUR PRESS",
    sub: "Upload a logo and see it live on the t-shirt.",
  },
];

function Home() {
  const [i, setI] = useState(0);
  const { adminProducts } = useStore();

  const allProducts = useMemo(() => mergeProducts(adminProducts), [adminProducts]);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);
  const slide = SLIDES[i]!;

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[78vh] min-h-[520px] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={i}
            src={slide.img}
            alt={slide.title}
            width={1600}
            height={1000}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <span className="inline-block rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {slide.tag}
              </span>
              <h1 className="mt-4 font-display text-6xl font-extrabold leading-[0.95] sm:text-7xl">
                {slide.title}
              </h1>
              <p className="mt-4 max-w-md text-base text-muted-foreground">{slide.sub}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90 glow"
                >
                  Shop the drop <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold transition hover:bg-secondary"
                >
                  Browse collection
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-8 right-4 flex items-center gap-2">
            <button
              onClick={() => setI((v) => (v - 1 + SLIDES.length) % SLIDES.length)}
              aria-label="Previous slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/70 backdrop-blur"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setI((v) => (v + 1) % SLIDES.length)}
              aria-label="Next slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/70 backdrop-blur"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute bottom-8 left-4 flex gap-1.5">
            {SLIDES.map((_, n) => (
              <button
                key={n}
                onClick={() => setI(n)}
                aria-label={`Go to slide ${n + 1}`}
                className={`h-1.5 rounded-full transition-all ${n === i ? "w-8 bg-primary" : "w-3 bg-border"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* marquee */}
      <div className="overflow-hidden border-y border-border bg-surface py-3">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-8">
              <span>Free delivery over Rs 5,000</span>
              <span>·</span>
              <span>Custom prints in 48 hours</span>
              <span>·</span>
              <span>Nationwide COD</span>
              <span>·</span>
              <span>Wear the rush</span>
              <span>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* FLASH DEALS */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Limited time</p>
            <h2 className="font-display text-4xl font-bold">FLASH DEALS</h2>
          </div>
          <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground">
            View all →
          </Link>
        </div>
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {allProducts
            .filter((p) => p.oldPrice)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>

      {/* CATEGORY DROPS */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-6 font-display text-4xl font-bold">CATEGORY DROPS</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { img: hero1, title: "Oversized Tees", to: "/shop" as const },
            { img: hero2, title: "Graphic Tees", to: "/shop" as const },
            { img: about1, title: "Signature Drops", to: "/shop" as const },
          ].map((c) => (
            <div
              key={c.title}
              className="relative h-64 overflow-hidden rounded-2xl border border-border"
            >
              <img src={c.img} alt={c.title} loading="lazy" className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-5 left-5">
                <h3 className="font-display text-2xl font-bold">{c.title}</h3>
                <Link to="/shop" className="text-sm text-primary hover:underline">
                  Explore →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-3">
          {[
            { Icon: Truck, t: "Nationwide delivery", s: "2–4 days across Pakistan, COD available." },
            { Icon: Shield, t: "Quality guaranteed", s: "240 GSM cotton, wash-safe prints." },
            { Icon: ArrowRight, t: "Fast service", s: "Quick WhatsApp support for every order." },
          ].map(({ Icon, t, s }) => (
            <div key={t} className="rush-panel p-5">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-display text-xl font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
