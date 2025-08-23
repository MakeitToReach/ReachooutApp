'use client'
import { Navbar } from "@/components/editor-components/navbar";
import { motion } from "motion/react";
import Image from "next/image";

export const RefundsAndCancellationPolicy = () => {
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
              Refunds & Cancellation Policy
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              At Reachoout, we strive to provide our customers with a seamless
              and valuable experience. Please read our policy carefully to
              understand how refunds and cancellations work for our services.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {/* Section 1: Cancellations */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                1. Cancellations
              </h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Before Activation
                  </h3>
                  <p>
                    If you cancel your subscription before your account or
                    service has been activated, you are eligible for a full
                    refund.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    After Activation
                  </h3>
                  <p>
                    Once your account is activated and services are live,
                    cancellations will stop future billing, but no refund will
                    be provided for the current billing period.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Custom Services
                  </h3>
                  <p>
                    Orders for custom design, development, or any tailor-made
                    service cannot be canceled once work has begun.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 2: Refunds */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                2. Refunds
              </h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Subscription Plans
                  </h3>
                  <p>
                    We do not offer partial or prorated refunds for unused days
                    in your subscription period.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Non-Refundable Items
                  </h3>
                  <p>
                    Payments made for one-time services, add-ons, domain
                    purchases, or third-party integrations are non-refundable.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Special Cases
                  </h3>
                  <p>
                    Refund requests may be considered in cases of duplicate
                    charges or proven technical issues that prevent the use of
                    our services, at our sole discretion.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 3: How to Request a Refund */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                3. How to Request a Refund
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  To request a refund, please email{" "}
                  <a
                    href="mailto:contact@reachoout.com"
                    className="text-orange-400 hover:text-orange-300 underline"
                  >
                    contact@reachoout.com
                  </a>{" "}
                  with:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your registered email address</li>
                  <li>Payment details (date, amount, and transaction ID)</li>
                  <li>Reason for the refund request</li>
                </ul>
                <p>
                  We will review your request within 7 working days and update
                  you on the outcome.
                </p>
              </div>
            </motion.section>

            {/* Section 4: Policy Changes */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                4. Policy Changes
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Reachoout reserves the right to modify this Refunds &
                  Cancellation Policy at any time. Any changes will be updated
                  on this page, and your continued use of our services
                  constitutes acceptance of these changes.
                </p>
              </div>
            </motion.section>
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-xl border border-orange-500/20"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              Need Help with Refunds?
            </h3>
            <p className="text-gray-300 mb-4">
              If you have any questions about our refund and cancellation
              policy, please don't hesitate to contact our support team.
            </p>
            <a
              href="mailto:contact@reachoout.com"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Support
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
