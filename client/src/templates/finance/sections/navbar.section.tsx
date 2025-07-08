import { FNavbar } from "../components/FNavbar";
import { F_NAVBAR_SECTION } from "../types/navbar.types";

export const FNavbarSection = ({
    logoUrl,
    textLogo,
    sections,
    btnText,
    btnLink,
}: F_NAVBAR_SECTION) => {
    return (
        <FNavbar
            logoUrl={logoUrl}
            textLogo={textLogo}
            sections={sections}
            btnText={btnText}
            btnLink={btnLink}
        />
    );
};
