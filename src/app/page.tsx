import HeroCarousel from "@/components/home/HeroCarousel";
import { HomePageCarousel } from "@/components/home/HomePageCarousel";
import { Range } from "@/components/home/Range";

export default function Home() {
  return (
    <main className="home-section">
      <HeroCarousel />
      <Range />
      <HomePageCarousel />
    </main>
  );
}
