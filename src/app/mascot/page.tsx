import type { Metadata } from "next";
import { SITE } from "@/config/site";
import MascotClient from "./MascotClient";

const c = SITE.mascot;

export const metadata: Metadata = {
  title: c.ogTitle,
  description: c.ogDescription,
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    type: "website",
    // TODO: Add OG image once designed — place in /public/og-mascot.png
    // images: [{ url: "/og-mascot.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: c.ogTitle,
    description: c.ogDescription,
  },
};

export default function MascotPage() {
  return <MascotClient />;
}
