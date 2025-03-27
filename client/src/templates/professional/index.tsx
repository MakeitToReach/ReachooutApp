"use client";
import React from "react";
import {
  PFNavbar,
  // PFSocialSection,
  // PFClientSection,
  PFAboutSection,
  PFWorkSection,
  PFHeroSection,
  PFFooter,
} from "./sections";

export const Professional = () => {
  return (
    <div className="space-y-20">
      <div className="space-y-10">
        <PFNavbar />
        <PFHeroSection />
      </div>

      <PFAboutSection />

      <PFWorkSection />

      {/* <PFClientSection /> */}

      {/* <PFSocialSection /> */}
      <PFFooter />
    </div>
  );
};
