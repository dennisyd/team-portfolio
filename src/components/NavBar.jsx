import React, { useState, useRef, useEffect } from "react";
import { navItems } from "../constant/index.js";
import { GoDot } from "react-icons/go";
import burger from "/Burger.svg";
import close from "/Burger-Close.svg";
import { GoHomeFill } from "react-icons/go";
import { FaInfo, FaPhone, FaUser } from "react-icons/fa";
import { animateBurgerMenu } from "../animations/animations.js";
import { FaScrewdriverWrench } from "react-icons/fa6";

const safeAssetUrl = (path) => encodeURI(path).split("?").join("%3F");

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const burgerRef = useRef(null);
  const menuRef = useRef(null);
  const headerRef = useRef(null);

  // Handler to close the burger menu and scroll to section
  const handleNavItemClick = (sectionId) => {
    setToggle(false);
    scrollToSection(sectionId);
  };

  // Function to scroll to section
  const scrollToSection = (sectionId) => {
    // Special handling for Home section - scroll to top
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setActiveSection("home");
      return;
    }

    // Normal handling for other sections
    const section = document.getElementById(sectionId);
    if (section) {
      // Smooth scroll to section
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const probePosition = scrollPosition + window.innerHeight * 0.35;

      const sectionIds = ["about", "members", "projects", "contact"];
      let current = "home";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (probePosition >= el.offsetTop) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    // Initial check when component mounts
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animation for burger menu toggle
  useEffect(() => {
    animateBurgerMenu(burgerRef, menuRef, toggle);
  }, [toggle]);

  // Map navigation items to their respective icons
  const navIcons = {
    home: <GoHomeFill className="mr-2" />,
    about: <FaScrewdriverWrench className="mr-2" />,
    members: <FaInfo className="mr-2" />,
    projects: <FaUser className="mr-2" />,
    contact: <FaPhone className="mr-2" />,
  };

  return (
    <header
      ref={headerRef}
      className="w-full py-2 sm:px-10 px-5 flex justify-between items-center fixed top-0 left-0 z-50 nav-header"
    >
      <nav className="flex w-full screen-max-width">
        <button
          type="button"
          className="flex absolute justify-start items-center gap-3 py-2 font-montserrat font-bold px-5 sm:px-2 md:relative cursor-pointer"
          onClick={() => scrollToSection("home")}
          aria-label="Go to top"
        >
          <img
            src={safeAssetUrl("/yddconsulting logo.png")}
            alt="YDD Consulting"
            className="h-8 sm:h-10 w-auto max-w-[140px] sm:max-w-[240px] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            loading="eager"
          />
        </button>
        <div className="flex justify-between max-sm:hidden font-bold bg-cyan-400/10 backdrop-blur-md rounded-full p-2">
          {navItems.map((nav, index) => (
            <React.Fragment key={nav.id}>
              {index > 0 && (
                <GoDot className="text-gray-100 self-center mx-1" />
              )}{" "}
              <div
                className={`px-9 cursor-pointer hover:text-blue-300 underline-offset-8 decoration-blue-300 hover:underline ${
                  activeSection === nav.id
                    ? "text-blue-300 underline"
                    : ""
                }`}
                onClick={() => scrollToSection(nav.id)}
              >
                <span className="flex items-center hover:text-blue-300">
                  {navIcons[nav.id]}
                  <span className="text-sm font-montserrat">{nav.label}</span>
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* mobile nav */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : burger}
            alt="menu"
            className="w-[25px] h-[25px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
            ref={burgerRef}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-3 burger-items backdrop-blur-md absolute top-16 right-0 mx-2 my-2 min-w-[180px] z-50 rounded bg-black/80 shadow-md`}
            ref={menuRef}
          >
            <div className="flex flex-col items-center w-full">
              {navItems.map((nav, index) => (
                <div
                  key={nav.id}
                  className="py-2 w-full text-center cursor-pointer"
                  onClick={() => handleNavItemClick(nav.id)}
                >
                  <div
                    className={`flex items-center justify-start text-white text-sm font-montserrat font-bold hover:text-blue-400 px-4 py-2 w-full ${
                      activeSection === nav.id ? "text-blue-400" : ""
                    }`}
                  >
                    {navIcons[nav.id]}
                    <span className="ml-2">{nav.label}</span>
                  </div>
                  {index < navItems.length - 1 && (
                    <div className="border-b border-blue-400 w-full my-1"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
