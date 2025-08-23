import React from "react";
import { Metadata } from "next";
import { RefundsAndCancellationPolicy } from "@/components/pages/policyPages/refunds";

export const metadata: Metadata = {
  title: "Reachoout - Refunds and Cancellation Policy",
  description:
    "At Reachoout, we strive to provide our customers with a seamless and valuable experience. Please read our policy carefully to understand how refunds and cancellations work for our services.",
};

const page = () => {
  return <RefundsAndCancellationPolicy />;
};

export default page;
