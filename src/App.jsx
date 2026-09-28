import { BrowserRouter, Routes, Route } from "react-router-dom";
import TerminalPortfolio, { TerminalNotFound } from "./components/terminal/TerminalPortfolio";
import TerminalHome from "./components/terminal/TerminalHome";
import { TerminalExperience } from "./components/terminal/EditorPages";
import { ProfileAbout, ProfileUses, ProfileBlog } from "./components/terminal/ReferenceSections";
import TerminalProjects from "./components/terminal/TerminalProjects";
import TerminalContact from "./components/terminal/TerminalContact";

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route element={<TerminalPortfolio />}>
        <Route path="/" element={<TerminalHome />} />
        <Route path="/about-me" element={<ProfileAbout />} />
        <Route path="/blog" element={<ProfileBlog />} />
        <Route path="/experience" element={<TerminalExperience />} />
        <Route path="/projects" element={<TerminalProjects />} />
        <Route path="/uses" element={<ProfileUses />} />
        <Route path="/contact-me" element={<TerminalContact />} />
        <Route path="*" element={<TerminalNotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
