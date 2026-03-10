import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";

const ShippingPolicy = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const shippingInfo = [
    {
      title: "Standard Shipping",
      description: "Free on orders over €50 | €4.99 for orders under €50",
      details: [
        "Delivery time: 5-7 business days",
        "Tracking provided via email",
        "Available to all EU countries",
        "Weekends and holidays excluded",
      ],
    },
    {
      title: "Express Shipping",
      description: "€9.99 flat rate",
      details: [
        "Delivery time: 2-3 business days",
        "Tracking and insurance included",
        "Available to all EU countries",
        "Fast processing from our warehouse",
      ],
    },
    {
      title: "International Shipping",
      description: "€14.99 - €24.99 depending on destination",
      details: [
        "Delivery time: 10-14 business days",
        "Customs clearance may apply",
        "Tracking provided",
        "Duties and taxes may be applicable",
      ],
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="divider divider-secondary text-4xl md:text-5xl
mb-8 text-center font-extrabold">
            <h2> Shipping Policy</h2>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Fast, reliable, and affordable shipping options for your orders
          </p>
        </div>

        {/* Last Updated */}
        <div className="bg-secondary/10 dark:bg-secondary/5 rounded-lg p-4 mb-12 text-center">
          <p className="text-slate-700 dark:text-slate-300">
            <strong>Last updated:</strong> March 10, 2026
          </p>
        </div>

        {/* Shipping Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Our Shipping Options
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {shippingInfo.map((option, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {option.title}
                </h3>
                <p className="text-secondary font-semibold mb-4">
                  {option.description}
                </p>
                <ul className="space-y-2">
                  {option.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <span className="text-secondary mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Key Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Important Information
          </h2>

          <div className="space-y-6">
            {/* Processing Time */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Order Processing Time
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Orders are processed within <strong>1-2 business days</strong>{" "}
                after purchase. Processing includes quality checks, packing, and
                label preparation. Tracking information is sent to your email
                once your order ships. Business days exclude weekends and public
                holidays.
              </p>
            </div>

            {/* Tracking */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Order Tracking
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                All orders include tracking. Once your package ships, you'll
                receive an email with:
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>✓ Tracking number and carrier information</li>
                <li>✓ Estimated delivery date</li>
                <li>✓ Link to track your package in real-time</li>
                <li>✓ Delivery updates and notifications</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 mt-4">
                Track your order anytime in your account under "My Orders" or
                use the carrier's website directly.
              </p>
            </div>

            {/* Shipping Costs */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Shipping Costs & Free Shipping
              </h3>
              <div className="space-y-3 text-slate-600 dark:text-slate-400">
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">
                    ✓ Free Standard Shipping
                  </strong>{" "}
                  on orders €50+
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">
                    ✓ €4.99
                  </strong>{" "}
                  Standard Shipping on orders under €50
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">
                    ✓ €9.99
                  </strong>{" "}
                  Express Shipping (2-3 days)
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">
                    ✓ €14.99 - €24.99
                  </strong>{" "}
                  International Shipping
                </p>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mt-4 text-sm">
                Shipping costs are calculated and displayed at checkout. You can
                see the exact shipping cost for your location before confirming
                your order.
              </p>
            </div>

            {/* Delivery Areas */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Shipping to Your Location
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                We ship to:
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>🌍 All EU countries (Standard & Express)</li>
                <li>🌍 UK, Switzerland, Norway (International rates)</li>
                <li>🌍 Over 180 countries worldwide (International rates)</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 mt-4">
                During checkout, enter your address to see available shipping
                options and costs for your location.
              </p>
            </div>

            {/* Customs & Duties */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Customs, Duties & Taxes
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                For international orders outside the EU:
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>
                  • Customs duties and import taxes may apply and are the
                  customer's responsibility
                </li>
                <li>
                  • We provide customs documentation (Commercial Invoice) with
                  every shipment
                </li>
                <li>
                  • Delivery delays may occur due to customs clearance
                  processing
                </li>
                <li>
                  • The recipient may be required to pay duties/taxes upon
                  delivery (COD - Cash on Delivery)
                </li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 mt-4">
                We are not responsible for any customs delays, fees, or taxes
                imposed by the recipient's country. Please contact your local
                customs authority for more information about applicable duties.
              </p>
            </div>

            {/* Address Requirements */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Shipping Address Requirements
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                To ensure successful delivery:
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>
                  ✓ Provide a <strong>complete and accurate address</strong>
                </li>
                <li>
                  ✓ Include <strong>apartment/unit number</strong> if applicable
                </li>
                <li>
                  ✓ Provide a <strong>valid phone number</strong> for carrier
                  contact
                </li>
                <li>
                  ✓ Double-check <strong>ZIP code</strong> and spelling of your
                  name
                </li>
                <li>
                  ✓ We cannot ship to <strong>P.O. Boxes</strong> with Express
                  delivery
                </li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 mt-4">
                Changes to your address must be made within{" "}
                <strong>2 hours of placing your order</strong>. After that, the
                order is already in the fulfillment process.
              </p>
            </div>

            {/* Delivery Exceptions */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Delivery Exceptions & Delays
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Estimated delivery times are not guaranteed. Delays may occur
                due to:
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>• Weather conditions and natural disasters</li>
                <li>• Carrier strikes or service disruptions</li>
                <li>• Customs clearance for international orders</li>
                <li>• Address issues or delivery location inaccessibility</li>
                <li>• Holiday periods and peak season volume</li>
                <li>• Force majeure events</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 mt-4">
                We are not liable for delays beyond our control. However, we
                will work with the carrier to resolve any issues. If your
                package is significantly delayed, contact us for assistance.
              </p>
            </div>

            {/* Lost or Damaged Packages */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Lost or Damaged Packages
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                We guarantee safe delivery. If your package:
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                <li>
                  <strong>• Arrives damaged:</strong> Contact us within 48 hours
                  with photos. We'll send a replacement or refund.
                </li>
                <li>
                  <strong>• Is lost in transit:</strong> Contact us. We'll file
                  a claim with the carrier and process a replacement/refund.
                </li>
                <li>
                  <strong>• Shows delivered but not received:</strong> Contact
                  us within 7 days. We'll investigate with the carrier and your
                  local post office.
                </li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400">
                <strong>What to do:</strong> Take photos of the
                damage/condition, check your tracking status, and contact our
                support team at{" "}
                <a
                  href="mailto:support@bonmarche.com"
                  className="text-secondary hover:underline">
                  support@bonmarche.com
                </a>
                . We'll resolve the issue quickly.
              </p>
            </div>

            {/* Multiple Orders */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Multiple Orders & Consolidation
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Each order is shipped separately. If you place multiple orders,
                they will be processed and shipped independently. We cannot
                consolidate orders into a single shipment. However, you can
                contact us within 2 hours of placing orders to request
                consolidation, and we may be able to help if orders haven't
                entered the fulfillment process yet.
              </p>
            </div>

            {/* Signature Requirements */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Signature Requirements
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Standard and Express shipments do not require a signature. If
                you require a signature for your delivery due to insurance or
                preference, please contact us. The carrier will leave packages
                in a safe place (porch, mailbox, etc.) if you're not available.
                Mark your shipping address with delivery instructions if needed.
              </p>
            </div>
          </div>
        </section>

        {/* Holidays & Closures */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Holiday & Seasonal Information
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              During peak seasons (Black Friday, Christmas, New Year), we
              experience higher order volumes. This may result in:
            </p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
              <li>• Extended processing times (up to 3-5 business days)</li>
              <li>• Longer shipping delays</li>
              <li>• Limited Express shipping availability</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400">
              We recommend placing orders early during holiday seasons to ensure
              timely delivery. Check our website for estimated delivery dates
              during peak periods.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Common Shipping Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Can I change my shipping address after placing an order?",
                a: "Yes, but only within 2 hours of placing your order. After that, your order enters our fulfillment process and cannot be changed. Contact support@bonmarche.com immediately if you need to update your address.",
              },
              {
                q: "Do you offer 'ship to store' or pickup options?",
                a: "Currently, we only offer home delivery. We're exploring click-and-collect options at partner locations in major cities. Check back soon!",
              },
              {
                q: "What happens if my delivery address is incorrect?",
                a: "Double-check your address before confirming checkout. If incorrect, contact us immediately. The carrier may return the package to us, and you'll be charged return shipping. We can reship to the correct address.",
              },
              {
                q: "Can I expedite my delivery after I've already placed an order?",
                a: "If your order hasn't shipped yet, contact us within 24 hours. We may be able to upgrade your shipping for an additional fee. Once shipped, expediting is not possible.",
              },
              {
                q: "Do you ship on weekends or holidays?",
                a: "No, we process and ship orders Monday-Friday, excluding public holidays. Orders placed on weekends or holidays will be processed the next business day.",
              },
              {
                q: "What's the difference between the estimated and actual delivery date?",
                a: "Estimated dates are based on standard processing and carrier times. Actual delivery may vary by 1-3 days due to weather, carrier schedules, or customs delays. Your tracking will show the most accurate estimate.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex-1 pr-4">
                    {item.q}
                  </h3>
                  <MdExpandMore
                    className={`flex-shrink-0 text-secondary text-2xl transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6 pt-2 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-600">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-secondary/10 dark:bg-secondary/5 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Need Help with Shipping?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Our support team is here to assist with any shipping questions or
            concerns.
          </p>
          <a
            href="mailto:support@bonmarche.com"
            className="inline-block bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-lg transition-all">
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
};

export default ShippingPolicy;
