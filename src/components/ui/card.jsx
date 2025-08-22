import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }) {
  return <div className={cn("card", className)} {...props} />;
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("p-4 border-b border-slate-100", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-4 space-y-2", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("font-semibold text-slate-800", className)} {...props} />;
}