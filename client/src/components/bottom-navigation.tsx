import { Home, Search, BarChart3, FileText, User } from "lucide-react";
import { useLocation, Link } from "wouter";

export default function BottomNavigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/search", icon: Search, label: "Search" },
    { path: "/compare", icon: BarChart3, label: "Compare" },
    { path: "/exams", icon: FileText, label: "Exams" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-2 z-50">
      <div className="flex items-center justify-between">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location === path;
          return (
            <Link key={path} to={path}>
              <button className={`flex flex-col items-center space-y-1 py-2 px-3 transition-colors ${
                isActive 
                  ? "text-primary" 
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}>
                <Icon className="w-5 h-5" />
                <span className={`text-xs ${isActive ? "font-medium" : ""}`}>{label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
