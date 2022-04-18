import DataTable, { TableColumn } from "react-data-table-component";

type ProductTableProps = {
  viewerHistory: string[];
  className?: string;
};

const TrackingTable = ({ viewerHistory, className }: ProductTableProps) => {
  const columns: TableColumn<string>[] = [
    {
      name: "History",
      selector: (row) => row,
      sortable: true,
    },
  ];

  return (
    <DataTable
      className={className}
      columns={columns}
      data={viewerHistory}
      keyField="_id"
      pagination
      highlightOnHover
    />
  );
};

export default TrackingTable;
