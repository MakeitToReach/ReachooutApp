"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Navbar } from "@/components/editor-components/navbar";

// Static content array for Terms of Use sections
const STATIC_CONTENT = [
  {
    title: "Pricing Structure",
    content: (
      <>
        <p>Single Reachpage for <strong>₹249 per page</strong></p>
        <strong>Every Reachpage comes with:</strong>
        <ul className="list-disc sm:ml-10 ">
          <li>A fully designed and mobile responsive layout</li>
          <li>All sections unlocked</li>
          <li>Easy editing with Reachoout builder</li>
          <li>SSL security, fast hosting and performance optimization</li>
          <li>Separate contact form and QR code for every page.</li>
          <li>Access to templates and AI-powered content generator</li>
        </ul>
      </>
    ),
  },
  {
    title: "Currency & payment",
    content: (
      <>
        Prices are displayed in Indian Rupees (₹). For international users,
        currency conversions may apply as per your payment provider. Payments
        are processed securely through our trusted payment gateways.
      </>
    ),
  },
  {
    title: "Subscription Tenure",
    content: (
      <>
        Pricing is offered on a per-page basis. Users can choose monthly or
        yearly plans for ongoing usage and support. Discounts may apply for
        yearly commitment
      </>
    ),
  },
  {
    title: "Upgrades & Add-ons",
    content: (
      <>
        You can add new Reachpages anytime at ₹199 per page. Upgrades like
        premium templates, priority support, or additional features may be
        offered in future at transparent rates
      </>
    ),
  },
  {
    title: "Refunds & Cancellations",
    content: (
      <>
        Since every Reachpage is instantly created and hosted, we do not offer
        automatic refunds once a purchase is made. However, if you face any
        issue with your purchase, you can contact our support team at
        support@reachoout.com and we’ll work with you to resolve it.
      </>
    ),
  },
  {
    title: "Policy Updates",
    content: (
      <>
        Reachoout may update this Pricing Policy from time to time. Any changes
        will always be communicated in advance and displayed on this page.
      </>
    ),
  },
];

const PricingPolicy = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white font-Inter">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 md:py-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl leading-16 md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-100 to-orange-400 bg-clip-text text-transparent">
              Pricing Policy
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              At Reachoout, we believe in keeping our pricing simple,
              transparent, and affordable. Our goal is to make professional
              websites accessible to everyone without hidden costs or
              complicated plans.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {STATIC_CONTENT.map((section, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
              >
                <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                  {index + 1}. {section.title}
                </h2>
                <div className="space-y-4 text-gray-300">{section.content}</div>
              </motion.section>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-xl border border-orange-500/20"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              Questions about Pricing?
            </h3>
            <p className="text-gray-300 mb-4">
              If you have any questions about our pricing policy, please don't
              hesitate to contact us.
            </p>
            <a
              href="mailto:contact@reachoout.com"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/10 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-1"
          >
            <Image
              src="/reachout-logo.png"
              alt="logo"
              width={100}
              height={100}
              className="cursor-pointer object-cover size-[50px] md:size-[50px]"
            />
            <span className="font-semibold text-xl">Reachoout</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-8 text-gray-400"
          >
            <a
              href="https://reachoout.com"
              className="hover:text-white transition"
            >
              Home
            </a>
            <a
              href="https://reachoout.com/support"
              className="hover:text-white transition"
            >
              Support
            </a>
            <a
              href="https://reachoout.com/resources"
              className="hover:text-white transition"
            >
              Tutorials
            </a>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPolicy;
