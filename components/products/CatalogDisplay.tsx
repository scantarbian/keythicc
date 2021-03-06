// props
import { ProductProps } from "./ProductCard";
// components
import ProductCard from "components/products/ProductCard";

type CatalogDisplayProps = {
  products: ProductProps[];
  activeCategory: string;
  className?: string;
};

const CatalogDisplay = ({
  products,
  activeCategory,
  className,
}: CatalogDisplayProps) => {
  return (
    <div className={`text-white px-8 ${className} gap-4 grid grid-cols-3`}>
      {products
        .filter((product) => String(product.category) === activeCategory)
        .map((product, index) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </div>
  );
};

export default CatalogDisplay;
