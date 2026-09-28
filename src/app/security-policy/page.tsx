import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SecurityPolicy() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight mb-4">
              Security Policy
            </h1>
            <p className="text-gray-500 text-lg">
              How TooliVos safeguards your data, privacy, and system security.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-14 prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p>
              At TooliVos, protecting your data, privacy, and system security is fundamental to how we operate. We implement robust, multi-layered security measures to safeguard user information, prevent unauthorized access, and ensure a secure environment for all our web utilities.
            </p>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">1. Data Encryption & Transmission</h2>
            <p>
              To prevent data interception and protect sensitive communications:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>HTTPS & SSL Encryption:</strong> All connections to TooliVos are secured using industry-standard Secure Sockets Layer (SSL) / Transport Layer Security (TLS) protocol encryption.</li>
              <li><strong>Data in Transit:</strong> Information transferred between your browser, our web servers, and database infrastructures is encrypted to maintain complete confidentiality.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">2. Infrastructure & Hosting Security</h2>
            <p>
              Our systems are hosted in secure, enterprise-grade cloud server environments designed to defend against modern cyber threats:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Controlled Server Environments:</strong> Data servers are maintained in protected facilities with strict physical and digital access controls.</li>
              <li><strong>Firewalls & Threat Detection:</strong> Active Web Application Firewalls (WAF) and real-time monitoring tools continuously screen network traffic to identify and block suspicious activities, DDoS attacks, and unauthorized intrusion attempts.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">3. File & Processing Safety</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Automatic Data Purging:</strong> Files, snippets, or temporary data uploaded to TooliVos for analysis, optimization, or conversion are processed securely in isolated memory buffers and automatically deleted from our servers within a short retention window.</li>
              <li><strong>No Unlawful Access:</strong> We do not index, share, or store the internal text or proprietary code processed through our utilities.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">4. Account & Password Security</h2>
            <p>
              If you create an account on TooliVos:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Hashed Credentials:</strong> User passwords are stored using strong, one-way cryptographic hashing algorithms (e.g., bcrypt/Argon2). We never store or view plain-text passwords.</li>
              <li><strong>Session Safeguards:</strong> Secure session cookies and authentication tokens are utilized to protect user sessions from hijacking or cross-site request forgery (CSRF).</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">5. Responsible Disclosure & Vulnerability Reporting</h2>
            <p>
              We welcome feedback and bug reports from ethical security researchers and the public to keep TooliVos safe:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>If you discover a potential security flaw, vulnerability, or bug on our platform, please report it immediately to our security team at security@toolivos.com.</li>
              <li>We ask that you give us reasonable time to investigate and fix the reported issue before disclosing it publicly, and that you avoid disrupting live user accounts or data integrity during testing.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">6. User Responsibilities</h2>
            <p>
              While TooliVos employs rigorous security standards, user safety also relies on individual practices:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Ensure your web browser, operating system, and security software are kept up to date.</li>
              <li>Do not share your account login credentials or API keys with unauthorized individuals.</li>
              <li>Report any suspicious account activity to our support team immediately.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">7. Policy Updates</h2>
            <p>
              TooliVos may update this Security Policy from time to time to reflect technological advancements, operational changes, or statutory security requirements. Revisions will be published directly on this page.
            </p>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">8. Contact Our Security Team</h2>
            <p>
              For questions, vulnerability disclosures, or security-related concerns regarding TooliVos, please reach out to us:<br/>
              <strong>Security Email:</strong> security@toolivos.com
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
