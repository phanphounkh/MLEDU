"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  Copy,
  ExternalLink,
  Menu,
  PlayCircle,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { codeFor, getLessonIndex, getLessonVideo, getYouTubeUrl, lessons, modules, playlistId, tutorialFor } from "@/lib/curriculum";
import { useProgress } from "@/hooks/use-progress";
import { Progress } from "@/components/ui/progress";
import { SiteHeader } from "./site-header";

type Tab = "video" | "tutorial" | "code";

export function LessonShell({ lessonId }: { lessonId: string }) {
  const lesson = lessons.find((item) => item.id === lessonId)!;
  const index = getLessonIndex(lessonId);
  const previous = lessons[index - 1];
  const next = lessons[index + 1];
  const { completed, toggle } = useProgress();
  const isComplete = completed.includes(lessonId);
  const [tab, setTab] = useState<Tab>("video");
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const progress = Math.round((completed.length / lessons.length) * 100);
  const tutorial = tutorialFor(lesson.title, lesson.module.title);
  const code = codeFor(lesson.title);
  const video = getLessonVideo(lessonId);

  const filteredModules = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return modules.map((module) => ({
      ...module,
      lessons: module.lessons.filter((item) => !normalized || `${item.title} ${item.tags.join(" ")}`.toLowerCase().includes(normalized)),
    })).filter((module) => module.lessons.length > 0);
  }, [query]);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader compact />
      <div className="mx-auto flex max-w-[1600px]">
        {sidebarOpen && <button className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close curriculum" />}
        <aside className={`fixed bottom-0 left-0 top-0 z-50 flex w-[310px] flex-col border-r border-border bg-card transition-transform duration-300 lg:sticky lg:top-16 lg:z-20 lg:h-[calc(100vh-64px)] lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex h-16 items-center justify-between border-b border-border px-5 lg:hidden">
            <strong>Curriculum</strong>
            <button onClick={() => setSidebarOpen(false)} className="grid size-8 place-items-center rounded-lg hover:bg-muted" aria-label="Close curriculum"><X className="size-4" /></button>
          </div>
          <div className="border-b border-border p-4">
            <label className="flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-3">
              <Search className="size-3.5 text-muted-foreground" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search curriculum" className="min-w-0 flex-1 bg-transparent text-xs outline-none" />
            </label>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Course progress</span>
              <strong>{completed.length}/{lessons.length}</strong>
            </div>
            <Progress value={progress} className="mt-2 h-1.5 bg-violet-500/10 [&_[data-slot=progress-indicator]]:bg-violet-500" />
          </div>
          <nav className="flex-1 overflow-y-auto p-3 scrollbar-thin" aria-label="Course curriculum">
            {filteredModules.map((module) => {
              const active = module.lessons.some((item) => item.id === lessonId);
              return (
                <details key={module.id} open={active || query.length > 0} className="group/module mb-1">
                  <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold hover:bg-muted">
                    <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-muted font-mono text-[9px] text-muted-foreground">{String(module.number).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1 truncate">{module.title}</span>
                    <ChevronDown className="size-3.5 text-muted-foreground transition group-open/module:rotate-180" />
                  </summary>
                  <div className="ml-5 border-l border-border py-1 pl-3">
                    {module.lessons.map((item) => (
                      <Link key={item.id} href={`/lesson/${item.id}`} onClick={() => setSidebarOpen(false)} className={`my-0.5 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] leading-4 transition ${item.id === lessonId ? "bg-violet-500/10 font-semibold text-violet-700 dark:text-violet-300" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                        {completed.includes(item.id) ? <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500" /> : <span className="size-3.5 shrink-0 rounded-full border border-border" />}
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </details>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1080px] px-5 py-6 sm:px-8 sm:py-10 lg:px-12">
            <div className="mb-7 flex items-center justify-between">
              <button onClick={() => setSidebarOpen(true)} className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold lg:hidden"><Menu className="size-4" /> Curriculum</button>
              <Link href="/" className="hidden items-center gap-2 text-xs font-semibold text-muted-foreground transition hover:text-foreground lg:flex"><ArrowLeft className="size-3.5" /> Back to roadmap</Link>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 className="size-3.5" /> {lesson.duration}</span>
            </div>

            <div className="flex flex-col gap-6 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[.12em] text-violet-600 dark:text-violet-300">
                  <span>Module {lesson.module.number}</span><span className="text-border">/</span><span>{lesson.number}</span>
                </div>
                <h1 className="font-display mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-[-.035em] sm:text-4xl">{lesson.title}</h1>
                <div className="mt-4 flex flex-wrap gap-2">
                  {lesson.tags.map((tag) => <span key={tag} className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[11px] text-muted-foreground">{tag}</span>)}
                </div>
              </div>
              <button onClick={() => toggle(lessonId)} className={`flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition ${isComplete ? "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300" : "bg-foreground text-background hover:opacity-90"}`}>
                {isComplete ? <CheckCircle2 className="size-4" /> : <span className="size-4 rounded-full border border-current" />}
                {isComplete ? "Completed" : "Mark as completed"}
              </button>
            </div>

            <div className="mt-8 inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-border bg-muted/55 p-1.5 scrollbar-none" role="tablist">
              {([
                ["video", PlayCircle, "Video lesson"],
                ["tutorial", BookOpenText, "Tutorial / notes"],
                ["code", Code2, "Code snippets"],
              ] as const).map(([value, Icon, label]) => (
                <button key={value} onClick={() => setTab(value)} role="tab" aria-selected={tab === value} className={`flex h-10 items-center gap-2 whitespace-nowrap rounded-xl px-4 text-xs font-semibold transition sm:text-sm ${tab === value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                  <Icon className="size-4" /> {label}
                </button>
              ))}
            </div>

            <section className="mt-6 min-h-[520px]" aria-live="polite">
              {tab === "video" && (
                <div>
                  <div className="overflow-hidden rounded-3xl border border-border bg-black shadow-2xl shadow-violet-950/10">
                    <div className="aspect-video">
                      <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${video.videoId}?list=${playlistId}&index=${video.playlistIndex}&rel=0`} title={`${lesson.title} video lesson`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                    </div>
                  </div>
                  <div className={`mt-5 flex flex-col gap-4 rounded-2xl border p-4 text-sm leading-6 sm:flex-row sm:items-center ${video.match === "primary" ? "border-cyan-500/20 bg-cyan-500/8" : "border-amber-500/25 bg-amber-500/8"}`}>
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${video.match === "primary" ? "bg-cyan-500/12 text-cyan-600" : "bg-amber-500/12 text-amber-600"}`}><PlayCircle className="size-5" /></span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[10px] font-bold uppercase tracking-[.14em] ${video.match === "primary" ? "text-cyan-700 dark:text-cyan-300" : "text-amber-700 dark:text-amber-300"}`}>{video.match === "primary" ? "Course playlist match" : "Closest available playlist lesson"}</p>
                      <p className="mt-0.5 font-semibold text-foreground">{video.title}</p>
                      {video.match === "related" && <p className="mt-1 text-xs text-muted-foreground">The supplied playlist does not currently contain an exact dedicated video for this lesson title.</p>}
                    </div>
                    <a href={getYouTubeUrl(video)} target="_blank" rel="noreferrer" className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-card px-4 text-xs font-semibold text-foreground transition hover:border-foreground/20">
                      Open on YouTube <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              )}
              {tab === "tutorial" && (
                <article className="lesson-prose rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{tutorial}</ReactMarkdown>
                </article>
              )}
              {tab === "code" && (
                <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#0c0d12] shadow-2xl shadow-violet-950/10">
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                    <div className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-rose-400" /><span className="size-2.5 rounded-full bg-amber-300" /><span className="size-2.5 rounded-full bg-emerald-400" /><span className="ml-3 font-mono text-[11px] text-slate-400">lesson_{lesson.id.replace("-", "_")}.py</span></div>
                    <button onClick={copyCode} className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-[11px] font-semibold text-slate-300 transition hover:bg-white/10">
                      {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}{copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <pre className="overflow-x-auto p-5 text-[12px] leading-6 text-slate-300 sm:p-7 sm:text-[13px]"><code>{code}</code></pre>
                </div>
              )}
            </section>

            <div className="mt-10 grid gap-3 border-t border-border pt-7 sm:grid-cols-2">
              {previous ? (
                <Link href={`/lesson/${previous.id}`} className="group rounded-2xl border border-border bg-card p-4 transition hover:border-foreground/20 hover:shadow-md">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"><ArrowLeft className="size-3" /> Previous</span>
                  <p className="mt-2 truncate text-sm font-semibold">{previous.title}</p>
                </Link>
              ) : <div />}
              {next && (
                <Link href={`/lesson/${next.id}`} className="group rounded-2xl border border-border bg-card p-4 text-right transition hover:border-foreground/20 hover:shadow-md">
                  <span className="flex items-center justify-end gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Next <ArrowRight className="size-3" /></span>
                  <p className="mt-2 truncate text-sm font-semibold">{next.title}</p>
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
