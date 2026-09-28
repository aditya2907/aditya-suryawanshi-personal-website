import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TerminalPortfolio from "@/components/terminal/TerminalPortfolio";
import TerminalHome from "@/components/terminal/TerminalHome";
import TerminalProjects from "@/components/terminal/TerminalProjects";
import TerminalContact from "@/components/terminal/TerminalContact";
import { TerminalExperience } from "@/components/terminal/EditorPages";
import { ProfileAbout as TerminalAbout, ProfileUses as TerminalUses, ProfileBlog } from "@/components/terminal/ReferenceSections";

function renderPortfolio(path = "/") {
  return render(<MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Routes><Route element={<TerminalPortfolio />}><Route path="/" element={<TerminalHome />} /><Route path="/blog" element={<ProfileBlog />} /><Route path="/about-me" element={<TerminalAbout />} /><Route path="/experience" element={<TerminalExperience />} /><Route path="/projects" element={<TerminalProjects />} /><Route path="/uses" element={<TerminalUses />} /><Route path="/contact-me" element={<TerminalContact />} /></Route></Routes></MemoryRouter>);
}

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
  Element.prototype.scrollTo = vi.fn();
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: vi.fn().mockResolvedValue(undefined) } });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("Terminal portfolio interactions", () => {
  it("renders Aditya’s identity and starts, pauses, resumes, and releases the game", () => {
    renderPortfolio();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Aditya");
    fireEvent.click(screen.getByRole("button", { name: "start-game" }));
    const board = screen.getByRole("group", { name: /Snake board/ });
    expect(board).toHaveFocus();
    fireEvent.keyDown(board, { key: " " });
    expect(screen.getByRole("button", { name: /resume/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /resume/ }));
    expect(screen.getByRole("button", { name: "pause" })).toBeInTheDocument();
    fireEvent.keyDown(board, { key: "Escape" });
    expect(screen.getByRole("button", { name: /resume/ })).toBeInTheDocument();
  });
  it("lets visitors skip the game and browse editor files", () => {
    renderPortfolio();
    fireEvent.click(screen.getByRole("link", { name: /^skip/ }));
    expect(screen.getByLabelText("About Aditya")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "masters" }));
    expect(screen.getByLabelText("About Aditya")).toHaveTextContent("University College Dublin");
    const command = screen.getByLabelText("Terminal command");
    fireEvent.change(command, { target: { value: "help" } });
    fireEvent.submit(command.closest("form"));
    expect(screen.getByRole("log")).toHaveTextContent("whoami");

  });
  it("filters projects, opens details, and restores all projects", () => {
    renderPortfolio("/projects");
    expect(screen.getAllByRole("button", { name: /^Explore / })).toHaveLength(4);
    fireEvent.click(screen.getByRole("checkbox", { name: /Scikit-learn/ }));
    expect(screen.getAllByRole("button", { name: /^Explore / })).toHaveLength(1);
    expect(screen.queryByRole("button", { name: "Explore TensorFleet" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /show-all/ }));
    fireEvent.click(screen.getByRole("button", { name: "Explore Fraud Detective" }));
    const modal = screen.getByRole("dialog", { name: "Fraud Detective" });
    expect(within(modal).getByRole("link", { name: /view-source/ })).toHaveAttribute("href", "https://github.com/adi-swe/Financial-Fraud-Detection-using-Explainable-AI");
    fireEvent.click(within(modal).getByRole("button", { name: "Close project details" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /show-all/ }));
    expect(screen.getAllByRole("button", { name: /^Explore / })).toHaveLength(4);
  });
  it("supports keyboard search and navigation through the command palette", async () => {
    renderPortfolio();
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "projects" } });
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(1));
    fireEvent.keyDown(input, { key: "Enter" });
    await screen.findByRole("button", { name: "Explore TensorFleet" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Open command palette" }));
    fireEvent.click(screen.getByRole("button", { name: "Close command palette" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("opens mobile navigation and closes it after selection", () => {
    renderPortfolio();
    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    const menu = screen.getByRole("navigation", { name: "Mobile navigation" });
    fireEvent.click(within(menu).getByRole("link", { name: "_uses" }));
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).not.toBeInTheDocument();
    expect(screen.getByLabelText("Engineering toolkit")).toHaveTextContent("Visual Studio Code");
  });
  it("preserves work and education details", () => {
    renderPortfolio("/experience");
    expect(screen.getByRole("heading", { name: "Software Engineer" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "education.md" }));
    expect(screen.getByText("University College Dublin")).toBeInTheDocument();
    expect(screen.getByText("Aug. 2025 – May 2026 (Expected)")).toBeInTheDocument();
  });
  it("updates the message preview safely and copies the real contact address", async () => {
    renderPortfolio("/contact-me");
    expect(screen.getByRole("link", { name: "adityams.dev@gmail.com" })).toHaveAttribute("href", "mailto:adityams.dev@gmail.com");
    fireEvent.change(screen.getByLabelText("_name:"), { target: { value: "Test Visitor" } });
    fireEvent.change(screen.getByLabelText("_email:"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("_message:"), { target: { value: '<script>alert("hi")</script>' } });
    const preview = screen.getByLabelText("Live preview of your message");
    expect(preview).toHaveTextContent("Test Visitor");
    expect(preview).toHaveTextContent("test@example.com");
    expect(preview.querySelector("script")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "copy-email" }));
    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith("adityams.dev@gmail.com"));
    expect(screen.getByRole("status")).toHaveTextContent("Email address copied.");
    expect(screen.getByRole("button", { name: /compose-email/ })).toHaveAttribute("type", "submit");
  });
});
