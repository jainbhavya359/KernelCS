import { notFound } from "next/navigation";
import { getCurriculumSubjectById } from "@/lib/data/curriculum";
import { slugToId, ALL_SUBJECT_SLUGS } from "@/lib/data/subjectSlugs";
import { WorkspaceShell } from "@/components/workspace/WorkspaceShell";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALL_SUBJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const id = slugToId(slug);
  const subject = id ? getCurriculumSubjectById(id) : undefined;
  if (!subject) return { title: "Subject Not Found — KernelCS" };
  return {
    title: `${subject.name} — KernelCS Learning Workspace`,
    description: subject.description,
  };
}

export default async function SubjectWorkspacePage({ params }: PageProps) {
  const { slug } = await params;
  const id = slugToId(slug);
  if (!id) notFound();

  const subject = getCurriculumSubjectById(id);
  if (!subject) notFound();

  return <WorkspaceShell subject={subject} />;
}

