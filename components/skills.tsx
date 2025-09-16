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
              Conducted comprehensive malicious email analysis through
              systematic header inspection, attachment extraction and hashing,
              and threat intelligence correlation using VirusTotal and OSINT
              sources. My Splunk investigations include crafting advanced SPL
              queries to isolate malicious IP addresses, correlating attack
              timelines from web server logs, and integrating Pastebin evidence
              for website compromise scenarios like the Po1s0n1vy incident.
            </p>

            <span className="inline-block text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
              Comptia Security+ Certified
            </span>
          </div>
          {/* Service Cards */}
          <div className="bg-white rounded-xl p-6 shadow-md justify-between min-h-[180px]">
            <div className="font-bold text-slate-600 mb-3">
              Digital Forensics & Incident Response
            </div>
            <p className="text-gray-600 mb-2 text-sm mb-3">
              Performed endpoint forensics and threat triage using Cyber Triage
              to analyze compromised hosts, validate malicious artifacts, and
              produce comprehensive incident reports. My methodology includes
              systematic artifact analysis, false-positive validation, and rapid
              response procedures for identifying and documenting security
              incidents across Windows environments.
            </p>

            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
              TDX Incident Response Expert Certified
            </span>
          </div>
          {/* Service Cards */}
          <div className="bg-white rounded-xl p-6 shadow-md justify-between min-h-[180px]">
            <div className="font-bold text-slate-600 mb-3">
              Cloud Security & Infrastucture
            </div>
            <p className="text-gray-600 mb-2 text-sm mb-3">
              Designed and deploy secure AWS architectures including custom VPCs
              with multi-AZ public/private subnets, Internet and NAT Gateway
              configurations, and Auto Scaling Groups with Application Load
              Balancers. My IAM implementations enforce least-privilege access
              through role-based groups and policy management, while my EC2
              deployments include security group configurations and user-data
              automation for scalable web infrastructure.
            </p>

            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
              AWS Academy Badge
            </span>
          </div>
          {/* Service Cards */}
          <div className="bg-white rounded-xl p-6 shadow-md justify-between min-h-[180px]">
            <div className="font-bold text-slate-600 mb-3">
              Security-Focused Web Development
            </div>
            <p className="text-gray-600 mb-2 text-sm mb-3">
              Built secure web applications and portfolio sites using modern
              frameworks, with emphasis on implementing proper authentication
              flows, input validation, and secure coding practices. My
              development approach integrates security considerations from the
              ground up, including protection against common web vulnerabilities
              like XSS and SQL injection, while maintaining responsive design
              and optimal performance for showcasing cybersecurity projects and
              technical demonstrations.
            </p>

            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
              Masters in Web Development
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
