import album1 from "@/album/WhatsApp Image 2026-08-08 at 8.02.33 PM (1).jpeg";
import album2 from "@/album/WhatsApp Image 2026-08-08 at 8.02.33 PM (2).jpeg";
import album3 from "@/album/WhatsApp Image 2026-08-08 at 8.02.33 PM.jpeg";
import album4 from "@/album/WhatsApp Image 2026-08-08 at 8.02.34 PM (1).jpeg";
import album5 from "@/album/WhatsApp Image 2026-08-08 at 8.02.34 PM (2).jpeg";
import album6 from "@/album/WhatsApp Image 2026-08-08 at 8.02.34 PM.jpeg";
import album7 from "@/album/WhatsApp Image 2026-08-08 at 8.02.35 PM (1).jpeg";
import album8 from "@/album/WhatsApp Image 2026-08-08 at 8.02.35 PM (2).jpeg";
import album9 from "@/album/WhatsApp Image 2026-08-08 at 8.02.35 PM (3).jpeg";
import album10 from "@/album/WhatsApp Image 2026-08-08 at 8.02.35 PM.jpeg";
import album11 from "@/album/WhatsApp Image 2026-08-08 at 8.02.36 PM (1).jpeg";
import album12 from "@/album/WhatsApp Image 2026-08-08 at 8.02.36 PM (2).jpeg";
import album13 from "@/album/WhatsApp Image 2026-08-08 at 8.02.36 PM.jpeg";
import album14 from "@/album/WhatsApp Image 2026-08-08 at 8.02.37 PM (1).jpeg";
import album15 from "@/album/WhatsApp Image 2026-08-08 at 8.02.37 PM (2).jpeg";
import album16 from "@/album/WhatsApp Image 2026-08-08 at 8.02.37 PM.jpeg";
import type { AdminProduct } from "./store";

export type GarmentType = "tshirt";

export type Product = {
  id: string;
  name: string;
  type: GarmentType;
  category: string;
  fabricColor: string;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: string;
};

export const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

export const GARMENT_COLORS = [
  { name: "Onyx Black", value: "#111214" },
  { name: "Heather Grey", value: "#9aa0a6" },
  { name: "Navy Blue", value: "#1e2a4a" },
  { name: "Crimson Red", value: "#9b1c2c" },
  { name: "Olive Green", value: "#4b5320" },
  { name: "Pure White", value: "#f4f5f7" },
];

export const CATEGORIES = ["T-Shirts", "Graphic Tees", "Oversized Tees", "Custom Blanks"];

export const PRODUCT_PRICE = 1799;
export const PRODUCT_OLD_PRICE = 2499;

const ALBUM_IMAGES = [
  album1,
  album2,
  album3,
  album4,
  album5,
  album6,
  album7,
  album8,
  album9,
  album10,
  album11,
  album12,
  album13,
  album14,
  album15,
  album16,
];

export const products: Product[] = ALBUM_IMAGES.map((image, index) => ({
  id: `rw-design-${index + 1}`,
  name: `Design ${index + 1}`,
  type: "tshirt",
  category: "T-Shirts",
  fabricColor: "Onyx Black",
  price: PRODUCT_PRICE,
  oldPrice: PRODUCT_OLD_PRICE,
  image,
}));

export const formatPKR = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;

export function mergeProducts(adminProducts: AdminProduct[]): Product[] {
  const adminAsProducts: Product[] = adminProducts
    .filter((ap) => ap.type === "tshirt")
    .map((ap) => ({
      id: ap.id,
      name: ap.name,
      type: "tshirt",
      category: ap.category,
      fabricColor: ap.fabricColor,
      price: PRODUCT_PRICE,
      ...(ap.oldPrice === undefined ? {} : { oldPrice: ap.oldPrice }),
      image: ap.image,
      ...(ap.tag === undefined ? {} : { tag: ap.tag }),
    }));
  return [...adminAsProducts, ...products];
}
