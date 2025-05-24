"use client";

import Image from "next/image";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  DotButton,
  useDotButton,
} from "@/components/home/EmblaCarouselDotButton";

export const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay()]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi as EmblaCarouselType
  );

  const carouselImages = [
    {
      id: 1,
      image: "/assets/images/carousel-section/carousel1.webp",
      title: "T-13",
      description: "Action Figure",
    },
    {
      id: 2,
      image: "/assets/images/carousel-section/carousel2.webp",
    },
    {
      id: 3,
      image: "/assets/images/carousel-section/carousel3.webp",
    },
    {
      id: 4,
      image: "/assets/images/carousel-section/carousel4.webp",
    },
    {
      id: 5,
      image: "/assets/images/carousel-section/carousel5.webp",
    },
  ];

  return (
    <div className="relative overflow-hidden embla" ref={emblaRef}>
      <div className="flex gap-6 embla__container">
        {carouselImages.map((image) => (
          <div
            key={image.id}
            className="min-w-0 lg:max-w-[400px] max-w-[320px] flex-[0_0_80%] lg:flex-[0_0_45%] embla__slide last:mr-6"
          >
            <Image
              src={image.image}
              alt={`carousel${image.id}`}
              className="w-full"
              width={1920}
              height={1080}
            />
            {image.title && (
              <div className="absolute p-5 xsm:p-8 bottom-6 left-6 rounded backdrop-blur bg-[#FFFFFFB8] w-max">
                <p className="text-sm xsm:text-base text-[#616161]">
                  01{" "}
                  <span className="after:content-[''] after:w-6 xsm:after:w-8 after:absolute relative after:-translate-y-1/2 after:right-1/2 after:translate-x-1/2 after:top-1/2 mr-5 mx-4 xsm:mx-6 xsm:mr-7 after:h-[2px] after:bg-[#616161]"></span>{" "}
                  {image.title}
                </p>
                <p className="mt-2 text-lg xsm:text-2xl font-semibold text-[#3A3A3A]">
                  {image.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <button
            className="flex absolute -translate-y-1/2 z-20 top-1/2 left-5 items-center justify-center w-10 h-10 xsm:w-12 xsm:h-12 rounded-full text-[#83AAC9] shadow-[0px_0px_10px_-1px_rgba(0,0,0,0.2)] bg-white  cursor-pointer embla__prev"
            onClick={scrollPrev}
          >
            <svg
              className="w-5 xsm:w-6 embla__button__svg"
              viewBox="0 0 532 532"
            >
              <path
                fill="currentColor"
                d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0A5994246.277 5994246.277 0 00126.328 291.2a35.065 35.065 0 01-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354z"
              />
            </svg>
          </button>
          <button
            className="flex absolute -translate-y-1/2 z-20 top-1/2 right-5 items-center justify-center w-10 h-10 xsm:w-12 xsm:h-12 rounded-full text-[#83AAC9] shadow-[0px_0px_10px_-1px_rgba(0,0,0,0.2)] bg-white  cursor-pointer embla__next"
            onClick={scrollNext}
          >
            <svg
              className="w-5 xsm:w-6 embla__button__svg"
              viewBox="0 0 532 532"
            >
              <path
                fill="currentColor"
                d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454A35.065 35.065 0 01416 265.927c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52z"
              />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-0 flex flex-wrap items-center justify-end right-1/3 embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot after:content-[''] after:w-[10px] after:h-[10px] xsm:after:w-3 xsm:after:h-3 after:rounded-full after:flex after:items-center after:bg-[#83AAC9] appearance-none bg-transparent touch-manipulation cursor-pointer w-5 h-5 xsm:w-7 xsm:h-7 flex justify-center items-center rounded-full".concat(
                index === selectedIndex
                  ? " embla__dot--selected border-[#83AAC9] border-2"
                  : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
