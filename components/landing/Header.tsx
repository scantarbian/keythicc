const Header = ({ className }: { className?: string }) => {
  return (
    <header
      className={`flex text-white justify-between px-20 pt-20 ${className}`}
    >
      <h1 className="text-5xl font-bold">KeyThicc</h1>
      <button>
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
              fill="white"
            />
            <path
              d="M0.818848 6.83408H42.1291V7.81765H0.818848V6.83408Z"
              fill="white"
            />
            <path
              d="M0.818848 12.7355H42.1291V13.7191H0.818848V12.7355Z"
              fill="white"
            />
          </svg>
          <span>MENU</span>
        </div>
      </button>
    </header>
  );
};

export default Header;
