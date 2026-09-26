import { motion } from "framer-motion";

type Props = {
  size?: number;
  className?: string;
};

export function WhatsAppIcon({ size = 20, className = "" }: Props) {
  return (
    <div className={`relative inline-grid place-items-center ${className}`}>
      <motion.span
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute rounded-full bg-whatsapp/60"
        style={{ width: size * 1.8, height: size * 1.8 }}
      />
      <motion.span
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute rounded-full bg-whatsapp/40"
        style={{ width: size * 2.3, height: size * 2.3 }}
      />
      <motion.svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <path
          fill="currentColor"
          d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.065-.62 2.556-.888.299-.158.63-.56.95-.935.261-.313.143-.602.143-.802 0-.201.472-.73.716-1.045.129-.172.273-.372.273-.572 0-.201-.144-.287-.272-.386-.372-.258-1.117-.573-1.418-.573"
        />
        <path
          fill="currentColor"
          d="M16 0C7.163 0 0 7.163 0 16c0 2.75.69 5.405 2.02 7.75L0 32l8.45-2.02A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.22c-2.34 0-4.602-.63-6.593-1.84l-.475-.28-5.02 1.2 1.22-4.89-.31-.49A13.17 13.17 0 0 1 2.78 16c0-7.3 5.92-13.22 13.22-13.22S29.22 8.7 29.22 16 23.3 29.22 16 29.22z"
        />
      </motion.svg>
    </div>
  );
}
