import { getSocialIconFromRegistry } from "@/lib/utils";
import { F_FOOTER_SECTION } from "../types/footer.types";
import { TermsPopup } from "@/templates/professional/popups/TermsPopup";
import { PrivacyPolicyPopup } from "@/templates/professional/popups/PrivacyPolicyPopup";

export const FFooterSection = ({
  logoText,
  logoUrl,
  description,
  address,
  email,
  phone,
  connectHeading,
  socials,
  privacyPolicyContent,
  termsAndConditionsContent,
}: F_FOOTER_SECTION) => {
  return (
    <footer
      id="footer"
      className="bg-template-secondary text-template-text-secondary py-8 rounded-t-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left Section - Logo and Description */}
          <div className="flex-1">
            {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}

            {logoUrl && (
              <img
                src={logoUrl}
                alt="logo"
                className="md:size-16 size-12 object-contain"
              />
            )}
            <div
              className="
    prose prose-base max-w-none text-template-text-secondary/50
    prose-p:text-template-text-secondary/50
    prose-strong:text-template-text-secondary/50
    prose-h1:text-template-text-secondary/50
    prose-h2:text-template-text-secondary/50
    prose-h3:text-template-text-secondary/50
    prose-h4:text-template-text-secondary/50
    prose-h5:text-template-text-secondary/50
    prose-h6:text-template-text-secondary/50
  "
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {/* Middle Section - Contact Info */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Contact Info</h3>
            <p className="text-template-text-secondary/50 text-base">{address}</p>
            <p className="text-template-text-secondary/50 text-base mt-2">
              <a
                href={`mailto:${email}`}
                className="hover:text-white transition-colors"
              >
                {email}
              </a>
            </p>
            <p className="text-template-text-secondary/50 text-base mt-2">
              <a
                href={`tel:${phone}`}
                className="hover:text-white transition-colors"
              >
                {phone}
              </a>
            </p>
          </div>

          {/* Right Section - Socials */}
          <div className="flex justify-end ">
            <div className="flex flex-col items-start">
              {connectHeading && (
                <h3 className="text-xl font-semibold mb-2">{connectHeading}</h3>
              )}
              <div className="flex gap-4">
                {socials
                  .filter((social) => social.url)
                  .map((social, index) => {
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-template-text-secondary/50 hover:text-white transition-colors"
                      >
                        {getSocialIconFromRegistry(social.name)}
                      </a>
                    );
                  })}
              </div>
              {privacyPolicyContent && (
                <PrivacyPolicyPopup content={privacyPolicyContent}>
                  <p className="text-template-text-secondary/50 mt-2 hover:text-white transition-colors">
                    Privacy Policy
                  </p>
                </PrivacyPolicyPopup>
              )}
              {termsAndConditionsContent && (
                <TermsPopup content={termsAndConditionsContent}>
                  <p className="text-template-text-secondary/50 mt-2 hover:text-white transition-colors">
                    Terms and Conditions
                  </p>
                </TermsPopup>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
