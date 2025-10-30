import * as React from "react";
import { cn } from "@/lib/utils"; // agar utils nahi hai to next step dekho

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-gray-700 bg-[#1A1A1A] text-white shadow-lg",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";
