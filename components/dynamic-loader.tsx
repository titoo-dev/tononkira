"use client";

import dynamic from "next/dynamic";

export const DynamicLoader = dynamic(() => import("./loader"), {
  ssr: false,
});
