"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { Bar, BarChart, ResponsiveContainer, type BarShapeProps } from "recharts";
import { SectionHeader } from "./section-header";

const charts = [
  { title: "Annual growth", value: "19%", data: [35, 60, 45, 40, 55, 75, 60, 80, 55, 30] },
  { title: "Aggregate yield profit", value: "$820,000", data: [8, 12, 18, 28, 32, 38, 55, 70, 85] },
  { title: "Median returns", value: "14%", data: [10, 75, 20, 35, 30, 65, 55, 25, 40] },
];

// Faint full-height bar with a solid 2px cap on top. Bars rise one after another (see .chart-bar in globals.css).
function CapBar({ x = 0, y = 0, width = 0, height = 0, index = 0 }: BarShapeProps) {
  return (
    <g className="chart-bar" style={{ animationDelay: `${index * 70}ms` }}>
      <rect x={x} y={y} width={width} height={height} fill="#141414" fillOpacity={0.05} />
      <rect x={x} y={y} width={width} height={2} fill="#141414" />
    </g>
  );
}

// Counts up from zero once `start` flips; renders the final value until then (SSR, no JS).
function CountUp({ value, start }: { value: string; start: boolean }) {
  const [, prefix, digits, suffix] = value.match(/^(\D*)([\d,]+)(\D*)$/)!;
  const target = Number(digits.replace(/,/g, ""));
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!start) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, target]);

  return (
    <>
      {prefix}
      {n.toLocaleString("en-US")}
      {suffix}
    </>
  );
}

function ChartCard({ title, value, data }: (typeof charts)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="flex aspect-video flex-col justify-between bg-white p-6 md:aspect-[1.8/1]">
      <div>
        <p className="text-[12px] font-medium uppercase tracking-tight text-[#141414]/40">{title}</p>
        <p className="mt-2 text-4xl font-medium tabular-nums text-[#141414]">
          <CountUp value={value} start={inView} />
        </p>
      </div>
      {/* Mounted on first view so the bars grow while visible. */}
      <div className="mt-4 h-24" aria-hidden>
        {inView && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.map((v) => ({ v }))}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              barCategoryGap="18%"
              accessibilityLayer={false}
            >
              <Bar dataKey="v" shape={CapBar} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export function Investment() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-14 md:py-24">
      <SectionHeader title="Trusted frameworks for secure growth">
        <p>Our holdings go beyond floor plans; they represent a vehicle for your wealth to thrive consistently.</p>
        <p>We meticulously vet the premier market offerings for our valued partners.</p>
      </SectionHeader>

      <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
        {charts.map((c) => (
          <ChartCard key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
}
