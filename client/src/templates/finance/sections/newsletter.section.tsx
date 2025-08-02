import { F_NEWSLETTER_SECTION } from "../types/newsletter.types";
import { LucideArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ReqInput } from "@/components/editor-components/inputs/reqInput";
import { FButton } from "../components/FButton";
import { toast } from "sonner";
import { useState } from "react";
import { submitNewsletterForm } from "@/api/user-template";
import { cn } from "@/lib/utils";

export const FNewsletterSection = ({
  heading,
  btn1Text,
  btn1Link,
  btn2Text,
  btn2Link,
  receiverEmail,
}: F_NEWSLETTER_SECTION) => {
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
      className="w-full min-h-[55vh] flex flex-col items-center justify-center bg-template-secondary rounded-lg overflow-hidden relative"
      id="newsletter"
    >
      {/* Centered content */}
      <div className="max-w-2xl w-full flex flex-col items-center text-center gap-8 text-template-text-secondary -translate-y-10">
        <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight">
          {heading}
        </h2>

        {/* Newsletter Form */}
        <form className="w-full flex flex-col sm:flex-row items-center px-4 justify-center gap-4">
          <ReqInput
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-[20vw] text-template-text-secondary"
            inputClassName="text-template-text-secondary placeholder:text-template-text-secondary/70 border border-template-text-secondary/70"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FButton
            disabled={isLoading || !receiverEmail}
            btnText="Subscribe"
            className={cn(
              "w-full sm:w-fit",
              !receiverEmail && "cursor-not-allowed"
            )}
            onClick={() => receiverEmail && handleSubmit(receiverEmail)}
          />
        </form>
      </div>

      {/* Bottom CTA Bar */}
      <div className="bg-template-accent-primary w-full sm:flex absolute bottom-0">
        <div className="max-w-6xl mx-auto sm:flex-row flex flex-col gap-4 divide-black sm:gap-20 items-center justify-between py-6 px-4">
          <a href={btn1Link}>
            <button
              type="button"
              className="flex items-center text-template-text-accent-primary gap-2 hover:underline"
            >
              {btn1Text}
              <span>
                <LucideArrowRight />
              </span>
            </button>
          </a>
          <Separator
            orientation="vertical"
            className="h-10 w-0.5 bg-template-text-accent-primary"
          />
          <a href={btn2Link}>
            <button
              type="button"
              className="flex items-center text-template-text-accent-primary gap-2 hover:underline"
            >
              {btn2Text}
              <span>
                <LucideArrowRight />
              </span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};
