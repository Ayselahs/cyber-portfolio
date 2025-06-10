import Image from "next/image";

const socials = [
  {
    name: "Github",
    href: "https://github.com/Ayselahs",
    icon: "/github.png",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ayselahsmith/",
    icon: "/linkedin.png",
  },
  {
    name: "Behance",
    href: "https://www.behance.net/search/projects/ayselah?tracking_source=typeahead_nav_recent_suggestion",
    icon: "/behance.png",
  },
  {
    name: "Gmail",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=ayselahs@gmail.com",
    icon: "/gmail.png",
  },
];

export default function RightSide() {
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col md:flex-row items-center justify-between pb-40 py-16 gap-10">
      <div className="col-start-3 row-start-3 flex justify-center">
        <div className="max-w-xs w-full bg-white rounded-xl p-8 pl-12 pr-12 shadow-lg text-center ring-1 ring-teal-100 dark:bg-gray-800 dark:text-gray-100 flex flex-col items-center space-y-4">
          <Image
            src="/ProfilePic.png"
            alt="Profile"
            width={180}
            height={90}
            className="w-34 h-34 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
          />
          <p className="text-m text-slate-500 dark:text-gray-400">
            Middle Tennessee
          </p>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Microsoft & Linux Security
          </span>
        </div>
      </div>

      {/* Socials */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-4">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-4 w-16 h-16 aspect-square"
            aria-label={social.name}
          >
            <Image
              src={social.icon}
              alt={social.name}
              width={60}
              height={60}
              className="rounded-full shadow-md object-cover"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
