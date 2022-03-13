import DataTable from "react-data-table-component";
// hooks
import { useRouter } from "next/router";
// data
import { Product } from "models/Product";
import { Type } from "models/Type";
import { Category } from "models/Category";

const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Price",
    selector: "basePrice",
    sortable: true,
  },
  {
    name: "Stock",
    selector: "stock",
    sortable: true,
  },
  {
    name: "Category",
    selector: "category",
    sortable: true,
  },
  {
    name: "Action",
  },
];

type ProductTableProps = {
  products: [Product & { _id: string }];
  types: Type & { _id: string };
  categories: Category & { _id: string };
  className?: string;
};

const ProductTable = ({
  products,
  types,
  categories,
  className,
}: ProductTableProps) => {
  const router = useRouter();

  return (
    <DataTable
      className={className}
      columns={columns}
      data={products}
      keyField="_id"
      pagination
      highlightOnHover
      pointerOnHover
      selectableRows
      selectableRowsHighlight
      onRowClicked={(rowData) => {
        router.push(`/admin/products/${rowData._id}`);
      }}
    />
  );
};

export default ProductTable;
