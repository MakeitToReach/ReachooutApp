import { PF_STAT } from "../types/stat";

interface PFAboutSetionProps {
    title: string;
    colorTitle: string;
    description: string;
    stats: PF_STAT[];
}
export const PFAboutSection = ({
    title,
    colorTitle,
    description,
    stats,
}: PFAboutSetionProps) => {
    return (
        <section className="max-w-6xl mx-auto">
            <div className="px-4 lg:px-0 flex flex-col lg:flex-row w-full lg:gap-20 lg:mt-20">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-2 gap-y-2 lg:gap-5 lg:mt-20 h-fit lg:w-1/2">
                    <div className="flex flex-col justify-center items-center rounded-sm bg-[#d6eef8] max-h-48 p-10 overflow-hidden">
                        <h1 className="font-bold text-5xl lg:text-7xl text-[#1e1e1e]">
                            {stats[0].value}
                        </h1>
                        <h2 className="text-[#1e1e1e] mt-2 text-xl lg:text-2xl w-full text-center">
                            {stats[0].title}
                        </h2>
                    </div>
                    <div className="flex flex-col justify-center items-center rounded-sm bg-[#d6eef8] h-48 p-6">
                        <h1 className="font-bold text-5xl lg:text-7xl text-[#1e1e1e]">
                            {stats[1].value}
                        </h1>
                        <h2 className="text-[#1e1e1e] mt-2 text-xl w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">
                            {stats[1].title}
                        </h2>
                    </div>
                    <div className="flex flex-col justify-center items-center rounded-sm bg-[#d6eef8] h-48 p-6">
                        <h1 className="font-bold text-5xl lg:text-7xl text-[#1e1e1e] ">
                            {stats[2].value}
                        </h1>
                        <h2 className="text-[#1e1e1e] mt-2 text-xl w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">
                            {stats[2].title}
                        </h2>
                    </div>
                    <div className="flex flex-col justify-center items-center rounded-sm bg-[#d6eef8] h-48 p-6 truncate">
                        <h1 className="font-bold text-5xl lg:text-7xl text-[#1e1e1e]">
                            {stats[3].value}
                        </h1>
                        <h2 className="text-[#1e1e1e] mt-2 text-xl w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">
                            {stats[3].title}
                        </h2>
                    </div>
                </div>
                {/* Content */}
                <div className="flex flex-col gap-6 mt-8 lg:mt-0 lg:w-3/5">
                    <h1 className="text-3xl lg:text-5xl font-semibold text-[#1e1e1e]">
                        About Me
                    </h1>
                    <h2 className="uppercase font-medium">
                        {title} <span className="text-[#f8b84e]">{colorTitle}</span>
                    </h2>
                    <p className="text-[#1e1e1e] leading-relaxed">{description}</p>

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
            </div>
        </section>
    );
};
