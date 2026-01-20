import { useGSAP } from "@gsap/react";
import { initAboutUsAnimations } from "../animations/animations.js";
import BackgroundEffect from "./BackgroundEffect";
import { businessApplications, services } from "../constant";

const safeAssetUrl = (path) => encodeURI(path).split("?").join("%3F");

const AboutUs = () => {
  useGSAP(() => {
    const cleanup = initAboutUsAnimations();
    return cleanup;
  }, []);

  return (
    <section
      id="about"
      className="w-screen overflow-hidden h-full sm:py-32 py-20 sm:px-10 px-5 bg-zinc-950 relative z-10 content-section"
    >
      <BackgroundEffect
        variant="about"
        opacity={0.4}
        circleColors={[
          "rgba(5, 105, 188, 0.2), rgba(5, 105, 188, 0.05)",
          "rgba(15, 38, 95, 0.3), rgba(15, 38, 95, 0.05)",
          "rgba(0, 40, 70, 0.3), rgba(0, 40, 70, 0.05)",
        ]}
      />

      <h1 id="header" className="title title-animate">
        What We Do
      </h1>

      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border border-zinc-800 bg-black/40 backdrop-blur-sm p-6 hover:bg-black/50 transition-colors"
          >
            <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/60 h-40 mb-5">
              {service.image && (
                <img
                  src={safeAssetUrl(service.image)}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />
              <div className="relative h-full p-5 flex flex-col justify-end">
                <p className="text-white/70 font-montserrat text-xs uppercase tracking-widest">
                  {service.shortTitle || "Service"}
                </p>
                <h2 className="text-white font-montserrat font-bold text-xl leading-snug">
                  {service.title}
                </h2>
              </div>
            </div>

            <p className="font-prompt text-white/70 text-lg mb-6 para">
              {service.description}
            </p>

            <h3 className="text-lg font-montserrat font-semibold text-blue-400 mb-3">
              {service.capabilitiesLabel}
            </h3>
            <ul className="list-disc pl-6 text-white/70 font-prompt space-y-1 mb-6">
              {service.capabilities.map((capability) => (
                <li key={capability} className="para">
                  {capability}
                </li>
              ))}
            </ul>

            <p className="font-prompt text-white/70 text-lg para">
              {service.closing}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
