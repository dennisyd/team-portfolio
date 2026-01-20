import BackgroundEffect from "./BackgroundEffect";
import { howWeWork, teamMembers, testimonials, whoWeAre } from "../constant";
import { FaStar } from "react-icons/fa";

const safeAssetUrl = (path) => encodeURI(path).split("?").join("%3F");

const Members = () => {
  return (
    <section
      id="members"
      className="w-screen overflow-hidden h-full sm:py-32 py-20 sm:px-10 px-5 bg-zinc-950 relative z-10 content-section"
    >
      <BackgroundEffect
        variant="members"
        opacity={0.3}
        circleColors={[
          "rgba(5, 135, 158, 0.2), rgba(5, 135, 158, 0.05)",
          "rgba(25, 68, 105, 0.25), rgba(25, 68, 105, 0.05)",
          "rgba(10, 30, 60, 0.3), rgba(10, 30, 60, 0.05)",
        ]}
      />

      <div className="max-w-5xl mx-auto">
        <h1 className="title">
          {whoWeAre.title}
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-10">
          <div className="rounded-xl border border-zinc-800 bg-black/40 backdrop-blur-sm p-6">
            <p className="font-prompt text-white/70 text-lg">
              {whoWeAre.description}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-black/40 backdrop-blur-sm p-6">
            <h2 className="text-2xl font-montserrat font-bold text-white mb-6">
              Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="group rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 hover:bg-zinc-900/60 transition-colors"
                >
                  <div className="flex items-center justify-center">
                    <img
                      src={safeAssetUrl(member.image)}
                      alt={member.name}
                      className="h-full w-full rounded-xl object-cover bg-black"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-white font-montserrat font-bold">
                      {member.name}
                    </p>
                    <p className="text-white/70 font-prompt text-sm">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-black/40 backdrop-blur-sm p-6">
            <h2 className="text-2xl font-montserrat font-bold text-white mb-3">
              {howWeWork.title}
            </h2>
            <p className="font-prompt text-white/70 text-lg mb-4">
              {howWeWork.intro}
            </p>
            <ul className="list-disc pl-6 text-white/70 font-prompt space-y-1 mb-4">
              {howWeWork.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <p className="font-prompt text-white/70 text-lg">{howWeWork.closing}</p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-black/40 backdrop-blur-sm p-6">
            <h2 className="text-2xl font-montserrat font-bold text-white mb-6">
              {testimonials.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.items.map((t) => (
                <div
                  key={t.title}
                  className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full p-[2px] bg-gradient-to-br from-cyan-400/60 via-blue-500/30 to-transparent shrink-0">
                      <img
                        src={safeAssetUrl(t.image)}
                        alt={t.author}
                        className="h-full w-full rounded-full object-cover bg-black"
                        loading="lazy"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-lg font-montserrat font-bold text-cyan-400 leading-snug">
                        {t.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-2 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar key={i} className="text-sm" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="font-prompt text-white/70 mt-4 mb-4">
                    {t.quote}
                  </p>
                  <p className="font-montserrat text-white/80 text-sm">
                    {t.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Members;
