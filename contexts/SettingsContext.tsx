import { createContext, ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const initState = {
  menuOpen: false,
  toggleMenu: () => {},
};

const menuTopOptions = [
  {
    title: "Keyboards",
    href: "/products/keyboards",
    icon: "",
  },
  {
    title: "Auctions",
    href: "/auctions",
    icon: (
      <svg
        width="52"
        height="55"
        viewBox="0 0 52 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.999969"
          y="23.6666"
          width="26"
          height="6"
          rx="3"
          stroke="white"
          stroke-width="2"
        />
        <path
          d="M0.999969 50.2223C0.999969 48.5654 2.34312 47.2223 3.99997 47.2223H24C25.6568 47.2223 27 48.5654 27 50.2223C27 51.8791 25.6568 53.2223 24 53.2223H3.99997C2.34312 53.2223 0.999969 51.8791 0.999969 50.2223Z"
          stroke="white"
          stroke-width="2"
        />
        <rect
          x="7.22223"
          y="29.4446"
          width="13.5556"
          height="18"
          stroke="white"
          stroke-width="2"
        />
        <rect
          x="20"
          y="36.889"
          width="32"
          height="3.11111"
          rx="1.55556"
          fill="white"
        />
        <path
          d="M7.157 18.8647C5.61302 19.1515 4.41486 17.5491 5.17746 16.1763C8.85481 9.55653 12.2112 5.98347 18.2348 2.04265C18.9647 1.56508 19.934 1.71007 20.507 2.36784C21.1725 3.13191 21.061 4.29748 20.2736 4.93527C14.399 9.69376 11.568 12.8483 8.44837 17.968C8.16355 18.4354 7.69516 18.7647 7.157 18.8647Z"
          fill="white"
        />
        <path
          d="M15.4656 17.6903C14.5545 17.6534 13.9299 16.7495 14.2703 15.9036C15.6434 12.4907 17.2147 10.8118 20.3331 9.29555C20.8296 9.05416 21.423 9.1757 21.8032 9.576C22.3658 10.1685 22.2501 11.1233 21.5823 11.5941C19.1314 13.322 17.8878 14.7148 16.7813 16.8986C16.5301 17.3944 16.0209 17.7128 15.4656 17.6903Z"
          fill="white"
        />
        <circle cx="24.4444" cy="4.88888" r="1.33333" fill="white" />
      </svg>
    ),
  },
  {
    title: "Peripherals",
    href: "/products/peripherals",
    icon: "",
  },
];

const MenuBottomOptions = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "News",
    href: "/news",
  },
  {
    title: "Warranty Service",
    href: "/warranty",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
  {
    title: "Support",
    href: "/support",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

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
      <nav
        className={`w-full h-full fixed flex items-center justify-center ${
          settings.menuOpen ? "" : "hidden"
        }`}
        style={{
          background: "rgba(0,0,0,0.8)",
        }}
      >
        <div
          className="text-white flex flex-col w-3/4 h-2/3 p-8 "
          style={{
            background: "#1F1F1F",
          }}
        >
          <button onClick={toggleMenu} className="self-end">
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="29.9113"
                y="30.4448"
                width="41.3103"
                height="0.983578"
                transform="rotate(-135 29.9113 30.4448)"
                fill="white"
              />
              <rect
                x="30.6067"
                y="1.23401"
                width="41.3103"
                height="0.983578"
                transform="rotate(135 30.6067 1.23401)"
                fill="white"
              />
            </svg>
          </button>
          <div className="flex flex-col p-12 justify-between h-full">
            <div className="flex font-bold items-center justify-between px-20">
              <span className="text-3xl">MENU</span>
              <Link href="/login">
                <a className="flex gap-2 items-center text-lg">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 0V17M17 8.5H0"
                      stroke="#FAC53E"
                      stroke-width="3"
                    />
                  </svg>
                  <span>LOG IN</span>
                </a>
              </Link>
            </div>
            <div className="flex justify-evenly">
              {menuTopOptions.map((option, index) => (
                <Link href={option.href} key={index}>
                  <a className="flex flex-col items-center gap-2 hover:text-orange-400">
                    {option.icon}
                    <span>{option.title}</span>
                  </a>
                </Link>
              ))}
            </div>
            <div className="h-0.5 w-full bg-gray-600" />
            <div className="flex justify-evenly">
              {MenuBottomOptions.map((option, index) => (
                <Link href={option.href} key={index}>
                  <a className="uppercase font-bold hover:text-orange-400">
                    {option.title}
                  </a>
                </Link>
              ))}
            </div>
            <div className="flex justify-between px-20">
              <a
                href="https://instagram.com/keythicc"
                rel="noopener noreferrer"
                target="_blank"
                className="hover:text-orange-400"
              >
                Follow KeyThicc
              </a>
              <Link href="/privacy">
                <a className="font-light hover:text-orange-400">
                  Privacy Policy
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <>{children}</>
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
