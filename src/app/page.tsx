import BackgroundAnimation from "../components/BackgroundAnimation";

export default function Home() {
  return (
    <main className="relative flex items-center justify-center h-screen text-white">
      <div className="z-10 text-center">
        <h1 className="text-5xl font-bold">Next Mart</h1>
        <p className="mt-4 text-lg">Your Next.js E-commerce Solution</p>
        <button className="mt-6 px-6 py-3 bg-red-500 rounded-lg hover:bg-red-600 transition">
          Get Started
        </button>
      </div>
    </main>
  );
}
