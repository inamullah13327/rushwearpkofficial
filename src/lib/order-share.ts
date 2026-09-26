import { buildWhatsAppOrderText, waLink, type Order } from "./store";

const sentOrderIds = new Set<string>();

const openWhatsApp = (order: Order) => {
  const chatUrl = waLink(buildWhatsAppOrderText(order));
  window.location.assign(chatUrl);
};

/** Opens one prefilled WhatsApp order message for the configured store number. */
export function sendOrderToWhatsApp(order: Order): void {
  if (sentOrderIds.has(order.orderId)) return;
  sentOrderIds.add(order.orderId);
  openWhatsApp(order);

}
