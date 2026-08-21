import { useNavigate } from "react-router";

const features = [
  {
    icon: "⚡",
    title: "Fast & Lightweight",
    desc: "Zero bloat. Every component is tree-shakeable and built for performance.",
  },
  {
    icon: "🎨",
    title: "Fully Themeable",
    desc: "Dark mode, light mode, and custom palettes — powered by CSS variables.",
  },
  {
    icon: "♿",
    title: "Accessible",
    desc: "Built with ARIA standards and keyboard navigation baked in from day one.",
  },
  {
    icon: "🧩",
    title: "Composable",
    desc: "Mix and match components freely. No forced structure, just clean APIs.",
  },
];

const componentList = [
  "Button", "Card", "Modal", "Input", "Navbar", "Carousel", "Tooltip", "Layout",
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ color: "var(--text-color)" }}>

      <section
        className="flex flex-col items-center justify-center text-center px-6 py-28 gap-6"
        style={{ backgroundColor: "var(--bg-color)" }}
      >
        <span
          className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            backgroundColor: "var(--primary-subtle)",
            color: "var(--primary-color)",
            border: "1px solid var(--border-color)",
          }}
        >
          Open Source UI Library
        </span>

        <h1 className="text-5xl sm:text-6xl font-bold leading-tight max-w-3xl">
          Build{" "}
          <span style={{ color: "var(--primary-color)" }}>beautiful</span>{" "}
          interfaces, faster.
        </h1>

        <p
          className="text-lg max-w-xl leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          EaseUI is a collection of beautifully crafted, accessible React
          components ready to drop into your next project.
        </p>

        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => navigate("components")}
            className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "#fff",
              boxShadow: "0 4px 20px var(--shadow-color)",
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "var(--primary-hover)")
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "var(--primary-color)")
            }
          >
            Browse Components →
          </button>
          <a
            href="https://github.com/Hitheshamin24/Cohort3.0-Assignments/tree/main/Practice-Projects/Easeui-project"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{
              border: "1px solid var(--border-color)",
              color: "var(--text-color)",
              backgroundColor: "var(--surface)",
            }}
          >
            GitHub ↗
          </a>
        </div>
      </section>

      <section
        className="px-6 py-16"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="max-w-5xl mx-auto">
          <p
            className="text-xs font-semibold tracking-widest uppercase text-center mb-10"
            style={{ color: "var(--text-muted)" }}
          >
            Components
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {componentList.map((name) => (
              <button
                key={name}
                onClick={() => navigate(`components/${name.toLowerCase()}`)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-color)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--primary-color)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--primary-color)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-color)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-color)";
                }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20" style={{ backgroundColor: "var(--bg-color)" }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-3"
            style={{ color: "var(--text-color)" }}
          >
            Why EaseUI?
          </h2>
          <p
            className="text-center mb-12"
            style={{ color: "var(--text-muted)" }}
          >
            Everything you need, nothing you don't.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-6 transition-all duration-200 hover:-translate-y-1"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border-color)",
                  boxShadow: "0 2px 12px var(--shadow-color)",
                }}
              >
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3
                  className="font-semibold text-lg mb-2"
                  style={{ color: "var(--text-color)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-6 py-20 text-center"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--text-color)" }}>
          Ready to get started?
        </h2>
        <p className="mb-8" style={{ color: "var(--text-muted)" }}>
          Jump straight into the components and start building.
        </p>
        <button
          onClick={() => navigate("components")}
          className="px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "#fff",
            boxShadow: "0 4px 20px var(--shadow-color)",
          }}
          onMouseEnter={e =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "var(--primary-hover)")
          }
          onMouseLeave={e =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "var(--primary-color)")
          }
        >
          Explore Components →
        </button>
      </section>

    </div>
  );
};

export default HomePage;
