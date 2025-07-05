import { FNavbar } from "../components/FNavbar";
import { F_NAVBAR_SECTION } from "../types/navbar.types";

export const FNavbarSection = ({
    logoUrl,
    textLogo,
    sections,
}: F_NAVBAR_SECTION) => {
    return (
        <FNavbar
            logoUrl={logoUrl}
            textLogo={textLogo}
            sections={sections}
        />
    );
};
