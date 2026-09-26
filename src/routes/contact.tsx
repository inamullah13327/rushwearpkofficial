import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Music2, Phone } from "lucide-react";
import { z } from "zod";
import { useStore, waLink } from "@/lib/store";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact rushwear PK — Talk To Our Print Team" },
      {
        name: "description",
        content:
          "Message rushwear PK about custom orders, bulk printing or delivery. WhatsApp, email and studio hours listed.",
      },
      { property: "og:title", content: "Contact rushwear PK" },
      { property: "og:description", content: "Reach our Karachi print studio on WhatsApp or email." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(120),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

function Contact() {
  const { addMessage } = useStore();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) return;
    addMessage(parsed.data);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const input = (k: keyof typeof form, label: string, type = "text") => (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type={type}
        value={form[k]}
        onChange={(e) => setForm({ ...form, [k]: e.target.value })}
        className="mt-1 h-11 w-full rounded-lg border border-border bg-secondary/60 px-3 text-sm outline-none transition focus:border-primary"
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.25em] text-primary">Say hello</p>
      <h1 className="font-display text-5xl font-extrabold">CONTACT US</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rush-panel space-y-4 p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {input("name", "Name")}
            {input("email", "Email", "email")}
          </div>
          {input("subject", "Subject")}
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
            <textarea
              rows={5}
              maxLength={1000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-secondary/60 p-3 text-sm outline-none transition focus:border-primary"
            />
          </div>
          <button className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:opacity-90 glow">
            Send message
          </button>

        </motion.form>

        <aside className="space-y-4">
          <div className="rush-panel space-y-3 p-5 text-sm">
            <h2 className="font-display text-lg font-semibold">Reach us</h2>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" /> +92 347 0543152
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" /> rushwear@gmail.com
            </p>
            <a
              href={waLink(encodeURIComponent("Hi rushwear! I have a question."))}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-whatsapp py-2.5 font-semibold text-background transition hover:opacity-90"
            >
              <WhatsAppIcon size={18} /> Chat on WhatsApp
            </a>
          </div>

          <div className="rush-panel space-y-2 p-5 text-sm">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Clock className="h-4 w-4 text-primary" /> Hours
            </h2>
            <p className="text-muted-foreground">Mon – Sat · 11:00 – 20:00 PKT</p>
            <p className="text-muted-foreground">Sunday · Closed</p>
          </div>

          <div className="rush-panel overflow-hidden">
            <div className="flex items-start gap-2 p-5 text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <p className="text-muted-foreground">
                Abbottabad
              </p>
            </div>
            <div className="relative h-36 bg-gradient-to-br from-primary/25 to-transparent">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.08),transparent_60%)]" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <MapPin className="h-8 w-8 text-primary" />
              </motion.div>
            </div>
          </div>

          <div className="rush-panel flex gap-2 p-5">
            {[Instagram, Music2, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="https://www.instagram.com/rushwear.pk?igsh=NTNqODFhMGw1aGow"
                target="_blank"
                rel="noreferrer"
                aria-label="Social profile"
                className="grid h-10 w-10 place-items-center rounded-full bg-secondary hover:bg-accent"
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
