import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, variant = "solid", ...props }) {
  const base = "inline-flex items-center rounded-lg px-2 py-0.5 text-xs font-medium";
  const variants = {
    solid: "bg-brand-100 text-brand-700",
    outline: "border border-slate-200 text-slate-700",
  };
  return <span className={cn(base, variants[variant], className)} {...props} />;
}