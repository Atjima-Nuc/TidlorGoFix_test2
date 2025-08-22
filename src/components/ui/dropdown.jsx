import * as React from "react";
import { cn } from "@/lib/utils";

export function Dropdown({ children, className }) {
  return <div className={cn("relative inline-block text-left", className)}>{children}</div>;
}

export function DropdownTrigger({ asChild, children, ...props }) {
  if (asChild) return React.cloneElement(children, props);
  return (
    <button type="button" className="btn-secondary" {...props}>
      {children}
    </button>
  );
}

export function DropdownMenu({ open, onClose, align = "start", className, children }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    function onKey(e) { if (e.key === "Escape") onClose?.(); }
    function onClick(e) { if (ref.current && !ref.current.contains(e.target)) onClose?.(); }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-40 mt-2 min-w-48 rounded-xl border border-slate-200 bg-white shadow-[var(--shadow-soft)] p-1",
        align === "end" ? "right-0" : "left-0",
        className
      )}
      role="menu"
    >
      {children}
    </div>
  );
}

export function DropdownItem({ className, inset, ...props }) {
  return (
    <button
      className={cn(
        "w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-300",
        inset && "pl-8",
        className
      )}
      role="menuitem"
      {...props}
    />
  );
}

export function DropdownSeparator() {
  return <div className="my-1 h-px bg-slate-200" role="separator" />;
}