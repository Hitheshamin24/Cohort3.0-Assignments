import React, { useState, useRef, useEffect, useCallback } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

// 1. Variants 
const carouselVariants = cva("relative overflow-hidden rounded-xl w-full", {
  variants: {
    variant: {
      light: "bg-white shadow-lg",
      dark:  "bg-slate-900 shadow-xl text-white",
    },
    size: {
      sm: "h-48",
      md: "h-72",
      lg: "h-96",
      auto: "h-auto",
    },
  },
  defaultVariants: { variant: "light", size: "md" },
});

// 2. Props Interface 
interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselVariants> {
  asChild?: boolean;
  slides: React.ReactNode[];  // array of slide content
  autoPlay?: boolean;         // auto-advance slides
  interval?: number;          // ms between slides (default 3000)
  showDots?: boolean;         // show indicator dots
  showArrows?: boolean;       // show prev/next buttons
  loop?: boolean;             // loop back to start
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      asChild = false,
      slides,
      autoPlay = false,
      interval = 3000,
      showDots = true,
      showArrows = true,
      loop = true,
      variant,
      size,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    const [current, setCurrent] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const goTo = useCallback(
      (index: number) => {
        const el = trackRef.current;
        if (!el) return;

        const direction = index > current ? 1 : -1;
        gsap.fromTo(
          el,
          { x: direction * 60, opacity: 0.4 },
          { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
        );
        setCurrent(index);
      },
      [current]
    );

    const prev = () => {
      const newIdx = current === 0 ? (loop ? slides.length - 1 : 0) : current - 1;
      goTo(newIdx);
    };

    const next = useCallback(() => {
      const newIdx = current === slides.length - 1 ? (loop ? 0 : current) : current + 1;
      goTo(newIdx);
    }, [current, goTo, loop, slides.length]);

    // Auto-play
    useEffect(() => {
      if (!autoPlay) return;
      timerRef.current = setTimeout(next, interval);
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [autoPlay, current, interval, next]);

    return (
      <Comp
        ref={ref}
        className={cn(carouselVariants({ variant, size }), className)}
        {...props}
      >
        {/* Slide track */}
        <div ref={trackRef} className="w-full h-full">
          {slides[current]}
        </div>

        {/* Navigation arrows */}
        {showArrows && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 
                         bg-white/80 hover:bg-white rounded-full p-2 shadow-md 
                         transition-all hover:scale-110"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 
                         bg-white/80 hover:bg-white rounded-full p-2 shadow-md 
                         transition-all hover:scale-110"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {showDots && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  i === current ? "bg-indigo-600 w-5" : "bg-gray-300"
                )}
              />
            ))}
          </div>
        )}
      </Comp>
    );
  }
);

Carousel.displayName = "Carousel";
export { Carousel, carouselVariants };
