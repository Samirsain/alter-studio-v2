const roll = "block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:-translate-y-full";

// Button label rolls up and a copy rolls in from below when the parent shadcn Button (group/button) is hovered.
export function RollText({ children }: { children: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className={roll}>{children}</span>
      <span aria-hidden className={`absolute inset-x-0 top-full ${roll}`}>
        {children}
      </span>
    </span>
  );
}
