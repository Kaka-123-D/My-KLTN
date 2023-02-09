export const displayLabelTablePagination = ({ from, to, count }: any) => {
  return `${from}–${to} from ${count !== -1 ? count : `more than ${to}`}`;
};
