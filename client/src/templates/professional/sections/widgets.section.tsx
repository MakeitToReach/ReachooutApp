import React from "react";
import { PF_WIDGETS_SECTION } from "../types/widgets.types";
import { cn } from "@/lib/utils";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { motion } from "motion/react";

export const PFWidgetsSection = ({
    whatsapp_number,
    className,
}: PF_WIDGETS_SECTION) => {
    return (
        <motion.section
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            id="contact widgets"
            className={cn(
                "md:size-16 size-10 rounded-full bg-green-400 flex justify-center items-center text-white",
                className,
            )}
        >
            <a
                href={`https://wa.me/${whatsapp_number}` || "#"}
                target={"_blank"}
                rel="noopener noreferrer"
            >
                <IconBrandWhatsapp className="md:size-12" />
            </a>
        </motion.section>
    );
};
