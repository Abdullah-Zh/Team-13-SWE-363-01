import { Bell, Search, Moon, Sun, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router";
import { useState } from "react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-8 shadow-sm transition-colors">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search courses, resources..."
            className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#10B981] rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700 relative">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Abdullah Alzahrani</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Student</div>
          </div>
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="relative"
          >
            <Avatar className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-[#06B6D4] transition-all">
              <AvatarFallback className="bg-[#1E3A8A] text-white">AA</AvatarFallback>
            </Avatar>
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute top-12 right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}