import { BrowserRouter, Routes, Route } from "react-router-dom";
import TerminalPortfolio, { TerminalNotFound } from "./components/terminal/TerminalPortfolio";
import TerminalHome from "./components/terminal/TerminalHome";
import { TerminalAbout, TerminalExperience, TerminalUses } from "./components/terminal/EditorPages";
import TerminalProjects from "./components/terminal/TerminalProjects";
import TerminalContact from "./components/terminal/TerminalContact";

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route element={<TerminalPortfolio />}>
        <Route path="/" element={<TerminalHome />} />
        <Route path="/about-me" element={<TerminalAbout />} />
        <Route path="/experience" element={<TerminalExperience />} />
        <Route path="/projects" element={<TerminalProjects />} />
        <Route path="/uses" element={<TerminalUses />} />
        <Route path="/contact-me" element={<TerminalContact />} />
        <Route path="*" element={<TerminalNotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
