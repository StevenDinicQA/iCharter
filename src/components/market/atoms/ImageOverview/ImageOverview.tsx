import { ImageFallback } from "@/components/shared/general/atoms/ImageFallback";
import { ImageOverviewProps } from "./types";
import { ImageCarousel } from "../ImageCarousel";
import { useEffect, useState } from "react";
import { MediaSlider } from "@/components/shared/general/molecules/MediaSlider";

export function ImageOverview({ media }: ImageOverviewProps) {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState<boolean>(false);

  return (
    <section className="h-full">
      <MediaSlider
        open={isMediaModalOpen}
        onClose={() => {
          setIsMediaModalOpen(false);
        }}
        media={media}
      />
      <div className="h-full flex xl:hidden bg-slate-300 relative">
        <ImageCarousel
          imagesUrls={media.map((mediaItem) => mediaItem.fileUrl)}
        />
      </div>
      <div className="h-full hidden xl:grid grid-cols-4 grid-rows-2 gap-[20px]">
        {media.slice(0, 5).map((mediaItem, index) => (
          <div
            key={mediaItem.fileUrl}
            className={`w-full h-full bg-slate-200 rounded-[12px] overflow-hidden relative cursor-pointer ${
              index === 0 && "row-span-2 col-span-2"
            }`}
            onClick={() => {
              setIsMediaModalOpen(true);
            }}
          >
            {/(mp4|mov|avi|wav)/.test(mediaItem.fileUrl) ? (
              <video
                src={mediaItem.fileUrl}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <ImageFallback
                src={mediaItem.fileUrl}
                fallbackSrc="/svgs/icharter_icon.svg"
                alt="Listing Image"
                className="w-full h-full object-cover"
              />
            )}
            {media.length > 5 && index === 4 && (
              <button className="text-white text-[16px] font-[700] underline w-full h-full absolute top-0 left-0 bg-black/50">
                {media.length - 5} more photos
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
