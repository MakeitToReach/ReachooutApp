import { LucideMenu } from "lucide-react";
import React, { useState } from "react";
import { PF_NAVBAR_SECTION } from "../types/navbarSection";
import { scrollToSection } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import QRCodePopup from "@/components/editor-components/popups/QRCodePopup";
import Image from "next/image";
import { motion as m } from "motion/react";

const delay = 0.15;

export const PFNavbar = ({
  logoUrl,
  textLogo,
  sections,
  qrCodeUrl,
}: PF_NAVBAR_SECTION) => {
  const visibleSections = sections.slice(2, 6);
  const overflowSections = sections.slice(6, sections.length - 2);
  const isMobile = useIsMobile();
  const [qrPopupOpen, setQrPopupOpen] = useState(false);
  const [desktopSelectValue, setDesktopSelectValue] = useState("");
  const [mobileSelectValue, setMobileSelectValue] = useState("");

  const handleSelectChange = (value: string, isMobileSelect = false) => {
    if (value) {
      scrollToSection(value);
    }
    if (value === "view-qr-code") {
      setQrPopupOpen(true);
    }

    // Reset the select value after a short delay
    setTimeout(() => {
      if (isMobileSelect) {
        setMobileSelectValue("");
      } else {
        setDesktopSelectValue("");
      }
    }, 100);
  };

  return (
    <nav id="navbar" className="bg-template-primary text-template-text-primary">
      <div className="max-w-6xl mx-auto h-25 px-4 py-4 flex justify-between items-center">
        {textLogo && (
          <m.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            className="font-semibold text-2xl text-template-text-primary"
          >
            {textLogo}
          </m.h1>
        )}

        {logoUrl && (
          <Image
            src={logoUrl}
            alt="logo"
            width={1000}
            height={1000}
            className="sm:w-[170px] sm:h-[78px] object-left w-[130px] h-[66px] object-contain my-2"
          />
        )}

        <div className="hidden space-x-4 sm:flex items-center">
          {visibleSections.map((section, index) => (
            <m.button
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay * index,
                ease: "easeOut",
              }}
              key={section.name}
              className="text-template-text-primary text-xl hover:underline cursor-pointer capitalize"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.href);
              }}
            >
              {section.name}
            </m.button>
          ))}

          {overflowSections.length > 0 && (
            <Select
              value={desktopSelectValue}
              onValueChange={(value) => handleSelectChange(value, false)}
            >
              <SelectTrigger className="w-fit px-3 py-1 shadow-none bg-transparent border-none hover:underline text-template-text-primary">
                <m.span
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: delay * 4,
                    ease: "easeOut",
                  }}
                  className="text-template-text-primary text-xl"
                >
                  More
                </m.span>
              </SelectTrigger>
              <SelectContent>
                {overflowSections.map((section) => (
                  <SelectItem
                    key={section.name}
                    value={section.href}
                    className="capitalize text-base"
                  >
                    {section.name}
                  </SelectItem>
                ))}
                <QRCodePopup
                  value={qrCodeUrl || window?.location?.href}
                  open={qrPopupOpen}
                  onOpenChange={setQrPopupOpen}
                >
                  <SelectItem
                    value="view-qr-code"
                    className="capitalize text-xl"
                  >
                    View QR Code
                  </SelectItem>
                </QRCodePopup>
              </SelectContent>
            </Select>
          )}
        </div>
        {/* Mobile Menu Button */}

        {isMobile && (
          <Select
            value={mobileSelectValue}
            onValueChange={(value) => handleSelectChange(value, true)}
          >
            <SelectTrigger
              showIcon={false}
              className="w-fit px-3 py-1 text-template-text-primary shadow-none bg-transparent border-none hover:underline flex items-center gap-1 [&>[data-slot='icon']]:hidden"
            >
              <m.span
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: delay,
                  ease: "easeOut",
                }}
              >
                <LucideMenu className="size-10" />
              </m.span>
            </SelectTrigger>
            <SelectContent>
              {sections.slice(2, sections.length - 2).map((section) => (
                <SelectItem
                  key={section.name}
                  value={section.href}
                  className="capitalize text-xl"
                >
                  {section.name}
                </SelectItem>
              ))}
              <QRCodePopup
                value={qrCodeUrl || window?.location?.href}
                open={qrPopupOpen}
                onOpenChange={setQrPopupOpen}
              >
                <SelectItem value="view-qr-code" className="capitalize text-xl">
                  View QR Code
                </SelectItem>
              </QRCodePopup>
            </SelectContent>
          </Select>
        )}
      </div>
    </nav>
  );
};
