import { Layout } from "@/components/Layout/Layout";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const Box = ({
  label,
  color = "indigo",
}: {
  label: string;
  color?: string;
}) => {
  const colors: Record<string, string> = {
    indigo: "bg-indigo-100 border-indigo-300 text-indigo-700",
    pink: "bg-pink-100 border-pink-300 text-pink-700",
    green: "bg-green-100 border-green-300 text-green-700",
    amber: "bg-amber-100 border-amber-300 text-amber-700",
    sky: "bg-sky-100 border-sky-300 text-sky-700",
    violet: "bg-violet-100 border-violet-300 text-violet-700",
  };
  return (
    <div
      className={`rounded-lg border-2 border-dashed p-4 text-center font-semibold text-sm ${colors[color] ?? colors.indigo}`}
    >
      {label}
    </div>
  );
};

const stackCode = `import { Layout } from "@/components/Layout/Layout";

<Layout variant="stack" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Layout>`;

const flexCode = `import { Layout } from "@/components/Layout/Layout";

<Layout variant="flex" gap="md" align="center" justify="between">
  <div>Left</div>
  <div>Center</div>
  <div>Right</div>
</Layout>`;

const grid2Code = `import { Layout } from "@/components/Layout/Layout";

<Layout variant="grid" cols="2" gap="md">
  <div>A</div>
  <div>B</div>
  <div>C</div>
  <div>D</div>
</Layout>`;

const grid3Code = `import { Layout } from "@/components/Layout/Layout";

<Layout variant="grid" cols="3" gap="lg">
  <div>A</div>
  <div>B</div>
  <div>C</div>
  <div>D</div>
  <div>E</div>
  <div>F</div>
</Layout>`;

const containerCode = `import { Layout } from "@/components/Layout/Layout";

<Layout variant="container">
  <p>Content is centered and max-width constrained.</p>
</Layout>`;

const nestedCode = `import { Layout } from "@/components/Layout/Layout";

// Nest layouts to build complex UIs
<Layout variant="stack" gap="lg">
  <Layout variant="flex" gap="md" justify="between" align="center">
    <div>Header Left</div>
    <div>Header Right</div>
  </Layout>
  <Layout variant="grid" cols="3" gap="md">
    <div>Card 1</div>
    <div>Card 2</div>
    <div>Card 3</div>
  </Layout>
</Layout>`;

const propsData = [
  {
    prop: "variant",
    type: '"container" | "stack" | "flex" | "grid"',
    default: '"stack"',
    description:
      'The layout mode. "container" centers content, "stack" stacks vertically, "flex" arranges horizontally, "grid" uses CSS grid.',
  },
  {
    prop: "gap",
    type: '"none" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Controls the spacing between child elements.",
  },
  {
    prop: "cols",
    type: '"1" | "2" | "3" | "4"',
    default: "—",
    description: 'Number of grid columns. Only effective when variant="grid".',
  },
  {
    prop: "align",
    type: '"start" | "center" | "end" | "stretch"',
    default: "—",
    description:
      'Cross-axis alignment (items-*). Works with "flex" and "stack".',
  },
  {
    prop: "justify",
    type: '"start" | "center" | "end" | "between"',
    default: "—",
    description: 'Main-axis justification (justify-*). Works with "flex".',
  },
  {
    prop: "asChild",
    type: "boolean",
    default: "false",
    description: "Render as a different element using Radix Slot.",
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description: "Extra Tailwind classes to merge in.",
  },
];

const LayoutPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Header */}
      <header className="space-y-2">
        <p className="text-4xl font-bold tracking-tight">Layout</p>
        <p className="text-lg text-gray-600">
          Structural containers for arranging UI. Supports{" "}
          <code className="bg-gray-100 px-1 rounded text-sm">stack</code>,{" "}
          <code className="bg-gray-100 px-1 rounded text-sm">flex</code>,{" "}
          <code className="bg-gray-100 px-1 rounded text-sm">grid</code>, and{" "}
          <code className="bg-gray-100 px-1 rounded text-sm">container</code>{" "}
          variants — all powered by CVA.
        </p>
      </header>

      {/* Stack */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Stack (vertical)</h2>
        <p className="text-gray-500 text-sm">
          Children are stacked top-to-bottom. Default variant.
        </p>
        <ComponentDemo code={stackCode}>
          <div className="w-full max-w-sm">
            <Layout variant="stack" gap="md">
              <Box label="Item 1" color="indigo" />
              <Box label="Item 2" color="pink" />
              <Box label="Item 3" color="green" />
            </Layout>
          </div>
        </ComponentDemo>
      </section>

      {/* Flex  */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Flex (horizontal)</h2>
        <p className="text-gray-500 text-sm">
          Children sit side-by-side. Use{" "}
          <code className="bg-gray-100 px-1 rounded text-sm">align</code> and{" "}
          <code className="bg-gray-100 px-1 rounded text-sm">justify</code> for
          alignment.
        </p>
        <ComponentDemo code={flexCode}>
          <div className="w-full">
            <Layout variant="flex" gap="md" align="center" justify="between">
              <Box label="Left" color="indigo" />
              <Box label="Center" color="sky" />
              <Box label="Right" color="pink" />
            </Layout>
          </div>
        </ComponentDemo>
      </section>

      {/* Grid 2 cols */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Grid — 2 columns</h2>
        <p className="text-gray-500 text-sm">
          Use <code className="bg-gray-100 px-1 rounded text-sm">cols="2"</code>{" "}
          with{" "}
          <code className="bg-gray-100 px-1 rounded text-sm">
            variant="grid"
          </code>
          .
        </p>
        <ComponentDemo code={grid2Code}>
          <div className="w-full">
            <Layout variant="grid" cols="2" gap="md">
              <Box label="A" color="indigo" />
              <Box label="B" color="pink" />
              <Box label="C" color="green" />
              <Box label="D" color="amber" />
            </Layout>
          </div>
        </ComponentDemo>
      </section>

      {/* Grid 3 cols */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Grid — 3 columns</h2>
        <p className="text-gray-500 text-sm">
          Use <code className="bg-gray-100 px-1 rounded text-sm">cols="3"</code>{" "}
          for a 3-column card layout.
        </p>
        <ComponentDemo code={grid3Code}>
          <div className="w-full">
            <Layout variant="grid" cols="3" gap="lg">
              <Box label="A" color="indigo" />
              <Box label="B" color="pink" />
              <Box label="C" color="sky" />
              <Box label="D" color="green" />
              <Box label="E" color="amber" />
              <Box label="F" color="violet" />
            </Layout>
          </div>
        </ComponentDemo>
      </section>

      {/* Container */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Container</h2>
        <p className="text-gray-500 text-sm">
          Centers content and constrains max-width to{" "}
          <code className="bg-gray-100 px-1 rounded text-sm">max-w-7xl</code>{" "}
          with responsive padding.
        </p>
        <ComponentDemo code={containerCode}>
          <div className="w-full border border-dashed border-gray-300 rounded-lg">
            <Layout variant="container">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-indigo-700 font-medium text-center">
                Content is centered and max-width constrained.
              </div>
            </Layout>
          </div>
        </ComponentDemo>
      </section>

      {/* Nested */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Nested Layouts</h2>
        <p className="text-gray-500 text-sm">
          Combine layouts to build complex page structures — a page header over
          a grid of cards.
        </p>
        <ComponentDemo code={nestedCode}>
          <div className="w-full">
            <Layout variant="stack" gap="lg">
              <Layout variant="flex" gap="md" justify="between" align="center">
                <Box label="Header Left" color="indigo" />
                <Box label="Header Right" color="sky" />
              </Layout>
              <Layout variant="grid" cols="3" gap="md">
                <Box label="Card 1" color="pink" />
                <Box label="Card 2" color="green" />
                <Box label="Card 3" color="amber" />
              </Layout>
            </Layout>
          </div>
        </ComponentDemo>
      </section>

      {/* API Reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default LayoutPage;
