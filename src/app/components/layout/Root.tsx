import { Outlet } from "react-router";
import { BrowserMockup } from "./BrowserMockup";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Annotation } from "../ui/Annotation";

export function Root() {
  return (
    <BrowserMockup>
      <div className="flex h-full bg-[#F8FAFC] dark:bg-gray-800 transition-colors relative">
        <Annotation number={1} label="Sidebar Navigation – Navigate between Dashboard, Roadmap, Resources, and Admin" position="top-left" />
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <Annotation number={2} label="Header Bar – User profile and theme toggle" position="top-right" />
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </BrowserMockup>
  );
}