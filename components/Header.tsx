import Link from "next/link";
import useSettings from "hooks/useSettings";
import { ReactNode, useState, useContext } from "react";
// context
import { CartContext } from "contexts/CartContext";

const menuItems = [
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "Auctions",
    href: "/auctions",
  },
  {
    title: "About Us",
    href: "/about",
  },
];

const Header = ({
  className,
  children,
  current,
  additionals = false,
}: {
  className?: string;
  children?: ReactNode;
  current?: string;
  additionals?: boolean;
}) => {
  const { toggleMenu } = useSettings();
  const [cartHover, setCartHover] = useState(false);
  const [searchHover, setSearchHover] = useState(false);
  const [menuHover, setMenuHover] = useState(false);

  const { contents } = useContext(CartContext);

  return (
    <header
      className={`flex text-white justify-between px-20 pt-20 items-center ${className}`}
    >
      <Link href="/">
        <a>
          <svg
            width="180"
            height="39"
            viewBox="0 0 180 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.717456 30V1.1785H6.15237V12.6248H6.89349L16.2399 1.1785H23.1982L11.1755 15.3834L23.61 30H16.4458L6.89349 18.3067H6.15237V30H0.717456ZM35.3579 30.5764C33.3267 30.5764 31.5288 30.151 29.9642 29.3C28.4271 28.4217 27.2193 27.2002 26.3409 25.6356C25.49 24.0436 25.0645 22.177 25.0645 20.036V19.5419C25.0645 17.4009 25.49 15.5481 26.3409 13.9835C27.1918 12.3914 28.3859 11.17 29.923 10.319C31.4602 9.44066 33.2444 9.00148 35.2756 9.00148C37.2794 9.00148 39.0224 9.45439 40.5046 10.3602C41.9869 11.2386 43.1397 12.4738 43.9632 14.0658C44.7867 15.6304 45.1984 17.4558 45.1984 19.5419V21.3124H30.3348C30.3897 22.7123 30.9112 23.8514 31.8994 24.7298C32.8875 25.6082 34.0953 26.0473 35.5226 26.0473C36.9774 26.0473 38.0479 25.7317 38.7342 25.1003C39.4204 24.469 39.9419 23.7691 40.2988 23.0005L44.5396 25.2239C44.1554 25.9375 43.5927 26.7198 42.8515 27.5708C42.1379 28.3942 41.1771 29.1079 39.9694 29.7118C38.7616 30.2882 37.2245 30.5764 35.3579 30.5764ZM30.3759 17.4421H39.9282C39.8184 16.2618 39.338 15.3148 38.4871 14.6011C37.6637 13.8874 36.5794 13.5306 35.2344 13.5306C33.8345 13.5306 32.7228 13.8874 31.8994 14.6011C31.0759 15.3148 30.5681 16.2618 30.3759 17.4421ZM52.0393 38.2347V33.7056H63.1562C63.9248 33.7056 64.3091 33.2939 64.3091 32.4704V27.3237H63.5679C63.3484 27.7904 63.0052 28.257 62.5386 28.7236C62.072 29.1903 61.4406 29.5745 60.6446 29.8765C59.8486 30.1784 58.833 30.3294 57.5978 30.3294C56.0057 30.3294 54.6058 29.9726 53.3981 29.2589C52.2178 28.5178 51.2982 27.5021 50.6394 26.212C49.9807 24.9219 49.6513 23.4397 49.6513 21.7653V9.57791H54.8391V21.3536C54.8391 22.8907 55.2097 24.0436 55.9508 24.8121C56.7194 25.5807 57.8036 25.965 59.2035 25.965C60.7956 25.965 62.0308 25.4435 62.9092 24.4004C63.7875 23.3299 64.2267 21.8476 64.2267 19.9536V9.57791H69.4146V33.6233C69.4146 35.0232 69.0029 36.1349 68.1794 36.9583C67.3559 37.8093 66.258 38.2347 64.8855 38.2347H52.0393ZM81.693 30V6.11933H73.2936V1.1785H95.5273V6.11933H87.1279V30H81.693ZM99.3931 30V1.1785H104.581V12.0895H105.322C105.542 11.6503 105.885 11.2111 106.351 10.7719C106.818 10.3328 107.436 9.97592 108.204 9.70143C109 9.39949 110.002 9.24852 111.21 9.24852C112.802 9.24852 114.188 9.61908 115.368 10.3602C116.576 11.0739 117.509 12.0758 118.168 13.3659C118.827 14.6285 119.156 16.1108 119.156 17.8126V30H113.969V18.2244C113.969 16.6872 113.584 15.5344 112.816 14.7658C112.075 13.9972 111.004 13.6129 109.604 13.6129C108.012 13.6129 106.777 14.1482 105.899 15.2187C105.02 16.2618 104.581 17.7303 104.581 19.6243V30H99.3931ZM124.765 30V9.57791H129.953V30H124.765ZM127.359 7.18984C126.425 7.18984 125.629 6.8879 124.971 6.28402C124.339 5.68014 124.024 4.88412 124.024 3.89596C124.024 2.90779 124.339 2.11177 124.971 1.50789C125.629 0.90401 126.425 0.60207 127.359 0.60207C128.319 0.60207 129.115 0.90401 129.747 1.50789C130.378 2.11177 130.694 2.90779 130.694 3.89596C130.694 4.88412 130.378 5.68014 129.747 6.28402C129.115 6.8879 128.319 7.18984 127.359 7.18984ZM145.295 30.5764C143.319 30.5764 141.521 30.1647 139.901 29.3412C138.309 28.5178 137.046 27.3237 136.113 25.7591C135.18 24.1945 134.713 22.3005 134.713 20.0772V19.5007C134.713 17.2774 135.18 15.3834 136.113 13.8188C137.046 12.2542 138.309 11.0602 139.901 10.2367C141.521 9.41321 143.319 9.00148 145.295 9.00148C147.244 9.00148 148.918 9.34459 150.318 10.0308C151.718 10.717 152.843 11.664 153.694 12.8718C154.573 14.0521 155.149 15.3971 155.424 16.9068L150.4 17.9773C150.291 17.1538 150.044 16.4127 149.659 15.7539C149.275 15.0952 148.726 14.5736 148.012 14.1893C147.326 13.8051 146.461 13.6129 145.418 13.6129C144.375 13.6129 143.428 13.8462 142.577 14.3129C141.754 14.7521 141.095 15.4246 140.601 16.3304C140.134 17.2087 139.901 18.293 139.901 19.5831V19.9948C139.901 21.2849 140.134 22.3829 140.601 23.2887C141.095 24.1671 141.754 24.8396 142.577 25.3062C143.428 25.7454 144.375 25.965 145.418 25.965C146.983 25.965 148.163 25.567 148.959 24.771C149.783 23.9475 150.304 22.877 150.524 21.5594L155.547 22.7535C155.19 24.2083 154.573 25.5395 153.694 26.7473C152.843 27.9276 151.718 28.8609 150.318 29.5471C148.918 30.2333 147.244 30.5764 145.295 30.5764ZM169.42 30.5764C167.444 30.5764 165.646 30.1647 164.026 29.3412C162.434 28.5178 161.172 27.3237 160.238 25.7591C159.305 24.1945 158.838 22.3005 158.838 20.0772V19.5007C158.838 17.2774 159.305 15.3834 160.238 13.8188C161.172 12.2542 162.434 11.0602 164.026 10.2367C165.646 9.41321 167.444 9.00148 169.42 9.00148C171.369 9.00148 173.043 9.34459 174.443 10.0308C175.843 10.717 176.969 11.664 177.819 12.8718C178.698 14.0521 179.274 15.3971 179.549 16.9068L174.526 17.9773C174.416 17.1538 174.169 16.4127 173.784 15.7539C173.4 15.0952 172.851 14.5736 172.138 14.1893C171.451 13.8051 170.587 13.6129 169.544 13.6129C168.501 13.6129 167.554 13.8462 166.703 14.3129C165.879 14.7521 165.22 15.4246 164.726 16.3304C164.26 17.2087 164.026 18.293 164.026 19.5831V19.9948C164.026 21.2849 164.26 22.3829 164.726 23.2887C165.22 24.1671 165.879 24.8396 166.703 25.3062C167.554 25.7454 168.501 25.965 169.544 25.965C171.108 25.965 172.288 25.567 173.084 24.771C173.908 23.9475 174.43 22.877 174.649 21.5594L179.672 22.7535C179.315 24.2083 178.698 25.5395 177.819 26.7473C176.969 27.9276 175.843 28.8609 174.443 29.5471C173.043 30.2333 171.369 30.5764 169.42 30.5764Z"
              fill="white"
            />
          </svg>
        </a>
      </Link>
      {children}
      <div className="flex items-center gap-20">
        {additionals && (
          <>
            <button
              onMouseEnter={() => {
                setSearchHover(true);
              }}
              onMouseLeave={() => {
                setSearchHover(false);
              }}
            >
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.8035 28.8031L17.5327 17.5322"
                  stroke={searchHover ? "#FB923C" : "white"}
                  strokeWidth="3.75694"
                />
                <circle
                  cx="10.6447"
                  cy="10.6447"
                  r="8.7662"
                  stroke={searchHover ? "#FB923C" : "white"}
                  strokeWidth="3.75694"
                />
              </svg>
            </button>
            <Link href="/cart">
              <button
                onMouseEnter={() => {
                  setCartHover(true);
                }}
                onMouseLeave={() => {
                  setCartHover(false);
                }}
              >
                {contents.length > 0 && (
                  <span
                    className={`${
                      cartHover || current === "/cart"
                        ? "text-yellow-500"
                        : "text-white"
                    }`}
                  >
                    {contents.length}
                  </span>
                )}
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.8051 6.07564H6.43667L9.52118 15.3292H21.9169C22.1966 15.3292 22.4523 15.1711 22.5774 14.9209L26.4657 7.14448C26.7112 6.65342 26.3541 6.07564 25.8051 6.07564Z"
                    fill="black"
                  />
                  <path
                    d="M0.781738 2.47705H3.95174C4.21677 2.47705 4.46148 2.61906 4.59297 2.84917L6.43667 6.07564M6.43667 6.07564H25.8051C26.3541 6.07564 26.7112 6.65342 26.4657 7.14448L22.5774 14.9209C22.4523 15.1711 22.1966 15.3292 21.9169 15.3292H9.52118M6.43667 6.07564L9.52118 15.3292M9.52118 15.3292L6.97109 20.4294C6.72556 20.9204 7.08264 21.4982 7.63166 21.4982H24.9437"
                    stroke={
                      current === "/cart" || cartHover ? "#FB923C" : "white"
                    }
                    strokeWidth="3.08451"
                  />
                  <circle
                    cx="8.29002"
                    cy="26.2331"
                    r="2.33836"
                    fill={
                      current === "/cart" || cartHover ? "#FB923C" : "white"
                    }
                  />
                  <circle
                    cx="22.5679"
                    cy="26.2331"
                    r="2.33836"
                    fill={
                      current === "/cart" || cartHover ? "#FB923C" : "white"
                    }
                  />
                </svg>
              </button>
            </Link>
          </>
        )}
        <button
          onClick={toggleMenu}
          onMouseEnter={() => {
            setMenuHover(true);
          }}
          onMouseLeave={() => {
            setMenuHover(false);
          }}
        >
          <div className="flex flex-col gap-3 items-center">
            <svg
              width="43"
              height="14"
              viewBox="0 0 43 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.818848 0.932602H42.1291V1.91618H0.818848V0.932602Z"
                fill={menuHover ? "#FB923C" : "white"}
              />
              <path
                d="M0.818848 6.83408H42.1291V7.81765H0.818848V6.83408Z"
                fill={menuHover ? "#FB923C" : "white"}
              />
              <path
                d="M0.818848 12.7355H42.1291V13.7191H0.818848V12.7355Z"
                fill={menuHover ? "#FB923C" : "white"}
              />
            </svg>
            <span className={`${menuHover ? "text-orange-400" : "text-white"}`}>
              MENU
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};

export const HeaderWithMenu = ({
  current,
  className,
}: {
  current: string;
  className?: string;
}) => {
  return (
    <Header additionals className={className} current={current}>
      <div className="flex gap-20 font-bold text-white mx-48">
        {menuItems.map((item, index) => (
          <Link href={item.href} key={index}>
            <a
              className={`hover:text-orange-400 ${
                current === item.href ? "border-b-4 border-orange-400" : ""
              }`}
            >
              {item.title}
            </a>
          </Link>
        ))}
      </div>
    </Header>
  );
};

export default Header;
