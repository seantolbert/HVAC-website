"use client";

import type { ReactNode } from "react";

export const SELECT_SERVICE_EVENT = "coolbreeze:select-service";

// Jumps to the quote form and preselects the service the visitor came from.
export function ServiceLink({ slug, className, children }: { slug: string; className?: string; children: ReactNode }) {
  return (
    <a
      href="#quote"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: slug }))}
    >
      {children}
    </a>
  );
}
