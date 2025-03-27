"use client";
import React from "react";
import {
  PFNavbar,
  PFSocialSection,
  PFClientSection,
  PFAboutSection,
  PFWorkSection,
  PFHeroSection,
  PFFooter,
} from "./sections";

export const Professional = () => {
  return (
    <div className="flex flex-col gap-10">
      <PFNavbar />

      <PFHeroSection />

      <PFAboutSection />

      <PFWorkSection />

      <PFClientSection />

      <PFSocialSection />
      <PFFooter />
    </div>
  );
};
