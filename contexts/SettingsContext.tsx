import { createContext, ReactNode, useState } from "react";

const initState = {
  menuOpen: false,
  onToggleMenu: () => {},
};

export const SettingsContext = createContext(initState);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState({
    menuOpen: initState.menuOpen,
  });

  const onToggleMenu = () => {
    setSettings({
      ...settings,
      menuOpen: !settings.menuOpen,
    });
  };

  return (
    <SettingsContext.Provider value={{ ...settings, onToggleMenu }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
