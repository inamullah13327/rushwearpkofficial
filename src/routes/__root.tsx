import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SocialNotificationSlider from "@/components/SocialNotificationSlider";
import { StoreProvider } from "@/lib/store";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

type SocialAd = {
  id: string;
  platform: "facebook" | "tiktok" | "instagram";
  title: string;
  message: string;
  username: string;
  likes: string;
  link: string;
};

const PLATFORM_LINKS: Record<SocialAd["platform"], string> = {
  facebook: "https://www.facebook.com/rushwearpk",
  tiktok: "https://www.tiktok.com/@rushwearpk?_r=1&_t=ZS-98jZhKVekKK",
  instagram: "https://www.instagram.com/rushwear.pk?igsh=NTNqODFhMGw1aGow",
};

const AD_TEMPLATES: Omit<SocialAd, "id">[] = [
  { platform: "facebook", title: "New follower on Facebook", message: "Ahmed Raza just liked your latest drop!", username: "@rushwearpk", likes: "2.4k", link: PLATFORM_LINKS.facebook },
  { platform: "tiktok", title: "TikTok viral alert", message: "Ali Khan shared a video of our latest tee!", username: "@rushwear_official", likes: "15.8k", link: PLATFORM_LINKS.tiktok },
  { platform: "instagram", title: "Instagram story view", message: "Fatima Noor tagged you in a story!", username: "@rushwearpk", likes: "8.1k", link: PLATFORM_LINKS.instagram },
  { platform: "facebook", title: "Facebook live viewers", message: "Live drop video hit 500+ views now!", username: "@rushwearpk", likes: "1.2k", link: PLATFORM_LINKS.facebook },
  { platform: "tiktok", title: "TikTok duet trend", message: "Sara created a duet with our haul!", username: "@rushwear_official", likes: "22.3k", link: PLATFORM_LINKS.tiktok },
  { platform: "instagram", title: "New DM on Instagram", message: "Hassan messaged: \"When restock navy tee?\"", username: "@rushwearpk", likes: "6.7k", link: PLATFORM_LINKS.instagram },
];

const PLATFORM_STYLES: Record<SocialAd["platform"], { bg: string; ring: string; icon: string; text: string; accent: string }> = {
  facebook: { bg: "from-[#1877F2]", ring: "ring-[#1877F2]/40", icon: "text-[#1877F2]", text: "Facebook", accent: "bg-[#1877F2]/10" },
  tiktok: { bg: "from-[#000000]", ring: "ring-[#FE2C55]/40", icon: "text-[#FE2C55]", text: "TikTok", accent: "bg-[#FE2C55]/10" },
  instagram: { bg: "from-[#E1306C]", ring: "ring-[#E1306C]/40", icon: "text-[#E1306C]", text: "Instagram", accent: "bg-[#E1306C]/10" },
};

function SocialAds() {
  const [active, setActive] = useState<SocialAd | null>(null);
  const [dismissedId, setDismissedId] = useState<string | null>(null);
  const hideTimerRef = { current: (null as unknown) as ReturnType<typeof setTimeout> | null };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let mainInterval: ReturnType<typeof setInterval> | null = null;
    let idx = 0;

    const showAdForDuration = (tpl: Omit<SocialAd, "id">) => {
      const id = `ad-${Date.now()}-${Math.random()}`;
      if (dismissedId === id) return;
      setActive({ ...tpl, id });
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setActive(null), 5000);
    };

    const sequential = [AD_TEMPLATES[0]!, AD_TEMPLATES[1]!, AD_TEMPLATES[2]!];
    timers.push(setTimeout(() => showAdForDuration(sequential[0]!), 3000));
    timers.push(setTimeout(() => showAdForDuration(sequential[1]!), 23000));
    timers.push(setTimeout(() => showAdForDuration(sequential[2]!), 43000));

    timers.push(setTimeout(() => {
      mainInterval = setInterval(() => {
        idx = (idx + 1) % AD_TEMPLATES.length;
        showAdForDuration(AD_TEMPLATES[idx]!);
      }, 20000);
    }, 63000));

    return () => {
      timers.forEach(clearTimeout);
      if (mainInterval) clearInterval(mainInterval);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [dismissedId]);

  const style = active ? PLATFORM_STYLES[active.platform] : null;

  const closeAd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (active) setDismissedId(active.id);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setActive(null);
  };

  const handleAdClick = () => {
    if (active?.link) {
      window.open(active.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-[60]">
      <AnimatePresence mode="wait">
        {active && style && (
          <motion.a
          key={active.id}
          href={active.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -500, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className={`pointer-events-auto block w-72 sm:w-80 overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl ring-1 backdrop-blur-xl cursor-pointer hover:scale-[1.02] transition-transform ${style.ring}`}
        >
          <div className={`h-1 w-full bg-gradient-to-r ${style.bg} to-gold`} />
          <div className="p-3.5">
            <div className="flex items-start gap-3">
              <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${style.accent}`}>
                {active.platform === "facebook" && (
                  <svg viewBox="0 0 24 24" fill="currentColor" className={`h-5 w-5 ${style.icon}`}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                )}
                {active.platform === "tiktok" && (
                  <svg viewBox="0 0 24 24" fill="currentColor" className={`h-5 w-5 ${style.icon}`}>
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                )}
                {active.platform === "instagram" && (
                  <svg viewBox="0 0 24 24" fill="currentColor" className={`h-5 w-5 ${style.icon}`}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-foreground">{active.title}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${style.accent} ${style.icon}`}>
                      {style.text}
                    </span>
                    <button
                      onClick={closeAd}
                      aria-label="Close notification"
                      className="grid h-5 w-5 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{active.message}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">{active.username}</span>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-primary">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    {active.likes}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "rushwear PK — Custom Premium T-Shirts" },
      {
        name: "description",
        content:
          "rushwear PK designs and prints custom premium t-shirts. Design it live, order on WhatsApp, track it in seconds.",
      },
      { name: "author", content: "rushwear PK" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <CartDrawer />
        <SocialNotificationSlider />
      </StoreProvider>
    </QueryClientProvider>
  );
}
