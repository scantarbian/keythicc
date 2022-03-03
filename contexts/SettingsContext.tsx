import { createContext, ReactNode, useState } from "react";

const initState = {
  menuOpen: false,
  toggleMenu: () => {},
};

export const SettingsContext = createContext(initState);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState({
    menuOpen: initState.menuOpen,
  });

  const toggleMenu = () => {
    setSettings({
      ...settings,
      menuOpen: !settings.menuOpen,
    });
  };

  return (
    <SettingsContext.Provider value={{ ...settings, toggleMenu }}>
      <div
        className={`top-0 left-0 w-full h-screen opacity-50 bg-white items-center justify-center fixed z-50 cursor-pointer ${
          settings.menuOpen ? "flex" : "hidden"
        }`}
      >
        <div className="bg-black w-1/2 h-1/2 text-white">
          <span>Menu</span>
        </div>
      </div>
      <>{children}</>
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
