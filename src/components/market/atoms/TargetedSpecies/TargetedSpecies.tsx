import { ImageFallback } from "@/components/shared/general/atoms/ImageFallback";
import { TargetedSpeciesProps } from "./type";

export function TargetedSpecies({ species }: TargetedSpeciesProps) {
  return (
    <div className="flex flex-wrap gap-[20px_0]">
      {species.map((speciesItem) => (
        <div
          key={speciesItem.value}
          className="w-full xl:w-1/2 flex items-center gap-[15px]"
        >
          <div className="w-[75px] h-[75px] relative rounded-[12px] overflow-hidden">
            <ImageFallback
              contain
              src={speciesItem.imageUrl}
              fallbackSrc="/svgs/icharter_icon.svg"
              alt={speciesItem.label}
            />
          </div>
          <p>{speciesItem.label}</p>
        </div>
      ))}
    </div>
  );
}
