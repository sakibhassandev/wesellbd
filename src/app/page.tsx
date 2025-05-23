import HeroCarousel from "@/components/home/HeroCarousel";
import { Range } from "@/components/home/Range";

export default function Home() {
  return (
    <main className="home-section">
      <HeroCarousel />
      <Range />
    </main>
  );
}
