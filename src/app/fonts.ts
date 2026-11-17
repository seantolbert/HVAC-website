import { IBM_Plex_Mono, IBM_Plex_Sans, Inter, Manrope, Source_Serif_4 } from "next/font/google";

// The approved faces from the industry-design-direction skill. theme.json picks
// one heading and one body face by name; unused faces are never downloaded.
// If theme.json changes faces, move preload: true to the new pair.
// Inter and Manrope are this site's theme faces, so they preload to keep the
// hero headline (the LCP element) from waiting on a late font swap.
const inter = Inter({ subsets: ["latin"], display: "swap", preload: true });
const manrope = Manrope({ subsets: ["latin"], display: "swap", preload: true });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], display: "swap", preload: false });
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

const approved = {
  Inter: inter,
  Manrope: manrope,
  "Source Serif 4": sourceSerif,
  "IBM Plex Sans": plexSans,
  "IBM Plex Mono": plexMono,
} as const;

export function fontFamily(name: string) {
  const font = approved[name as keyof typeof approved];
  if (!font) {
    throw new Error(`theme.json font "${name}" is not on the approved list`);
  }
  return font.style.fontFamily;
}
