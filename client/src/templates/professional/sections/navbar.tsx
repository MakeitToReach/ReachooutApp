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
    <nav
      id="navbar"
      className="bg-template-primary backdrop-blur-md text-template-text-primary"
    >
      <div className="max-w-6xl mx-auto h-16 px-4 flex justify-between items-center">
        {textLogo && (
          <h1 className="font-semibold text-xl text-template-text-primary">
            {textLogo}
          </h1>
        )}

        {logoUrl && (
          <img
            src={logoUrl}
            alt="logo"
            className="md:size-16 size-12 object-contain my-2"
          />
        )}

        <div className="hidden space-x-4 md:flex items-center">
          {visibleSections.map((section) => (
            <button
              key={section.name}
              className="text-template-text-primary hover:underline cursor-pointer capitalize"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.href);
              }}
            >
              {section.name}
            </button>
          ))}

          {overflowSections.length > 0 && (
            <Select 
              value={desktopSelectValue}
              onValueChange={(value) => handleSelectChange(value, false)}
            >
              <SelectTrigger className="w-fit px-3 py-1 text-template-text-primary shadow-none bg-transparent border-none hover:underline">
                <span>More</span>
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
                  value={qrCodeUrl || window?.location?.href}
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
              <LucideMenu size={20} />
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
                value={qrCodeUrl || window?.location?.href}
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
