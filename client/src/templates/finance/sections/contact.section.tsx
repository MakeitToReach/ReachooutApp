import { Input } from "@/components/ui/input";
import { FContactButton } from "../components/FContactButton";
import { Textarea } from "@/components/ui/textarea";
import { FButton } from "../components/FButton";
import { Label } from "@/components/ui/label";
import { F_CONTACT_SECTION } from "../types/contact.types";
import { useState, useEffect } from "react";
import { submitContactForm } from "@/api/user-template";
import { toast } from "sonner";
import EmailInput from "@/components/template-components/professional/emailInput";
import { motion as m } from "motion/react";
import Cal, { getCalApi } from "@calcom/embed-react";

const delay = 0.15;

export const FContactSection = ({
  badgeText,
  title,
  subtitle,
  phoneNumber,
  emailAddress,
  calUrl,
  calTheme,
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

  useEffect(() => {
    (async function () {
      const Cal = await getCalApi();
      Cal("ui", {
        theme: calTheme,
        hideEventTypeDetails: false,
      });
    })();
  }, [calTheme]);

  return (
    <section id="contact" className="max-w-6xl mx-auto py-20 px-4">
      {!calUrl ? (
        <div className="flex flex-col sm:flex-row sm:gap-20">
          {/* text content */}
          <div className="flex flex-col sm:gap-8 gap-10 sm:w-1/2 w-full text-template-text-primary">
            <m.div
              initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay,
                ease: "easeOut",
              }}
              className="w-fit rounded-full bg-template-accent-primary text-template-text-accent-primary flex items-center justify-center px-6 py-2 uppercase font-semibold text-lg"
            >
              {badgeText}
            </m.div>
            <m.h2
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay * 2,
                ease: "easeOut",
              }}
              className="font-semibold sm:text-5xl text-3xl tracking-tight">
              {title}
            </m.h2>
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay * 3,
                ease: "easeOut",
              }}
              className="
    prose prose-xl sm:prose-lg max-w-none text-template-text-primary opacity-60
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

            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay * 4,
                ease: "easeOut",
              }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-10"
            >
              <FContactButton type="tel" value={phoneNumber} />
              <FContactButton type="email" value={emailAddress} />
            </m.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 h-fit gap-4 text-template-text-primary mt-10">
            <div className="space-y-1 col-span-1 sm:col-span-2 w-full">
              <Label className="uppercase font-semibold">Full Name</Label>
              <Input
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-1 col-span-1">
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
            <div className="space-y-1 col-span-1">
              <Label className="uppercase font-semibold">Email Address</Label>
              <EmailInput
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
              />
            </div>
            <div className="space-y-2 col-span-1 sm:col-span-2">
              <Label className="uppercase font-semibold">Message</Label>
              <Textarea
                placeholder="Enter your message"
                className="h-36"
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
      ) : (
        <div className="w-full">
          {/* Header content for Cal.com layout */}
          <div className="text-center mb-12">
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay,
                ease: "easeOut",
              }}
              className="w-fit mx-auto rounded-full bg-template-accent-primary text-template-text-accent-primary flex items-center justify-center px-6 py-2 uppercase font-semibold text-lg mb-6"
            >
              {badgeText}
            </m.div>
            <m.h2
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay * 2,
                ease: "easeOut",
              }}
              className="font-semibold sm:text-5xl text-3xl tracking-tight text-template-text-primary mb-6"
            >
              {title}
            </m.h2>
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay * 3,
                ease: "easeOut",
              }}
              className="
    prose prose-xl sm:prose-lg max-w-2xl mx-auto text-template-text-primary opacity-60
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
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay * 4,
                ease: "easeOut",
              }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-10 justify-center mt-8"
            >
              <FContactButton type="tel" value={phoneNumber} />
              <FContactButton type="email" value={emailAddress} />
            </m.div>
          </div>

          {/* Full-width Cal.com embed */}
          <m.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 5,
              ease: "easeOut",
            }}
            className="w-full"
          >
            <Cal calLink={calUrl} />
          </m.div>
        </div>
      )}
    </section>
  );
};
