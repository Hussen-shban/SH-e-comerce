import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Categore from "./components/Categore";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-[#111111]  ">
      <Nav />
      <Hero />
  
      <Categore/>
      <AboutUs/>
      <Footer/>

    </div>
  );
}
