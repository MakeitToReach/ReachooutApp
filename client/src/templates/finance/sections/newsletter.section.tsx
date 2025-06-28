import { Input } from "@/components/ui/input";
import { FButton } from "../components/FButton";

export const FNewsletterSection = () => {
    return (
        <section id="newsletter" className="w-full rounded-lg bg-template-secondary overflow-hidden my-14 px-6 py-4">
            <div className="max-w-6xl mx-auto h-full text-white my-10 space-y-8 overflow-x-visible flex flex-col items-center justify-center">
                <h2 className="font-semibold sm:text-4xl text-3xl tracking-tight text-center">
                    Delivering Excellence through expertise and dedication
                </h2>
                <div className="flex gap-2 items-center justify-center">
                    <Input placeholder="Enter your email" />
                    <FButton btnText="Subscribe" className="py-7 px-10" />
                </div>
            </div>
        </section>
    );
};
