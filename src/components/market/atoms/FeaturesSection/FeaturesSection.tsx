import { CheckIcon } from "@/components/shared/general/atoms/icons/CheckIcon";
import { FeaturesSectionProps } from "./types";

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <div className="flex flex-col xl:grid grid-cols-5 gap-[30px_0]">
      {features &&
        features.map((feature) => (
          <div key={feature} className="flex items-center gap-[8px]">
            <CheckIcon size={24} stroke="#2D3AAF" />
            <p title={feature}>
              {feature.slice(0, 15).trimEnd()}
              {feature.length >= 15 && "..."}
            </p>
          </div>
        ))}
    </div>
  );
}
