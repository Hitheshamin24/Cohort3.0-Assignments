import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/Button/Button";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const TooltipPage = () => {
  const variantsCode = `import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/Button/Button";

// Dark (default)
<Tooltip content="This is a dark tooltip" variant="dark" position="top">
  <Button variant="dark" size="sm">Dark</Button>
</Tooltip>

// Info
<Tooltip content="Learn more about this feature" variant="info" position="top">
  <Button variant="primary" size="sm">Info</Button>
</Tooltip>

// Warning
<Tooltip content="Proceed with caution!" variant="warning" position="top">
  <Button variant="ghost" size="sm">Warning</Button>
</Tooltip>

// Danger
<Tooltip content="This action is irreversible!" variant="danger" position="top">
  <Button variant="destructive" size="sm">Danger</Button>
</Tooltip>`;

  const positionsCode = `import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/Button/Button";

<Tooltip content="Tooltip on top" position="top">
  <Button size="sm">Top</Button>
</Tooltip>

<Tooltip content="Tooltip on bottom" position="bottom">
  <Button size="sm">Bottom</Button>
</Tooltip>

<Tooltip content="Tooltip on left" position="left">
  <Button size="sm">Left</Button>
</Tooltip>

<Tooltip content="Tooltip on right" position="right">
  <Button size="sm">Right</Button>
</Tooltip>`;

  const propsData = [
    {
      prop: "content",
      type: "string",
      default: "—",
      description: "Required. The text displayed inside the tooltip bubble.",
    },
    {
      prop: "children",
      type: "React.ReactNode",
      default: "—",
      description: "Required. The element that triggers the tooltip on hover/focus.",
    },
    {
      prop: "variant",
      type: '"dark" | "light" | "info" | "warning" | "danger"',
      default: '"dark"',
      description: "Controls the color style of the tooltip bubble.",
    },
    {
      prop: "position",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Which side of the trigger element the tooltip appears on.",
    },
    {
      prop: "delay",
      type: "number",
      default: "200",
      description: "Delay in milliseconds before the tooltip appears. Prevents flicker on fast mouse moves.",
    },
    {
      prop: "className",
      type: "string",
      default: "—",
      description: "Additional CSS classes to apply to the tooltip bubble.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Header */}
      <header className="space-y-2">
        <p className="text-4xl font-bold tracking-tight">Tooltip</p>
        <p className="text-lg text-gray-600">
          A small popup label that appears when hovering or focusing an element. Supports multiple variants, positions, and GSAP animations.
        </p>
      </header>

      {/* Variants Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <ComponentDemo code={variantsCode}>
          <div className="flex gap-6 flex-wrap items-center justify-center py-6">
            <Tooltip content="This is a dark tooltip" variant="dark" position="top">
              <Button variant="dark" size="sm">Dark</Button>
            </Tooltip>

            <Tooltip content="Learn more about this feature" variant="info" position="top">
              <Button variant="primary" size="sm">Info</Button>
            </Tooltip>

            <Tooltip content="Proceed with caution!" variant="warning" position="top">
              <Button variant="ghost" size="sm">Warning</Button>
            </Tooltip>

            <Tooltip content="This action is irreversible!" variant="danger" position="top">
              <Button variant="destructive" size="sm">Danger</Button>
            </Tooltip>

            <Tooltip content="Light themed tooltip" variant="light" position="top">
              <Button variant="outline" size="sm">Light</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* Positions Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Positions</h2>
        <ComponentDemo code={positionsCode}>
          <div className="flex gap-10 flex-wrap items-center justify-center py-6">
            <Tooltip content="Tooltip on top" variant="info" position="top">
              <Button variant="primary" size="sm">Top</Button>
            </Tooltip>

            <Tooltip content="Tooltip on bottom" variant="info" position="bottom">
              <Button variant="primary" size="sm">Bottom</Button>
            </Tooltip>

            <Tooltip content="Tooltip on left" variant="info" position="left">
              <Button variant="primary" size="sm">Left</Button>
            </Tooltip>

            <Tooltip content="Tooltip on right" variant="info" position="right">
              <Button variant="primary" size="sm">Right</Button>
            </Tooltip>
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

export default TooltipPage;
