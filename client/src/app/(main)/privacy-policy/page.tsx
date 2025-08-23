import React from "react";
import { Metadata } from "next";
import { PrivacyPolicy } from "@/components/pages/policyPages/privacyPolicy";

export const metadata: Metadata = {
  title: "Reachoout - Privacy Policy",
  description:
    "Reachoout thinks often profoundly about the protection of its guests and clients. This Privacy Policy describes how we gather, use, and share your Personal Information.",
};


const privacyPage = () => {
  return (
    <PrivacyPolicy/>
  )
}

export default privacyPage;


