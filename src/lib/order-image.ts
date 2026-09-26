import type { Order } from "./store";

const WIDTH = 900;
const PADDING = 40;
const ROW_HEIGHT = 150;
const THUMB = 118;

const loadImage = (src: string): Promise<HTMLImageElement | null> =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

const drawCover = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  size: number,
) => {
  const scale = Math.max(size / img.width, size / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, size, size);
  ctx.clip();
  ctx.drawImage(img, x + (size - w) / 2, y + (size - h) / 2, w, h);
  ctx.restore();
};

/**
 * Renders an order receipt (customer details, items and every item picture)
 * into a single PNG so it can be shared as an image on WhatsApp.
 */
export async function renderOrderImage(order: Order): Promise<Blob | null> {
  if (typeof document === "undefined") return null;

  const headerHeight = 300;
  const footerHeight = 200;
  const height = headerHeight + order.items.length * ROW_HEIGHT + footerHeight;

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#0b0b0d";
  ctx.fillRect(0, 0, WIDTH, height);
  ctx.fillStyle = "#e8462f";
  ctx.fillRect(0, 0, WIDTH, 8);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 44px Inter, Arial, sans-serif";
  ctx.fillText("rushwear PK — New Order", PADDING, 80);

  ctx.fillStyle = "#e8462f";
  ctx.font = "bold 30px monospace";
  ctx.fillText(order.orderId, PADDING, 128);

  ctx.fillStyle = "#9aa0a6";
  ctx.font = "20px Inter, Arial, sans-serif";
  ctx.fillText(new Date(order.timestamp).toLocaleString(), PADDING, 162);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 24px Inter, Arial, sans-serif";
  ctx.fillText("Customer", PADDING, 214);
  ctx.fillStyle = "#c9ccd1";
  ctx.font = "20px Inter, Arial, sans-serif";
  ctx.fillText(`${order.customer.name} · ${order.customer.phone}`, PADDING, 246);
  ctx.fillText(`${order.customer.address}, ${order.customer.city}`, PADDING, 276);

  const images = await Promise.all(
    order.items.map((i) => loadImage(i.logoPreviewUrl || i.image || "")),
  );

  let y = headerHeight;
  for (let n = 0; n < order.items.length; n++) {
    const item = order.items[n]!;
    ctx.fillStyle = "#141417";
    ctx.fillRect(PADDING, y, WIDTH - PADDING * 2, ROW_HEIGHT - 16);

    const img = images[n];
    if (img) drawCover(ctx, img, PADDING + 12, y + 8, THUMB);

    const textX = PADDING + THUMB + 36;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px Inter, Arial, sans-serif";
    ctx.fillText(`${n + 1}. ${item.name}`, textX, y + 46);

    ctx.fillStyle = "#9aa0a6";
    ctx.font = "20px Inter, Arial, sans-serif";
    ctx.fillText(
      `T-Shirt · Size ${item.size} · ${item.color} · Qty ${item.qty}${
        item.logoPreviewUrl ? ` · Custom print (${item.placement ?? "front"})` : ""
      }`,
      textX,
      y + 80,
    );

    ctx.fillStyle = "#e8462f";
    ctx.font = "bold 24px Inter, Arial, sans-serif";
    ctx.fillText(`Rs ${(item.price * item.qty).toLocaleString("en-PK")}`, textX, y + 114);

    y += ROW_HEIGHT;
  }

  ctx.strokeStyle = "#2a2a30";
  ctx.beginPath();
  ctx.moveTo(PADDING, y + 8);
  ctx.lineTo(WIDTH - PADDING, y + 8);
  ctx.stroke();

  ctx.fillStyle = "#c9ccd1";
  ctx.font = "22px Inter, Arial, sans-serif";
  ctx.fillText(`Subtotal: Rs ${order.summary.subtotal.toLocaleString("en-PK")}`, PADDING, y + 50);
  ctx.fillText(`Shipping: Rs ${order.summary.shipping.toLocaleString("en-PK")}`, PADDING, y + 84);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 34px Inter, Arial, sans-serif";
  ctx.fillText(`Total: Rs ${order.summary.total.toLocaleString("en-PK")}`, PADDING, y + 134);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png"));
}
