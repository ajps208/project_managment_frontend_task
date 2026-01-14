import {
  Dashboard as DashboardIcon,
  Add,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";

const Header = ({ currentView, onCreate }) => {
  // Get current theme and toggle function
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`shadow-md transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* App Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <DashboardIcon className="text-white" />
          </div>

          <h1
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Project Management
          </h1>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition ${
              theme === "dark"
                ? "bg-gray-800 text-gray-200"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {theme === "dark" ? <LightMode /> : <DarkMode />}
          </button>

          {/* Show Create button only on Dashboard */}
          {currentView === "dashboard" && (
            <button
              onClick={onCreate}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              <Add />
              New Project
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
