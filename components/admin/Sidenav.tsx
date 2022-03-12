import Link from "next/link";

const menuItems = [
  {
    title: "Products",
    href: "/products",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 7V5C15 4.20435 14.6839 3.44129 14.1213 2.87868C13.5587 2.31607 12.7956 2 12 2C11.2044 2 10.4413 2.31607 9.87868 2.87868C9.31607 3.44129 9 4.20435 9 5V7H5V21H19V7H15ZM11 5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5V7H11V5ZM17 19H7V9H9V11H11V9H13V11H15V9H17V19Z" />
      </svg>
    ),
  },
];

const Sidenav = ({ className }: { className?: string }) => {
  <div className={`flex flex-col ${className}`}></div>;
};

export default Sidenav;
