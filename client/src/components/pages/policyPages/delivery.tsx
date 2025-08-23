'use client'
import { Navbar } from "@/components/editor-components/navbar";
import { motion } from "motion/react";
import Image from "next/image";

export const DigitalDeliveryPolicy = () => {
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
              Digital Delivery Policy
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              At Reachoout, all our products and services are delivered online —
              instantly or within a short activation period — so you can start
              using them without waiting for physical shipping.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {/* Section 1: Delivery Method */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                1. Delivery Method
              </h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Digital Services
                  </h3>
                  <p>
                    All subscriptions, tools, and features are delivered through
                    your registered Reachoout account.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Activation Time
                  </h3>
                  <p>
                    Standard account activation takes 1–24 hours after
                    successful payment.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Custom Services
                  </h3>
                  <p>
                    For custom design, development, or other tailor-made
                    solutions, delivery timelines will be shared based on your
                    project scope.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 2: No Physical Shipping */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                2. No Physical Shipping
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>We do not deliver physical goods.</p>
                <p>
                  Any domains, pages, or services you purchase from Reachoout
                  will be configured directly in your account.
                </p>
              </div>
            </motion.section>

            {/* Section 3: Delays in Delivery */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                3. Delays in Delivery
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Delays may occur in rare cases due to technical issues,
                  incomplete user details, or verification requirements.
                </p>
                <p>
                  If you do not receive your service within the expected time
                  frame, please contact{" "}
                  <a
                    href="mailto:contact@reachoout.com"
                    className="text-orange-400 hover:text-orange-300 underline"
                  >
                    contact@reachoout.com
                  </a>{" "}
                  with your order details.
                </p>
              </div>
            </motion.section>

            {/* Section 4: Order Confirmation */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                4. Order Confirmation
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  After payment, you will receive a confirmation email
                  containing your order details and activation instructions.
                </p>
                <p>
                  Ensure you provide a valid and accessible email address during
                  checkout.
                </p>
              </div>
            </motion.section>

            {/* Section 5: Policy Updates */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                5. Policy Updates
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Reachoout may update this Digital Delivery Policy from time to
                  time. Updates will be posted on this page, and your continued
                  use of our services means you accept these changes.
                </p>
              </div>
            </motion.section>
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-xl border border-orange-500/20"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              Need Help?
            </h3>
            <p className="text-gray-300 mb-4">
              If you have any questions about our digital delivery policy, don't
              hesitate to reach out.
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
