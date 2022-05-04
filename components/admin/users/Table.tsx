import DataTable, { TableColumn } from "react-data-table-component";
// hooks
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
// data
import { Account } from "models/Account";

type TableProps = {
  users: [Account & { _id: string }];
  className?: string;
};

type Row = {
  _id: string;
  fullname?: Account["fullname"];
  email: Account["email"];
};

const UserTable = ({ users, className }: TableProps) => {
  const router = useRouter();
  const [data, setData] = useState<Row[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setData(users);
  }, [users]);

  const columns: TableColumn<Row>[] = [
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.fullname || "undefined",
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
              fetch(`/api/account?id=${row._id}`, {
                method: "DELETE",
              }).then(() => {
                setData(data.filter((item) => item._id !== row._id));
                enqueueSnackbar("User deleted", {
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
        router.push(`/admin/users/${rowData._id}`);
      }}
    />
  );
};

export default UserTable;
