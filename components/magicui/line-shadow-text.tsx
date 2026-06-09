import { cn } from "@/lib/utils";
import React from "react";

interface LineShadowTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  shadowColor?: string;
}

export function LineShadowText({
  children,
  className,
  as: Component = "span",
  shadowColor = "hsl(var(--primary))",
  ...props
}: LineShadowTextProps) {
  return (
    <Component
      style={{ "--shadow-color": shadowColor } as React.CSSProperties}
      className={cn(
        "relative inline-block",
        "[text-shadow:1px_1px_0_var(--shadow-color),2px_2px_0_var(--shadow-color),3px_3px_0_var(--shadow-color)]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
