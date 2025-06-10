import Image from "next/image";
import projects from "../data/projects.json";
import Link from "next/link";

export default function SelectedWorkSection() {
  return (
    <section className="bg-stone-100 py-16 px-6 md:px-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/3">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-600 leading-tight mb-4">
            Showcased <br />
            Work
          </h2>
        </div>

        {/* Work Grid */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((item) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title + Tags */}
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <div className="flex gap-2 mt-2">
                    {item.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-xs px-3 py-1 bg-blue-50 text-blue-500 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
