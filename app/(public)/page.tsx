import Cta from "@/components/Cta";
import DoctorsComp from "@/components/Doctors";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import MainAbout from "@/components/MainAbout";
import Services from "@/components/Services";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <MainAbout />
      <Testimonial />
      <FAQ />
      <DoctorsComp />
      <Cta />
    </main>
  );
}
