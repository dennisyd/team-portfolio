import "./index.css";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/AboutUs";
import Members from "./components/Members";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      <NavBar />
      <div className="content-wrapper">
        <Hero />
        <div className="content-sections">
          <About />
          <Members />
          <Projects />
          <Contact />
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default App;
