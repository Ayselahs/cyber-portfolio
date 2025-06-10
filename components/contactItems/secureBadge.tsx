export default function SecureBadge() {
  return (
    <div className="inline-flex items-center space-x-2 text-teal-500">
      <svg
        xmlns="https://www.w3.org/TR/SVG2/"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 11V6 a7 7 0 0 1 14 0 v5 m-7 4 v4 m-7 0 h14"
        />
      </svg>
      <span className="text-sm font-medium">Secure Submission</span>
    </div>
  );
}
