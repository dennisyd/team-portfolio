import { useEffect, useRef } from "react";
import { initProjectCardScrollAnimations } from "../animations/animations";
import TechBadge from "./TechBadge";

const safeAssetUrl = (path) => encodeURI(path).split("?").join("%3F");

const ProjectCards = ({ project, index, cardsRef }) => {
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const techStackRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      cardsRef.current[index] = cardRef.current;
    }

    const scrollCleanup = initProjectCardScrollAnimations(
      cardRef,
      titleRef,
      techStackRef,
      linksRef
    );

    return () => {
      scrollCleanup();
    };
  }, [index, cardsRef]);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col ${
        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-6 mb-24 project-item`}
    >
      <div className="lg:w-2/5 w-full overflow-hidden rounded-lg">
        <div className="tilt-card w-full h-72 md:h-80 preserve-3d relative border border-zinc-800 rounded-lg bg-zinc-950/60">
          {project.image ? (
            <div className="relative h-full w-full">
              <img
                src={safeAssetUrl(project.image)}
                alt={project.name}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/85" />
              <div className="relative p-6 h-full flex flex-col justify-end">
                <p className="text-white/80 font-montserrat text-sm mb-2">
                  Industry: {project.industry}
                </p>
                <p className="text-white font-montserrat font-bold text-xl">
                  {project.name}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 h-full flex flex-col justify-end bg-gradient-to-br from-blue-950 via-zinc-950 to-cyan-950">
              <p className="text-white/80 font-montserrat text-sm mb-2">
                Industry: {project.industry}
              </p>
              <p className="text-white font-montserrat font-bold text-xl">
                {project.name}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="lg:w-3/5 w-full flex flex-col justify-center relative z-10">
        <h3
          ref={titleRef}
          className="text-2xl font-bold font-comfortaa mb-4 text-cyan-400"
        >
          {project.name}
        </h3>

        <p className="text-gray-300 font-montserrat mb-4">
          <strong>Industry:</strong> {project.industry}
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-white font-montserrat font-semibold mb-1">
              Challenge:
            </p>
            <p className="text-gray-300 font-montserrat">{project.challenge}</p>
          </div>

          <div>
            <p className="text-white font-montserrat font-semibold mb-1">
              Solution:
            </p>
            <p className="text-gray-300 font-montserrat">{project.solution}</p>
          </div>

          {project.technologies?.length > 0 && (
            <div>
              <p className="text-white font-montserrat font-semibold mb-2">
                Technologies:
              </p>
              <div ref={techStackRef} className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>
          )}

          {project.results?.length > 0 && (
            <div>
              <p className="text-white font-montserrat font-semibold mb-2">
                Results:
              </p>
              <ul className="list-disc pl-6 text-gray-300 font-montserrat space-y-1">
                {project.results.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;
