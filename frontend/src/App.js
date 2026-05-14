import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { useLenis } from "@/lib/lenis";
import { Navbar } from "@/components/Navbar";
import { NoiseBackground } from "@/components/NoiseBackground";
import { CustomCursor } from "@/components/CustomCursor";
import { AmbientGlow } from "@/components/AmbientGlow";

const PageWrap = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.45, ease: [0.22, 0.85, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrap><Home /></PageWrap>} />
        <Route path="/contact" element={<PageWrap><Contact /></PageWrap>} />
      </Routes>
    </AnimatePresence>
  );
};

const Inner = () => {
  useLenis();
  const { theme } = useTheme();
  return (
    <div className="App" data-testid="app-root" data-theme={theme}>
      {theme === "dark" && <AmbientGlow />}
      <NoiseBackground />
      <CustomCursor />
      <Navbar />
      <AnimatedRoutes />
      <Toaster
        position="bottom-right"
        theme={theme === "dark" ? "dark" : "light"}
        toastOptions={{ style: { fontFamily: "Manrope, sans-serif" } }}
      />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <Inner />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
