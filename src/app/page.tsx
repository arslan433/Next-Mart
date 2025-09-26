import Header from "@/src/components/Header";
import Hero from "@/src/components/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero/>
      </main>
    </>
  );
}
