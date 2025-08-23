import React from "react";
import { Metadata } from "next";
import { PricingPolicy } from "@/components/pages/policyPages/pricingPolicy";

export const metadata: Metadata = {
  title: "Reachoout - Pricing Policy",
  description:
    "At Reachoout, we believe in keeping our pricing simple, transparent, and affordable. Our goal is to make professional websites accessible to everyone without hidden costs or complicated plans",
};

const page = () => {
  return <PricingPolicy />;
};

export default page;
