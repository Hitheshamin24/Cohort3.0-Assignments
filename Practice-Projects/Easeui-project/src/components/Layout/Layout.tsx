import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const layoutVariants = cva("w-full", {
  variants: {
    variant: {
      container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      stack: "flex flex-col",
      flex: "flex flex-row flex-wrap",
      grid: "grid",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
      xl: "gap-12",
    },
    cols: {
      "1": "grid-cols-1",
      "2": "grid-cols-2",
      "3": "grid-cols-3",
      "4": "grid-cols-4",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    variant: "stack",
    gap: "md",
  },
});

interface LayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutVariants> {
  asChild?: boolean;
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  (
    {
      asChild = false,
      className,
      variant,
      gap,
      cols,
      align,
      justify,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(
          layoutVariants({ variant, gap, cols, align, justify }),
          className
        )}
        {...props}
      />
    );
  }
);

Layout.displayName = "Layout";
export { Layout, layoutVariants };
