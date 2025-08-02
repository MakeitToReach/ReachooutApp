import { PF_EXPERIENCE_ITEM } from "../types/experience.types";

export const PFExperienceItem = ({
  title,
  subtitle,
  description,
  timePeriod,
}: PF_EXPERIENCE_ITEM) => {
  return (
    <div className="flex flex-col gap-2 text-template-text-secondary">
      <div>
        <h3 className="font-semibold text-xl">{title}</h3>
        <p className="sm:text-lg text-xl">{subtitle}</p>
      </div>
      {description && (
        <div
          className="
    prose prose-lg sm:prose-base max-w-none text-template-text-secondary
    prose-p:text-template-text-secondary
    prose-strong:text-template-text-secondary
    prose-h1:text-template-text-secondary
    prose-h2:text-template-text-secondary
    prose-h3:text-template-text-secondary
    prose-h4:text-template-text-secondary
    prose-h5:text-template-text-secondary
    prose-h6:text-template-text-secondary
  "
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      <p className="text-sm text-template-text-secondary/70">{timePeriod}</p>
    </div>
  );
};
