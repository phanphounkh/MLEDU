import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="MLEDU home">
          <span className="grid size-9 place-items-center rounded-xl bg-foreground text-background shadow-sm transition-transform group-hover:-rotate-3">
            <BrainCircuit className="size-[19px]" />
          </span>
          <span className="font-display text-[17px] font-bold tracking-[-0.02em]">ML<span className="text-violet-500">EDU</span></span>
        </Link>
        {!compact && (
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex" aria-label="Main navigation">
            <a href="#roadmap" className="transition hover:text-foreground">Roadmap</a>
            <a href="#curriculum" className="transition hover:text-foreground">Curriculum</a>
            <a href="#projects" className="transition hover:text-foreground">Projects</a>
          </nav>
        )}
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-600 dark:text-violet-300 sm:inline-flex">
            Your learning space
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
