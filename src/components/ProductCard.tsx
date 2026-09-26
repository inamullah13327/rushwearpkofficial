import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { SIZES, formatPKR, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist, setCartOpen } = useStore();
  const [size, setSize] = useState<string>("M");
  const [qty, setQty] = useState(1);
  const liked = wishlist.includes(product.id);
  const hasValidOldPrice = product.oldPrice && product.oldPrice > product.price;

  const add = () => {
    addToCart({
      id: product.id,
      name: product.name,
      type: product.type,
      size,
      color: product.fabricColor,
      qty,
      price: product.price,
      image: product.image,
    });
    setCartOpen(true);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      className="overflow-hidden rounded-2xl border border-border bg-card flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {product.tag && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground max-w-[70%] truncate">
            {product.tag}
          </span>
        )}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-background/70 backdrop-blur"
        >
          <Heart
            className={`h-3.5 w-3.5 transition ${liked ? "fill-destructive text-destructive" : "text-foreground"}`}
          />
        </motion.button>
      </div>

      <div className="space-y-1.5 p-2 flex-1 flex flex-col">
        <div className="space-y-0.5">
          <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
          <h3 className="truncate font-display text-[12px] font-bold leading-tight">
            {product.name}
          </h3>
        </div>

        <div className="flex items-baseline gap-1 flex-nowrap">
          <span className="inline-flex items-baseline whitespace-nowrap font-display text-[13px] font-extrabold text-primary">
            {formatPKR(product.price)}
          </span>
          {hasValidOldPrice && (
            <span className="whitespace-nowrap text-[10px] text-muted-foreground line-through">
              {formatPKR(product.oldPrice!)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-5 gap-1">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`h-[18px] w-full rounded border text-[9px] font-semibold transition ${
                size === s
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border text-muted-foreground hover:border-primary/60"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center rounded-full border border-border overflow-hidden flex-shrink-0">
            <button
              className="grid h-5 w-5 place-items-center hover:bg-secondary"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              <Minus className="h-2 w-2" />
            </button>
            <span className="w-3.5 text-center text-[10px] font-semibold">{qty}</span>
            <button
              className="grid h-5 w-5 place-items-center hover:bg-secondary"
              onClick={() => setQty((q) => q + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-2 w-2" />
            </button>
          </div>
          <button
            onClick={add}
            className="flex flex-1 items-center justify-center gap-0.5 rounded-full bg-primary py-1 text-[9px] font-bold text-primary-foreground transition hover:opacity-90"
          >
            <ShoppingBag className="h-2.5 w-2.5" />
            <span className="truncate">Add</span>
          </button>
        </div>

      </div>
    </motion.article>
  );
}
