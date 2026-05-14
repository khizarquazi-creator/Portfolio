import { useNavigate } from "react-router-dom";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Portfolio } from "../components/Portfolio";
import { Process } from "../components/Process";
import { Pricing } from "../components/Pricing";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();
  const goContact = () => navigate("/contact");
  return (
    <>
      <Hero onContact={goContact} />
      <About />
      <Portfolio />
      <Process />
      <Pricing onContact={goContact} />
      <FAQ />
      <Footer onContact={goContact} />
    </>
  );
}
