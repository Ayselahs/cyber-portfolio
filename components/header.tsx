import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky transparent top-4 z-10 w-full">
      <div className="container mx-auto flex max-w-9xl items-center justify-between rounded-full bg-white px-6 py-3 shadow-md">
        <Link
          href="/"
          className="text-lg font-semibold text-slate-600 hover:opacity-80 transition"
        >
          Ayselah Smith
        </Link>
        <Link
          href="/contact"
          className="inline-block rounded-full bg-black px-4 py-2 text-white hover:bg-gray-800 transition"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
