import { LucideMenu } from "lucide-react";
import { FButton } from "../components/FButton";

export const FNavbarSection = () => {
    return (
        <nav
            id="navbar"
            className="flex items-center w-full justify-between py-10 text-template-text-primary"
        >
            <h1 className="font-semibold text-3xl">LOGO</h1>
            <ul className="items-center space-x-6 font-semibold hidden sm:flex">
                <li>Home</li>
                <li>Services</li>
                <li>About</li>
                <li>Process</li>
                <li>Projects</li>
                <li>News</li>
                <li>Contact</li>
            </ul>

            <button className="sm:hidden" onClick={() => alert("WIP")}>
                <LucideMenu size={30} />
            </button>

            <div className="sm:flex gap-2 hidden">
                <FButton btnText="Get Started" className="py-7 px-10" />
            </div>
        </nav>
    );
};
