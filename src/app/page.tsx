import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Collections } from "@/components/home/Collections";
import { ShopBySpace } from "@/components/home/ShopBySpace";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { BestSellers } from "@/components/home/BestSellers";
import { WallToWall } from "@/components/home/WallToWall";
import { Process } from "@/components/home/Process";
import { Stats } from "@/components/home/Stats";
import { Testimonial } from "@/components/home/Testimonial";
import { Instagram } from "@/components/home/Instagram";
import { PreFooter } from "@/components/home/PreFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Collections />
      <ShopBySpace />
      <WhyChooseUs />
      <BestSellers />
      <WallToWall />
      <Process />
      <Stats />
      <Testimonial />
      <Instagram />
      <PreFooter />
    </>
  );
}
