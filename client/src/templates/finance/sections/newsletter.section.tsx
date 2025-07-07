import { F_NEWSLETTER_SECTION } from "../types/newsletter.types";
import { LucideArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ReqInput } from "@/components/editor-components/inputs/reqInput";
import { FButton } from "../components/FButton";

export const FNewsletterSection = ({
  heading,
  btn1Text,
  btn1Link,
  btn2Text,
  btn2Link,
}: F_NEWSLETTER_SECTION) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("WIP");
  };
  return (
    <section className="w-full min-h-[55vh] flex flex-col items-center justify-center bg-template-secondary rounded-lg overflow-hidden relative">
      {/* Centered content */}
      <div className="max-w-2xl w-full flex flex-col items-center text-center gap-8 text-template-text-secondary -translate-y-10">
        <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight">
          {heading}
        </h2>

        {/* Newsletter Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col sm:flex-row items-center px-4 justify-center gap-4"
        >
          <ReqInput
            type="email"
            placeholder="Enter your email"
            required
          />
          <FButton btnText="Subscribe" className="self-start" />
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
