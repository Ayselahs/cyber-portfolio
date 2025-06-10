export default function SkillsSection() {
  return (
    <section id="skills" className="bg-gray-50 py-16 px-6 mb-40 md:px-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Section */}
        <div className="md:w-1/3">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-600 leading-tight">
            Certified <br />
            Skills
          </h2>
        </div>
        {/* Service Cards */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Service Cards */}
          <div className="bg-white rounded-xl p-6 shadow-md justify-between min-h-[180px]">
            <div className="font-bold text-slate-600 mb-3">
              Threat Detection & Analysis
            </div>
            <p className="text-gray-600 mb-2 text-sm mb-3">
              I leverage Splunk to monitor both Windows and Linux environments,
              performing real-time log analysis to uncover malware originating
              from Kali-based attack vectors. My presentations demonstrate how
              to ingest, parse, and triage alerts so that anomalies do not go
              unnoticed.
            </p>

            <span className="inline-block text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
              Comptia Security+ Certified
            </span>
          </div>
          {/* Service Cards */}
          <div className="bg-white rounded-xl p-6 shadow-md justify-between min-h-[180px]">
            <div className="font-bold text-slate-600 mb-3">
              Incident Response Planning
            </div>
            <p className="text-gray-600 mb-2 text-sm mb-3">
              I have developed and walked teams through end-to-end incident
              response playbooks—covering preparation, identification,
              containment, eradication, recovery, and lessons learned. My video
              walkthrough breaks down each phase with practical examples and
              tabletop exercises.
            </p>

            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
              TDX Incident Response Expert Certified
            </span>
          </div>
          {/* Service Cards */}
          <div className="bg-white rounded-xl p-6 shadow-md justify-between min-h-[180px]">
            <div className="font-bold text-slate-600 mb-3">
              Cloud Security & Networking
            </div>
            <p className="text-gray-600 mb-2 text-sm mb-3">
              Through hands-on IAM management and VPC design I ensure
              least-privilege access and network segmentation in Amazon Web
              Services. I have built, tested, and documented secure multi-AZ
              VPCs, subnets, security-group policies, and cross-account roles.
            </p>

            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
              AWS Academy Badge
            </span>
          </div>
          {/* Service Cards */}
          <div className="bg-white rounded-xl p-6 shadow-md justify-between min-h-[180px]">
            <div className="font-bold text-slate-600 mb-3">
              Full-Stack Web Development
            </div>
            <p className="text-gray-600 mb-2 text-sm mb-3">
              From early Dreamweaver projects to modern Next.js + Node.js +
              MongoDB applications, I craft responsive, data-driven web
              experiences. I build RESTful APIs, integrate NoSQL databases, and
              implement authentication flows—all with emphasis on performance,
              accessibility, and maintainability
            </p>

            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
              Adobe Dreamweaver Certified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
