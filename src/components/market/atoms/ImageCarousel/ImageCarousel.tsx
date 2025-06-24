import { createRef, RefObject, useRef, useState } from "react";
import { DownArrowIcon } from "@/components/shared/general/atoms/icons/DownArrowIcon";
import { ImageFallback } from "@/components/shared/general/atoms/ImageFallback";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  imagesUrls: string[];
  mapStyles?: boolean;
  hideControls?: boolean;
  listingId?: string;
};

export const ImageCarousel = ({
  imagesUrls,
  mapStyles,
  hideControls,
  listingId,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const calculateOpacity = (index: number): number => {
    const distance = Math.abs(index - currentIndex);
    if (distance === 0) return 1; // Full opacity for the selected dot
    if (distance === 1) return 0.5; // 50% opacity for the adjacent dots
    if (distance === 2) return 0.2; // 20% opacity for the next dots
    if (distance === 3) return 0.15; // 15% opacity for the next dots
    return 0.1; // 10% opacity for the last dots
  };

  const SwiperControls = () => {
    const swiper = useSwiper();

    return (
      <>
        {currentIndex > 0 && !hideControls && (
          <div
            onClick={() => {
              swiper.slidePrev();
            }}
            className="hidden md:flex w-[20px] h-[20px] m-[10px] bg-white rounded-full justify-center items-center transform rotate-[90deg] translate-y-[-20px] absolute top-1/2 left-0 cursor-pointer z-50"
          >
            <DownArrowIcon size={10} fill="black" stroke="black" />
          </div>
        )}
        {currentIndex < filteredImages.length - 1 && !hideControls && (
          <div
            onClick={() => {
              swiper.slideNext();
            }}
            className="hidden md:flex w-[20px] h-[20px] m-[10px] bg-white rounded-full justify-center items-center transform rotate-[-90deg] translate-y-[-20px] absolute top-1/2 right-0 cursor-pointer z-50"
          >
            <DownArrowIcon size={10} fill="black" stroke="black" />
          </div>
        )}
      </>
    );
  };
  const vidRefs = useRef<RefObject<HTMLVideoElement>[]>(
    imagesUrls.map(() => createRef())
  );

  // Filter the image URLs to exclude those with file extensions mp4, mov, avi, or wav
  const filteredImages = imagesUrls.filter(
    (imageUrl) => !/(mp4|mov|MOV|avi|wav)/.test(imageUrl)
  );

  return (
    <div className={`w-full h-full bg-gradient-to-b from-[#2DD9C3] to-[#2D3AAF] overflow-hidden relative flex justify-center items-center cursor-pointer ${pathname === "/" || pathname === "/market" && "rounded-xl"}`}>
      <Swiper
        slidesPerView={1}
        className="h-full w-full"
        onClick={() => router.push(`/market/listing/${listingId}`)}
        onSlideChange={(item) => {
          setCurrentIndex(item.snapIndex);
          // vidRefs.current.forEach((ref, index) => {
          //   if (ref.current) {
          //     ref?.current?.pause();
          //   }
          // });
        }}
      >
        {filteredImages.map((imageUrl, index) => (
          <SwiperSlide
            key={index}
            style={{ borderRadius: pathname === "/" || pathname === "/market" ? "12px" : "0px", width: "100%" }}
          >
            <ImageFallback
              src={imageUrl}
              fallbackSrc="/svgs/icharter_icon.svg"
              alt="Experience Photo"
            />
            <div className="w-full h-[144px] bg-gradient-to-b from-transparent to-[#0F133A] absolute bottom-0"></div>
          </SwiperSlide>
        ))}
        <SwiperControls />
      </Swiper>
      {/* Display dots with varying opacities */}
      {pathname === "/" && (
        <div className="flex absolute left-2 bottom-3">
          {filteredImages.slice(0, 5).map((_, index) => (
            <div
              key={index}
              className={"w-1.5 h-1.5 rounded-full mx-1 bg-white"}
              style={{ opacity: calculateOpacity(index), zIndex: 1 }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
      {pathname === "/market" && (
        <div className="flex absolute bottom-4">
          {filteredImages.slice(0, 5).map((_, index) => (
            <div
              key={index}
              className={"w-1.5 h-1.5 rounded-full mx-1 bg-white"}
              style={{ opacity: calculateOpacity(index), zIndex: 1 }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
