import { FTeamCard } from "../components/FTeamCard";

export const FTeamSection = () => {
    return (
        <section className="w-full rounded-lg h-[90vh] bg-template-secondary overflow-hidden my-14 px-6 py-4">
            <div className="max-w-6xl mx-auto h-full text-white my-10 space-y-8 overflow-x-visible">
                <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight text-center">
                    Meet the Professionals full of expertise and dedication
                </h2>
                <div className="w-[100vw] bg-black rounded-lg">
                    <FTeamCard
                        imgUrl="/placeholder.png"
                        name="John Doe"
                        designation="CEO"
                    />
                </div>
            </div>
        </section>
    );
};
