import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Scissors, Sparkles, Users } from "lucide-react";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About rushwear PK — Craft, Print, Deliver" },
      {
        name: "description",
        content:
          "rushwear PK prints heavyweight streetwear in Pakistan. Meet the press, the fabric standards and the people behind every custom run.",
      },
      { property: "og:title", content: "About rushwear PK" },
      {
        property: "og:description",
        content: "Heavyweight cotton, wash-safe prints and custom runs made in Pakistan.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={about1}
          alt="rushwear print workshop"
          width={1200}
          height={900}
          className="h-[46vh] min-h-80 w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-8 left-1/2 w-full max-w-7xl -translate-x-1/2 px-4">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Our story</p>
          <h1 className="font-display text-6xl font-extrabold">WEAR THE RUSH</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-4xl font-bold">Built in Pakistan, worn everywhere</h2>
          <p className="mt-4 text-muted-foreground">
            rushwear started in a two-press studio with one rule: no thin, floppy tees. Every
            garment we ship is 240 GSM combed cotton, pre-shrunk and stitched to hold its shape
            after fifty washes.
          </p>
          <p className="mt-3 text-muted-foreground">
            Today we print thousands of custom runs a month — team kits, brand merch, one-off
            designs made in our studio by people who actually wear what they make.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { n: "12k+", l: "Orders shipped" },
              { n: "48h", l: "Print turnaround" },
              { n: "4.9★", l: "Customer rating" },
            ].map((s) => (
              <div key={s.l} className="rush-panel p-4 text-center">
                <p className="font-display text-3xl font-bold text-primary">{s.n}</p>
                <p className="text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {[hero1, about2, hero2, about1].map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt="rushwear production and apparel"
              loading="lazy"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`h-48 w-full rounded-xl border border-border object-cover ${i % 3 === 0 ? "row-span-1 h-56" : ""}`}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: Scissors, t: "Cut & sewn locally", s: "Own patterns, own machines." },
            { Icon: Sparkles, t: "Wash-safe prints", s: "Plastisol & DTF, cured properly." },
            { Icon: Award, t: "240 GSM cotton", s: "Heavyweight, structured drape." },
            { Icon: Users, t: "Bulk friendly", s: "Team kits from 10 pieces up." },
          ].map(({ Icon, t, s }) => (
            <div key={t} className="rush-panel p-5">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-display text-xl font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="font-display text-4xl font-bold">Ready to wear the rush?</h2>
        <p className="mt-2 text-muted-foreground">
          Browse our latest streetwear pieces and find your next signature fit.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground glow"
        >
          Shop the collection
        </Link>
      </section>
    </div>
  );
}
