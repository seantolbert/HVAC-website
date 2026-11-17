import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { fontFamily } from "./fonts";
import { business, theme } from "@/lib/config";
import { MotionProvider } from "@/components/site/motion-provider";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: `${business.name}: heating and air conditioning, Phoenix metro`,
  description: business.summary,
  robots: business.sample ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: theme.colors.ink,
};

const themeVars = {
  "--ink": theme.colors.ink,
  "--paper": theme.colors.paper,
  "--paper-cool": theme.colors.paperCool,
  "--accent": theme.colors.accent,
  "--accent-ink": theme.colors.accentInk,
  "--muted-ink": theme.colors.muted,
  "--seam": theme.colors.seam,
  "--ink-muted": theme.colors.inkMuted,
  "--radius": theme.radius,
  "--heading-family": fontFamily(theme.fonts.heading),
  "--body-family": fontFamily(theme.fonts.body),
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" style={themeVars} className="antialiased">
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
