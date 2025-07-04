import { PF_EXPERIENCE_ITEM } from "../types/experience.types";

export const PFExperienceItem = ({
    title,
    subtitle,
    description,
    timePeriod,
}: PF_EXPERIENCE_ITEM) => {
    return (
        <div className="flex flex-col gap-2 text-template-text-accent-secondary">
            <div>
                <h3 className="font-semibold text-xl">{title}</h3>
                <p>{subtitle}</p>
            </div>
            {description && <p>{description}</p>}
            <p>{timePeriod}</p>
        </div>
    );
};
