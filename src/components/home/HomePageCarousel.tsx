import { EmblaCarousel } from "./EmblaCarousel";

export const HomePageCarousel = () => {
  return (
    <section className="bg-[#FCF8F3] py-11 my-14 max-w-[1920px] mx-auto">
      <div className="flex flex-col-reverse items-center gap-10 mx-4 md:flex-row xsm:mx-8 max-w-screen-2xl 2xl:mx-auto">
        <div className="max-w-md max-md:mr-auto">
          <h3 className="mb-2 text-2xl lg:text-4xl font-bold text-[#3A3A3A]">
            50+ Beautiful unique products
          </h3>
          <p className="text-sm lg:text-base mb-6 font-medium text-[#616161]">
            Discover our exclusive collection of handcrafted products, designed
            to bring a touch of elegance to your home.
          </p>
          <a
            href="/shop"
            className="inline-block px-6 lg:px-8 py-3 lg:py-4 hover:bg-[#8399C9] rounded ease-linear duration-300 text-white bg-[#83AAC9]"
          >
            Explore More
          </a>
        </div>
        <EmblaCarousel />
      </div>
    </section>
  );
};
