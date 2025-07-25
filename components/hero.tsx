import React from "react";
import RightSide from "./profileRightSide";
//import profileImg from

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-between px-6 md:px-20 gap-10">
      {/* Left section */}
      <div className="pb-40">
        <div className="mb-4">
          <span className="text-xs px-3 py-1 bg-teal-100 text-teal-600 rounded-full">
            Available for Work
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
          Hi I am a <br />
          <span className="text-slate-900">Security Analyst ©</span>
        </h1>
        <p className="text-slate-600 mb-6">
          <b>
            Certificate in Cybersecurity | Bachelors in Digital Arts & Sciences
            | Masters in Web Design & Communications
          </b>
          <br />
          Passionate about technology and committed to continuous learning, I am
          particularly interested in opportunities that <br /> allow me to
          contribute to innovative solutions and enhance user experiences.
        </p>
        <div>
          <a
            href="/contact"
            className="inline-block bg-teal-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-teal-700 transition mr-4 "
          >
            Let&apos;s Connect
          </a>

          <a
            href="/Smith_Security_Resume.pdf"
            download
            className="inline-block bg-white text-teal-600 px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition"
            aria-label="Download Resume"
          >
            Download Resume
          </a>
        </div>
      </div>
      <RightSide />
    </section>
  );
}
