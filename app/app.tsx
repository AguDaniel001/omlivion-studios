import Navbar from "../components/sections/navbar/Navbar";
import Footer from "../components/sections/footer/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <body>
        <main className="flex-1 smooth-transition">
          {children}
        </main>
      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
