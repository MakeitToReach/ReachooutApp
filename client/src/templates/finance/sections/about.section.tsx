import Image from "next/image";
import { FButton } from "../components/FButton";
import { F_ABOUT_SECTION } from "../types/about.types";

export const FAboutSection = ({
    badgeText,
    title,
    description,
    imgUrls,
    btnText,
    btnLink,
    experience,
}: F_ABOUT_SECTION) => {
    return (
        <section id="about" className="max-w-6xl mx-auto sm:py-20 py-10 px-4">
            <div className="flex flex-col sm:flex-row justify-between gap-10">
                {/* text content */}
                <div className="flex flex-col sm:gap-8 gap-10 sm:w-1/2 w-full text-template-text-primary">
                    <div className="w-fit rounded-full translate-x-10 bg-gradient-to-r from-template-primary to-template-accent-primary via-template-accent-primary/10 text-template-text-accent-primary flex items-center justify-center px-4 py-2 uppercase font-semibold text-lg">
                        {badgeText}
                    </div>
                    <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight">
                        {title}
                    </h2>
                    <p className="line-clamp-4">{description}</p>

                    <div className="flex items-center gap-2">
                        {experience && (
                            <>
                                <h2 className="font-bold text-7xl  bg-gradient-to-b from-template-primary to-template-accent-primary via-template-accent-primary/10 text-template-text-accent-primary">
                                    {experience}
                                </h2>
                                <h3 className="font-extralight sm:text-3xl text-2xl tracking-tighter font-serif italic">
                                    Years of Experience
                                </h3>
                            </>
                        )}
                    </div>

                    <div className="flex gap-10 items-center">
                        <a href={btnLink}>
                            <FButton btnText={btnText} className="py-7 px-10" />
                        </a>
                    </div>
                </div>

                <div className="self-end relative w-full max-w-[420px] mx-auto sm:h-[500px] h-[400px]">
                    {/* Background image */}
                    <div className="absolute top-0 right-0 w-[70%] sm:w-[300px] aspect-[3/4] overflow-hidden z-0 drop-shadow-xl rounded-xl">
                        <Image
                            src={imgUrls[1]}
                            alt="Background Masked"
                            fill
                            style={{
                                objectFit: "cover",
                                WebkitMaskImage: "url('/mask-image-2.png')",
                                WebkitMaskRepeat: "no-repeat",
                                WebkitMaskSize: "cover",
                                maskImage: "url('/mask-image-2.png')",
                                maskRepeat: "no-repeat",
                                maskSize: "cover",
                            }}
                            priority
                        />
                    </div>

                    {/* Foreground image */}
                    <div className="absolute bottom-0 left-0 w-[80%] sm:w-[300px] aspect-[3/4] overflow-hidden z-10 drop-shadow-xl rounded-2xl">
                        <Image
                            src={imgUrls[0]}
                            alt="Foreground Masked"
                            fill
                            style={{
                                objectFit: "cover",
                                WebkitMaskImage: "url('/mask-image-3.png')",
                                WebkitMaskRepeat: "no-repeat",
                                WebkitMaskSize: "cover",
                                maskImage: "url('/mask-image-3.png')",
                                maskRepeat: "no-repeat",
                                maskSize: "cover",
                            }}
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
