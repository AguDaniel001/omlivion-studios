import Navbar from "../components/sections/navbar/Navbar";
import Footer from "../components/sections/footer/Footer";
import CustomCursor from "../components/ui/CustomCursor";
import SmoothScrolling from "@/lib/gsap/SmoothScrolling";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScrolling />
      <CustomCursor />
      <div className="flex flex-col min-h-screen">
        <header>
          <Navbar />
        </header>
        <main className="flex-1 smooth-transition">
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}
