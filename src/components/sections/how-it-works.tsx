"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RollText } from "@/components/roll-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = ["Market Analysis", "Exclusive collection", "Policy Support", "Closing Deal"];
const activeStep = "Exclusive collection";

export function HowItWorks() {
  const media = useRef<HTMLDivElement>(null);

  // Curtain reveal: the frame wipes open upward while the photo settles to full size.
  useGSAP(
    () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline({ scrollTrigger: { trigger: media.current, start: "top 80%", once: true } })
        .from(media.current, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" })
        .from("img", { scale: 1.15, duration: 1.8, ease: "expo.out" }, 0);
    },
    { scope: media },
  );

  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-20 md:px-14 md:pt-24">
      <SectionHeader title="Explore our service and the process">
        <p>
          Digital walk-throughs, select portfolios, and professional insight — all the tools to search and secure with
          ease.
        </p>
      </SectionHeader>

      <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-12">
        <div className="flex flex-col justify-between gap-16 bg-white p-8 md:col-span-4 md:p-16">
          <div>
            <h3 className="text-2xl font-medium tracking-tight text-[#141414] md:text-3xl">Exclusive collection</h3>
            <p className="mt-6 text-[14px] leading-relaxed text-[#A5A5A5]">
              Consultants curate custom lists of vetted homes. Featuring media, VR walk-ins, and private physical
              tours.
            </p>
            <Button
              variant="outline"
              className="mt-10 h-auto rounded-none border-black/10 bg-transparent px-6 py-3 text-[13px] font-medium text-[#141414] hover:bg-gray-50"
            >
              <RollText>Free consult</RollText>
            </Button>
          </div>

          <ul className="space-y-3">
            {steps.map((step) => (
              <li key={step}>
                <a
                  href="#"
                  aria-current={step === activeStep ? "step" : undefined}
                  className={cn(
                    "text-[13px] font-medium transition-colors",
                    step === activeStep ? "text-[#141414]" : "text-[#A5A5A5] hover:text-[#141414]",
                  )}
                >
                  {step}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div ref={media} className="relative aspect-video overflow-hidden md:col-span-8 md:aspect-square">
          <Image
            src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260503_150112_2b0e700f-7af4-4459-b326-7d9e2f468daa.png&w=1280&q=85"
            alt="Curated residence interior"
            fill
            unoptimized
            sizes="(min-width: 768px) 66vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
