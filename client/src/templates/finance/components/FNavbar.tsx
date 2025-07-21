import { LucideMenu } from "lucide-react";
import Image from "next/image";
import React from "react";
import { F_NAVBAR_SECTION } from "../types/navbar.types";
import { scrollToSection } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { FButton } from "./FButton";
import { motion as m } from "motion/react";

const delay = 0.15;

export const FNavbar = ({
  logoUrl,
  textLogo,
  sections,
  btnText,
  btnLink,
}: F_NAVBAR_SECTION) => {
  const visibleSections = sections.slice(2, 6);
  const overflowSections = sections.slice(6, sections.length - 2);
  const isMobile = useIsMobile();

  const handleSelectChange = (value: string) => {
    if (value) {
      scrollToSection(value);
    }
  };

  return (
    <nav
      id="navbar"
      className="bg-template-primary backdrop-blur-md px-2 sm:px-8"
    >
      <div className="h-16 px-4 flex justify-between items-center">
        {textLogo && (
          <m.h1
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            className="font-semibold text-xl text-template-text-primary"
          >
            {textLogo}
          </m.h1>
        )}

        {logoUrl && (
          <m.div
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
          >
            <Image
              src={logoUrl}
              alt="logo"
              width={64}
              height={64}
              className="md:size-16 size-12 object-contain my-2"
            />
          </m.div>
        )}

        <div className="hidden space-x-4 md:flex items-center">
          {visibleSections.map((section, index) => (
            <m.button
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay * (index + 1),
                ease: "easeOut",
              }}
              key={section.name}
              className="text-template-text-primary hover:underline cursor-pointer capitalize font-semibold"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.href);
              }}
            >
              {section.name}
            </m.button>
          ))}

          {overflowSections.length > 0 && (
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-fit px-3 py-1 text-template-text-primary shadow-none bg-transparent border-none hover:underline">
                <m.span
                  initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: delay * 2,
                    ease: "easeOut",
                  }}
                >
                  More
                </m.span>
              </SelectTrigger>
              <SelectContent>
                {overflowSections.map((section) => (
                  <SelectItem
                    key={section.name}
                    value={section.href}
                    className="capitalize"
                  >
                    {section.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {!isMobile && (
          <m.a
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            href={btnLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FButton btnText={btnText} />
          </m.a>
        )}
        {/* Mobile Menu Button */}

        {isMobile && (
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger
              showIcon={false}
              className="w-fit px-3 py-1 text-template-text-primary shadow-none bg-transparent border-none hover:underline flex items-center gap-1 [&>[data-slot='icon']]:hidden"
            >
              <m.span
                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: delay,
                  ease: "easeOut",
                }}
              >
                <LucideMenu size={20} />
              </m.span>
            </SelectTrigger>
            <SelectContent>
              {sections.slice(2, sections.length - 2).map((section) => (
                <SelectItem
                  key={section.name}
                  value={section.href}
                  className="capitalize"
                >
                  {section.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </nav>
  );
};
