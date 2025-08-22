import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef(({ className, rows = 4, ...props }, ref) => {
  return <textarea ref={ref} rows={rows} className={cn("input w-full", className)} {...props} />;
});
Textarea.displayName = "Textarea";