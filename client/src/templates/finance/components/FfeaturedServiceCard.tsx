interface FeaturedServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
export const FeaturedServiceCard = ({
  title,
  description,
  icon,
}: FeaturedServiceCardProps) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="size-20 bg-green-100 rounded-full flex items-center justify-center">
        {icon}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg tracking-tight">{title}</h2>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  );
};
