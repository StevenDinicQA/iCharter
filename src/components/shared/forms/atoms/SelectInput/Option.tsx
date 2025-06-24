import { ImageFallback } from "@/components/shared/general/atoms/ImageFallback";
import { FALLBACK_IMAGE } from "@/utils/constants";
import { OptionProps, components } from "react-select";
import { RSOptionWithPhoto } from "./types";

/**
 * Custom Option component for the select component of 'react-select'
 */
export const OptionWithPhoto = ({
  children,
  ...props
}: OptionProps<RSOptionWithPhoto>) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-[10px]" test-id={props.data.value}>
        <div className="w-[40px] h-[40px] relative">
          <ImageFallback
            contain
            src={props.data.imageUrl}
            fallbackSrc={FALLBACK_IMAGE}
            alt={props.data.label}
          />
        </div>
        <p>{children}</p>
      </div>
    </components.Option>
  );
};
