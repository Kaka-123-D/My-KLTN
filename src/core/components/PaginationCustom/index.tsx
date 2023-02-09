import TablePagination from "@mui/material/TablePagination";

interface IProps {
  total: number;
  pageSize: number;
  pageIndex: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function PaginationCustom({
  total,
  pageIndex,
  pageSize,
  onPageChange,
  onRowsPerPageChange,
}: IProps) {
  if (!total) return <></>;
  return (
    <TablePagination
      component="div"
      count={total}
      page={pageIndex - 1}
      rowsPerPage={pageSize}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      className="tablePaginationCustom"
      rowsPerPageOptions={[10, 20, 40, 60]}
      labelDisplayedRows={({ from, to, count }) => {
        return `${from || 0}–${to || 0} from ${
          count !== -1 ? count || 0 : `more than ${to}`
        }`;
      }}
    />
  );
}
