import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { formatPKR } from "@/lib/products";
import { useStore } from "@/lib/store";
import { sendOrderToWhatsApp } from "@/lib/order-share";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — rushwear PK" },
      {
        name: "description",
        content:
          "Place your rushwear PK order and send the full details to our team on WhatsApp instantly.",
      },
      { property: "og:title", content: "Checkout — rushwear PK" },
      { property: "og:description", content: "Fast checkout with WhatsApp order dispatch." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { cart, subtotal, placeOrder } = useStore();
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "" });
  const [sending, setSending] = useState(false);
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 250;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart.length || sending) return;

    setSending(true);
    try {
      const order = placeOrder(form);
      setForm({ name: "", phone: "", address: "", city: "" });
      await sendOrderToWhatsApp(order);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const field = (k: keyof typeof form, label: string, type = "text") => (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        required
        type={type}
        value={form[k]}
        maxLength={200}
        onChange={(e) => setForm({ ...form, [k]: e.target.value })}
        className="mt-1 h-11 w-full rounded-lg border border-border bg-secondary/60 px-3 text-sm outline-none focus:border-primary"
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-display text-5xl font-extrabold">CHECKOUT</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <form onSubmit={submit} className="rush-panel space-y-4 p-5">
          {field("name", "Full name")}
          {field("phone", "Phone number", "tel")}
          {field("address", "Delivery address")}
          {field("city", "City")}
          <button
            type="submit"
            disabled={!cart.length || sending}
            className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
          >
            {sending ? "Opening WhatsApp…" : cart.length ? "Place order" : "Your bag is empty"}
          </button>
        </form>

        <aside className="rush-panel h-fit space-y-2 p-5 text-sm">
          <h2 className="font-display text-lg font-semibold">Summary</h2>
          {cart.map((i) => (
            <div key={i.uid} className="flex justify-between text-muted-foreground">
              <span className="truncate pr-2">
                {i.name} ×{i.qty}
              </span>
              <span className="text-foreground">{formatPKR(i.price * i.qty)}</span>
            </div>
          ))}
          <div className="flex justify-between border-t border-border pt-2 text-muted-foreground">
            <span>Shipping</span>
            <span className="text-foreground">{shipping ? formatPKR(shipping) : "Free"}</span>
          </div>
          <div className="flex justify-between font-display text-lg font-bold">
            <span>TOTAL</span>
            <span className="text-primary">{formatPKR(subtotal + shipping)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
