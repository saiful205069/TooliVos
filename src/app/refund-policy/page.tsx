import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight mb-4">
              Refund Policy
            </h1>
            <p className="text-gray-500 text-lg">
              Terms regarding purchases, subscriptions, and refunds on TooliVos.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-14 prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p>
              At TooliVos, we strive to deliver high-quality web utilities and services to our users. Because our services primarily consist of digital tools, instant analysis, and virtual products, this Refund Policy outlines the terms and conditions regarding purchases, subscriptions, and refund requests on TooliVos.
            </p>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">1. Free Services & Trial Utilities</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Free Tools:</strong> The vast majority of tools and analysis features on TooliVos are completely free to use. No charges apply for standard usage, and therefore no refunds are applicable to free utilities.</li>
              <li><strong>Trial Packages:</strong> If a premium trial or demo access is offered, users are encouraged to test the tool&apos;s features thoroughly during the trial period before committing to a paid plan.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">2. Digital Goods & Premium Subscriptions</h2>
            <p>
              Due to the nature of digital products, software-as-a-service (SaaS), and downloadable report outputs:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Instant Delivery:</strong> Upon successful payment, premium access, API credits, or enhanced capabilities are delivered instantly to your account.</li>
              <li><strong>Non-Refundable Services:</strong> Except as explicitly provided in this policy or required by applicable law, payments for digital subscriptions, one-time usage credits, or premium feature activations are generally non-refundable.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">3. Eligible Refund Circumstances</h2>
            <p>
              We evaluate refund requests on a case-by-case basis. You may be eligible for a full or partial refund under the following exceptional circumstances:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Duplicate or Accidental Billing:</strong> If you were charged multiple times for a single transaction due to a technical glitch or payment gateway error.</li>
              <li><strong>Major Technical Failure:</strong> If a paid tool or service experiences an extended outage or critical failure that prevents you from using the service, and our technical team is unable to resolve the issue within 7 business days of notification.</li>
              <li><strong>Unauthorized Transactions:</strong> If an unauthorized charge was made using your account or payment information (subject to verification).</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">4. Non-Refundable Scenarios</h2>
            <p>
              Refunds will not be granted in the following situations:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>You simply change your mind or no longer require the tool after completing a purchase.</li>
              <li>You fail to cancel an auto-renewing subscription prior to the renewal date.</li>
              <li>Account suspension or termination resulting from a breach of our Terms of Service (e.g., deploying bots, abuse of APIs, or scraping).</li>
              <li>Inaccuracies or dissatisfaction with tool reports derived from public web data, as outputs are generated based on dynamic third-party metrics.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">5. How to Request a Refund</h2>
            <p>
              If you believe you meet the criteria for a refund, please follow these steps:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Contact our support team within 7 calendar days of the transaction date.</li>
              <li>Send an email to support@toolivos.com with the subject line: &quot;Refund Request - [Your Order ID/Transaction ID]&quot;.</li>
              <li>Provide details including your registered email address, transaction date, proof of payment, and a clear explanation of why you are requesting a refund.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">6. Processing Time</h2>
            <p>
              Once your refund request is received:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Our support team will review your claim and notify you of the approval or rejection within 3 to 5 business days.</li>
              <li>If approved, your refund will be processed back to your original payment method within 7 to 10 business days, depending on your card issuer or bank processing times.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">7. Policy Modifications</h2>
            <p>
              TooliVos reserves the right to modify or update this Refund Policy at any time. Any changes will take effect immediately upon posting to this page with an updated &quot;Last Updated&quot; date.
            </p>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">8. Contact Us</h2>
            <p>
              For any questions regarding billing, payments, or this Refund Policy, please reach out to us:<br/>
              <strong>Email:</strong> support@toolivos.com
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
