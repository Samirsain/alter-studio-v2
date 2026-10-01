"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronDown, Home, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { RevealText } from "@/components/reveal-text";
import { RollText } from "@/components/roll-text";
import { scroller } from "@/components/smooth-scroll";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ease = [0.22, 1, 0.36, 1] as const;

const navLinks = [
  { label: "Properties", dropdown: true },
  { label: "Mortgage", badge: "New" },
  { label: "Company" },
  { label: "Careers", dropdown: true },
  { label: "Blog" },
];

function NavItem({ label, dropdown, badge, className }: (typeof navLinks)[number] & { className: string }) {
  return (
    <a href="#" className={`flex items-center gap-1.5 text-[#141414] transition-opacity hover:opacity-60 ${className}`}>
      {label}
      {dropdown && <ChevronDown size={14} />}
      {badge && (
        <span className="rounded-xs bg-black px-1.5 py-0.5 text-[9px] leading-none text-[white]">{badge}</span>
      )}
    </a>
  );
}

function NavBar({ menuOpen, onMenu }: { menuOpen: boolean; onMenu: () => void }) {
  return (
    <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-4 md:px-14">
      <div className="flex items-center gap-12">
        <Logo />
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavItem key={link.label} {...link} className="text-[13px] font-medium tracking-tight" />
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="hidden h-auto gap-2 rounded-none border-black/10 bg-white/80 px-6 py-2.5 text-[13px] font-medium text-[#141414] backdrop-blur-md hover:bg-white lg:inline-flex"
      >
        <Home size={15} />
        <RollText>Post a property</RollText>
      </Button>

      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={onMenu}
        className="-mr-2 p-2 text-[#141414] lg:hidden"
      >
        <Menu size={22} />
      </button>
    </nav>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const { scrollY } = useScroll();

  // Glass navbar: slides in past the hero while scrolling up, hides while scrolling down.
  useMotionValueEvent(scrollY, "change", (y) => {
    const pastHero = y > (root.current?.offsetHeight ?? Infinity);
    setShowBar(pastHero && y < (scrollY.getPrevious() ?? y));
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    scroller.lenis?.stop();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      scroller.lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Some browsers skip `autoPlay` (autoplay blocking, power saving). Retry on mount,
  // when the tab becomes visible again, and on the first click or key press.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const play = () => {
      if (v.paused && !document.hidden) v.play().catch(() => {});
    };
    v.muted = true;
    play();
    document.addEventListener("visibilitychange", play);
    window.addEventListener("pointerdown", play, { once: true });
    window.addEventListener("keydown", play, { once: true });
    return () => {
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("keydown", play);
    };
  }, []);

  // Hero copy drifts up and fades on scroll. The video is never transformed, so it is never cropped.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to("[data-hero-content]", {
        yPercent: -25,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    // Below lg the video sits under the copy at its own 16:9 ratio. From lg it fills the hero, and the
    // hero is never wider than 16:9 (1912x1080 source), so the full height of the frame always shows.
    <section ref={root} className="relative flex flex-col overflow-hidden lg:block lg:h-[max(100svh,56.5vw)]">
      <video
        ref={video}
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/hf_20260503_144509_89e2d612-8af2-45c3-90f4-4831bc60715d.mp4`}
        autoPlay
        muted
        loop
        playsInline
        className="order-last block aspect-[1912/1080] w-full object-cover lg:absolute lg:top-0 lg:left-0 lg:z-0 lg:aspect-auto lg:h-full"
      />

      <div className="relative z-10 flex flex-col bg-white/10 lg:h-full">
        <NavBar menuOpen={open} onMenu={() => setOpen(true)} />

        <div
          data-hero-content
          className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-6 px-6 pt-8 pb-6 md:grid-cols-12 md:px-14 lg:pt-12"
        >
          <div className="md:col-span-8">
            <RevealText
              as="h1"
              immediate
              className="text-4xl font-medium leading-[1.05] tracking-tight text-[#141414] md:text-5xl lg:text-7xl"
            >
              Discover space you
              <br />
              truly belong in
            </RevealText>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
              className="mt-8 md:mt-10"
            >
              <Button className="h-auto rounded-none bg-[#141414] px-9 py-4 text-[13px] font-medium uppercase tracking-wider text-white shadow-2xl hover:bg-[#141414]/90">
                <RollText>Book a call</RollText>
              </Button>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="text-[15px] leading-[1.4] text-[#A5A5A5] md:col-span-4 md:col-start-9 md:mt-6 md:text-[18px]"
          >
            Experience more than a house; find a sanctuary where your journey unfolds, rich with comfort and endless
            opportunities.
          </motion.p>
        </div>
      </div>

      <AnimatePresence>
        {showBar && (
          <motion.header
            key="bar"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-x-0 top-0 z-30 border-b border-black/5 bg-[#F8F8F8]/80 backdrop-blur-md"
          >
            <NavBar menuOpen={open} onMenu={() => setOpen(true)} />
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            />
            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.45, ease }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-[#F8F8F8] px-6 py-4 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="-mr-2 p-2 text-[#141414]"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="mt-16 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <NavItem key={link.label} {...link} className="text-2xl font-medium tracking-tight" />
                ))}
              </div>

              <Button className="mt-auto h-auto w-full gap-2 rounded-none bg-[#141414] py-4 text-[13px] font-medium text-white hover:bg-[#141414]/90">
                <Home size={15} />
                Post a property
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
