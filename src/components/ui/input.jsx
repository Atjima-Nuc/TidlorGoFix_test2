import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return <input ref={ref} className={cn("input w-full", className)} {...props} />;
});
Input.displayName = "Input";