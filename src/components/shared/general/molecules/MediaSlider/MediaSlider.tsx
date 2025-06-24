import { useRef, useState } from "react";
import { MediaSliderProps } from "./types";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { ImageFallback } from "../../atoms/ImageFallback";
import { CloseIcon } from "../../atoms/icons/CloseIcon";
import { RightArrowIcon } from "../../atoms/icons/RightArrowIcon";
import "swiper/css";

export function MediaSlider({ open, onClose, media }: MediaSliderProps) {
  const [currentMedia, setCurrentMedia] = useState<number>(0);
  const ref = useRef<HTMLElement>(null);

  const handleClose = () => {
    setCurrentMedia(0);
    onClose?.();
  };

  const CustomControls = () => {
    const swiper = useSwiper();

    return (
      <>
        {createPortal(
          <div
            onClick={() => {
              swiper.slidePrev();
            }}
            className="w-[50px] h-[50px] flex items-center justify-center fixed top-1/2 left-[5%] bg-white z-[99999] rounded-full rotate-[180deg] cursor-pointer"
          >
            <RightArrowIcon size={18} />
          </div>,
          document.body
        )}
        {createPortal(
          <div
            onClick={() => {
              swiper.slideNext();
            }}
            className="w-[50px] h-[50px] flex items-center justify-center fixed top-1/2 right-[5%] bg-white z-[99999] rounded-full cursor-pointer"
          >
            <RightArrowIcon size={18} />
          </div>,
          document.body
        )}
      </>
    );
  };

  return createPortal(
    open && (
      <div className="text-[20px] w-full h-screen bg-black/75 flex justify-center items-center fixed top-0 left-0 backdrop-blur-[2px] z-[99998] select-none">
        <p className="text-white mt-[50px] absolute top-0 left-1/2 transform translate-x-[-50%]">
          {currentMedia + 1}/{media.length}
        </p>
        <button
          className="text-white m-[50px] flex items-center gap-[4px] absolute top-0 right-0 transform translate-x-[-50%]"
          onClick={handleClose}
        >
          <CloseIcon size={24} /> Exit
        </button>
        <section className="w-[70%] h-[70%]" ref={ref}>
          <Swiper
            spaceBetween={50}
            className="h-full"
            onSlideChange={(swiper) => {
              setCurrentMedia(swiper.realIndex);
            }}
          >
            {media.map((mediaItem) => (
              <SwiperSlide key={mediaItem.fileUrl} className="h-full rounded-[12px] overflow-hidden">
                {/(mp4|mov|avi|wav)/.test(mediaItem.fileUrl) ? (
                  <video
                    src={mediaItem.fileUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageFallback
                    contain
                    src={mediaItem.fileUrl}
                    fallbackSrc="/svgs/icharter_icon.svg"
                    alt="A photo uploaded by the charter for the experience"
                  />
                )}
              </SwiperSlide>
            ))}
            <CustomControls />
          </Swiper>
        </section>
      </div>
    ),
    document.body
  );
}
