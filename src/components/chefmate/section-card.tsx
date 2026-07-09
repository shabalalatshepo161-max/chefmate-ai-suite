import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionCard({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border bg-card p-6 shadow-sm", className)}>
      {title && <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>}
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      {(title || description) && <div className="mt-4">{children}</div>}
      {!title && !description && children}
    </div>
  );
}