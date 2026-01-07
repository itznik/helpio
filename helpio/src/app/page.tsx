import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar needs to be transparent to sit on top of the Hero color */}
      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>
      
      <Hero />
      
      {/* Next Section Placeholder */}
      <section className="py-20 text-center">
        <h2 className="font-heading text-3xl font-bold">More sections coming soon...</h2>
      </section>
    </main>
  );
}
