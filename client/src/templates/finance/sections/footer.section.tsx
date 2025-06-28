import { Input } from "@/components/ui/input";
import { FButton } from "../components/FButton";

export const FFooterSection = () => {
    return (
        <footer id="footer" className="border-t border-border">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-10 justify-between px-4  py-10">
                <div className="flex sm:w-1/3 w-full flex-col gap-3">
                    <h3 className="font-semibold text-xl">Logo</h3>

                    <p className="line-clamp-3 text-black/50">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                        laboriosam doloribus possimus non temporibus odit deleniti eos ullam
                        beatae laborum!
                    </p>

                    <div className="flex items-center gap-2">
                        <h2 className="font-bold text-2xl  bg-gradient-to-b from-gray-100 to-green-200 via-green-100">
                            30+
                        </h2>
                        <h3 className="font-extralight sm:text-3xl text-base tracking-tighter font-serif italic">
                            Years of Experience
                        </h3>
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
