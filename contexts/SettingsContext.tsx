import { createContext, ReactNode, useState } from "react";
import Link from "next/link";

const initState = {
  menuOpen: false,
  toggleMenu: () => {},
};

const menuTopOptions = [
  {
    title: "Keyboards",
    href: "/products/keyboards",
    icon: (
      <svg
        width="51"
        height="39"
        viewBox="0 0 51 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="12.9099"
          width="49"
          height="25"
          rx="3"
          stroke="white"
          strokeWidth="2"
        />
        <rect x="9" y="16.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="14" y="16.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="19" y="16.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="24" y="16.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="29" y="16.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="34" y="16.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="39" y="16.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="9" y="22.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="9" y="28.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="39" y="28.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="14" y="22.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="19" y="22.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="24" y="22.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="16" y="28.9099" width="20" height="4" rx="1" fill="white" />
        <rect x="29" y="22.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="34" y="22.9099" width="4" height="4" rx="1" fill="white" />
        <rect x="39" y="22.9099" width="4" height="4" rx="1" fill="white" />
        <path
          d="M9.51559 12.9098C8.18226 8.07651 8.61559 -0.590157 21.0156 3.40984C36.5156 8.40984 45.5156 2.40991 46.5156 0.909912"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    ),
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
          strokeWidth="2"
        />
        <path
          d="M0.999969 50.2223C0.999969 48.5654 2.34312 47.2223 3.99997 47.2223H24C25.6568 47.2223 27 48.5654 27 50.2223C27 51.8791 25.6568 53.2223 24 53.2223H3.99997C2.34312 53.2223 0.999969 51.8791 0.999969 50.2223Z"
          stroke="white"
          strokeWidth="2"
        />
        <rect
          x="7.22223"
          y="29.4446"
          width="13.5556"
          height="18"
          stroke="white"
          strokeWidth="2"
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
    icon: (
      <svg
        width="31"
        height="51"
        viewBox="0 0 31 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.65763 50.4099C8.65763 28.4099 3.98771 20.9265 3.36558 18.4109C2.74344 15.8952 2.91853 13.2484 3.86662 10.8367C4.81471 8.42493 6.48893 6.36746 8.65763 4.94894C10.8263 3.53043 13.3823 2.821 15.9719 2.91882C18.5614 3.01664 21.0566 3.91687 23.1121 5.49496C25.1676 7.07304 26.6818 9.25095 27.4452 11.7274C28.2087 14.2038 28.1836 16.8562 27.3735 19.3178C23.1121 26.4099 23.1121 28.9099 22.1254 50.4099H18.5C19.6634 49.5512 15.7232 29.003 22.1254 18.4109C22.5775 17.0373 22.5915 14.7369 22.1655 13.355C21.7395 11.9732 20.8945 10.7579 19.7476 9.87734C18.6006 8.99676 17.2083 8.49443 15.7633 8.43985C14.3183 8.38526 12.8921 8.78113 11.6819 9.57266C10.4718 10.3642 9.53758 11.5123 9.00854 12.858C8.4795 14.2038 8.31047 17.0071 8.65763 18.4109C15 28.9099 11.4047 49.4659 12.5 50.4099H8.65763Z"
          fill="white"
        />
        <path
          d="M1 19.9099L3.5 16.9099L5.5 24.9099L2 23.9099L1 19.9099Z"
          fill="white"
          stroke="white"
        />
        <path
          d="M16.8832 1.03362L19 3.90991L11.5 3.9099L13 1.03362L16.8832 1.03362Z"
          fill="white"
          stroke="white"
        />
        <path
          d="M30 19.91L27.5 16.9099L23 24.91L27.6667 24.41L30 19.91Z"
          fill="white"
          stroke="white"
        />
      </svg>
    ),
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

const SettingsProvider = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
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
        } ${className}`}
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
              <Link href="/auth">
                <a
                  className="flex gap-2 items-center text-lg"
                  onClick={toggleMenu}
                >
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
                      strokeWidth="3"
                    />
                  </svg>
                  <span>LOG IN</span>
                </a>
              </Link>
            </div>
            <div className="flex justify-center gap-12">
              {menuTopOptions.map((option, index) => (
                <Link href={option.href} key={index}>
                  <a
                    className="flex flex-col items-center justify-end gap-2 hover:text-orange-400"
                    onClick={toggleMenu}
                  >
                    {option.icon}
                    <span>{option.title}</span>
                  </a>
                </Link>
              ))}
            </div>
            <div className="h-0.5 w-full bg-gray-600" />
            <div className="flex justify-center gap-12">
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
                <a
                  className="font-light hover:text-orange-400"
                  onClick={toggleMenu}
                >
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
