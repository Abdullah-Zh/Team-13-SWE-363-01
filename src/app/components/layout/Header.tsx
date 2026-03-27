import { Bell, Search, Moon, Sun, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router";
import { useState } from "react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New resource uploaded",
      description: "A new software architecture guide was added to the library.",
    },
    {
      id: 2,
      title: "Roadmap updated",
      description: "Your semester roadmap has been refreshed with current progress.",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <header className="flex flex-col gap-4 border-b border-gray-200 bg-white px-4 py-4 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-900 sm:px-6 md:h-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-0">
      <div className="w-full flex-1 md:max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search courses, resources..."
            className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 md:justify-end md:gap-4">
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

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications((current) => !current);
              setShowUserMenu(false);
            }}
            className="relative rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Open notifications"
            aria-expanded={showNotifications}
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#10B981] rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 mt-2 w-80 rounded-xl border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-100 px-4 pb-2 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
                Notifications
              </div>
              <div className="py-1">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    className="w-full px-4 py-3 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {notification.title}
                    </div>
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {notification.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative flex items-center gap-3 border-l border-gray-200 pl-3 dark:border-gray-700 md:pl-4">
          <div className="hidden text-right sm:block">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Abdullah Alzahrani</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Student</div>
          </div>
          <button 
            type="button"
            onClick={() => {
              setShowUserMenu((current) => !current);
              setShowNotifications(false);
            }}
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
