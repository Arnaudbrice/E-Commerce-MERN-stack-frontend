import React from "react";

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark py-10">
      <div className="max-w-4xl mx-auto px-4 prose dark:prose-invert sm:max-w-none">
        {/* Header */}
        <div className="mb-12">
          <div
            className="divider divider-secondary text-4xl md:text-5xl
mb-4 text-center font-extrabold">
            <h2> Terms of Service</h2>
          </div>
          <p className="text-lg text-slate-300 dark:text-slate-300">
            Last updated: <strong>March 10, 2026</strong>
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-slate-700 dark:text-slate-300">
          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed">
              By accessing and using the Bon Marché website and services (the
              "Website"), you agree to be bound by these Terms of Service
              ("Terms"). If you do not agree with any part of these Terms, you
              may not use our Website or services. These Terms apply to all
              users, including browsers, customers, vendors, and content
              contributors.
            </p>
            <p className="leading-relaxed">
              Bon Marché reserves the right to modify these Terms at any time
              without prior notice. Your continued use of the Website following
              any changes constitutes your acceptance of the new Terms. We
              recommend reviewing these Terms regularly for updates.
            </p>
          </section>

          {/* 2. Use License */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              2. Use License
            </h2>
            <p className="leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on Bon Marché's Website for
              personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title, and under this
              license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or for any public
                display (commercial or non-commercial)
              </li>
              <li>
                Attempt to decompile or reverse engineer any software contained
                on the Website
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials
              </li>
              <li>
                Transfer the materials to another person or "mirror" the
                materials on any other server
              </li>
              <li>Violate any applicable laws or regulations</li>
              <li>
                Engage in any conduct that restricts or inhibits anyone's use or
                enjoyment
              </li>
              <li>
                Obtain or attempt to obtain any materials or information through
                any means
              </li>
            </ul>
            <p className="leading-relaxed">
              This license shall automatically terminate if you violate any of
              these restrictions and may be terminated by Bon Marché at any
              time. Upon termination of your viewing of these materials or upon
              the termination of this license, you must destroy any downloaded
              materials in your possession whether in electronic or printed
              format.
            </p>
          </section>

          {/* 3. Disclaimer */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              3. Disclaimer
            </h2>
            <p className="leading-relaxed mb-4">
              The materials on Bon Marché's Website are provided on an "as is"
              basis. Bon Marché makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
            <p className="leading-relaxed">
              Further, Bon Marché does not warrant or make any representations
              concerning the accuracy, likely results, or reliability of the use
              of the materials on its Website or otherwise relating to such
              materials or on any sites linked to this site.
            </p>
          </section>

          {/* 4. Limitations */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              4. Limitations of Liability
            </h2>
            <p className="leading-relaxed mb-4">
              In no event shall Bon Marché or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on Bon Marché's Website, even if
              Bon Marché or an authorized representative has been notified
              orally or in writing of the possibility of such damage.
            </p>
            <p className="leading-relaxed">
              Because some jurisdictions do not allow limitations on implied
              warranties, or limitations of liability for consequential or
              incidental damages, these limitations may not apply to you.
            </p>
          </section>

          {/* 5. Accuracy of Materials */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              5. Accuracy of Materials
            </h2>
            <p className="leading-relaxed mb-4">
              The materials appearing on Bon Marché's Website could include
              technical, typographical, or photographic errors. Bon Marché does
              not warrant that any of the materials on its Website are accurate,
              complete, or current. Bon Marché may make changes to the materials
              contained on its Website at any time without notice.
            </p>
            <p className="leading-relaxed">
              While we strive to provide accurate product descriptions, images,
              and pricing, we do not guarantee that all product descriptions,
              pricing, or other content of any kind is accurate, complete,
              reliable, current, or error-free.
            </p>
          </section>

          {/* 6. Materials and Content */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              6. Materials and Content
            </h2>
            <p className="leading-relaxed mb-4">
              Bon Marché does not control the content posted on its Website by
              users and does not warrant the accuracy, integrity, or quality of
              such content. You are responsible for the content you post,
              including but not limited to product reviews and ratings.
            </p>
            <p className="leading-relaxed">
              By posting content on Bon Marché, you grant Bon Marché a
              non-exclusive, perpetual, irrevocable, royalty-free, and
              sublicensable right to use, reproduce, modify, adapt, publish, and
              distribute the content in any media. You represent and warrant
              that you own or have the necessary rights to the content you post.
            </p>
          </section>

          {/* 7. Links */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              7. Links
            </h2>
            <p className="leading-relaxed mb-4">
              Bon Marché has not reviewed all of the sites linked to its Website
              and is not responsible for the contents of any such linked site.
              The inclusion of any link does not imply endorsement by Bon Marché
              of the site. Use of any such linked website is at the user's own
              risk.
            </p>
            <p className="leading-relaxed">
              If you find any link on our Website that is offensive,
              inappropriate, or in violation of our policies, please report it
              to us immediately at{" "}
              <a
                href="mailto:support@bonmarche.com"
                className="text-secondary hover:underline">
                support@bonmarche.com
              </a>
            </p>
          </section>

          {/* 8. Modifications */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              8. Modifications
            </h2>
            <p className="leading-relaxed">
              Bon Marché may revise these terms of service for its Website at
              any time without notice. By using this Website, you are agreeing
              to be bound by the then current version of these terms of service.
              We will notify users of any material changes via email or
              prominent notice on the Website. Your continued use of the Website
              constitutes acceptance of these changes.
            </p>
          </section>

          {/* 9. Governing Law */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              9. Governing Law
            </h2>
            <p className="leading-relaxed">
              These terms and conditions are governed by and construed in
              accordance with the laws of [Your Country/State], and you
              irrevocably submit to the exclusive jurisdiction of the courts in
              that location. The failure of Bon Marché to exercise or enforce
              any right or provision of these terms of service shall not operate
              as a waiver of such right or provision.
            </p>
          </section>

          {/* 10. User Accounts */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              10. User Accounts & Responsibilities
            </h2>
            <p className="leading-relaxed mb-4">
              If you create an account on our Website, you are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Providing accurate, current, and complete information</li>
              <li>
                Maintaining the confidentiality of your password and account
                credentials
              </li>
              <li>
                Notifying us immediately of any unauthorized use of your account
              </li>
              <li>
                All activities that occur under your account, whether authorized
                or not
              </li>
              <li>Complying with all applicable laws and regulations</li>
            </ul>
            <p className="leading-relaxed">
              Bon Marché reserves the right to suspend or terminate your account
              if we believe you have violated these Terms or engaged in
              fraudulent, abusive, or illegal activity.
            </p>
          </section>

          {/* 11. Product Information & Pricing */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              11. Product Information & Pricing
            </h2>
            <p className="leading-relaxed mb-4">
              We strive to provide accurate product descriptions and pricing.
              However:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>
                All product descriptions, images, and specifications are subject
                to change without notice
              </li>
              <li>
                Prices are subject to change without notice and may vary by
                location and currency
              </li>
              <li>
                We reserve the right to limit quantities and cancel orders that
                appear to be fraudulent
              </li>
              <li>
                If a product is listed at an incorrect price due to an error, we
                will cancel the order and refund you
              </li>
              <li>Product availability is subject to change without notice</li>
            </ul>
            <p className="leading-relaxed">
              We are not responsible for any typographical errors or omissions
              in product listings or pricing information.
            </p>
          </section>

          {/* 12. Orders & Payment */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              12. Orders & Payment
            </h2>
            <p className="leading-relaxed mb-4">
              When you place an order on our Website:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>
                You represent and warrant that you have the legal right and
                capacity to make the purchase
              </li>
              <li>
                All payment information you provide must be accurate, current,
                and complete
              </li>
              <li>
                You authorize us to charge your payment method for the full
                order amount, including applicable taxes and shipping
              </li>
              <li>
                We reserve the right to refuse or cancel any order for any
                reason, including suspected fraud
              </li>
              <li>
                An order confirmation is not a guarantee that your order will be
                accepted or fulfilled
              </li>
            </ul>
          </section>

          {/* 13. Intellectual Property */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              13. Intellectual Property Rights
            </h2>
            <p className="leading-relaxed mb-4">
              All content on Bon Marché's Website, including but not limited to
              text, graphics, logos, images, audio clips, digital downloads, and
              software, is the property of Bon Marché or its suppliers and is
              protected by international copyright laws.
            </p>
            <p className="leading-relaxed mb-4">You may not:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Reproduce, republish, or distribute any content without
                permission
              </li>
              <li>
                Modify, translate, or create derivative works from our content
              </li>
              <li>Use our content for any commercial purpose</li>
              <li>
                Remove or alter any copyright notices or proprietary markings
              </li>
            </ul>
          </section>

          {/* 14. User Conduct */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              14. Prohibited Conduct
            </h2>
            <p className="leading-relaxed mb-4">
              You agree not to engage in any of the following conduct:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Harass, abuse, or threaten other users, employees, or
                representatives of Bon Marché
              </li>
              <li>
                Post or transmit hateful, vulgar, obscene, or defamatory content
              </li>
              <li>
                Engage in any form of discrimination based on race, color,
                religion, gender, sexual orientation, or nationality
              </li>
              <li>
                Attempt to gain unauthorized access to our systems or networks
              </li>
              <li>Distribute viruses, malware, or harmful code</li>
              <li>Engage in spam or send unsolicited messages</li>
              <li>
                Use automated tools to scrape or collect data from our Website
              </li>
              <li>Engage in any form of fraud or misrepresentation</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Bon Marché reserves the right to investigate and take appropriate
              action against any user who violates these policies, including
              account termination and reporting to law enforcement if necessary.
            </p>
          </section>

          {/* 15. Dispute Resolution */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              15. Dispute Resolution & Arbitration
            </h2>
            <p className="leading-relaxed mb-4">
              Any dispute arising out of or relating to these Terms or your use
              of the Website shall be governed by these terms and resolved
              through the following process:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>
                <strong>Informal Resolution:</strong> First, attempt to resolve
                the dispute by contacting us at{" "}
                <a
                  href="mailto:support@bonmarche.com"
                  className="text-secondary hover:underline">
                  support@bonmarche.com
                </a>
              </li>
              <li>
                <strong>Mediation:</strong> If informal resolution fails, the
                parties agree to attempt mediation before pursuing litigation
              </li>
              <li>
                <strong>Arbitration:</strong> If mediation is unsuccessful,
                disputes shall be resolved through binding arbitration rather
                than court proceedings
              </li>
            </ul>
            <p className="leading-relaxed">
              By agreeing to these Terms, you waive your right to a jury trial
              and the right to participate in a class action lawsuit.
            </p>
          </section>

          {/* 16. Limitation of Liability */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              16. Indemnification
            </h2>
            <p className="leading-relaxed">
              You agree to indemnify, defend, and hold harmless Bon Marché and
              its officers, directors, employees, and agents from any and all
              claims, damages, liabilities, costs, and expenses (including
              reasonable attorneys' fees) arising out of or related to: (a) your
              use of the Website; (b) your violation of these Terms; (c) your
              violation of any third-party rights; or (d) your content or
              conduct on the Website.
            </p>
          </section>

          {/* 17. Third-Party Services */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              17. Third-Party Services & Integrations
            </h2>
            <p className="leading-relaxed mb-4">
              Our Website integrates with third-party services including:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>
                <strong>Stripe:</strong> Payment processing. Your use is subject
                to Stripe's Terms of Service
              </li>
              <li>
                <strong>Cloudinary:</strong> Image hosting and CDN services.
                Subject to Cloudinary's terms
              </li>
              <li>
                <strong>OpenAI/Groq:</strong> AI services for the Shopping
                Assistant. Subject to their respective terms
              </li>
              <li>
                <strong>Nodemailer:</strong> Email delivery services
              </li>
            </ul>
            <p className="leading-relaxed">
              We are not responsible for the performance, privacy practices, or
              content of these third-party services. Your use of third-party
              services is at your own risk and subject to their respective terms
              and conditions.
            </p>
          </section>

          {/* 18. Severability */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              18. Severability
            </h2>
            <p className="leading-relaxed">
              If any part of these Terms is found to be invalid, illegal, or
              unenforceable, the remaining portions shall continue in full force
              and effect. The invalid portion shall be modified to the minimum
              extent necessary to make it valid and enforceable while preserving
              the intent of the original provision.
            </p>
          </section>

          {/* 19. Entire Agreement */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              19. Entire Agreement
            </h2>
            <p className="leading-relaxed">
              These Terms, together with our Privacy Policy and other policies
              posted on the Website, constitute the entire agreement between you
              and Bon Marché regarding your use of the Website and supersede all
              prior and contemporaneous agreements, negotiations, and
              understandings, whether written or oral.
            </p>
          </section>

          {/* 20. Contact Information */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              20. Contact Us
            </h2>
            <p className="leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact
              us:
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@bonmarche.com"
                  className="text-secondary hover:underline">
                  support@bonmarche.com
                </a>
              </p>
              <p className="mb-2">
                <strong>Legal Inquiries:</strong>{" "}
                <a
                  href="mailto:legal@bonmarche.com"
                  className="text-secondary hover:underline">
                  legal@bonmarche.com
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
            <p className="text-sm text-slate-300 dark:text-slate-300 leading-relaxed">
              By accessing and using Bon Marché, you acknowledge that you have
              read, understood, and agree to be bound by these Terms of Service.
              If you do not agree, please do not use our Website.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
