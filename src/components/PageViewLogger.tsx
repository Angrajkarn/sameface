"use client";

import { useEffect, useRef } from "react";
import { logPageView } from "@/lib/firestore";

export default function PageViewLogger({ idea }: { idea: string }) {
  const logged = useRef(false);

  useEffect(() => {
    if (logged.current) return;
    logged.current = true;
    logPageView(idea).catch(console.error);
  }, [idea]);

  return null;
}
