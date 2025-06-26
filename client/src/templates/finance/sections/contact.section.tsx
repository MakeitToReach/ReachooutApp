import { Input } from "@/components/ui/input";
import { FContactButton } from "../components/FContactButton";
import { Textarea } from "@/components/ui/textarea";
import { FButton } from "../components/FButton";
import { Label } from "@/components/ui/label";
import { F_CONTACT_SECTION } from "../types/contact.types";

export const FContactSection = ({
    badgeText,
    title,
    subtitle,
    phoneNumber,
    emailAddress,
}: F_CONTACT_SECTION) => {
    return (
        <section className="max-w-6xl mx-auto sm:py-20 my-10 px-4">
            <div className="flex flex-col sm:flex-row sm:gap-20">
                {/* text content */}
                <div className="flex flex-col sm:gap-8 gap-10 sm:w-1/2 w-full">
                    <div className="w-fit rounded-full translate-x-10 bg-gradient-to-r from-gray-100 to-green-200 via-green-100 flex items-center justify-center px-4 py-2 uppercase font-semibold text-lg">
                        {badgeText}
                    </div>
                    <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight">
                        {title}
                    </h2>
                    <p className="line-clamp-4 text-template-text-primary opacity-60 ">
                        {subtitle}
                    </p>

                    <div className="flex gap-10 items-center">
                        <FContactButton type="tel" value={phoneNumber} />
                        <FContactButton type="email" value={emailAddress} />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 h-fit grid-cols-1 gap-4 space-y-4  mt-10">
                    <div className="space-y-1">
                        <Label className="uppercase font-semibold">Full Name</Label>
                        <Input placeholder="Enter your name" />
                    </div>
                    <div className="space-y-1">
                        <Label className="uppercase font-semibold">Email Address</Label>
                        <Input placeholder="Enter your email" />
                    </div>
                    <div className="space-y-1">
                        <Label className="uppercase font-semibold">Phone number</Label>
                        <Input placeholder="Enter your phone number" type="tel" />
                    </div>
                    <div className="space-y-1">
                        <Label className="uppercase font-semibold">Company Name</Label>
                        <Input placeholder="Enter your company name" />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label className="uppercase font-semibold">Message</Label>
                        <Textarea
                            placeholder="Enter your message"
                            className="col-span-2 h-36"
                        />
                        <FButton btnText="Submit" />
                    </div>
                </div>
            </div>
        </section>
    );
};
