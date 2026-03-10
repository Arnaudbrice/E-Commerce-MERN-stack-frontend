import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      category: "Shipping & Delivery",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business days. International orders may take 10-14 business days depending on the destination.",
        },
        {
          q: "Do you offer free shipping?",
          a: "Yes! We offer free standard shipping on orders over €50. For orders below €50, shipping costs €4.99. Express shipping has an additional charge of €9.99.",
        },
        {
          q: "Can I track my order?",
          a: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can track your package in real-time through our website or the carrier's website.",
        },
        {
          q: "What if my package is lost or damaged?",
          a: "We guarantee safe delivery. If your package arrives damaged or lost, contact us within 48 hours with photos. We'll either send a replacement or issue a full refund.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer 30-day returns on most items. Products must be unused, in original packaging, and with all tags attached. Some items like undergarments are final sale.",
        },
        {
          q: "How do I initiate a return?",
          a: "Go to your account, select the order, and click 'Request Return'. Print the prepaid shipping label and drop off your package at any carrier location. Once received and inspected, we'll process your refund within 5-7 business days.",
        },
        {
          q: "How long does refunding take?",
          a: "After we receive and inspect your returned items, refunds are processed within 5-7 business days. The refund will appear in your original payment method.",
        },
        {
          q: "Can I exchange an item instead of returning it?",
          a: "Yes! You can exchange items for a different size or color at no extra cost. Select 'Exchange' instead of 'Return' during the process.",
        },
      ],
    },
    {
      category: "Payment & Security",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All payments are processed securely through Stripe.",
        },
        {
          q: "Is my payment information safe?",
          a: "Yes! We use industry-standard SSL encryption and PCI compliance. Your payment information is never stored on our servers—it's processed directly through Stripe, a trusted payment processor.",
        },
        {
          q: "Do you offer payment plans?",
          a: "Currently we don't offer payment plans, but we're working on adding installment options soon. Check back or follow us on social media for updates.",
        },
        {
          q: "Why was my payment declined?",
          a: "Common reasons include insufficient funds, expired card, incorrect CVV, or fraud protection triggers. Contact your bank or try a different payment method. If issues persist, reach out to our support team.",
        },
      ],
    },
    {
      category: "Products & Orders",
      questions: [
        {
          q: "How often do you restock items?",
          a: "We update our inventory weekly with new products and restock popular items. Follow us on social media or subscribe to our newsletter to be notified of new arrivals.",
        },
        {
          q: "Can I pre-order out-of-stock items?",
          a: "Yes! For items marked as 'Coming Soon', you can sign up for notifications. We'll email you as soon as it's back in stock.",
        },
        {
          q: "How do I use the AI Shopping Assistant?",
          a: "Click the chatbot icon in the bottom-right corner. Describe what you're looking for, and our AI will recommend products based on your preferences. You can ask questions about products, get styling advice, or find items by description.",
        },
        {
          q: "Can I add items to my wishlist?",
          a: "Yes! Click the heart icon on any product to add it to your favorites. You can view your wishlist anytime in your account. Share it with friends or get notified when items go on sale.",
        },
      ],
    },
    {
      category: "Account & Profile",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click 'Sign Up' in the top-right corner. Enter your email and create a password. You can also sign up with your Google account for faster registration.",
        },
        {
          q: "How do I reset my password?",
          a: "Click 'Forgot Password' on the login page. Enter your email and we'll send you a reset link. Check your spam folder if you don't receive it within 5 minutes.",
        },
        {
          q: "Can I change my email address?",
          a: "Yes! Go to Account Settings and update your email. We'll send a verification link to confirm the change.",
        },
        {
          q: "How do I delete my account?",
          a: "Contact our support team at support@bonmarche.com. We'll guide you through the process. Note: This is permanent and cannot be undone.",
        },
      ],
    },
    {
      category: "Promotions & Discounts",
      questions: [
        {
          q: "How do I apply a discount code?",
          a: "During checkout, enter your code in the 'Promo Code' field and click 'Apply'. The discount will be calculated and shown before you confirm your order.",
        },
        {
          q: "Do you offer student or military discounts?",
          a: "Yes! We offer 15% off for students and 20% off for military personnel. Verify your status through SheerID during checkout to receive your discount.",
        },
        {
          q: "How do I subscribe to the newsletter?",
          a: "Enter your email in the footer and click 'Subscribe'. You'll get exclusive deals, new product alerts, and styling tips sent to your inbox.",
        },
        {
          q: "What are the sale dates?",
          a: "We have seasonal sales in March, June, September, and December. Black Friday and Cyber Monday are our biggest sales events. Subscribe to our newsletter for early access!",
        },
      ],
    },
    {
      category: "Contact & Support",
      questions: [
        {
          q: "How can I contact customer support?",
          a: "You can reach us via email at support@bonmarche.com, through our live chat (available 9 AM - 6 PM EST), or by submitting a contact form on our website.",
        },
        {
          q: "What are your support hours?",
          a: "Our support team is available Monday-Friday 9 AM - 6 PM EST. We respond to emails within 24 hours, even outside business hours.",
        },
        {
          q: "Do you have a physical store?",
          a: "Currently, Bon Marché operates online only. We're exploring pop-up stores in major cities. Follow us on social media for announcements!",
        },
      ],
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let questionIndex = 0;

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Find answers to common questions about Bon Marché. Can't find what
            you're looking for?{" "}
            <a
              href="/contact"
              className="text-secondary hover:underline font-semibold">
              Contact us
            </a>
          </p>
        </div>

        {/* FAQ Sections */}
        {faqItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 pb-3 border-b-2 border-secondary">
              {section.category}
            </h2>

            <div className="space-y-4">
              {section.questions.map((item, itemIndex) => {
                const currentIndex = questionIndex++;
                return (
                  <div
                    key={itemIndex}
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    <button
                      onClick={() => toggleAccordion(currentIndex)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex-1 pr-4">
                        {item.q}
                      </h3>
                      <MdExpandMore
                        className={`flex-shrink-0 text-secondary text-2xl transition-transform ${
                          openIndex === currentIndex ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openIndex === currentIndex && (
                      <div className="px-6 pb-6 pt-2 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-600">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="mt-16 bg-secondary/10 dark:bg-secondary/5 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Still have questions?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Our support team is here to help! Reach out anytime.
          </p>
          <a
            href="/contact"
            className="inline-block bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-lg transition-all">
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
};

export default FAQ;
