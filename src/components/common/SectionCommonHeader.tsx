import Image from "next/image";
import Link from "next/link";

export const SectionCommonHeader = ({
  name,
  prev,
  curr,
}: {
  name: string;
  prev: string;
  curr: string;
}) => {
  return (
    <div className="relative">
      <Image
        src="/assets/images/section-common-hero.webp"
        alt="sectionHeroImg"
        className="object-center object-cover w-full h-[316px] blur-[3px] opacity-70"
        width={1920}
        height={786}
      />
      <div className="flex flex-col items-center justify-center absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Image
          src="/assets/images/logos/logo.webp"
          alt="icon"
          className="mx-auto mb-2"
          width={96}
          height={96}
        />
        <h3 className="mb-5 text-2xl font-semibold xsm:text-4xl md:text-5xl">
          {name}
        </h3>
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs font-semibold xsm:text-sm">
            <Link href="/">{prev}</Link>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={8}
            height={14}
            viewBox="0 0 8 14"
            fill="none"
          >
            <path d="M0 12l5-5-5-5 1-2 7 7-7 7-1-2z" fill="#000" />
          </svg>
          <span className="text-[#1e1e25] text-xs xsm:text-sm">{curr}</span>
        </div>
      </div>
    </div>
  );
};
