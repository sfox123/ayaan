import Image from "next/image";
import navy from "../public/images/logo-2.png";
import light from "../public/images/logo-2-light.png";

/**
 * The Ayaan Tours logo from the original site.
 * variant: "dark" = navy text for light backgrounds, "light" = white text for photos and dark backgrounds.
 */
export default function Logo({ variant = "dark", className = "", priority = false, alt = "Ayaan Tours" }) {
  return (
    <Image
      src={variant === "light" ? light : navy}
      alt={alt}
      priority={priority}
      unoptimized
      className={`h-[40px] w-auto sm:h-[44px] ${className}`}
    />
  );
}
