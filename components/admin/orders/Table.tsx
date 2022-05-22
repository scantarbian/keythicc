import DataTable, { TableColumn } from "react-data-table-component";
// hooks
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
// data
import { Order } from "models/Order";

type TableProps = {
  orders: [Order & { _id: string }];
  className?: string;
};

type Row = {
  _id: string;
  email: Order["email"];
  createdAt?: Order["createdAt"];
};

const OrdersTable = ({ orders, className }: TableProps) => {
  const router = useRouter();
  const [data, setData] = useState<Row[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setData(orders);
  }, [orders]);

  const columns: TableColumn<Row>[] = [
    {
      name: "Order Date",
      selector: (row) => row.createdAt!.toLocaleString(),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
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
              fetch(`/api/order?id=${row._id}`, {
                method: "DELETE",
              }).then(() => {
                setData(data.filter((item) => item._id !== row._id));
                enqueueSnackbar("Order deleted", {
                  variant: "success",
                });
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
        router.push(`/admin/orders/${rowData._id}`);
      }}
    />
  );
};

export default OrdersTable;
