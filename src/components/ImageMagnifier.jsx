"use client";
import { useRef, useState } from "react";

export default function ImageMagnifier({ src, alt, zoom = 2 }) {
  const containerRef = useRef(null);
  const [backgroundPos, setBackgroundPos] = useState("center");
  const [showZoom, setShowZoom] = useState(false);

  const onMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={onMouseMove}
      className="relative w-full max-w-md rounded-lg overflow-hidden shadow"
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
