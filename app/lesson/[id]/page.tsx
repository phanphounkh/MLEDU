import { notFound } from "next/navigation";
import { LessonShell } from "@/components/mledu/lesson-shell";
import { getLesson, lessons } from "@/lib/curriculum";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ id: lesson.id }));
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getLesson(id)) notFound();
  return <LessonShell lessonId={id} />;
}
