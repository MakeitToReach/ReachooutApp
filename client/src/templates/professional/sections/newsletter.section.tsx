"use client";

import EmailInput from "@/components/template-components/professional/emailInput";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { PF_NEWSLETTER_SECTION } from "../types/newsletter.types";
import { submitNewsletterForm } from "@/api/user-template";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { motion as m } from "motion/react";

const delay = 0.15;

export const PFNewsletterSection = ({
  heading,
  receiverEmail,
}: PF_NEWSLETTER_SECTION) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (receiverEmail: string) => {
    setIsLoading(true);
    try {
      const response = await submitNewsletterForm(email, receiverEmail);
      if (response) {
        setEmail("");
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while sending the message");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="bg-template-secondary py-20">
      <div
        className="py-20 max-w-6xl mx-auto flex flex-col justify-center items-center space-y-10 px-4"
        id="newsletter"
      >
        <m.h2
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay,
            ease: "easeOut",
          }}
          viewport={{ amount: 0.5, once: true }}
          className="text-4xl font-semibold md:text-6xl text-center text-template-text-secondary"
        >
          {heading}
        </m.h2>

        <m.form
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay * 2,
            ease: "easeOut",
          }}
          viewport={{ amount: 0.5, once: true }}
          className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto "
        >
          <EmailInput
            value={email}
            onChange={(value) => setEmail(value)}
            className="bg-template-text-secondary w-full"
          />
          <Button
            disabled={!receiverEmail || isLoading}
            type="submit"
            className="bg-template-btn text-template-text-btn hover:bg-template-btn cursor-pointer"
            onClick={() => receiverEmail && handleSubmit(receiverEmail)}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Send />
                Subscribe
              </>
            )}
          </Button>
        </m.form>
      </div>
    </section>
  );
};
