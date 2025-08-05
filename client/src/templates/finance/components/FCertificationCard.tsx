import Image from "next/image";
import { F_CERTIFICATION } from "../types/certification.types";
import { Lightbox } from "@/components/Lightbox";

export const FCertificationCard = ({ imgUrl, title }: F_CERTIFICATION) => {
  return (
    <div className="h-fit w-full bg-template-primary rounded-lg overflow-hidden flex flex-col items-center p-4 text-template-text-primary">
      <Lightbox imageUrl={imgUrl || "/placeholder.png"} alt="certification-img">
        <Image
          quality={100}
          src={imgUrl || "/placeholder.png"}
          alt="certification-img"
          width={120}
          height={120}
          className="w-auto h-24 object-contain mb-2"
        />
      </Lightbox>
      <span className="text-lg font-medium text-center line-clamp-2">
        {title}
      </span>
    </div>
  );
};
