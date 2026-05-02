import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const [agentMode, setAgentMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("agentMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-agent", agentMode.toString());
    localStorage.setItem("agentMode", agentMode.toString());
  }, [agentMode]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const toggleAgentMode = () => setAgentMode((a) => !a);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, agentMode, toggleAgentMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
