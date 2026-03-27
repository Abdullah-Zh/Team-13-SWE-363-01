import { NavLink } from "react-router";
import { LayoutDashboard, Map, BookOpen, Upload, Shield, Settings } from "lucide-react";

export function Sidebar() {
  const userRole = localStorage.getItem("userRole") || "student";
  
  const studentNavItems = [
    { path: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/app/roadmap", label: "Roadmap", icon: Map },
    { path: "/app/resources", label: "Resources", icon: BookOpen },
    { path: "/app/upload", label: "Upload", icon: Upload },
  ];

  const moderatorNavItems = [
    { path: "/app/moderator", label: "Moderator", icon: Shield },
  ];

  const adminNavItems = [
    { path: "/app/admin", label: "Admin", icon: Settings },
  ];

  const navItems = [
    ...studentNavItems,
    ...(userRole === "moderator" || userRole === "admin" ? moderatorNavItems : []),
    ...(userRole === "admin" ? adminNavItems : []),
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col shadow-sm transition-colors">
      {/* Logo */}
      <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#06B6D4] flex items-center justify-center">
            <span className="text-white text-sm font-semibold">SC</span>
          </div>
          <span className="font-semibold text-lg text-[#1E3A8A] dark:text-white">SWE Compass</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = window.location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                isActive
                  ? "bg-[#1E3A8A] dark:bg-[#06B6D4] text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          © 2026 SWE Compass
        </div>
      </div>
    </div>
  );
}