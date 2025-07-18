import { Input } from "@/components/ui/input";
import { FContactButton } from "../components/FContactButton";
import { Textarea } from "@/components/ui/textarea";
import { FButton } from "../components/FButton";
import { Label } from "@/components/ui/label";
import { F_CONTACT_SECTION } from "../types/contact.types";
import { useState } from "react";
import { submitContactForm } from "@/api/user-template";
import { toast } from "sonner";
import EmailInput from "@/components/template-components/professional/emailInput";

export const FContactSection = ({
  badgeText,
  title,
  subtitle,
  phoneNumber,
  emailAddress,
}: F_CONTACT_SECTION) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (receiverEmail: string) => {
    setIsLoading(true);
    try {
      const response = await submitContactForm(formData, receiverEmail);
      if (response) {
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Failed to send message");
      }
    } catch {
      toast.error("An error occurred while sending the message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto py-20 px-4">
      <div className="flex flex-col sm:flex-row sm:gap-20">
        {/* text content */}
        <div className="flex flex-col sm:gap-8 gap-10 sm:w-1/2 w-full text-template-text-primary">
          <div className="w-fit rounded-full translate-x-10 bg-gradient-to-r from-template-primary to-template-accent-primary via-template-accent-primary/10 text-template-text-accent-primary flex items-center justify-center px-4 py-2 uppercase font-semibold text-lg">
            {badgeText}
          </div>
          <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight">
            {title}
          </h2>
          <div
            className="
    prose prose-sm max-w-none text-template-text-primary opacity-60
    prose-p:text-template-text-primary opacity-60
    prose-strong:text-template-text-primary opacity-60
    prose-h1:text-template-text-primary opacity-60
    prose-h2:text-template-text-primary opacity-60
    prose-h3:text-template-text-primary opacity-60
    prose-h4:text-template-text-primary opacity-60
    prose-h5:text-template-text-primary opacity-60
    prose-h6:text-template-text-primary opacity-60
  "
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />

          <div className="flex gap-10 items-center">
            <FContactButton type="tel" value={phoneNumber} />
            <FContactButton type="email" value={emailAddress} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 h-fit grid-cols-1 gap-4 space-y-4 text-template-text-primary mt-10">
          <div className="space-y-1">
            <Label className="uppercase font-semibold">Full Name</Label>
            <Input
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <Label className="uppercase font-semibold">Phone number</Label>
            <Input
              placeholder="Enter your phone number"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="space-y-1 col-span-2">
            <Label className="uppercase font-semibold">Email Address</Label>
            <EmailInput
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label className="uppercase font-semibold">Message</Label>
            <Textarea
              placeholder="Enter your message"
              className="col-span-2 h-36"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
            <FButton
              btnText="Submit"
              disabled={isLoading || !emailAddress}
              onClick={() => emailAddress && handleSubmit(emailAddress)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
