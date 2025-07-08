import { FLogos } from "../components/FLogos";
import { F_LOGOS_SECTION } from "../types/logos.types";

export const FLogoSection = ({
    heading,
    subHeading,
    imgs,
}: F_LOGOS_SECTION) => {
    return (
        <section id="logos" className="w-full rounded-lg overflow-hidden my-14 px-6 py-4">
            <div className="max-w-6xl mx-auto h-full my-10 space-y-8 overflow-x-visible text-template-text-primary">
                <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight text-center">
                    {heading}
                </h2>
                <p className="text-center line-clamp-4">{subHeading}</p>
                {/* logos */}
                <FLogos imgs={imgs} />
                {/* <div className="w-[100vw] bg-black rounded-lg"></div> */}
            </div>
        </section>
    );
};
