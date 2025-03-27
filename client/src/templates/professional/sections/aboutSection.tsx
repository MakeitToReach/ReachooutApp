export const PFAboutSection = () => {
    return (
        <section className="px-4 lg:px-0 flex flex-col lg:flex-row lg:justify-between lg:mt-20 max-w-6xl mx-auto">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2 gap-y-2 lg:mt-20 h-fit">
                <div className="flex flex-col justify-center items-center rounded-sm bg-[#d6eef8] h-48 p-6">
                    <h1 className="font-bold text-5xl lg:text-6xl text-[#1e1e1e]">8+</h1>
                    <h2 className="text-[#1e1e1e] mt-2 text-xl">IT Experience</h2>
                </div>
                <div className="flex flex-col justify-center items-center rounded-sm bg-[#d6eef8] h-48 p-6">
                    <h1 className="font-bold text-5xl lg:text-6xl text-[#1e1e1e]">8+</h1>
                    <h2 className="text-[#1e1e1e] mt-2 text-xl">IT Experience</h2>
                </div>
                <div className="flex flex-col justify-center items-center rounded-sm bg-[#d6eef8] h-48 p-6">
                    <h1 className="font-bold text-5xl lg:text-6xl text-[#1e1e1e]">8+</h1>
                    <h2 className="text-[#1e1e1e] mt-2 text-xl">IT Experience</h2>
                </div>
                <div className="flex flex-col justify-center items-center rounded-sm bg-[#d6eef8] h-48 p-6">
                    <h1 className="font-bold text-5xl lg:text-6xl text-[#1e1e1e]">8+</h1>
                    <h2 className="text-[#1e1e1e] mt-2 text-xl">IT Experience</h2>
                </div>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-6 mt-8 lg:mt-0 lg:w-3/5">
                <h1 className="text-3xl lg:text-5xl font-semibold text-[#1e1e1e]">
                    About Me
                </h1>
                <h2 className="uppercase font-medium">
                    FOUNDER OF{" "}
                    <span className="text-[#f8b84e]">INCUBE COWORKING SPACE</span>
                </h2>
                <p className="text-[#1e1e1e] leading-relaxed">
                    InCube coworking space, founded in 2017 has its branches in Pune,
                    Nasik and Nagpur with total 250 seats all over centres.
                    We are dedicated to provide inspiring and affordable workspace for
                    entrepreneurs, freelancers, startups and established alike.
                    Our services are Managed office spaces, Built to suit office, Hot
                    desks, Dedicated desks, Private offices, Virtual offices, Meeting room
                    and Event spaces.
                    Our mission is to foster a vibrant community where ideas thrive,
                    creativity flourishes and businesses grow. We are looking for a
                    business collaborations and investors to grow in TIER 1 and 2 cities.
                </p>

                <ul className="grid grid-cols-2 gap-y-3 gap-x-4 mt-2">
                    <li className="flex items-center">
                        <span className="inline-block w-4 h-4 mr-2 bg-[#fbe8d3] rounded-sm"></span>
                        <span className="font-medium">Centers in 3+ cities</span>
                    </li>
                    <li className="flex items-center">
                        <span className="inline-block w-4 h-4 mr-2 bg-[#d6eef8] rounded-sm"></span>
                        <span className="font-medium">Founded in 2017</span>
                    </li>
                    <li className="flex items-center">
                        <span className="inline-block w-4 h-4 mr-2 bg-[#d6eef8] rounded-sm"></span>
                        <span className="font-medium">
                            Savitribai Phule Pune University
                        </span>
                    </li>
                    <li className="flex items-center">
                        <span className="inline-block w-4 h-4 mr-2 bg-[#fbe8d3] rounded-sm"></span>
                        <span className="font-medium">100% +ve reviews</span>
                    </li>
                </ul>
            </div>
        </section>
    );
};
