import React, { useState, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import gsap from "gsap";

//  Variants 
const tooltipVariants = cva(
  "absolute z-50 px-2 py-1 text-xs font-medium rounded-md pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        dark:    "bg-slate-900 text-white",
        light:   "bg-white text-gray-800 border border-gray-200 shadow-md",
        info:    "bg-indigo-600 text-white",
        warning: "bg-amber-500 text-white",
        danger:  "bg-red-600 text-white",
      },
      position: {
        top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left:   "right-full top-1/2 -translate-y-1/2 mr-2",
        right:  "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: { variant: "dark", position: "top" },
  }
);

//  2. Props Interface
interface TooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {
  content: string;            
  children: React.ReactNode;  
  delay?: number;             
}

// Component 
const Tooltip = ({
  content,
  children,
  variant,
  position,
  delay = 200,
  className,
  ...props
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timerRef.current = setTimeout(() => {
      setVisible(true);
        if (tooltipRef.current) {
        gsap.fromTo(
          tooltipRef.current,
          { opacity: 0, y: position === "bottom" ? -5 : 5, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "back.out(2)" }
        );
      }
    }, delay);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (tooltipRef.current) {
      gsap.to(tooltipRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.15,
        onComplete: () => setVisible(false),
      });
    } else {
      setVisible(false);
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      {...props}
    >
      {children}

      {visible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={cn(tooltipVariants({ variant, position }), className)}
        >
          {content}
          {/* Arrow indicator */}
          <span
            className={cn(
              "absolute w-2 h-2 rotate-45",
              variant === "dark"    ? "bg-slate-900" :
              variant === "info"    ? "bg-indigo-600" :
              variant === "warning" ? "bg-amber-500" :
              variant === "danger"  ? "bg-red-600" :
              "bg-white border border-gray-200",
              position === "top"    ? "top-full left-1/2 -translate-x-1/2 -translate-y-1/2" :
              position === "bottom" ? "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2" :
              position === "left"   ? "left-full top-1/2 -translate-y-1/2 -translate-x-1/2" :
              "right-full top-1/2 -translate-y-1/2 translate-x-1/2"
            )}
          />
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = "Tooltip";
export { Tooltip, tooltipVariants };
