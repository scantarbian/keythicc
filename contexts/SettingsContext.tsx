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
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
