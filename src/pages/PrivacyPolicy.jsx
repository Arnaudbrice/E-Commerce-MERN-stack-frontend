import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark py-10">
      <div className="max-w-4xl mx-auto px-4 prose dark:prose-invert sm:max-w-none">
        {/* Header */}
        <div className="mb-12">
          <div
            className="divider divider-secondary text-4xl md:text-5xl
mb-4 text-center font-extrabold">
            <h2>Privacy Policy</h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Last updated: <strong>March 10, 2026</strong>
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-slate-700 dark:text-slate-300">
          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Introduction
            </h2>
            <p className="leading-relaxed">
              Bon Marché ("we," "us," "our," or "Company") is committed to
              protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website and use our services.
            </p>
            <p className="leading-relaxed">
              Please read this Privacy Policy carefully. If you do not agree
              with our policies and practices, please do not use our website. By
              accessing and using this website, you acknowledge that you have
              read, understood, and agree to be bound by all the provisions of
              this Privacy Policy.
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
              1.1 Information You Provide Directly
            </h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>
                <strong>Account Information:</strong> Name, email address,
                password, phone number, shipping address, billing address
              </li>
              <li>
                <strong>Payment Information:</strong> Credit card details,
                payment method (processed securely through Stripe)
              </li>
              <li>
                <strong>Order Information:</strong> Products purchased, order
                history, delivery preferences
              </li>
              <li>
                <strong>Communication:</strong> Messages sent through our
                contact form, support tickets, emails
              </li>
              <li>
                <strong>Profile Information:</strong> Profile photo, bio,
                preferences, wishlist
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
              1.2 Information Collected Automatically
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Browser Data:</strong> IP address, browser type,
                operating system, pages visited
              </li>
              <li>
                <strong>Cookies & Tracking:</strong> We use cookies for
                authentication and user preferences
              </li>
              <li>
                <strong>Usage Data:</strong> Time spent on pages, clicks, search
                queries, AI chatbot interactions
              </li>
              <li>
                <strong>Device Information:</strong> Device type, screen
                resolution, mobile/desktop
              </li>
            </ul>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Processing and fulfilling your orders</li>
              <li>Sending order confirmations and shipping updates</li>
              <li>Providing customer support and responding to inquiries</li>
              <li>
                Personalizing your shopping experience with the AI Shopping
                Assistant
              </li>
              <li>
                Sending promotional emails and newsletters (with your consent)
              </li>
              <li>Improving our website and services based on user behavior</li>
              <li>
                Detecting and preventing fraud, abuse, and security incidents
              </li>
              <li>
                Complying with legal obligations and enforcing our Terms of
                Service
              </li>
              <li>Analyzing trends and gathering demographic information</li>
            </ul>
          </section>

          {/* 3. Sharing Your Information */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              3. Sharing Your Information
            </h2>
            <p className="leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information. However,
              we may share your data with:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>
                <strong>Payment Processors (Stripe):</strong> For secure payment
                processing
              </li>
              <li>
                <strong>Shipping Partners:</strong> To deliver your orders
              </li>
              <li>
                <strong>Email Services (Nodemailer):</strong> For transactional
                emails and newsletters
              </li>
              <li>
                <strong>Cloud Storage (Cloudinary):</strong> For image hosting
              </li>
              <li>
                <strong>AI Services (OpenAI/Groq):</strong> For the Shopping
                Assistant (conversations are anonymized)
              </li>
              <li>
                <strong>Legal Requirements:</strong> If required by law or court
                order
              </li>
            </ul>
            <p className="leading-relaxed">
              All third-party partners are contractually obligated to protect
              your data with security measures equivalent to ours.
            </p>
          </section>

          {/* 4. Security */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              4. Security of Your Information
            </h2>
            <p className="leading-relaxed mb-4">
              We implement comprehensive security measures to protect your
              personal information:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>SSL/TLS Encryption:</strong> All data transmitted
                between your browser and our server is encrypted
              </li>
              <li>
                <strong>HTTP Security Headers (Helmet.js):</strong> Protection
                against XSS, clickjacking, and MIME-sniffing attacks
              </li>
              <li>
                <strong>Rate Limiting:</strong> Protection against brute-force
                and DDoS attacks
              </li>
              <li>
                <strong>Password Hashing (bcrypt):</strong> Passwords are never
                stored in plain text
              </li>
              <li>
                <strong>JWT Authentication:</strong> Secure token-based
                authentication with HttpOnly cookies
              </li>
              <li>
                <strong>CORS Configuration:</strong> Whitelist-based origin
                validation
              </li>
              <li>
                <strong>PCI DSS Compliance:</strong> We don't store credit card
                data; Stripe handles all payment processing
              </li>
            </ul>
            <p className="leading-relaxed mt-4">
              While we use industry-standard security practices, no system is
              100% secure. Please protect your password and account credentials.
            </p>
          </section>

          {/* 5. Cookies */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              5. Cookies & Tracking Technologies
            </h2>
            <p className="leading-relaxed mb-4">
              We use cookies for authentication and user preferences. You can
              control cookies through your browser settings:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>
                <strong>Authentication Cookies:</strong> Keep you logged in
                securely (HttpOnly, Secure flags)
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your theme
                (light/dark mode) and language
              </li>
              <li>
                <strong>Analytical Cookies:</strong> Help us understand site
                performance (optional)
              </li>
            </ul>
            <p className="leading-relaxed">
              Disabling cookies may affect your ability to use certain features
              of our website.
            </p>
          </section>

          {/* 6. Your Rights */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              6. Your Privacy Rights
            </h2>
            <p className="leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Right to Access:</strong> Request a copy of the personal
                data we hold about you
              </li>
              <li>
                <strong>Right to Correct:</strong> Update or correct inaccurate
                information
              </li>
              <li>
                <strong>Right to Delete:</strong> Request deletion of your data
                (subject to legal retention requirements)
              </li>
              <li>
                <strong>Right to Opt-Out:</strong> Unsubscribe from marketing
                emails at any time
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Export your data in
                a structured format
              </li>
            </ul>
            <p className="leading-relaxed mt-4">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:privacy@bonmarche.com"
                className="text-secondary hover:underline">
                privacy@bonmarche.com
              </a>
            </p>
          </section>

          {/* 7. Retention */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              7. Data Retention
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Account Data:</strong> Retained while your account is
                active; deleted upon account deletion
              </li>
              <li>
                <strong>Order Data:</strong> Retained for 7 years for tax and
                legal compliance
              </li>
              <li>
                <strong>Payment Data:</strong> Not retained (processed by
                Stripe)
              </li>
              <li>
                <strong>Marketing Data:</strong> Retained until you unsubscribe
              </li>
            </ul>
          </section>

          {/* 8. Third-Party Links */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              8. Third-Party Links & Services
            </h2>
            <p className="leading-relaxed">
              Our website may contain links to third-party websites and services
              (e.g., Stripe for payments, social media). We are not responsible
              for the privacy practices of these external sites. We encourage
              you to review their privacy policies before providing any personal
              information.
            </p>
          </section>

          {/* 9. Children's Privacy */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              9. Children's Privacy
            </h2>
            <p className="leading-relaxed">
              Bon Marché is not intended for users under 13 years of age. We do
              not knowingly collect personal information from children under 13.
              If we discover that a child under 13 has provided us with personal
              information, we will delete such information immediately and
              terminate the child's account. If you believe a child has provided
              us with information, please contact us at{" "}
              <a
                href="mailto:privacy@bonmarche.com"
                className="text-secondary hover:underline">
                privacy@bonmarche.com
              </a>
            </p>
          </section>

          {/* 10. GDPR & CCPA Compliance */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              10. International Compliance
            </h2>
            <p className="leading-relaxed mb-4">
              <strong>GDPR (European Users):</strong> If you're in the EU, we
              comply with GDPR regulations. You have the right to access,
              correct, and delete your data, as well as the right to lodge
              complaints with your data protection authority.
            </p>
            <p className="leading-relaxed">
              <strong>CCPA (California Users):</strong> If you're in California,
              you have the right to know, delete, and opt-out of the sale of
              your personal information.
            </p>
          </section>

          {/* 11. Changes to Privacy Policy */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes
              in our practices or legal requirements. We will notify you of any
              material changes by posting the updated policy on our website and
              updating the "Last Updated" date. Your continued use of our
              website following the posting of changes constitutes your
              acceptance of those changes.
            </p>
          </section>

          {/* 12. Contact Us */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              12. Contact Us
            </h2>
            <p className="leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our privacy
              practices, please contact us:
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@bonmarche.com"
                  className="text-secondary hover:underline">
                  privacy@bonmarche.com
                </a>
              </p>
              <p className="mb-2">
                <strong>Support:</strong>{" "}
                <a
                  href="mailto:support@bonmarche.com"
                  className="text-secondary hover:underline">
                  support@bonmarche.com
                </a>
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href="/" className="text-secondary hover:underline">
                  www.e-commerce-mern-stack-frontend-q5j0.onrender.com
                </a>
              </p>
            </div>
          </section>

          {/* Closing */}
          <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-600">
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              By using Bon Marché, you acknowledge that you have read and
              understood this Privacy Policy and agree to its terms. If you do
              not agree, please do not use our services.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
