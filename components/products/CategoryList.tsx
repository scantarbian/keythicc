import { Category } from "models/Category";

type CategoryProps = {
  categories: [Category & { _id: string }];
  active: string;
  onClick: (id: string) => void;
  className?: string;
};

const CategoryList = ({
  categories,
  active,
  onClick,
  className,
}: CategoryProps) => {
  return (
    <div
      className={`flex flex-col text-white gap-4 items-start px-8 ${className}`}
    >
      <span className="text-xl font-bold border-b-2 w-full pb-2 ">
        CATEGORIES
      </span>
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onClick(category._id)}
          className={`hover:text-orange-400 ${
            active === category._id ? "font-bold text-orange-400" : "font-light"
          }`}
        >
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
