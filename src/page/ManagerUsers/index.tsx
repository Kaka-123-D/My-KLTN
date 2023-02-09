import { Button } from "antd";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useState } from "react";

import { images } from "core/assets/";
import useFilter from "core/hooks/common/useFilter";
import { IFilter } from "core/constants/interfaces";
import PaginationCustom from "core/components/PaginationCustom";
import AccountTable from "./AccountTable";
import AccountFilter from "./AccountFilter";
import { getListUser } from "core/api/account";
import { formatText } from "core/helpers";
import AccountModal from "./AccountModal";
import { ActionType } from "core/constants/enums";

const defaultFilter: IFilter = {
  pageIndex: 1,
  pageSize: 10,
};

export default function Account() {
  const [t] = useTranslation();

  const {
    filter,
    handleFilterChange,
    resetFilter,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearch,
  } = useFilter(defaultFilter);
  const [open, setOpen] = useState(false);

  const { data: accounts, isLoading: loadingAccounts } = useQuery(
    ["accounts", filter],
    () => getListUser(convertDataBeforeCallApi()),
    { keepPreviousData: true }
  );

  const convertDataBeforeCallApi = () => {
    const keyword = _.pick(filter, ["keyword"]).keyword;
    return {
      ...filter,
      keyword: formatText(keyword),
    };
  };

  return (
    <div className="page-container">
      <div className="page-sub-header page-sub-header--tab">
        <div className="sub-header-btn">
          <Button
            className="btn"
            icon={<img src={images.addIcon} alt="" />}
            onClick={() => {
              setOpen(true);
            }}
          >
            {t("btn.addAccount")}
          </Button>
        </div>
      </div>
      <div className="table-wrapper">
        <div className="table-container">
          <AccountTable
            data={accounts?.data?.data || []}
            loading={loadingAccounts}
            pageIndex={filter.pageIndex || 1}
            pageSize={filter.pageSize || 10}
          />
          <PaginationCustom
            total={accounts?.data?.totalItems}
            pageIndex={filter.pageIndex || 1}
            pageSize={filter.pageSize || 10}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </div>
        <div className="filter-container">
          <AccountFilter
            handleSearch={handleSearch}
            resetFilter={resetFilter}
          />
        </div>
      </div>
      {open && (
        <AccountModal
          type={ActionType.CREATE}
          open={open}
          onOk={() => {
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
