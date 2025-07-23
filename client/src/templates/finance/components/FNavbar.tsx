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
import QRCodePopup from "@/components/editor-components/popups/QRCodePopup";

const delay = 0.15;

export const FNavbar = ({
  logoUrl,
  textLogo,
  sections,
  btnText,
  btnLink,
  qrCodeUrl,
}: F_NAVBAR_SECTION) => {
  const visibleSections = sections.slice(2, 6);
  const overflowSections = sections.slice(6, sections.length - 2);
  const isMobile = useIsMobile();
  const [qrPopupOpen, setQrPopupOpen] = React.useState(false);
  const [desktopSelectValue, setDesktopSelectValue] = React.useState("");
  const [mobileSelectValue, setMobileSelectValue] = React.useState("");

  const handleSelectChange = (value: string, isMobileSelect = false) => {
    if (value) {
      scrollToSection(value);
    }
    if (value === "view-qr-code") {
      setQrPopupOpen(true);
    }
    setTimeout(() => {
      if (isMobileSelect) {
        setMobileSelectValue("");
      } else {
        setDesktopSelectValue("");
      }
    }, 100);
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
            <Select 
              value={desktopSelectValue}
              onValueChange={(value) => handleSelectChange(value, false)}
            >
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
                <QRCodePopup
                  value={qrCodeUrl || (typeof window !== "undefined" ? window.location.href : "")}
                  open={qrPopupOpen}
                  onOpenChange={setQrPopupOpen}
                >
                  <SelectItem value="view-qr-code" className="capitalize">
                    View QR Code
                  </SelectItem>
                </QRCodePopup>
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
          <Select 
            value={mobileSelectValue}
            onValueChange={(value) => handleSelectChange(value, true)}
          >
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
              <QRCodePopup
                value={qrCodeUrl || (typeof window !== "undefined" ? window.location.href : "")}
                open={qrPopupOpen}
                onOpenChange={setQrPopupOpen}
              >
                <SelectItem value="view-qr-code" className="capitalize">
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
