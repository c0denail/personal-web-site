import type { Metadata } from "next";
import ProjectDetailPage from "../../../../components/ProjectDetailPage";
import { getProject, getProjects } from "../../../../data/projects";
import { localeConfig, projectHref } from "../../../../i18n";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const locale = "en" as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects(locale).map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug, locale);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} — Emirhan Tuncer`,
    description: project.description,
    alternates: {
      canonical: projectHref(locale, project.id),
      languages: {
        "tr-TR": projectHref("tr", project.id),
        "en-US": projectHref("en", project.id),
      },
    },
    openGraph: {
      title: `${project.title} — Project Details`,
      description: project.description,
      type: "article",
      locale: localeConfig[locale].openGraphLocale,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  return <ProjectDetailPage locale={locale} slug={slug} />;
}
