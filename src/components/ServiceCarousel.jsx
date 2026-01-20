import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const safeAssetUrl = (path) => encodeURI(path).split("?").join("%3F");

const prefersReducedMotion = () => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const ServiceCarousel = ({ items, intervalMs = 5200 }) => {
  const slides = useMemo(() => items.filter(Boolean), [items]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = (index) => {
    if (!slides.length) return;
    setActiveIndex(((index % slides.length) + slides.length) % slides.length);
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (slides.length <= 1) return;
    if (isPaused) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);

    return () => clearInterval(id);
  }, [slides.length, intervalMs, isPaused]);

  if (!slides.length) return null;

  const activeSlide = slides[activeIndex];

  return (
    <div className="w-full">
      <div
        className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-zinc-800 bg-black/30 backdrop-blur-sm shadow-[0_25px_70px_-30px_rgba(5,165,188,0.35)] outline-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") goTo(activeIndex - 1);
          if (e.key === "ArrowRight") goTo(activeIndex + 1);
        }}
        tabIndex={0}
        aria-label="Service carousel"
      >
        <div className="absolute inset-0 hero-shimmer" aria-hidden="true" />

        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={slide.title}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                isActive
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 translate-x-6 scale-[0.98] pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              <div className="absolute inset-0">
                {slide.image && (
                  <img
                    src={safeAssetUrl(slide.image)}
                    alt=""
                    className={`absolute inset-0 h-full w-full 100% 100% ${
                      isActive ? "hero-kenburns" : ""
                    }`}
                    loading={isActive ? "eager" : "lazy"}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/45 to-black/90" />
                <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_20%,rgba(5,165,188,0.25)_0%,transparent_60%)]" />
              </div>

              <div className="relative h-full p-6 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-white font-montserrat font-bold text-2xl leading-snug mt-2">
                      {slide.title}
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      className="h-10 w-10 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors text-white/80 grid place-items-center"
                      onClick={() => goTo(activeIndex - 1)}
                      aria-label="Previous service"
                    >
                      <FaArrowLeft />
                    </button>
                    <button
                      type="button"
                      className="h-10 w-10 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors text-white/80 grid place-items-center"
                      onClick={() => goTo(activeIndex + 1)}
                      aria-label="Next service"
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 sm:hidden">
                    <button
                      type="button"
                      className="px-3 py-2 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors text-white/80 text-sm"
                      onClick={() => goTo(activeIndex - 1)}
                      aria-label="Previous service"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      className="px-3 py-2 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors text-white/80 text-sm"
                      onClick={() => goTo(activeIndex + 1)}
                      aria-label="Next service"
                    >
                      Next
                    </button>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    {slides.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        type="button"
                        className={`h-2.5 w-2.5 rounded-full transition-all ${
                          dotIndex === activeIndex
                            ? "bg-cyan-400"
                            : "bg-white/25 hover:bg-white/40"
                        }`}
                        onClick={() => goTo(dotIndex)}
                        aria-label={`Go to slide ${dotIndex + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            key={`${activeSlide.title}-${activeIndex}-${isPaused}`}
            className={`h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 origin-left ${
              isPaused || prefersReducedMotion() ? "" : "hero-progress"
            }`}
            style={{
              animationDuration: `${intervalMs}ms`,
              transform: isPaused ? "scaleX(0.15)" : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCarousel;
