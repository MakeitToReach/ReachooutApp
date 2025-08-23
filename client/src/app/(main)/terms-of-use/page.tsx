import React from "react";
import { Metadata } from "next";
import { TermsOfUse } from "@/components/pages/policyPages/terms";

export const metadata: Metadata = {
  title: "Reachoout - Terms of Use",
  description:
    "Use of the Reachoout services is subject to the following terms of use. Please read these terms carefully, as the use of the Reachoout or surfing the servers of the Reachoout constitutes your agreement to all such terms and conditions.",
};

const page = () => {
  return <TermsOfUse />;
};

export default page;
