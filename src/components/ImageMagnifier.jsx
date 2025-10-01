"use client";
import { useRef, useState } from "react";

export default function ImageMagnifier({ src, alt, zoom = 2 }) {
  const containerRef = useRef(null);
  const [backgroundPos, setBackgroundPos] = useState("center");
  const [showZoom, setShowZoom] = useState(false);

  // Common function for both mouse & touch
  const updatePosition = (x, y, rect) => {
    const posX = ((x - rect.left) / rect.width) * 100;
    const posY = ((y - rect.top) / rect.height) * 100;
    setBackgroundPos(`${posX}% ${posY}%`);
  };

  const onMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    updatePosition(e.clientX, e.clientY, rect);
  };

  const onTouchMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY, rect);
  };

  return (
    <div
      ref={containerRef}
      // Desktop
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={onMouseMove}
      // Mobile
      onTouchStart={() => setShowZoom(true)}
      onTouchEnd={() => setShowZoom(false)}
      onTouchMove={onTouchMove}
      className="relative w-full max-w-md h-130 max-md:h-90 rounded-lg overflow-hidden shadow"
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: showZoom ? `${zoom * 100}%` : "cover",
        backgroundPosition: showZoom ? backgroundPos : "center",
        cursor: showZoom ? "zoom-in" : "default",
      }}
    >
      {/* Base image for initial render */}
      {!showZoom && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          draggable={false}
        />
      )}
    </div>
  );
}
