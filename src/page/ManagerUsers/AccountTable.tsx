import { message, Switch, Table, Popover } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { EditOutlined, IdcardOutlined } from "@ant-design/icons";

import { IAccount, IAccountForm } from "core/constants/interfaces";
import { convertUTCToLocalString, getIndexTable } from "core/helpers";
import { ActionType, UserStatus } from "core/constants/enums";
import { updateUserStatus } from "core/api/account";
import { useState } from "react";
import AccountModal from "./AccountModal";
import ChangePasswordModal from "./ChangePasswordModal";

interface IProps {
  data: IAccount[];
  loading: boolean;
  pageIndex: number;
  pageSize: number;
}

export default function AccountTable({
  data,
  loading,
  pageIndex,
  pageSize,
}: IProps) {
  const [t] = useTranslation();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [currentData, setCurrentData] = useState<IAccount>();

  const { mutate: putStatus, isLoading: loadingPutStatus } = useMutation(
    (payload: any) => updateUserStatus(payload?.id, payload?.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("accounts");
        message.destroy();
        message.success(t("message.updateStatusSuccess"));
      },
    }
  );

  const handleToggleActive = (checked: boolean, account: IAccount) => {
    putStatus({
      data: {
        status: checked ? UserStatus.ACTIVE : UserStatus.INACTIVE,
      },
      id: account.id,
    });
  };

  const columns: ColumnsType<IAccount> = [
    {
      title: t("table.index"),
      dataIndex: "index",
      key: "index",
      render: (value, record, index) => (
        <div>{getIndexTable(pageIndex, pageSize, index)}</div>
      ),
    },
    {
      title: t("table.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("table.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("table.phone"),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("table.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value, record, index) => (
        <div>{convertUTCToLocalString(record?.createdAt)}</div>
      ),
    },
    {
      title: t("table.roleName"),
      dataIndex: "roleName",
      key: "roleName",
      render: (value, record, index) => <div>{record?.role?.name}</div>,
    },
    {
      title: t("table.status"),
      render: (value, record, index) => {
        return (
          <div className="switch-custom">
            <Switch
              onChange={(checked: boolean) => {
                handleToggleActive(checked, record);
              }}
              checked={record.status === UserStatus.ACTIVE}
              disabled={loadingPutStatus}
            />
          </div>
        );
      },
    },
    {
      title: "",
      render: (value, record, index) => (
        <div className="d-flex">
          <Popover content={t("popover.updateProfile")} placement="bottom">
            <span
              className="icon-action mr-10"
              onClick={() => {
                setCurrentData(record);
                setOpen(true);
              }}
            >
              <EditOutlined />
            </span>
          </Popover>
          <Popover content={t("popover.changePassword")} placement="bottom">
            <span
              className="icon-action"
              onClick={() => {
                setCurrentData(record);
                setOpenChangePassword(true);
              }}
            >
              <IdcardOutlined />
            </span>
          </Popover>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
        className="tableCus"
        rowKey={(obj) => obj.id}
        loading={loading}
      />
      {open && (
        <AccountModal
          type={ActionType.UPDATE}
          open={open}
          onOk={() => {
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          data={currentData}
        />
      )}
      {openChangePassword && (
        <ChangePasswordModal
          data={currentData}
          open={openChangePassword}
          onOk={() => {
            setOpenChangePassword(false);
          }}
          onCancel={() => {
            setOpenChangePassword(false);
          }}
        />
      )}
    </>
  );
}
