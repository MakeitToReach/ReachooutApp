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
      {description && (
        <div
          className="
    prose prose-sm max-w-none text-template-text-primary
    prose-p:text-template-text-primary
    prose-strong:text-template-text-primary
    prose-h1:text-template-text-primary
    prose-h2:text-template-text-primary
    prose-h3:text-template-text-primary
    prose-h4:text-template-text-primary
    prose-h5:text-template-text-primary
    prose-h6:text-template-text-primary
  "
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      <p>{timePeriod}</p>
    </div>
  );
};
