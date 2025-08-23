import React from "react";
import { Metadata } from "next";
import { DigitalDeliveryPolicy } from "@/components/pages/policyPages/delivery";

export const metadata: Metadata = {
  title: "Reachoout - Digital Delivery Policy",
  description:
    "At Reachoout, all our products and services are delivered online — instantly or within a short activation period — so you can start using them without waiting for physical shipping.",
};
const page = () => {
  return <DigitalDeliveryPolicy />;
};

export default page;
