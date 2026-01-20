import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { initContactAnimations } from "../animations/animations.js";
import BackgroundEffect from "./BackgroundEffect";
import { letsBuild } from "../constant";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzddalre";

const Contact = () => {
  const formRef = useRef(null);
  const headerRef = useRef(null);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  useGSAP(() => {
    const cleanup = initContactAnimations(formRef, headerRef);
    return cleanup;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "sending", message: "" });

    try {
      const formData = new FormData(e.target);

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Thanks — your message has been sent.",
        });
        e.target.reset();
        return;
      }

      const data = await response.json().catch(() => null);
      const errorMessage =
        data?.errors?.[0]?.message ||
        "Something went wrong. Please try again.";
      setStatus({ type: "error", message: errorMessage });
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="w-screen overflow-hidden h-full sm:py-32 py-20 sm:px-10 px-5 bg-zinc-950 relative z-10 content-section"
    >
      <BackgroundEffect
        variant="contact"
        opacity={0.3}
        circleColors={[
          "rgba(5, 105, 188, 0.15), rgba(5, 105, 188, 0.02)",
          "rgba(5, 165, 188, 0.2), rgba(5, 165, 188, 0.05)",
          "rgba(15, 58, 95, 0.15), rgba(15, 58, 95, 0.02)",
        ]}
      />

      <div className="max-w-4xl mx-auto">
        <h1 ref={headerRef} className="title">
          {letsBuild.title}
        </h1>

        <div className="mt-12 grid md:grid-cols-2 gap-12">
          <div className="contact-info">
            <div className="mb-8 opacity-0 contact-item">
              <p className="text-gray-400">{letsBuild.description}</p>
            </div>

            <div className="mb-8 opacity-0 contact-item">
              <h3 className="text-xl font-montserrat font-semibold text-blue-400 mb-2">
                {letsBuild.contactTitle}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>{letsBuild.location}</li>
                <li>{letsBuild.phone}</li>
                <li>
                  <a
                    href={`mailto:${letsBuild.email}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {letsBuild.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            action={FORMSPREE_ENDPOINT}
            method="POST"
            className="contact-form opacity-0 transform translate-y-12"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                placeholder="Your name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status.type === "sending"}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-800 to-blue-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-500 transition-colors duration-300"
            >
              {status.type === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status.type !== "idle" && status.message && (
              <p
                className={`mt-4 text-sm font-montserrat ${
                  status.type === "success" ? "text-green-400" : "text-red-400"
                }`}
                aria-live="polite"
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
