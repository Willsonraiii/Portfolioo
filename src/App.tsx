import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Gallery } from "./components/Gallery";
import { Freelancer } from "./components/Freelancer";
import { Credentials } from "./components/Credentials";
import { Footer } from "./components/Footer";
import { FloatingSocials } from "./components/FloatingSocials";
import { useImages } from "./hooks/useImages";

export default function App() {
  const { gallery } = useImages();

  return (
    <div className="app-bg relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Skills />
        <Gallery gallery={gallery} />
        <Freelancer />
        <Credentials />
      </main>
      <Footer />
      <FloatingSocials />
    </div>
  );
}
