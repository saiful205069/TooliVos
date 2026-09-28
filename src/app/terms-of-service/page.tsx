import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-500 text-lg">
              Please read these terms carefully before using TooliVos.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-14 prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p>
              At TooliVos, we deeply value your trust and are committed to safeguarding your privacy. To ensure complete transparency, this policy details what data we collect when you utilize our online utilities, the purpose behind its collection, and how it helps us enhance your overall experience. By accessing and using the tools available on TooliVos, you acknowledge and agree to the data management practices described in these Terms of Service.
            </p>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">Usage of Personal Data</h2>
            <p>
              If you opt-in to our newsletter or mailing list, TooliVos may use your email address to share updates regarding new tools, features, or promotional offers from us and our affiliates. We may also reach out via periodic surveys to gather feedback on current utilities or prospective additions. Please note that any personal details or sensitive information voluntarily posted on the TooliVos public blog or discussion sections may be viewed, collected, and used by third parties beyond our control.
            </p>
            <p className="mt-4">
              TooliVos strictly refrains from selling, renting, or leasing user details to external entities. On occasion, TooliVos may communicate with you on behalf of select third-party partners regarding specialized offerings that align with your interests; however, in such instances, your private identification details (such as name, email, address, or phone number) are never shared with the third party. Furthermore, we may collaborate with verified service partners to handle statistical analysis, process communications, deliver support, or manage physical deliveries. These partners are legally restricted from using your personal data for any purpose other than delivering these specified services for TooliVos, and they are bound to strict confidentiality agreements.
            </p>
            <p className="mt-4">
              TooliVos will only disclose your personal information without prior notice if mandated by law or in good faith belief that such action is necessary to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Comply with legal requirements or legal proceedings served upon TooliVos or its platform.</li>
              <li>Defend and preserve the intellectual, property, or legal rights of TooliVos (including the enforcement of these terms).</li>
              <li>Act under urgent circumstances to safeguard the safety of TooliVos users or the general public.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">Data Collection & Public Reports</h2>
            <p>
              The information compiled by TooliVos utilities consists of metrics that are otherwise accessible through publicly available online resources (e.g., search engine caches, public Whois records, etc.). Consequently, all reports, analyses, and data outputs generated on TooliVos are classified as public records and stored within our database, meaning they may also be indexed by search engine web crawlers.
            </p>
            <p className="mt-4">
              To maintain operational quality and deliver requested services, TooliVos automatically collects general platform and technical metadata. This includes your IP address, domain details, estimated web traffic metrics, on-page and off-page SEO data, technical usability parameters, visit timestamps, and referring URL addresses. This technical information is used exclusively to operate our service suite and compile overall usage statistics.
            </p>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">User Restrictions & Prohibited Conduct</h2>
            <p>By accessing our platform, you explicitly agree not to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Extract, duplicate, or redistribute content or reports from TooliVos to build internal databases, feed media/press outlets, or broadcast over commercial networks, satellite, or cable channels.</li>
              <li>Reverse engineer, decompile, disassemble, modify, adapt, translate, bundle, sub-license, export, lease, host, or construct derivative works from any part of the TooliVos tools or platform, whether physically or digitally.</li>
              <li>Allow or enable third parties to breach or compromise the proprietary rights and intellectual property of TooliVos or its licensors. (This applies except where local statutory laws explicitly prohibit such restrictions.)</li>
              <li>Utilize automated site-copying tools, website downloaders, or offline viewing applications to capture and store multiple pages from the site.</li>
              <li>Deploy automated scripts, web scrapers, or bots on the platform.</li>
              <li>Employ ad-blocking software or extensions intended to obstruct the loading and rendering of advertisements on the TooliVos website.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">Disclaimer & Limitation of Liability</h2>
            <p>
              The tools offered on TooliVos are provided for general information and routine utility purposes. They are not designed to cause harm or loss to any individual, business, or entity.
            </p>
            <p className="mt-4">
              All insights and data provided on the website serve as general informational guidance on topics of common interest. Users are strongly advised to seek expert professional consultation before taking strategic actions based on generated outputs. TooliVos disclaims all liability regarding how generated results are applied, interpreted, or relied upon by users, and shall not be held responsible for any misunderstandings, inaccuracies, or unexpected outcomes resulting from tool usage.
            </p>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">Data Security Infrastructure</h2>
            <p>
              TooliVos employs industry-standard technical and organizational security measures to protect your personal information against unauthorized access, exposure, or alteration. User data resides on secure servers situated within monitored and protected environments. When sensitive records (such as payment card information) are transmitted, they are safeguarded through advanced encryption frameworks, such as standard Secure Socket Layer (SSL) protocols.
            </p>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">Modifications to These Terms</h2>
            <p>
              TooliVos reserves the right to periodically update these Terms of Service to reflect operational adjustments, platform enhancements, and community feedback. We encourage users to routinely check this page to remain informed about our data protection policies. Continued usage of the TooliVos platform confirms your acceptance of these updated terms.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-gray-500 italic font-medium">Last Updated: 28-09-2026</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
