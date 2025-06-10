import { notFound } from "next/navigation";
import Projects from "../../../data/projects.json";
import Header from "../../../components/header";
import { ScrollNav, Section } from "../../../components/scrollNav";
import Image from "next/image";
import type { Project } from "@/data/project";

export const setProjects = Projects as Project[];

export default async function ProjectsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const project = setProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const groups: Section[] = project.sidebar ?? [];

  return (
    <>
      <Header />
      {/* Video Header */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-8 px-6">
          <div className="md:w-1/2 space-y-4">
            <h1 className="font-heading text-4xl md:text-6xl">
              {project.title}
            </h1>
            <p className="text-lg text-slate-300">{project.objective}</p>
          </div>
          <div className="md:w-1/2">
            {project.videoUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  width="560"
                  height="315"
                  src={project.videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
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
      <div className="bg-slate-900 text-slate-200 py-16">
        <div className="container mx-auto py-12 px-6 lg:grid lg:grid-cols-[200px_1fr_240px] lg:gap-8">
          {/* Sidebar */}
          <aside className="hidden hidden lg:block">
            <ScrollNav sections={groups} />
          </aside>

          <main className="space-y-16">
            {groups.map((group) => (
              <div key={group.label} className="space-y-2">
                <p className="text-sm font-semibold text-teal-40 uppercase">
                  {group.label}
                </p>
                {group.items.map((item) => {
                  // Dynamically pull content by id
                  const content = project[item.id];

                  return (
                    <section
                      key={item.id}
                      id={item.id}
                      className="scroll-mt-24 space-y-12"
                    >
                      <h2 className="text-3xl font-heading text-white">
                        {item.label}
                      </h2>

                      {/* 3️⃣ Render either a list or a paragraph */}
                      {Array.isArray(content) ? (
                        <ul className="list-disc list-inside space-y-2 text-slate-300">
                          {(content as string[]).map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-300">{content}</p>
                      )}
                    </section>
                  );
                })}
              </div>
            ))}
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
