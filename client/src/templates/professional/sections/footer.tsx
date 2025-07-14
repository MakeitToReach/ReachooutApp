// import {
//     IconBrandFacebook,
//     IconBrandGithub,
//     IconBrandInstagram,
//     IconBrandLinkedin,
//     IconBrandX,
//     IconBrandYoutube,
// } from "@tabler/icons-react";
import { getSocialIconFromRegistry } from "@/lib/utils";
import { PF_FOOTER_SECTION } from "../types/footer.types";

export const PFFooter = ({
    logoText,
    logoUrl,
    description,
    address,
    email,
    phone,
    socials,
}: PF_FOOTER_SECTION) => {
    return (
        <footer id="footer" className="bg-template-secondary text-template-text-secondary py-8">
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
    prose prose-sm max-w-none text-template-text-secondary/50
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
                        <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
                        <p className="text-template-text-secondary/50 text-sm">{address}</p>
                        <p className="text-template-text-secondary/50 text-sm mt-2">
                            <a
                                href={`mailto:${email}`}
                                className="hover:text-white transition-colors"
                            >
                                {email}
                            </a>
                        </p>
                        <p className="text-template-text-secondary/50 text-sm mt-2">
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
                            <h3 className="text-lg font-semibold mb-4">Connect with Me</h3>
                            <div className="flex gap-4">
                                {socials.filter((social) => social.url).map((social, index) => {
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
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
