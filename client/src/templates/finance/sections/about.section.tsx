import { FButton } from "../components/FButton";

export const FAboutSection = () => {
    return (
        <section className="max-w-6xl mx-auto sm:py-20 py-10 px-4">
            <div className="flex flex-col sm:flex-row">
                {/* text content */}
                <div className="flex flex-col sm:gap-8 gap-10 sm:w-1/2 w-full">
                    <div className="w-fit rounded-full translate-x-10 bg-gradient-to-r from-gray-100 to-green-200 via-green-100 flex items-center justify-center px-4 py-2 uppercase font-semibold text-lg">
                        Who we are
                    </div>
                    <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight">
                        Your Trusted Financial Partners and Advisors
                    </h2>
                    <p className="line-clamp-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum non
                        nihil, labore sequi vel sint suscipit veniam laboriosam esse
                        placeat, voluptatum aliquam magni corrupti illo qui quasi temporibus
                        eligendi est.
                    </p>

                    <div className="flex items-center gap-2">
                        <h2 className="font-bold text-7xl  bg-gradient-to-b from-gray-100 to-green-200 via-green-100">
                            30+
                        </h2>
                        <h3 className="font-extralight sm:text-3xl text-2xl tracking-tighter font-serif italic">
                            Years of Experience
                        </h3>
                    </div>

                    <div className="flex gap-10 items-center">
                        <FButton btnText="Learn more" className="py-7 px-10" />
                    </div>
                </div>

                <div className="self-end">
                    {/* <img src="https://github.com/shadcn.png" alt="about-img" /> */}
                </div>
            </div>
        </section>
    );
};
