import Image from "next/image";
import navy from "../public/images/logo-2.png";
import light from "../public/images/logo-2-light.png";
import stacked from "../public/images/logo-stacked.png";

/**
 * The Ayaan Tours logo from the original site.
 * variant: "dark" = navy text for light backgrounds, "light" = white text for photos and dark backgrounds,
 * "stacked" = the large two-line white version (footer).
 */
export default function Logo({ variant = "dark", className = "", priority = false, alt = "Ayaan Tours" }) {
  if (variant === "stacked") {
    return <Image src={stacked} alt={alt} sizes="240px" className={`h-auto w-[200px] sm:w-[240px] ${className}`} />;
  }
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
