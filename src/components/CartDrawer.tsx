import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPKR } from "@/lib/products";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, removeFromCart, subtotal } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-border bg-surface"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-display text-xl font-bold">YOUR BAG</h2>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart">
                <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {cart.length === 0 && (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  Your bag is empty. Time to wear the rush.
                </p>
              )}
              {cart.map((i) => (
                <motion.div
                  key={i.uid}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    {i.image && <img src={i.image} alt="" className="h-full w-full object-cover" />}
                    {i.logoPreviewUrl && (
                      <img
                        src={i.logoPreviewUrl}
                        alt="Custom print preview"
                        className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 object-contain"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{i.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {i.color} · Size {i.size}
                      {i.logoPreviewUrl ? ` · Custom ${i.placement ?? "front"}` : ""}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          className="grid h-7 w-7 place-items-center"
                          onClick={() => setQty(i.uid, i.qty - 1)}
                          aria-label="Decrease"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs">{i.qty}</span>
                        <button
                          className="grid h-7 w-7 place-items-center"
                          onClick={() => setQty(i.uid, i.qty + 1)}
                          aria-label="Increase"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="ml-auto text-sm font-semibold text-primary">
                        {formatPKR(i.price * i.qty)}
                      </span>
                      <button onClick={() => removeFromCart(i.uid)} aria-label="Remove">
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-3 border-t border-border p-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground">{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span className="text-foreground">
                  {subtotal > 5000 || subtotal === 0 ? "Free" : formatPKR(250)}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 font-display text-lg font-bold">
                <span>TOTAL</span>
                <span className="text-primary">
                  {formatPKR(subtotal + (subtotal > 5000 || subtotal === 0 ? 0 : 250))}
                </span>
              </div>
              <Link
                to="/checkout"
                onClick={() => setCartOpen(false)}
                className="block rounded-full bg-primary py-3 text-center font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Checkout
              </Link>
              <Link
                to="/shop"
                onClick={() => setCartOpen(false)}
                className="block rounded-full border border-border py-3 text-center font-semibold transition hover:bg-secondary"
              >
                Continue shopping
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
