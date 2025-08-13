import About from "@/components/About";
import Docs from "@/components/Docs";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Header/>
      <Hero/>
      <Docs/>
      <Feature/>
      <About/>
      <Footer/>
    </div>
  );
}
