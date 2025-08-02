import React from "react";
import { cn } from "@/lib/utils";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { motion } from "motion/react";
import { PhoneCall } from "lucide-react";
import { F_WIDGETS_SECTION } from "../types/widgets.types";

export const FWidgetsSection = ({
  whatsapp_number,
  telephone_number,
  className,
}: F_WIDGETS_SECTION) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {telephone_number && (
        <motion.section
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          id="call-widget"
          className={cn(
            "size-16 rounded-full bg-template-secondary flex justify-center items-center text-template-text-secondary border border-template-text-secondary",
            className
          )}
        >
          <a
            href={`tel:${
              typeof telephone_number !== "undefined" ? telephone_number : ""
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PhoneCall className="size-10" />
          </a>
        </motion.section>
      )}
      {whatsapp_number && (
        <motion.section
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          id="contact widgets"
          className={cn(
            "size-16 rounded-full bg-green-400 flex justify-center items-center text-white",
            className
          )}
        >
          <a
            href={`https://wa.me/${whatsapp_number}` || "#"}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <IconBrandWhatsapp className="size-10" />
          </a>
        </motion.section>
      )}
    </div>
  );
}; 