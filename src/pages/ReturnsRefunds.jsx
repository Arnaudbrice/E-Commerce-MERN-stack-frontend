import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";

const ReturnsRefunds = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const returnProcess = [
    {
      step: "1",
      title: "Request Return",
      description:
        "Log into your Bon Marché account, go to 'My Orders', select the order, and click 'Request Return'. Select the items you want to return and the reason.",
    },
    {
      step: "2",
      title: "Get Return Label",
      description:
        "Once approved, you'll receive a prepaid shipping label via email. Print the label and attach it to your package.",
    },
    {
      step: "3",
      title: "Ship Your Package",
      description:
        "Drop off your package at any carrier location (DHL, UPS, DPD). No need to go to a specific store. Keep your receipt as proof of return.",
    },
    {
      step: "4",
      title: "We Receive & Inspect",
      description:
        "Once we receive your return, we'll inspect the items within 5-7 business days to ensure they meet return conditions.",
    },
    {
      step: "5",
      title: "Refund Processed",
      description:
        "After inspection, your refund will be processed to your original payment method. This typically takes 5-7 business days.",
    },
  ];

  const faqItems = [
    {
      q: "What is your return window?",
      a: "We offer 30-day returns from the date of delivery. Items must be returned within this timeframe to be eligible for a refund. After 30 days, returns are not accepted.",
    },
    {
      q: "What items can I return?",
      a: "Most items in our store are returnable within 30 days of delivery, provided they meet our return conditions. The following items are final sale and cannot be returned: undergarments (underwear, bras, swimwear), intimates, pierced jewelry, sale items marked as final sale, custom/personalized items, and items purchased from clearance sections.",
    },
    {
      q: "What are the conditions for a valid return?",
      a: "Items must be: (1) unworn and unwashed, (2) in original condition with all tags attached, (3) in original packaging, (4) not damaged (except for defects), (5) not altered or modified. Items that have been worn, washed, or damaged by the customer may be subject to a restocking fee or refusal.",
    },
    {
      q: "How much does return shipping cost?",
      a: "Return shipping is FREE! We provide a prepaid shipping label with your return authorization. You don't pay anything to return your items. We cover all return shipping costs.",
    },
    {
      q: "Can I exchange an item instead of returning it for a refund?",
      a: "Yes! Exchanges are free and don't require a return shipping label. Simply select 'Exchange' instead of 'Return' during the process. We'll send you a replacement item in a different size or color at no extra charge. If the new item costs more, you'll be charged the difference. If it costs less, you'll receive a partial refund.",
    },
    {
      q: "How long does the refund process take?",
      a: "Once we receive your return and inspect it (5-7 business days), we'll process your refund within 5-7 business days. The refund will appear in your original payment method as follows: credit cards (5-10 business days), PayPal (2-3 business days), bank transfers (3-5 business days). Total time from shipping to refund: 10-20 business days.",
    },
    {
      q: "What if my item is damaged upon arrival?",
      a: "If your item arrives damaged due to shipping, contact us within 48 hours with clear photos of the damage and packaging. We'll send a replacement immediately or issue a full refund. Damaged items don't count against your return window.",
    },
    {
      q: "Can I return an item without the original packaging?",
      a: "Items must be in original packaging to qualify for a full refund. If the original packaging is missing or damaged (not by the carrier), we may apply a 10-15% restocking fee. Contact us before returning to discuss your specific situation.",
    },
    {
      q: "What happens if I return an item after the 30-day window?",
      a: "Returns are not accepted after 30 days from delivery. Your return request will be declined. However, if there's a defect in the product, contact us immediately. Manufacturing defects are covered separately under our warranty policy.",
    },
    {
      q: "Do you accept returns on sale or discounted items?",
      a: "Most sale items are returnable within 30 days. However, items marked as 'Final Sale' cannot be returned. Check the product page or your order confirmation to see if the item is final sale. Final sale items cannot be exchanged or refunded under any circumstances.",
    },
    {
      q: "Can I return items purchased on clearance?",
      a: "Clearance items are final sale and cannot be returned. You can identify clearance items on the product page with a 'Clearance' or 'Final Sale' badge.",
    },
    {
      q: "What if my return package is lost in transit?",
      a: "Our prepaid return labels include tracking. If your return package is lost, contact us with your tracking number. We'll investigate with the carrier and either resend a label or issue a refund based on our findings.",
    },
    {
      q: "Can I initiate a return through email or phone?",
      a: "Returns must be initiated through your online account at www.bonmarche.com. Log in, go to 'My Orders', and click 'Request Return'. This ensures your return is properly tracked. If you have account issues, contact support@bonmarche.com for assistance.",
    },
    {
      q: "What if I receive the wrong item?",
      a: "Contact us within 48 hours if you received the wrong item. We'll send the correct item immediately and provide a prepaid return label for the incorrect item. This is our mistake, so you won't be charged anything.",
    },
    {
      q: "Can I return an item if the tag is removed?",
      a: "Items without tags are considered worn/used and may not qualify for a full refund. If the tag was removed but the item is clearly unworn, contact us with photos. We'll review your case and may offer a partial refund (10-20% restocking fee) or store credit.",
    },
    {
      q: "How do I check the status of my return?",
      a: "Log into your account and go to 'My Returns'. You'll see the status of each return (Pending, Shipped, Received, Inspected, Refunded). You can also track your return package using the tracking number in your email.",
    },
    {
      q: "What is your refund method?",
      a: "Refunds are issued to your original payment method. If you paid with a credit card, the refund goes back to that card. If you paid with PayPal, it goes back to your PayPal account. Store credit is not automatically issued, but you can request it if you prefer.",
    },
    {
      q: "Can I get store credit instead of a refund?",
      a: "Yes! When processing your return, you have the option to receive store credit instead of a refund. Store credit is often faster to process and may be issued as a bonus (5-10% extra) to encourage future purchases.",
    },
    {
      q: "What if I'm unhappy with my refund amount?",
      a: "We process refunds for the full original purchase price (excluding shipping and taxes) for items meeting return conditions. If you believe there's an error, contact support@bonmarche.com within 30 days of the refund with your order details.",
    },
    {
      q: "Are taxes and shipping fees refundable?",
      a: "Original shipping costs are non-refundable. Taxes are refundable if applicable in your jurisdiction. However, return shipping is free (we cover it), so you're not paying to return items.",
    },
  ];

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark py-10">
      <div className="max-w-full mx-auto px-4">
        {/* Header */}
        <div className="text-center  space-y-8">
          <div
            className="divider divider-secondary text-4xl md:text-5xl
