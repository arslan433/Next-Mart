export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('./image.png')",
      }}
    >
      <div className="bg-black/30 absolute inset-0" /> {/* overlay for readability */}

      <div className="relative container mx-auto px-4 py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-white max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Summer Collection 2025
          </h1>
          <p className="text-lg mb-8">
            Discover our latest arrivals designed for comfort and style. Premium
            quality that lasts.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="py-3 px-6 bg-primary text-white font-medium rounded-button hover:bg-primary/90 transition-colors"
            >
              Shop Now
            </a>
            <a
              href="#"
              className="py-3 px-6 bg-white text-gray-800 font-medium rounded-button border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Explore Collection
            </a>
          </div>
        </div>

        {/* Right side empty for spacing */}
        <div className="hidden md:block"></div>
      </div>
    </section>
  );
}
