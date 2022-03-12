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
    <div className={`flex flex-col text-white gap-4 ${className}`}>
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onClick(index)}
          className={`${active === index ? "font-bold" : ""}`}
        >
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
