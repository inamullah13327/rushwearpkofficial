import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const WHATSAPP_NUMBER = "923470543152";
export const ADMIN_EMAIL = "inam@gmail.com";
export const ADMIN_PASSWORD = "Ali123#";

export type CartItem = {
  uid: string;
  id: string;
  name: string;
  type: "tshirt";
  size: string;
  color: string;
  qty: number;
  price: number;
  logoPreviewUrl?: string | undefined;
  placement?: string | undefined;
  image?: string | undefined;
};

export type Order = {
  orderId: string;
  timestamp: number;
  customer: { name: string; phone: string; address: string; city: string };
  items: CartItem[];
  summary: { subtotal: number; shipping: number; total: number };
  status: string;
};

export type Subscriber = {
  id: string;
  email: string;
  timestamp: number;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: number;
};

export type AdminProductImage = {
  id: string;
  url: string;
  productId: string;
  timestamp: number;
};

export type AdminProduct = {
  id: string;
  name: string;
  type: "tshirt";
  category: string;
  fabricColor: string;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: string;
  timestamp: number;
};

type StoreValue = {
  cart: CartItem[];
  orders: Order[];
  wishlist: string[];
  subscribers: Subscriber[];
  messages: Message[];
  productImages: AdminProductImage[];
  adminProducts: AdminProduct[];
  isAdminLoggedIn: boolean;
  cartOpen: boolean;
  adminLoginOpen: boolean;
  subscribeOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setAdminLoginOpen: (v: boolean) => void;
  setSubscribeOpen: (v: boolean) => void;
  addToCart: (item: Omit<CartItem, "uid">) => void;
  removeFromCart: (uid: string) => void;
  setQty: (uid: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  placeOrder: (customer: Order["customer"]) => Order;
  updateOrderStatus: (orderId: string, status: string) => void;
  addSubscriber: (email: string) => Subscriber | null;
  removeSubscriber: (id: string) => void;
  addMessage: (msg: Omit<Message, "id" | "timestamp">) => Message;
  addProductImage: (productId: string, url: string) => void;
  removeProductImage: (id: string) => void;
  addAdminProduct: (p: Omit<AdminProduct, "id" | "timestamp">) => AdminProduct;
  removeAdminProduct: (id: string) => void;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
  count: number;
  subtotal: number;
};

const StoreContext = createContext<StoreValue | null>(null);

const load = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const notifyOnWhatsApp = (body: string) => {
  try {
    window.open(waLink(encodeURIComponent(body)), "_blank", "noopener,noreferrer");
  } catch (e) {
    console.error("Failed to open WhatsApp", e);
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [productImages, setProductImages] = useState<AdminProductImage[]>([]);
  const [adminProducts, setAdminProducts] = useState<AdminProduct[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(load<CartItem[]>("rw_cart", []));
    setOrders(load<Order[]>("rw_orders", []));
    setWishlist(load<string[]>("rw_wishlist", []));
    setSubscribers(load<Subscriber[]>("rw_subscribers", []));
    setMessages(load<Message[]>("rw_messages", []));
    setProductImages(load<AdminProductImage[]>("rw_product_images", []));
    setAdminProducts(load<AdminProduct[]>("rw_admin_products", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rw_cart", JSON.stringify(cart));
    localStorage.setItem("rw_orders", JSON.stringify(orders));
    localStorage.setItem("rw_wishlist", JSON.stringify(wishlist));
    localStorage.setItem("rw_subscribers", JSON.stringify(subscribers));
    localStorage.setItem("rw_messages", JSON.stringify(messages));
    localStorage.setItem("rw_product_images", JSON.stringify(productImages));
    localStorage.setItem("rw_admin_products", JSON.stringify(adminProducts));
  }, [cart, orders, wishlist, subscribers, messages, productImages, adminProducts, hydrated]);

  const addToCart = useCallback((item: Omit<CartItem, "uid">) => {
    setCart((prev) => {
      const match = prev.find(
        (p) =>
          p.id === item.id &&
          p.size === item.size &&
          p.color === item.color &&
          p.logoPreviewUrl === item.logoPreviewUrl,
      );
      if (match) {
        return prev.map((p) => (p.uid === match.uid ? { ...p, qty: p.qty + item.qty } : p));
      }
      return [...prev, { ...item, uid: `${item.id}-${Date.now()}-${prev.length}` }];
    });
  }, []);

  const removeFromCart = useCallback(
    (uid: string) => setCart((p) => p.filter((i) => i.uid !== uid)),
    [],
  );
  const setQty = useCallback(
    (uid: string, qty: number) =>
      setCart((p) => p.map((i) => (i.uid === uid ? { ...i, qty: Math.max(1, qty) } : i))),
    [],
  );
  const clearCart = useCallback(() => setCart([]), []);
  const toggleWishlist = useCallback(
    (id: string) => setWishlist((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
    [],
  );

  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);
  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const placeOrder = useCallback(
    (customer: Order["customer"]) => {
      const shipping = subtotal > 5000 ? 0 : 250;
      const order: Order = {
        orderId: `TC-${Math.floor(100000 + Math.random() * 899999)}-PK`,
        timestamp: Date.now(),
        customer,
        items: cart,
        summary: { subtotal, shipping, total: subtotal + shipping },
        status: "Order Placed",
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);

      return order;
    },
    [cart, subtotal],
  );

  const updateOrderStatus = useCallback((orderId: string, status: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status } : o)),
    );
  }, []);

  const addSubscriber = useCallback(
    (email: string): Subscriber | null => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) return null;
      const exists = subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase());
      if (exists) return null;
      const sub: Subscriber = {
        id: `sub-${Date.now()}`,
        email,
        timestamp: Date.now(),
      };
      setSubscribers((prev) => [sub, ...prev]);
      return sub;
    },
    [subscribers],
  );

  const removeSubscriber = useCallback((id: string) => {
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const addMessage = useCallback(
    (msg: Omit<Message, "id" | "timestamp">): Message => {
      const newMsg: Message = {
        ...msg,
        id: `msg-${Date.now()}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [newMsg, ...prev]);

      notifyOnWhatsApp(
        [
          `*New Contact Message — rushwear PK*`,
          ``,
          `Name: ${newMsg.name}`,
          `Email: ${newMsg.email}`,
          `Subject: ${newMsg.subject}`,
          ``,
          newMsg.message,
        ].join("\n"),
      );

      return newMsg;
    },
    [],
  );

  const addProductImage = useCallback((productId: string, url: string) => {
    setProductImages((prev) => [
      {
        id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        url,
        productId,
        timestamp: Date.now(),
      },
      ...prev,
    ]);
  }, []);

  const removeProductImage = useCallback((id: string) => {
    setProductImages((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const addAdminProduct = useCallback(
    (p: Omit<AdminProduct, "id" | "timestamp">): AdminProduct => {
      const newProduct: AdminProduct = {
        ...p,
        id: `admin-prod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: Date.now(),
      };
      setAdminProducts((prev) => [newProduct, ...prev]);
      return newProduct;
    },
    [],
  );

  const removeAdminProduct = useCallback((id: string) => {
    setAdminProducts((prev) => prev.filter((p) => p.id !== id));
    setProductImages((prev) => prev.filter((i) => i.productId !== id));
  }, []);

  const adminLogin = useCallback((email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  }, []);

  const adminLogout = useCallback(() => {
    setIsAdminLoggedIn(false);
  }, []);

  const value: StoreValue = {
    cart,
    orders,
    wishlist,
    subscribers,
    messages,
    productImages,
    adminProducts,
    isAdminLoggedIn,
    cartOpen,
    adminLoginOpen,
    subscribeOpen,
    setCartOpen,
    setAdminLoginOpen,
    setSubscribeOpen,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    toggleWishlist,
    placeOrder,
    updateOrderStatus,
    addSubscriber,
    removeSubscriber,
    addMessage,
    addProductImage,
    removeProductImage,
    addAdminProduct,
    removeAdminProduct,
    adminLogin,
    adminLogout,
    count,
    subtotal,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function buildWhatsAppOrderMessage(order: Order) {
  const lines = [
    `*rushwear PK — New Order*`,
    ``,
    `*Customer:* ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `Address: ${order.customer.address}, ${order.customer.city}`,
    ``,
    `*Items (with Product Names)*`,
    ...order.items.map(
      (i, n) =>
        `${n + 1}. *${i.name}* | T-Shirt | Size ${i.size} | ${i.color} | Qty ${i.qty} | Rs ${(i.price * i.qty).toLocaleString("en-PK")}`,
    ),
  ];

  lines.push(``);
  lines.push(`Subtotal: Rs ${order.summary.subtotal.toLocaleString("en-PK")}`);
  lines.push(`Shipping: Rs ${order.summary.shipping.toLocaleString("en-PK")}`);
  lines.push(`*Total: Rs ${order.summary.total.toLocaleString("en-PK")}*`);

  return lines.join("\n");
}

export const buildWhatsAppOrderText = (order: Order) =>
  encodeURIComponent(buildWhatsAppOrderMessage(order));

export const waLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${text}` : ""}`;
