import DataTable, { TableColumn } from "react-data-table-component";
// hooks
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// data
import { Product } from "models/Product";
import { Type } from "models/Type";
import { Category } from "models/Category";

interface Row {
  _id: string;
  name: Product["name"];
  type: Type["name"];
  category: Category["name"];
  basePrice: Product["basePrice"];
  stock: Product["stock"];
}

type ProductTableProps = {
  products: [Product & { _id: string }];
  types: [Type & { _id: string }];
  categories: [Category & { _id: string }];
  className?: string;
};

const ProductTable = ({
  products,
  types,
  categories,
  className,
}: ProductTableProps) => {
  const router = useRouter();
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    if (products && types && categories) {
      setData(
        products.map((product) => {
          const type = types.find((type) => type._id === String(product.type));
          const category = categories.find(
            (category) => category._id === String(product.category)
          );

          return {
            _id: product._id,
            name: product.name,
            type: type ? type.name : "",
            basePrice: product.basePrice,
            stock: product.stock,
            category: category ? category.name : "",
          };
        })
      );
    }
  }, []);

  const columns: TableColumn<Row>[] = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.basePrice,
      sortable: true,
      format: (row) => `Rp.${row.basePrice.toLocaleString()}`,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Action",
      ignoreRowClick: true,
      cell: (row) => (
        <>
          <button
            className="text-red-500 hover:font-bold"
            onClick={() => {
              fetch(`/api/product?id=${row._id}`, {
                method: "DELETE",
              }).then(() => {
                setData(data.filter((item) => item._id !== row._id));
              });
            }}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <DataTable
      className={className}
      columns={columns}
      data={data}
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
