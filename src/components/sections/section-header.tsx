import { RevealText } from "@/components/reveal-text";

export function SectionHeader({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
      <RevealText className="text-3xl font-medium leading-[1.1] tracking-tight text-[#141414] md:col-span-6 md:text-5xl">
        {title}
      </RevealText>
      <div className="max-w-xs space-y-4 text-[14px] leading-relaxed text-[#A5A5A5] md:col-span-4 md:col-start-9">
        {children}
      </div>
    </div>
  );
}
