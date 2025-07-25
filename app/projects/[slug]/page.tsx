import { notFound } from "next/navigation";
import Projects from "../../../data/projects.json";
import Header from "../../../components/header";
import { ScrollNav, Section } from "../../../components/scrollNav";
import Image from "next/image";
import type { Project } from "@/data/project";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects: Project[] = Projects;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const groups: Section[] = project.sidebar ?? [];

  return (
    <>
      <Header />
      {/* Video Header */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-8 px-6">
          {/* Title/Description */}
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {project.title}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              {project.statement}
            </p>
            <p className="text-slate-400 font-medium italic">{project.year}</p>
          </div>
          <div className="mt-8 md:mt-0 md:ml-auto md:w-1/2">
            {project.videoUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  width="750"
                  height="430"
                  src={project.videoUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="relative aspect-video rounded-xl bg-gray-800 flex items-center justify-center text-white">
                <p>No Video Avaliable</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom Half */}
      <div className="bg-slate-900 text-slate-200 py-4">
        <div className="container mx-auto py-12 px-6 lg:grid lg:grid-cols-[200px_1fr_240px] lg:gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <ScrollNav sections={groups} />
          </aside>

          <main className="space-y-24">
            <article className="prose prose-invert max-w-3xl mx-auto mb-32">
              {/* -------- Overview -------- */}
              <section id="overview" className="border-b border-gray-700 pb-8">
                <h2>Overview</h2>
                <p>{project.objective}</p>
              </section>
            </article>

            {/* -------- Tools as Cards -------- */}
            <section id="tools" className="max-w-3xl mx-auto py-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="grid grid-cols-[12rem_1fr] border-b border-gray-200 dark:border-gray-700">
                  <span className="px-6 py-4 text-sm font-semibold uppercase text-gray-300 dark:text-gray-40">
                    Tools
                  </span>
                </div>
                {project.tools.map((tool, idx) => (
                  <div key={tool} className="grid grid-cols-[12rem_1fr]">
                    <span className="hidden sm:block px-6 py-4"></span>
                    <a
                      href="#"
                      className={`block px-6 py-4 flex justify-between items-center text-gray-800 dark:text-gray-200 hover:bg-grey-50 dark:bg-gray-700 transition ${
                        idx < project.tools.length - 1
                          ? "border-b border-gray-200 dark:border-gray-700"
                          : ""
                      }`}
                    >
                      <span>{tool}</span>
                      <ChevronRightIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <article className="prose prose-invert max-w-3xl mx-auto mb-32">
              {/* -------- Concepts -------- */}
              <div className="border-t border-gray-700 pb-8"></div>
              <section id="concepts" className="border-b border-gray-700 pb-8">
                <h2>Concepts</h2>
                <ul>
                  {project.concepts.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </section>
            </article>

            {/* -------- Methodology as Numbered Timeline -------- */}
            <section
              id="methodology"
              className="prose prose-invert max-w-3xl mx-auto py-4"
            >
              <h2 className="text-3xl font-heading text-white mb-6">
                Methodology
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                {project.steps.map((step, idx) => (
                  <div
                    key={step.id}
                    id={step.id}
                    className={`grid grid-cols-[8rem_1fr] items-start ${
                      idx < project.steps.length - 1
                        ? "border-b border-gray-200 dark:border-gray-700"
                        : ""
                    }`}
                    aria-label={`Step ${idx + 1}`}
                  >
                    <div className="px-6 py-4 text-sm font-semibold text-gray-500 dark:textgray-400 uppercase">
                      Step {idx + 1}
                    </div>
                    <div className="px-6 py-4">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-1">
                        {
                          groups.find((g) => g.label === "Methodology")!.items[
                            idx
                          ].label
                        }
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {step.description}
                      </p>
                      {step.image && (
                        <div className="mt-4">
                          <Image
                            src={step.image}
                            alt={`Step ${idx + 1} screenshot`}
                            width={600}
                            height={450}
                            className="rounded-md shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <article className="prose prose-invert max-w-3xl mx-auto mb-32">
              <div className="border-t border-gray-700 pb-8"></div>
              {/* -------- Reflections -------- */}
              <section
                id="reflections"
                className="border-b border-gray-700 pb-8"
              >
                <h2>Reflections</h2>
                <ul className="list-disc list-inside space-y-4">
                  {project.reflections.map((ref) => (
                    <li key={ref.id} className="text-slate-300">
                      <span className="font-semibold text-white">
                        {ref.title}:
                      </span>{" "}
                      {ref.description}
                    </li>
                  ))}
                </ul>
              </section>
            </article>
          </main>
          <aside className="hidden lg:block space-y-4">
            {project.resources?.map((res) => (
              <a
                key={res.id}
                href={res.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:ring-2 hover:ring-teal-400 transition"
              >
                <Image
                  src={res.icon}
                  width={32}
                  height={32}
                  alt={res.title}
                  className="flex-shrink-0"
                ></Image>
                <div>
                  <h4 className="text-lg font-medium text-slate-900 dark:text-white">
                    {res.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {res.description}
                  </p>
                </div>
              </a>
            ))}
          </aside>
        </div>
      </div>
    </>
  );
}
