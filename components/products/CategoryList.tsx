import { Category } from "models/Category";

type CategoryProps = {
  categories: [Category & { _id: string }];
  active: number;
  onClick: (id: number) => void;
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
          onClick={() => onClick(index)}
          className={`hover:text-orange-400 ${
            active === index ? "font-bold text-orange-400" : "font-light"
          }`}
        >
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
