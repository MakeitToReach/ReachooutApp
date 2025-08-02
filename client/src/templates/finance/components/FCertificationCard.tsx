import Image from "next/image";
import { F_CERTIFICATION } from "../types/certification.types";

export const FCertificationCard = ({
  imgUrl,
  title,
}: F_CERTIFICATION) => {
  return (
    <div className="h-fit w-full bg-template-primary rounded-sm overflow-hidden flex flex-col items-center p-4 text-template-text-primary">
      <Image
        quality={100}
        src={imgUrl || "/placeholder.png"}
        alt="certification-img"
        width={120}
        height={120}
        className="w-auto h-24 object-contain mb-2"
      />
      <span className="text-lg font-medium text-center line-clamp-2">{title}</span>
    </div>
  );
}; 