mb-4 text-center font-extrabold">
            <h2> Returns & Refunds Policy</h2>
          </div>

          <p className="text-xl text-slate-600 dark:text-slate-400">
            We want you to be completely satisfied with your purchase. If you're
            not happy, we make returns easy.
          </p>
        </div>

        {/* Last Updated */}
        <div className="bg-secondary/10 dark:bg-secondary/5 rounded-lg p-4 mb-8 text-center">
          <p className="text-slate-700 dark:text-slate-300">
            <strong>Last updated:</strong> March 10, 2026
          </p>
        </div>

        {/* Quick Stats */}
        <section className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-secondary mb-2">30 Days</p>
            <p className="text-slate-600 dark:text-slate-400">Return Window</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-secondary mb-2">FREE</p>
            <p className="text-slate-600 dark:text-slate-400">
              Return Shipping
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-secondary mb-2">100%</p>
            <p className="text-slate-600 dark:text-slate-400">
              Refund Guarantee
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-secondary mb-2">5 Steps</p>
            <p className="text-slate-600 dark:text-slate-400">Simple Process</p>
          </div>
        </section>

        {/* Return Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            How Returns Work
          </h2>

          <div className="grid md:grid-cols-5 gap-4 mb-12">
            {returnProcess.map((process, index) => (
              <div key={index} className="relative">
                {/* Step Box */}
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary text-white rounded-full font-bold text-lg mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {process.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {process.description}
                  </p>
                </div>

                {/* Arrow */}
                {index < returnProcess.length - 1 && (
                  <div className="hidden md:block absolute -right-2 top-1/4 transform translate-x-1/2">
                    <div className="text-secondary text-2xl">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Return Conditions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Return Conditions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Returnable Items */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                ✅ Returnable Items
              </h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>
                    Clothing & apparel (dresses, shirts, jackets, etc.)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Shoes (unworn, in original condition)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Accessories (bags, scarves, hats, etc.)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Jewelry (most items, except pierced)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Sale items (unless marked final sale)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Items with defects or damage (our fault)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Wrong items received</span>
                </li>
              </ul>
            </div>

            {/* Non-Returnable Items */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                ❌ Non-Returnable Items
              </h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Undergarments & intimates (bras, underwear)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Swimwear (for hygiene reasons)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Pierced jewelry</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Items marked as final sale</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Custom or personalized items</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Items returned after 30 days</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Clearance/Outlet items</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Worn, washed, or damaged items (customer fault)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Item Condition Requirements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Item Condition Requirements
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  ✅ What We Accept
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>
                    • Items with original price tags attached and not removed
                  </li>
                  <li>• Unworn items showing no signs of use</li>
                  <li>• Unwashed items with no stains or odors</li>
                  <li>• Items in original or well-preserved packaging</li>
                  <li>• Items with no alterations or modifications</li>
                  <li>• Items with no makeup, perfume, or residue</li>
                </ul>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-600 pt-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  ⚠️ Items Subject to Restocking Fee (10-20%)
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>• Items with tags removed but unworn</li>
                  <li>• Items with minor wear or damage (customer fault)</li>
                  <li>• Items with missing original packaging</li>
                  <li>• Items that have been altered or modified</li>
                </ul>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-600 pt-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  ❌ We Don't Accept
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>• Worn items showing signs of use</li>
                  <li>• Washed or wet items</li>
                  <li>• Stained, torn, or heavily damaged items</li>
                  <li>• Items with odors or residue</li>
                  <li>• Items with makeup or perfume on them</li>
                  <li>• Items that have been used repeatedly</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Refund Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Refund Timeline
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <div className="space-y-4">
              <div className="flex gap-4 items-start pb-4 border-b border-slate-200 dark:border-slate-600">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-white text-sm font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Return Request Approved
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    <strong>Timeframe:</strong> Immediately after you submit
                    your return request
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    You'll receive your prepaid shipping label via email.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start pb-4 border-b border-slate-200 dark:border-slate-600">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-white text-sm font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Package In Transit
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    <strong>Timeframe:</strong> 2-5 business days (depending on
                    your location)
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Track your return package using the tracking number
                    provided.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start pb-4 border-b border-slate-200 dark:border-slate-600">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-white text-sm font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Package Received & Inspected
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    <strong>Timeframe:</strong> 5-7 business days after we
                    receive it
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    We'll examine the items to ensure they meet return
                    conditions. You'll receive an email update.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-white text-sm font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Refund Processed
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    <strong>Timeframe:</strong> 5-7 business days after approval
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    The refund is sent to your original payment method.
                    Depending on your bank, it may take 3-5 additional business
                    days to appear in your account.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>⏱️ Total Processing Time:</strong> 10-20 business days
                  from when you ship your return to when the refund appears in
                  your account. This varies based on shipping speed and your
                  bank.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Special Situations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Special Situations
          </h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                🎁 Gifts & Returns
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                If you received an item as a gift, you can still return it
                within 30 days of delivery. You'll receive a refund or store
                credit equal to the original purchase price. You don't need the
                receipt—we can look up the order using the item and your email
                address. Note: Refunds may be issued as store credit if we
                cannot verify the original price.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                💳 Returns for Promotional/Discount Orders
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                If you used a promo code or discount, your refund will be for
                the discounted amount you paid, not the original price. For
                example, if you paid €30 for an item originally €50 (with a 40%
                discount), your refund will be €30. The discount cannot be
                combined with returns.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                🏷️ Defective Items & Warranty
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                Items with manufacturing defects are covered under our warranty.
                If your item is defective, you can return it free of charge
                within 1 year of purchase. Contact us with photos of the defect
                at{" "}
                <a
                  href="mailto:support@bonmarche.com"
                  className="text-secondary hover:underline">
                  support@bonmarche.com
                </a>
                . We'll repair or replace the item at no cost.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                📦 Partial Returns (Mixed Items)
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                If you ordered multiple items and only want to return some,
                that's fine! You can select which items to return during the
                return request process. We'll refund only the returned items and
                you keep the rest. This won't affect your return window for the
                other items.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                🌍 International Returns
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                International orders (outside EU) have the same 30-day return
                window. We'll provide a prepaid international return label, but
                if the return shipping exceeds our standard costs, we may deduct
                the excess from your refund. Contact us at{" "}
                <a
                  href="mailto:support@bonmarche.com"
                  className="text-secondary hover:underline">
                  support@bonmarche.com
                </a>{" "}
                to arrange your international return.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                💰 Refund for Cancelled Orders
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                If you cancel your order before it ships, you'll receive a full
                refund immediately. If the order has already shipped, you can
                still refuse the delivery, and we'll refund your money once we
                receive the package back. You must refuse the delivery with the
                carrier to trigger the return process.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
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

        {/* Restocking Fee Policy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Restocking Fee Policy
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We want returns to be easy, which is why we don't charge
              restocking fees on most returns. However, in specific cases where
              items don't meet our return conditions, we may apply a restocking
              fee:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 text-secondary font-bold text-2xl">
                  •
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    No Fee (Full Refund)
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Items unused, unwashed, with tags attached, in original
                    packaging
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 text-orange-500 font-bold text-2xl">
                  •
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    10% Restocking Fee
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Tags removed but item is clearly unworn; minor packaging
                    damage
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 text-red-500 font-bold text-2xl">
                  •
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    20% Restocking Fee
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Signs of wear; minor stains or odors; altered packaging
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 text-red-600 font-bold text-2xl">
                  ✗
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Return Refused
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Worn, washed, heavily stained, or significantly damaged
                    items. These will be returned to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Return Exceptions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Important Return Exceptions
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-red-900 dark:text-red-200 mb-4">
              We Cannot Accept Returns For:
            </h3>
            <ul className="space-y-2 text-red-800 dark:text-red-300">
              <li>✗ Items returned after 30 days from delivery</li>
              <li>✗ Items purchased more than 30 days ago (even if unworn)</li>
              <li>✗ Items marked as "Final Sale" at time of purchase</li>
              <li>✗ Custom orders or personalized items</li>
              <li>✗ Intimate apparel (underwear, bras, swimwear)</li>
              <li>✗ Clearance or outlet items</li>
              <li>✗ Items returned without authorization</li>
              <li>✗ Damaged items (customer fault, not shipping damage)</li>
            </ul>
          </div>
        </section>

        {/* Contact Support */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Need Help with Your Return?
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Our customer support team is here to help with any questions about
              returns, refunds, or exchanges. We typically respond within 24
              hours.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-secondary pl-4">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Email
                </h3>
                <a
                  href="mailto:support@bonmarche.com"
                  className="text-secondary hover:underline text-lg">
                  support@bonmarche.com
                </a>
              </div>
              <div className="border-l-4 border-secondary pl-4">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Live Chat
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Available Monday-Friday, 9 AM - 6 PM EST
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-secondary/10 dark:bg-secondary/5 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Your Satisfaction is Our Guarantee
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 leading-relaxed max-w-2xl mx-auto">
            We stand behind our products. If you're not completely satisfied
            with your purchase for any reason, we'll make it right. Our easy
            returns process ensures you can shop with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-slate-600 dark:text-slate-400">
                30-Day Returns
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-slate-600 dark:text-slate-400">
                Free Return Shipping
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-slate-600 dark:text-slate-400">
                Full Refunds
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ReturnsRefunds;
