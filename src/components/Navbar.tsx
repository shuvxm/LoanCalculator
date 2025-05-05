
import React, { useState, useEffect } from 'react';
import { Home, BarChart3, Info, AlertCircle, Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check if user previously set dark mode
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-mode", "false");
    }
  };
  
  return (
    <div className="loan-calculator-navbar w-full">
      <div className="text-xl font-semibold">Loan Calculator</div>
      <div className="flex items-center space-x-6">
        <div className="bg-blue-600 px-4 py-1 rounded">
          <div className="flex items-center">
            <Home className="mr-1 h-4 w-4" />
            <span>HOME</span>
          </div>
        </div>
        <div className="flex items-center">
          <BarChart3 className="mr-1 h-4 w-4" />
          <span>EXCHANGE RATES (LIVE)</span>
        </div>
        <div className="flex items-center">
          <Info className="mr-1 h-4 w-4" />
          <span>ABOUT</span>
        </div>
        <div className="flex items-center">
          <AlertCircle className="mr-1 h-4 w-4" />
          <span>ERROR PAGE</span>
        </div>
      </div>
      <div className="flex items-center">
        {isDarkMode ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
        <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
      </div>
    </div>
  );
};

export default Navbar;
