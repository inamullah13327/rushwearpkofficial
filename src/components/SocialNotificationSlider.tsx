import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Platform = "facebook" | "tiktok" | "instagram";

type SocialPrompt = {
  platform: Platform;
  link: string;
};

const BRAND_NAME = "rushwear PK";

const PROMPTS: SocialPrompt[] = [
  { platform: "facebook", link: "https://www.facebook.com/rushwearpk" },
  { platform: "tiktok", link: "https://www.tiktok.com/@rushwearpk?_r=1&_t=ZS-98jZhKVekKK" },
  { platform: "instagram", link: "https://www.instagram.com/rushwear.pk?igsh=NTNqODFhMGw1aGow" },
];

const PLATFORM_STYLES: Record<Platform, { color: string; background: string; label: string }> = {
  facebook: { color: "text-white", background: "bg-[#1877f2]", label: "Facebook" },
  tiktok: { color: "text-white", background: "bg-black", label: "TikTok" },
  instagram: { color: "text-white", background: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]", label: "Instagram" },
};

const PlatformIcon = ({ platform }: { platform: Platform }) => {
  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
        <defs><linearGradient id="instagram-card-gradient" x1="0" x2="1" y1="1" y2="0"><stop offset="0" stopColor="#f9ce34" /><stop offset="0.5" stopColor="#ee2a7b" /><stop offset="1" stopColor="#6228d7" /></linearGradient></defs>
        <path fill="url(#instagram-card-gradient)" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0-3-3 3 3 0 0 0 3-3Z" />
      </svg>
    );
  }
  if (platform === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
        <path fill="#25f4ee" d="M17.2 2H13.6v13.1a2.9 2.9 0 1 1-2-2.75V8.7a6.4 6.4 0 1 0 5.6 6.4V8.2a8 8 0 0 0 4.8 1.6V6.2A4.8 4.8 0 0 1 17.2 2Z" />
        <path fill="#fe2c55" d="M16.2 2H13v13.1a2.9 2.9 0 1 1-2-2.75V8.7a6.4 6.4 0 1 0 5.6 6.4V8.2a8 8 0 0 0 4.8 1.6V6.2A4.8 4.8 0 0 1 16.2 2Z" />
        <path fill="white" d="M16.6 2H13v13.1a2.9 2.9 0 1 1-2-2.75V8.7a6.4 6.4 0 1 0 5.6 6.4V8.2a8 8 0 0 0 4.8 1.6V6.2A4.8 4.8 0 0 1 16.6 2Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.98h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  );
};

export default function SocialNotificationSlider() {
  const [active, setActive] = useState<SocialPrompt | null>(null);
  const activeRef = useRef<SocialPrompt | null>(null);
  const cooldownUntilRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastIndexRef = useRef(-1);

  useEffect(() => {
    const showRandom = () => {
      if (activeRef.current || Date.now() < cooldownUntilRef.current) return;

      let nextIndex = Math.floor(Math.random() * PROMPTS.length);
      if (PROMPTS.length > 1 && nextIndex === lastIndexRef.current) {
        nextIndex = (nextIndex + 1) % PROMPTS.length;
      }
      lastIndexRef.current = nextIndex;
      const nextPrompt = PROMPTS[nextIndex]!;
      activeRef.current = nextPrompt;
      setActive(nextPrompt);
      hideTimerRef.current = setTimeout(() => {
        activeRef.current = null;
        setActive(null);
      }, 8000);
    };

    const initialTimer = setTimeout(showRandom, 3000);
    const interval = setInterval(showRandom, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const close = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    cooldownUntilRef.current = Date.now() + 120000;
    activeRef.current = null;
    setActive(null);
  };

  const style = active ? PLATFORM_STYLES[active.platform] : null;

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-[60]">
      <AnimatePresence mode="wait">
        {active && style && (
          <motion.a
            key={active.platform}
            href={active.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ x: -360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -360, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="pointer-events-auto relative block w-72 overflow-hidden rounded-lg border border-[#b58a17] bg-black shadow-2xl sm:w-80"
          >
            <div className="flex items-center gap-3 p-3">
              <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-md text-white ${style.background}`}>
                <PlatformIcon platform={active.platform} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-wider text-[#dcae2d]">Connect</p>
                <p className="truncate font-display text-base font-normal text-white">
                  Join {BRAND_NAME} on {style.label}
                </p>
                <p className="text-xs text-gray-400">{BRAND_NAME} Official</p>
                <span className="mt-2 block rounded-md bg-[#c89416] px-3 py-1 text-center text-xs font-normal text-black">
                  Join Now
                </span>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close social follow card"
                className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white transition hover:bg-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
