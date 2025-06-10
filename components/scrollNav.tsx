"use client";

import { useState, useEffect } from "react";

export type Section = {
  label: string;
  items: { id: string; label: string }[];
};

export function ScrollNav({ sections }: { sections: readonly Section[] }) {
  const firstId = sections[0]?.items[0]?.id ?? "";
  const [activeId, setActiveId] = useState(firstId);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entires) => {
        entires.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((sec) => {
      sec.items.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      });
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="space-y-4">
      {sections.map((sec) => (
        <div key={sec.label}>
          <h4 className="text-sm font-semibold text-slate-400 mb-2">
            {sec.label}
          </h4>
          <ul>
            {sec.items.map((item) => (
              <li key={item.id}>
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center text-sm ${
                    activeId === item.id
                      ? "text-teal-400 font-medium"
                      : "text-slate-400 hover:text-slate-200"
                  } transition`}
                >
                  <span
                    className={`w-2 h-2 rounded-full block mr-2 ${
                      activeId === item.id
                        ? "bg-teal-400"
                        : "border border-slate-700 bg-transparent"
                    } `}
                  ></span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
