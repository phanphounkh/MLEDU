"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Code2,
  Compass,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useMemo, useState } from "react";
import { modules, totalLessons } from "@/lib/curriculum";
import { useProgress } from "@/hooks/use-progress";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SiteHeader } from "./site-header";

const accents = [
  { color: "#8b5cf6", soft: "rgba(139,92,246,.12)", label: "Violet" },
  { color: "#06b6d4", soft: "rgba(6,182,212,.12)", label: "Cyan" },
  { color: "#f97316", soft: "rgba(249,115,22,.12)", label: "Orange" },
  { color: "#22c55e", soft: "rgba(34,197,94,.12)", label: "Green" },
];

const filters = ["All", "Foundation", "Core skills", "Theory", "Modeling", "Unsupervised", "Projects"];

export function Dashboard() {
  const { completed, loaded, reset } = useProgress();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const progress = Math.round((completed.length / totalLessons) * 100);

  const filteredModules = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return modules
      .filter((module) => filter === "All" || module.level === filter)
      .map((module) => ({
        ...module,
        lessons: module.lessons.filter((lesson) =>
          !normalized || `${lesson.title} ${lesson.tags.join(" ")} ${module.title}`.toLowerCase().includes(normalized)
        ),
      }))
      .filter((module) => !normalized || module.lessons.length > 0);
  }, [filter, query]);

  return (
    <div className="min-h-screen overflow-hidden">
      <SiteHeader />

      <main>
        <section className="relative border-b border-border/60 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-[8%] top-10 size-72 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute right-[4%] top-0 size-80 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute inset-0 grid-pattern opacity-50 dark:opacity-20" />
          </div>
          <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.12fr_.88fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:text-violet-300">
                <Sparkles className="size-3.5" /> A complete path from curious to capable
              </div>
              <h1 className="font-display max-w-3xl text-5xl font-bold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-[76px]">
                Learn machine learning, <span className="text-gradient">visually.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                One focused roadmap. Forty-four practical lessons. Six portfolio projects. Build the intuition, write the code, and track every win.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12 rounded-full bg-foreground px-6 text-background shadow-lg shadow-foreground/10 hover:bg-foreground/90">
                  <Link href={completed.length ? `/lesson/${modules.flatMap(m => m.lessons).find(l => !completed.includes(l.id))?.id ?? "1-1"}` : "/lesson/1-1"}>
                    {completed.length ? "Continue learning" : "Start the roadmap"} <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-border bg-card/70 px-6">
                  <a href="#curriculum"><Compass /> Explore curriculum</a>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><BookOpen className="size-4 text-violet-500" /> 11 modules</span>
                <span className="flex items-center gap-2"><Play className="size-4 text-cyan-500" /> Video + notes</span>
                <span className="flex items-center gap-2"><Code2 className="size-4 text-orange-500" /> Ready-to-run code</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[480px] lg:justify-self-end">
              <div className="absolute -inset-4 -z-10 rotate-2 rounded-[34px] bg-gradient-to-br from-violet-500/18 to-cyan-400/12 blur-sm" />
              <div className="rounded-[28px] border border-border/80 bg-card/88 p-6 shadow-2xl shadow-violet-950/8 backdrop-blur-xl sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[.16em] text-muted-foreground">Your progress</p>
                    <p className="mt-2 font-display text-2xl font-bold tracking-tight">The journey starts here.</p>
                  </div>
                  <div className="relative grid size-20 place-items-center rounded-full" style={{ background: `conic-gradient(#8b5cf6 ${progress}%, var(--muted) 0)` }}>
                    <div className="grid size-[66px] place-items-center rounded-full bg-card text-sm font-bold">{loaded ? progress : 0}%</div>
                  </div>
                </div>
                <div className="mt-7 rounded-2xl border border-border/70 bg-muted/45 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="font-semibold">Overall completion</span>
                    <span className="font-mono text-xs text-muted-foreground">{completed.length} / {totalLessons}</span>
                  </div>
                  <Progress value={progress} className="h-2.5 bg-violet-500/10 [&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-violet-600 [&_[data-slot=progress-indicator]]:to-cyan-400" />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    ["11", "Modules"],
                    ["44", "Lessons"],
                    ["6", "Projects"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl border border-border/60 bg-background/60 px-3 py-4 text-center">
                      <p className="font-display text-xl font-bold">{value}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
                {completed.length > 0 && (
                  <button onClick={reset} className="mt-5 flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground">
                    <RotateCcw className="size-3" /> Reset progress
                  </button>
                )}
              </div>
              <div className="absolute -bottom-6 -left-7 hidden items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-xl sm:flex">
                <span className="grid size-9 place-items-center rounded-xl bg-emerald-500/12 text-emerald-600"><Trophy className="size-4" /></span>
                <div><p className="text-xs font-bold">Build as you learn</p><p className="text-[11px] text-muted-foreground">Portfolio-ready projects</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="curriculum" className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-[1120px]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow">Your curriculum</p>
                <h2 id="roadmap" className="font-display mt-3 text-3xl font-bold tracking-[-.035em] sm:text-4xl">Follow the path. Master the craft.</h2>
                <p className="mt-3 max-w-xl text-muted-foreground">Each milestone builds on the last—from first principles to production-minded projects.</p>
              </div>
              <label className="flex h-12 w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 shadow-sm transition focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/8 lg:w-[360px]">
                <Search className="size-4 text-muted-foreground" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Logistic Regression, NumPy..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70" />
                <kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">⌘ K</kbd>
              </label>
            </div>

            <div className="mt-7 flex gap-2 overflow-x-auto pb-2 scrollbar-none" aria-label="Curriculum filters">
              {filters.map((item) => (
                <button key={item} onClick={() => setFilter(item)} className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-semibold transition ${filter === item ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground hover:text-foreground"}`}>
                  {item}
                </button>
              ))}
            </div>

            <div className="relative mt-10">
              <div className="absolute bottom-12 left-[25px] top-10 hidden w-px bg-gradient-to-b from-violet-500 via-cyan-400 to-emerald-400 sm:block" />
              <div className="space-y-5">
                {filteredModules.map((module, index) => {
                  const accent = accents[index % accents.length];
                  const completedCount = module.lessons.filter((lesson) => completed.includes(lesson.id)).length;
                  const moduleProgress = Math.round((completedCount / module.lessons.length) * 100);
                  return (
                    <article key={module.id} id={module.number === 11 ? "projects" : undefined} className="group relative grid gap-4 sm:grid-cols-[52px_1fr]">
                      <div className="relative z-10 hidden size-[52px] place-items-center rounded-2xl border-4 border-background font-mono text-xs font-bold text-white shadow-md sm:grid" style={{ background: accent.color }}>
                        {module.number < 11 ? String(module.number).padStart(2, "0") : <Trophy className="size-4" />}
                      </div>
                      <div className="overflow-hidden rounded-3xl border border-border/80 bg-card transition duration-300 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-xl hover:shadow-foreground/5">
                        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em]" style={{ color: accent.color, background: accent.soft }}>{module.level}</span>
                              {moduleProgress === 100 && <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600"><Check className="size-3" /> Completed</span>}
                            </div>
                            <h3 className="font-display mt-3 text-xl font-bold tracking-tight sm:text-2xl">{module.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">{module.description}</p>
                          </div>
                          <div className="min-w-[170px] rounded-2xl bg-muted/55 p-4">
                            <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Module progress</span><strong>{completedCount}/{module.lessons.length}</strong></div>
                            <Progress value={moduleProgress} className="mt-2 h-1.5 bg-border [&_[data-slot=progress-indicator]]:bg-foreground" />
                          </div>
                        </div>
                        <div className="border-t border-border/70 bg-muted/20 px-3 py-2 sm:px-4">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <Link key={lesson.id} href={`/lesson/${lesson.id}`} className="flex items-center gap-3 rounded-xl px-2.5 py-3 text-sm transition hover:bg-background sm:px-3">
                              <span className={`grid size-6 shrink-0 place-items-center rounded-full border text-[10px] font-bold ${completed.includes(lesson.id) ? "border-emerald-500 bg-emerald-500 text-white" : "border-border bg-card text-muted-foreground"}`}>
                                {completed.includes(lesson.id) ? <Check className="size-3" /> : lessonIndex + 1}
                              </span>
                              <span className="min-w-0 flex-1 truncate font-medium">{lesson.title}</span>
                              <span className="hidden items-center gap-1 text-[11px] text-muted-foreground sm:flex"><Clock3 className="size-3" /> {lesson.duration}</span>
                              <ChevronRight className="size-4 text-muted-foreground/60 transition group-hover:translate-x-0.5" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              {filteredModules.length === 0 && (
                <div className="rounded-3xl border border-dashed border-border py-20 text-center">
                  <Search className="mx-auto size-7 text-muted-foreground" />
                  <p className="mt-4 font-semibold">No lessons found</p>
                  <p className="mt-1 text-sm text-muted-foreground">Try another topic or clear your filter.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-8 text-sm text-muted-foreground sm:px-8">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p><strong className="text-foreground">MLEDU</strong> · Learn the ideas. Build the systems.</p>
          <p>Progress is saved privately in your browser.</p>
        </div>
      </footer>
    </div>
  );
}
