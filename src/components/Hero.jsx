import { useGSAP } from "@gsap/react";
import { initHeroAnimations } from "../animations/animations.js";
// import ParticlesBackground from "./ParticlesBackground";
import { heroContent } from "../constant";
import { services } from "../constant";
import ServiceCarousel from "./ServiceCarousel";

const Hero = () => {
  useGSAP(() => {
    initHeroAnimations();
  }, []);

  return (
    <section
      id="home"
      className="hero-container h-screen w-full fixed top-0 left-0 z-0 herobox"
    >
      {/* Add particles background */}
      {/* <ParticlesBackground /> */}

      <div className="hero-space-top w-full h-16"></div>
      <div id="hero" className="w-full h-full mx-auto relative">
        <div className="h-full flex items-center relative z-2">
          <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="hero-content flex flex-col items-start justify-center gap-5 w-full">
              <h1
                id="hero-text"
                className="font-comfortaa text-white font-bold lg:text-4xl text-2xl text-left opacity-0 translate-y-[-9vh] translate-x-32 relative"
              >
                {heroContent.heading}
              </h1>
              <p className="font-prompt text-white/70 text-left text-base lg:text-lg">
                {heroContent.intro}
              </p>

              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <span
                    key={s.title}
                    className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 text-xs font-montserrat"
                  >
                    {s.shortTitle || s.title}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-carousel w-full">
              <ServiceCarousel items={services} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
