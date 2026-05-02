import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import GitHubContributions from "./components/GitHubContributions";

import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AgentModeView from "./components/AgentModeView";

function AppContent() {
  const { agentMode } = useTheme();

  if (agentMode) {
    return (
      <div className="relative min-h-screen">
        <ThemeToggle />
        <Navbar />
        <AgentModeView />
      </div>
    );
  }

  return (
    <div className="page-shell relative min-h-screen">
      <ThemeToggle />
      <Navbar />

      <main className="page-main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <GitHubContributions />
        <Skills />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
