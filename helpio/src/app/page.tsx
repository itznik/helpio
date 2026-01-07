import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Placeholder for the next section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
           How Helpio Works
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
           This is where we will build the 3-step process section next.
        </p>
      </section>
    </main>
  );
}
