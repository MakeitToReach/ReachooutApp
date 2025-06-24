import { Separator } from "@/components/ui/separator";
import { FeaturedServiceCard } from "../components/FfeaturedServiceCard";
import { HandCoins, Landmark, LucideGlobeLock } from "lucide-react";

const FEAT_SERVICES_STATIC_DATA = [
  {
    title: "Global Accounting",
    description: "Expert accounting services for global businesses",
    icon: <LucideGlobeLock size={80} className="size-14 sm:size-20" />,
  },
  {
    title: "Tax Consulting",
    description: "Optimize your taxes with expert consulting planning",
    icon: <HandCoins size={80} className="size-16 sm:size-20" />,
  },
  {
    title: "Admin Services",
    description: "Streamline your operations with our administrative services",
    icon: <Landmark size={80} className="size-16 sm:size-20" />,
  },
];
export const FFeaturedServicesSection = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto py-10">
        <div className="flex flex-col sm:flex-row gap-10 items-center">
          {FEAT_SERVICES_STATIC_DATA.map((service, index) => (
            <FeaturedServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
      <Separator />
    </section>
  );
};
