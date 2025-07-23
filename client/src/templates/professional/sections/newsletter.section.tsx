"use client";

import EmailInput from "@/components/template-components/professional/emailInput";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { PF_NEWSLETTER_SECTION } from "../types/newsletter.types";
import { submitNewsletterForm } from "@/api/user-template";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

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
    <section
      className="py-20 max-w-6xl mx-auto flex flex-col justify-center items-center space-y-10 px-4"
      id="newsletter"
    >
      <h2 className="text-4xl font-semibold md:text-6xl text-center text-template-text-primary">
        {heading}
      </h2>

      <form className="flex flex-col md:flex-row gap-4">
        <EmailInput value={email} onChange={(value) => setEmail(value)} />
        <Button
          disabled={!receiverEmail || isLoading}
          type="submit"
          className="bg-template-btn text-template-text-btn"
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
      </form>
    </section>
  );
};
