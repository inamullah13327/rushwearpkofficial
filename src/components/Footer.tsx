import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Music2 } from "lucide-react";
import logo from "@/assets/rushwear-logo.png.asset.json";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="rushwear PK"
              width={44}
              height={44}
              loading="lazy"
              className="h-11 w-11 rounded-full ring-2 ring-primary/60"
            />
            <span className="font-display text-xl font-bold">
              RUSH<span className="text-primary">WEAR</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Wear the rush. Custom-printed premium t-shirts, made and shipped across Pakistan.
          </p>
        </div>
        <div>
          <h3 className="font-display text-base font-semibold">Shop</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/shop" className="hover:text-foreground">
                All products
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-base font-semibold">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-base font-semibold">Follow</h3>
          <div className="mt-3 flex gap-2">
            {[
              { Icon: Instagram, url: "https://www.instagram.com/rushwear.pk?igsh=NTNqODFhMGw1aGow" },
              { Icon: Music2, url: "https://www.tiktok.com/@rushwearpk?_r=1&_t=ZS-98jZhKVekKK" },
              { Icon: Facebook, url: "https://www.facebook.com/rushwearpk" },
            ].map(({ Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label="Social link"
                className="grid h-10 w-10 place-items-center rounded-full bg-secondary hover:bg-accent transition"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Drop us a follow for streetwear drops, print BTS and giveaways.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} rushwear PK — Wear the rush.
      </div>
    </footer>
  );
}
