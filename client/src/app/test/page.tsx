import { PF_STATIC_DATA } from "@/static_data/professional/PFTemplate";
import { ProfessionalPortfolio } from "@/templates/professional";
import React from "react";

const page = () => {
  return <ProfessionalPortfolio data={PF_STATIC_DATA} />;
};

export default page;
