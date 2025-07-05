import { Input } from "@/components/ui/input";
import { FButton } from "../components/FButton";
import type { F_FOOTER_SECTION } from "../types/footer.types";

export const FFooterSection = ({
  logoUrl,
  textLogo,
  description,
  experience,
}: F_FOOTER_SECTION) => {
  return (
    <footer id="footer" className="border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-10 justify-between px-4  py-10">
        <div className="flex sm:w-1/3 w-full flex-col gap-3">
          {logoUrl && (
            <img
              src={logoUrl}
              alt="logo"
              className="md:size-16 size-12 object-contain my-2"
            />
          )}

          {textLogo && <h3 className="font-semibold text-xl">{textLogo}</h3>}

          <p className="line-clamp-3 text-black/50">{description}</p>

          <div className="flex items-center gap-2">
            {experience && (
              <>
                <h2 className="font-bold text-3xl bg-gradient-to-b from-template-primary to-template-accent-primary via-template-accent-primary/10 text-template-text-accent-primary">
                  {experience}
                </h2>
                <h3 className="font-extralight sm:text-3xl text-base tracking-tighter font-serif italic">
                  Years of Experience
                </h3>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col col-start-3 gap-3">
          <h3 className="font-semibold text-xl">Newsletter</h3>

          <p className="line-clamp-3 text-black/50">
            Want to receive news and updates? Enter your email.
          </p>

          <Input placeholder="Enter your email" className="mt-2" />
          <FButton btnText="Submit" className="py-3 px-5 self-start" />
        </div>
      </div>
    </footer>
  );
};
