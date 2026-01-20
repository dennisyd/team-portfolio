import React from "react";

const BackgroundEffect = ({
  variant = "default",
  opacity = 0.5,
  showCircles = true,
  showGrid = true,
  showDots = true,
  showCornerDots = true,
  circleColors = [
    "rgba(5, 165, 188, 0.2), rgba(5, 165, 188, 0.05)",
    "rgba(15, 58, 95, 0.3), rgba(15, 58, 95, 0.05)",
    "rgba(0, 20, 50, 0.4), rgba(0, 20, 50, 0.05)",
  ],
}) => {
  // Set classes based on variant
  const getVariantClass = () => {
    switch (variant) {
      case "about":
        return "bg-about-elements";
      case "members":
        return "bg-members-elements";
      case "projects":
        return "bg-projects-elements";
      case "contact":
        return "bg-contact-elements";
      default:
        return "bg-default-elements";
    }
  };

  return (
    <div
      className={`${getVariantClass()} absolute inset-0 overflow-hidden -z-10 pointer-events-none`}
      style={{ opacity }}
    >
      {showCircles && (
        <>
          <div
            className="bg-circle circle-1"
            style={{
              background: `radial-gradient(circle, ${circleColors[0]})`,
            }}
          ></div>
          <div
            className="bg-circle circle-2"
            style={{
              background: `radial-gradient(circle, ${circleColors[1]})`,
            }}
          ></div>
          <div
            className="bg-circle circle-3"
            style={{
              background: `radial-gradient(circle, ${circleColors[2]})`,
            }}
          ></div>
        </>
      )}
      {showGrid && <div className="bg-grid"></div>}
      {showDots && <div className="bg-dots"></div>}

      {/* Corner Dots */}
      {showCornerDots && (
        <>
          <div className="corner-dot top-left"></div>
          <div className="corner-dot top-right"></div>
          <div className="corner-dot bottom-left"></div>
          <div className="corner-dot bottom-right"></div>
        </>
      )}
    </div>
  );
};

export default BackgroundEffect;
