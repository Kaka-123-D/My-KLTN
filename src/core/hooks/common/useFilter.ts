import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { IFilter } from "core/constants/interfaces";
import { DebounceTime } from "core/constants/enums";

export default function userFilter(defaultFilter: IFilter) {
  const [filter, setFilter] = useState<IFilter>(defaultFilter);

  const handleFilterChange = (changeValue: IFilter) => {
    setFilter({
      ...filter,
      ...changeValue,
      pageIndex: 1,
    });
  };

  const debounceKeyword = useDebouncedCallback((keyword, fieldKey) => {
    if (!fieldKey) fieldKey = "keyword";
    handleFilterChange({ [fieldKey]: keyword });
  }, DebounceTime.DEFAULT);

  const keywordSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey?: string
  ) => {
    debounceKeyword(e.target.value, fieldKey);
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setFilter({ ...filter, pageIndex: newPage + 1 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilter({
      ...filter,
      pageSize: parseInt(event.target.value, 10),
      pageIndex: 1,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetFilter = () => {
    setFilter({ ...defaultFilter });
  };

  return {
    filter,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
    resetFilter,
    handleSearch: {
      keywordSearch,
    },
  };
}
