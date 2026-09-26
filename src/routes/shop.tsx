import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { mergeProducts } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search['q'] === "string" ? (search['q'] as string) : "",
  }),
  head: () => ({
    meta: [
      { title: "Shop Premium T-Shirts — rushwear PK" },
      {
        name: "description",
        content:
          "Browse rushwear PK t-shirts, graphic drops and oversized tees. Pick your size, quick-add to cart or customize any item.",
      },
      { property: "og:title", content: "Shop — rushwear PK" },
      {
        property: "og:description",
        content: "Premium streetwear t-shirts, customizable and shipped nationwide.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { q } = Route.useSearch();
  const { adminProducts } = useStore();

  const allProducts = useMemo(() => mergeProducts(adminProducts), [adminProducts]);

  const list = allProducts.filter((p) => {
    const byQ = !q || p.name.toLowerCase().includes(q.toLowerCase());
    return byQ;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.25em] text-primary">The collection</p>
      <h1 className="font-display text-5xl font-extrabold">SHOP ALL</h1>
      {q && <p className="mt-2 text-sm text-muted-foreground">Results for “{q}”</p>}

      <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {list.length === 0 && (
        <p className="py-20 text-center text-muted-foreground">No products match that search.</p>
      )}
    </div>
  );
}
