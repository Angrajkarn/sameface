import type { Metadata } from "next";
import { SITE } from "@/config/site";
import MascotClient from "./mascot/MascotClient";

const c = SITE.mascot;

export const metadata: Metadata = {
  title: "SameFace — Consistent AI Cartoon Studio & Multi-Platform Auto-Publisher",
  description:
    "Create your cartoon character once. Keep the same face across every episode. 14+ Indian regional languages, natural dialect voices, native lip-sync, and auto-post to all social media.",
  openGraph: {
    title: "SameFace — Consistent AI Cartoon Studio & Multi-Platform Auto-Publisher",
    description:
      "Create your cartoon character once. Keep the same face across every episode. 14+ Indian regional languages, natural dialect voices, native lip-sync, and auto-post to all social media.",
    type: "website",
    images: [{ url: "/sameface-logo.png", width: 240, height: 240 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SameFace — Consistent AI Cartoon Studio & Multi-Platform Auto-Publisher",
    description:
      "Create your cartoon character once. Keep the same face across every episode. 14+ Indian regional languages, natural dialect voices, native lip-sync, and auto-post to all social media.",
    images: ["/sameface-logo.png"],
  },
};

export default function Home() {
  return <MascotClient />;
}
