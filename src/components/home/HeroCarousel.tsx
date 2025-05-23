"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Slide = {
  id: number;
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  position?: "left" | "center" | "right";
  theme?: "light" | "dark";
};

const slides: Slide[] = [
  {
    id: 1,
    image: "/assets/images/dummy_hero.webp",
    title: "Summer Collection 2025",
    description: "Discover our latest styles for the season",
    ctaText: "Shop Now",
    ctaLink: "/shop/summer",
    position: "left",
    theme: "light",
  },
  {
    id: 2,
    image: "/assets/images/dummy_hero.webp",
    title: "Exclusive Limited Edition",
    description: "Premium quality, designed for comfort",
    ctaText: "Buy Now",
    ctaLink: "/shop/limited",
    position: "center",
    theme: "light",
  },
  {
    id: 3,
    image: "/assets/images/dummy_hero.webp",
    title: "New Arrivals",
    description: "Be the first to experience our newest products",
    ctaText: "Explore",
    ctaLink: "/shop/new",
    position: "right",
    theme: "light",
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 8,
    },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/30" />

      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="embla__slide flex-[0_0_100%] min-w-0 relative"
            >
              <div className="relative h-[80vh] md:h-[85vh] w-full overflow-hidden">
                <Image
                  src={slide.image || "/assets/images/logos/banner.webp"}
                  alt={slide.title}
                  fill
                  priority
                  className={cn(
                    "object-cover object-center transition-transform duration-[1.5s]",
                    selectedIndex === index ? "scale-105" : "scale-100"
                  )}
                  style={{
                    objectPosition: "center center",
                  }}
                />
                <div
                  className={cn(
                    "absolute inset-0 flex items-center z-20 px-8 md:px-16 lg:px-24",
                    slide.position === "left"
                      ? "justify-start"
                      : slide.position === "right"
                      ? "justify-end"
                      : "justify-center"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-xl transition-all duration-1000 ease-out",
                      selectedIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10",
                      slide.position === "center" && "text-center"
                    )}
                  >
                    <h2
                      className={cn(
                        "text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-tight",
                        slide.theme === "light" ? "text-white" : "text-zinc-900"
                      )}
                    >
                      {slide.title}
                    </h2>
                    <p
                      className={cn(
                        "text-lg md:text-xl mb-8",
                        slide.theme === "light"
                          ? "text-white/90"
                          : "text-zinc-800"
                      )}
                    >
                      {slide.description}
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className={cn(
                        "rounded-full px-8 py-6 text-base font-medium transition-transform hover:scale-105",
                        slide.theme === "dark"
                          ? "bg-zinc-900 text-white hover:bg-zinc-800"
                          : ""
                      )}
                    >
                      <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        variant="ghost"
        size="icon"
        className="absolute cursor-pointer left-6 top-1/2 -translate-y-1/2 z-30 bg-white/15 backdrop-blur-md hover:bg-white/30 text-white rounded-full h-14 w-14 shadow-lg transition-all hover:scale-110"
      >
        <ChevronLeft className="h-7 w-7 text-black" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        variant="ghost"
        size="icon"
        className="absolute cursor-pointer right-6 top-1/2 -translate-y-1/2 z-30 bg-white/15 backdrop-blur-md hover:bg-white/30 text-white rounded-full h-14 w-14 shadow-lg transition-all hover:scale-110"
      >
        <ChevronRight className="h-7 w-7 text-black" />
        <span className="sr-only">Next slide</span>
      </Button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-white w-8 shadow-lg"
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
