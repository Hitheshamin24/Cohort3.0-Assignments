import { Carousel } from "@/components/Carousel/Carousel";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    badge: "Design System",
    title: "Build Beautiful Interfaces",
    subtitle:
      "EaseUI gives you production-ready components with GSAP animations out of the box.",
    cta: "Get Started",
    ctaColor: "bg-indigo-600 hover:bg-indigo-700",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    badge: "TypeScript",
    title: "Fully Type-Safe Components",
    subtitle:
      "Every prop is typed. CVA-powered variants mean zero guesswork and great DX.",
    cta: "Explore Docs",
    ctaColor: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
    badge: "GSAP Powered",
    title: "Smooth Animations Built In",
    subtitle:
      "Hover, entrance, and transition animations — all driven by GSAP without any config.",
    cta: "See Demos",
    ctaColor: "bg-pink-600 hover:bg-pink-700",
  },
  {
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=80",
    badge: "Open Source",
    title: "Free. Flexible. Yours.",
    subtitle:
      "MIT licensed and built for the community. Use it in any project, any way you want.",
    cta: "View on GitHub",
    ctaColor: "bg-slate-700 hover:bg-slate-800",
  },
];

const richSlides = slides.map((s) => (
  <div key={s.title} className="relative w-full h-full">
    <img
      src={s.image}
      alt={s.title}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

    <div className="relative z-10 h-full flex flex-col justify-center px-10 max-w-xl gap-4">
      <span className="inline-block w-fit px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/30">
        {s.badge}
      </span>

      <h2 className="text-3xl font-bold text-white leading-tight">{s.title}</h2>

      <p className="text-white/80 text-sm leading-relaxed">{s.subtitle}</p>

      <button
        className={`w-fit px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 ${s.ctaColor}`}
      >
        {s.cta} →
      </button>
    </div>
  </div>
));

const basicCode = `import { Carousel } from "@/components/Carousel/Carousel";

<Carousel
  slides={richSlides}
  size="lg"
  showDots
  showArrows
  autoPlay
  interval={4000}
  loop
/>`;

const propsData = [
  {
    prop: "slides",
    type: "React.ReactNode[]",
    default: "—",
    description: "Required. Array of slide content — any JSX.",
  },
  {
    prop: "variant",
    type: '"light" | "dark"',
    default: '"light"',
    description: "Background style of the carousel wrapper.",
  },
  {
    prop: "size",
    type: '"sm" | "md" | "lg" | "auto"',
    default: '"md"',
    description: "Controls the height of the carousel.",
  },
  {
    prop: "autoPlay",
    type: "boolean",
    default: "false",
    description: "Auto-advances slides on a timer.",
  },
  {
    prop: "interval",
    type: "number",
    default: "3000",
    description: "Milliseconds between auto-advances.",
  },
  {
    prop: "showDots",
    type: "boolean",
    default: "true",
    description: "Show clickable dot indicators at the bottom.",
  },
  {
    prop: "showArrows",
    type: "boolean",
    default: "true",
    description: "Show prev / next arrow buttons.",
  },
  {
    prop: "loop",
    type: "boolean",
    default: "true",
    description: "Loop back to the first slide after the last.",
  },
];

const CarouselPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <header className="space-y-2">
        <p className="text-4xl font-bold tracking-tight">Carousel</p>
        <p className="text-lg text-gray-600">
          A slide component that cycles through any content — images, cards, or
          custom JSX. Animated with GSAP.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={basicCode}>
          <div className="w-full">
            <Carousel
              slides={richSlides}
              size="lg"
              showDots
              showArrows
              autoPlay
              interval={4000}
              loop
            />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default CarouselPage;
