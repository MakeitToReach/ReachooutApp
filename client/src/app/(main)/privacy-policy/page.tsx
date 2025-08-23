"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Navbar } from "@/components/editor-components/navbar";

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Reachoout thinks often profoundly about the protection of its guests and clients. This Privacy Policy describes how we gather, use, and share your Personal Information.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {/* Section 1: Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">1. Introduction</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Reachoout thinks often profoundly about the protection of its guests and clients. Keeping that in mind, this Privacy Policy (Privacy Policy) depicts how Reachoout.com, along with its associated organizations around the world (Reachoout, we, our, or us), gather, use, and offer your Personal Information, just as a clarification of the information rights you may have in that Personal Information.
                </p>
                <p>
                  This Privacy Policy applies to all clients, including unregistered guests, enrolled clients, and premium clients (all things considered, Users, you, individual or your), and to all Reachoout administrations, including our sites (counting and any of its subdomains, the Website), and related administrations (altogether, the Services).
                </p>
                <p>
                  This Privacy Policy isn't expected to abrogate the conditions of any agreement you have with us, nor any rights you may have under other pertinent information security laws.
                </p>
                <p>
                  Preceding getting to or utilizing our Services, kindly read this arrangement and ensure you completely comprehend our practices according to your Personal Information. On the off chance that you peruse and completely comprehend this Privacy Policy, and stay went against our practices, you should quickly leave and suspend all utilization of any of our Services.
                </p>
              </div>
            </motion.section>

            {/* Section 2: What Client Information do we gather */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">2. What 'Client Information' do we gather?</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-white mb-3">2.1. Client Information</h3>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      To give you the Services, we should assemble Personal Information relating to a recognized or unmistakable regular individual (Personal Information). We assemble Personal Information you give us, from your use of the Services, and from various sources. Here are the sorts of Personal Information we assemble about you:
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Information you give us</h4>
                        <p>
                          Exactly when you register for our Services, purchase just as register space names, use any of our Services; or possibly when you contact us clearly by any correspondence station (for instance Reachoout's assistance tickets, messages), you may give us Personal Information, similar to a name, email address, phone number, portion information (for Users with Paid Services), the information you recollect for your correspondences with us and with various customers on our establishment, and Personal Information contained in analyzed ID records, (for instance, an ID card, driver's grant, visa, or official association enlistment reports).
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Information we assemble when you use the Services</h4>
                        <p>
                          Right when you visit, download, and furthermore use any of our Services, we may assemble collected usage Personal Information, for instance, Visitors' and Users' examining and 'snap move' development on the Services, meeting heatmaps, and materials, non-perceiving Personal Information as for the Visitor's or User's contraption, working structure, web browser, screen objective, language, and support settings, network access provider, implying/leave pages, date/time stamps, etc.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Information we accumulate from various sources</h4>
                        <p>
                          We may get Personal Information about you from outside sources, similar to I) security providers, coercion revelation and shirking providers for example to help us screen out customers identified with deception, ii) online media stages when you sign in or join using your electronic media account, we may get Personal Information from that help (e.g., your username, fundamental profile Personal Information) and once in a while, we may assemble Personal Information from lead redesign associations which help us with improving our organization offering; iii) elevating and promoting assistants to screen, administer and measure our ad campaigns.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-white mb-3">2.2. Users of users 'Client Information'</h3>
                  <p className="text-gray-300">
                    We may likewise gather Personal Information relating to guests and clients of our User's sites or administrations ("Users-of-Users"), exclusively for and for our Users' benefit.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 3: Reasons for Collecting Personal Details */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">Reasons for Collecting your Personal Details</h2>
              <div className="space-y-3 text-gray-300">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To give and work the Services;</li>
                  <li>To additionally create, alter, grow, and improve our Services, in view of Users' normal or individual inclinations, encounters, and challenges;</li>
                  <li>To give our Users continuous client help and specialized help;</li>
                  <li>To have the option to contact our Users with general or customized administration related notification and limited time messages;</li>
                  <li>To assist us with updating, extend and examine our records to recognize new clients;</li>
                  <li>To encourage, support, and offer certain challenges, occasions, and advancements, determine members' qualification, screen execution, contact victors, and award prizes and advantages;</li>
                  <li>To examine our exhibition and promoting exercises;</li>
                  <li>To make totaled factual information and other amassed as well as deduced data, which we or our colleagues may use to give and improve our individual administrations;</li>
                  <li>To give you proficient help, just upon your solicitation;</li>
                  <li>To improve our information security and misrepresentation avoidance capacities;</li>
                  <li>To conform to any appropriate laws and guidelines.</li>
                </ul>
              </div>
            </motion.section>

            {/* Section 4: Legal and Contractual Obligation */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">Legal And Contractual Obligation of Your Personal Information</h2>
              <div className="space-y-3 text-gray-300">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Our utilization of your Personal Information is important to play out an agreement or to find ways to go into an agreement with you (for example to give you a web designer, to give you our client help and specialized help);</li>
                  <li>Our utilization of your Personal Information is important to follow an applicable lawful or administrative commitment that we have; or</li>
                  <li>Our utilization of your Personal Information is important to help genuine interests and business purposes (for instance, to keep up and improve our Services and the adequacy of Reachoout. by distinguishing specialized issues), if it is led in a way that is proportionate and that regards your security rights.</li>
                </ul>
              </div>
            </motion.section>

            {/* Section 5: How we share Personal Information */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">3. In what way we share your 'Personal Information' for professional purposes</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We may impart your Personal Information to specialist organizations and others (or in any case permit them admittance to it) in the accompanying habits and occurrences:
                </p>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Outsider Service Providers</h3>
                  <p>
                    Reachoout has banded together with various chosen specialist organizations, whose administrations and arrangements supplement, encourage and improve our own. These incorporate facilitating and worker co-area administrations, interchanges, and substance conveyance organizations (CDNs), information and network safety administrations, charging and installment preparing administrations, space name enlistment centers, misrepresentation identification, and anticipation administrations, web examination, email appropriation, and observing administrations, meeting recording and distant access administrations, execution estimation, information improvement, and promoting administrations, content suppliers, and our lawful and monetary consultants [collectively, Third Party Service Provider(s)].
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Categories of Personal Information Shared</h3>
                  <p>
                    Reachoout may share the accompanying classifications of Personal Information with Third-Party Service Providers for a business reason:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>identifiers, including name, pseudonym, postal location, one-of-a-kind individual identifier, online identifier, web convention address, email address, account name, or other comparative identifiers.</li>
                    <li>Business data, for instance, data with respect to items or administrations bought, acquired, or considered</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 6: Additional Sharing Scenarios */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">Additional Sharing Scenarios</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">4.1. Law Enforcement, Legal Requests, and Duties</h3>
                  <p className="text-gray-300">
                    Reachoout may uncover or in any case permit admittance to your Personal Information as per a lawful solicitation, like a summon, legitimate procedures, court order or court request, or in consistence with relevant laws, on the off chance that we have a decent confidence conviction that the law expects us to do as such, with or without notice to you.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">4.2. Ensuring Rights and Safety</h3>
                  <p className="text-gray-300">
                    Reachoout may share your Personal Information in the event that we trust in compliance with common decency that this will help secure the rights, property, or individual wellbeing of Reachoout, any of our Users, any Users-of-Users, or any individual from the overall population, with or without notice to you.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">4.3. Online Media Features and Framed Pages</h3>
                  <p className="text-gray-300">
                    Our Services incorporate certain Social Media highlights, gadgets, and single sign-on features [such as Facebook Connect, Google Sign-in, Facebook Like, or Share this button or other intelligent smaller than expected programs (Social Media Features)]. These Social Media Features may gather certain Personal Information, for example, your IP address or which page you are visiting on our Website, and may set a treat to empower them to work appropriately.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">4.4. Relationship With a Change in Corporate Control</h3>
                  <p className="text-gray-300">
                    In expansion, should Reachoout or any of its members go through any adjustment in charge, including by methods for consolidation, procurement, or acquisition of generously the entirety of its resources, your Personal Information might be imparted to the gatherings engaged with such occasion.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">4.5. Upon Your Further Direction</h3>
                  <p className="text-gray-300">
                    Reachoout may likewise impart your Personal Information to outsiders for different purposes upon your further heading or with your express endorsement.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 7: Deletion of User's Data */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">Deletion of User's Data</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Complying with applicable law and regulations, Reachoout.com processes user's data including name, email, mobile number, and billing information (for generating invoices). The data is received on the consent of the user and publicly displaying our privacy policy.
                </p>
                <p>
                  In order to delete the user's data, one has to send a request to the Reachoout and thereafter, follow the steps and procedure shared at the Reachoout Support panel.
                </p>
              </div>
            </motion.section>
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-xl border border-orange-500/20"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">Questions About Privacy?</h3>
            <p className="text-gray-300 mb-4">
              If you have any questions about our privacy policy or data practices, please don't hesitate to contact us.
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

export default PrivacyPolicy;
