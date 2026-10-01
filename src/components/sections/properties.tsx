"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Bath, Bed, Layers, Square } from "lucide-react";
import { SectionHeader } from "./section-header";

const properties = [
  {
    title: "Aether Heights",
    price: "$345,000",
    location: "USA/California/Malibu",
    stats: ["300 m²", "1 floor", "6 beds", "2 baths"],
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260503_145701_de344c15-5eac-4c64-8bd6-19a2811bba4a.png&w=1280&q=85",
  },
  {
    title: "Azure Sanctuary",
    price: "$225,000",
    location: "Caribbean/Bahamas/Bimini",
    stats: ["250 m²", "1 floor", "4 beds", "1 bath"],
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260503_145923_c1a9880c-0fab-4a76-8289-bd650d5e5dce.png&w=1280&q=85",
  },
  {
    title: "Summit Pavilion",
    price: "$510,000",
    location: "USA/Colorado/Vail",
    stats: ["400 m²", "3 floors", "6 beds", "3 baths"],
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260503_150022_cdda0eaa-1c17-4f59-8188-4f98b328619f.png&w=1280&q=85",
  },
];

// Same order as each property's `stats`: area, floors, beds, baths.
const statIcons = [Square, Layers, Bed, Bath];

export function Properties() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-20 md:px-14 md:pt-24">
      <SectionHeader title="Guiding you toward the residence of your dreams">
        <p>
          Our vision bridges balance, design, and attention so that every client resides in a space reflecting their
          values.
        </p>
      </SectionHeader>

      <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
        {properties.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group cursor-pointer bg-white"
          >
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-square">
              <Image
                src={p.image}
                alt={p.title}
                fill
                unoptimized
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 right-4 flex size-11 -translate-y-1 items-center justify-center rounded-full bg-white/90 text-[#141414] opacity-0 backdrop-blur-md transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight size={18} />
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[18px] font-medium tracking-tight text-[#141414]">{p.title}</h3>
                <span className="text-[18px] font-medium text-[#141414]">{p.price}</span>
              </div>
              <p className="mt-1 text-[12px] text-[#A5A5A5]">{p.location}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {p.stats.map((stat, j) => {
                  const Icon = statIcons[j];
                  return (
                    <span key={stat} className="flex items-center gap-1.5 text-[11px] font-medium text-[#141414]">
                      <Icon className="text-[#A5A5A5]" size={13} strokeWidth={2.5} />
                      {stat}
                    </span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
