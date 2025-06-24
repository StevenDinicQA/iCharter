import { ImageFallback } from "@/components/shared/general/atoms/ImageFallback";
import { FALLBACK_IMAGE } from "@/utils/constants";
import { SingleValueProps, components } from "react-select";
import { RSOptionWithPhoto } from "./types";

/**
 * Custom SingleValue components for the select component of 'react-select'
 */
export const SingleValueWithPhoto = ({
  children,
  ...props
}: SingleValueProps<RSOptionWithPhoto>) => {
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-[10px]" test-id={props.data.value}>
        <div className="w-[40px] h-[40px] relative">
          <ImageFallback
            contain
            src={props.data.imageUrl}
            fallbackSrc={FALLBACK_IMAGE}
            alt={props.data.label}
            shouldDisplay={props.data.imageUrl !== ""}
          />
        </div>
        <p>{children}</p>
      </div>
    </components.SingleValue>
  );
};
