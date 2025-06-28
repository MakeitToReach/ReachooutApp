import { FButton } from "../components/FButton";

export const FNavbarSection = () => {
    return (
        <nav id="navbar" className="flex items-center w-full justify-between py-10">
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

            <div className="flex gap-2">
                <FButton btnText="Get Started" className="py-7 px-10" />
            </div>
        </nav>
    );
};
