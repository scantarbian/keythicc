import Link from "next/link";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 11H11V3H3V11ZM5 5H9V9H5V5Z" fill="white" />
        <path d="M3 21H11V13H3V21ZM5 15H9V19H5V15Z" fill="white" />
        <path d="M13 21H21V13H13V21ZM15 15H19V19H15V15Z" fill="white" />
        <path d="M13 3V11H21V3H13ZM19 9H15V5H19V9Z" fill="white" />
      </svg>
    ),
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 7V5C15 4.20435 14.6839 3.44129 14.1213 2.87868C13.5587 2.31607 12.7956 2 12 2C11.2044 2 10.4413 2.31607 9.87868 2.87868C9.31607 3.44129 9 4.20435 9 5V7H5V21H19V7H15ZM11 5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5V7H11V5ZM17 19H7V9H9V11H11V9H13V11H15V9H17V19Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: <></>,
  },
];

const Sidenav = ({
  className,
  active,
}: {
  className?: string;
  active: string;
}) => {
  return (
    <div
      className={`flex flex-col border-r-2 border-orange-400 gap-2 p-4 bg-special-grey ${className}`}
    >
      {menuItems.map((item, index) => (
        <Link href={item.href} key={index}>
          <a
            className={`hover:text-orange-400 flex p-4 gap-2 px-6 text-xl items-center hover:border-orange-400 border-special-grey border-2 rounded-xl ${
              item.href === active ? "text-orange-400 font-bold" : "text-white"
            }`}
          >
            {item.icon}
            <span>{item.title}</span>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Sidenav;
