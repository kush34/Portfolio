"use client";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function blogTransitionName(slug: string) {
  const clean = slug
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return clean.startsWith("blog-") ? clean : `blog-${clean}`;
}

export function morphPush(router: AppRouterInstance, href: string) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { finished: Promise<void> };
  };
  if (
    typeof document === "undefined" ||
    !doc.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    router.push(href);
    return;
  }
  doc.startViewTransition(() => router.push(href));
}
