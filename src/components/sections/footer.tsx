import Image from "next/image";
import { Logo } from "@/components/logo";
import { RollText } from "@/components/roll-text";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./section-header";

const columns = [
  { title: "Explore", links: ["Properties", "Mortgage", "Exclusive collection", "Market Analysis"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
  { title: "Follow", links: ["Instagram", "LinkedIn", "Pinterest", "YouTube"] },
];

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-black/5 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-8 md:px-14 md:pt-24">
        <SectionHeader title="Ready to find the space you truly belong in?">
          <p>Talk to a consultant about curated listings, private tours, and investment-grade homes.</p>
          <Button className="mt-4 h-auto rounded-none bg-[#141414] px-9 py-4 text-[13px] font-medium uppercase tracking-wider text-white hover:bg-[#141414]/90">
            <RollText>Book a call</RollText>
          </Button>
        </SectionHeader>

        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-black/5 pt-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-[#A5A5A5]">
              Curated residences, digital walk-throughs, and trusted frameworks for secure growth.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:col-span-6 md:col-start-7">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[12px] font-medium uppercase tracking-tight text-[#141414]/40">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[13px] font-medium tracking-tight text-[#141414] transition-opacity hover:opacity-60"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Sized in container units so the wordmark spans the content width at every breakpoint. */}
        <div className="@container mt-20">
          <p
            aria-hidden
            className="select-none whitespace-nowrap text-[15.5cqw] font-black leading-[0.8] tracking-tighter text-[#141414]"
          >
            ALTER STUDIO
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-black/5 pt-6 text-[12px] text-[#A5A5A5] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Alter Studio. All rights reserved.</p>
          <a
            href="https://zenviqdigital.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 transition-opacity hover:opacity-70"
          >
            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/zenviq-logo.svg`} alt="Zenviq" width={134} height={41} unoptimized className="h-5 w-auto" />
            <span>
              Made by <span className="font-medium text-[#141414]">zenviqdigital.in</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
