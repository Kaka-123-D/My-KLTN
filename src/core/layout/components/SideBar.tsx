import React, { useState } from "react";
import { Button, Layout, Menu, message, Modal } from "antd";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

import styles from "./styles.module.scss";
import FooterModalSubmit from "core/components/FooterModalSubmit";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { apiCreateClass } from "core/api/common";
import { GET_LIST_CLASS } from "core/constants/queryName";
import { images } from "core/assets";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTextField from "core/components/ReactHookForm/TextField";
import { Grid } from "@mui/material";

const { Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Quản lý Users", "manager-users", <img src={images.iconListUser} />),
  getItem("Danh sách Class", "list-class", <img src={images.iconListClass} />),
  getItem("Thùng rác", "trash", <img src={images.trash} />),
];

const SideBar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const [isOpenModalCreateClass, setOpenModalCreateClass] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const { mutate: createClass, isLoading: isLoadingCreateClass } = useMutation(
    (payload: any) => apiCreateClass(payload),
    {
      onSuccess: (data: any, variables: any) => {
        queryClient.invalidateQueries(GET_LIST_CLASS);
        message.success("Tạo class " + variables.name + "thành cồng");
        setOpenModalCreateClass(false);
      },
    }
  );

  return (
    <div className={styles.sidebar}>
      <Sider>
        <div className="w-100 d-flex-c-c mb-20">
          <Button
            className="btn btn--create"
            onClick={() => setOpenModalCreateClass(true)}
          >
            Tạo Class +
          </Button>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname.split("/")[1]]}
          mode="inline"
          items={items}
          onClick={({ item, key }) => navigate("/" + key)}
        />
      </Sider>
      <Modal
        title="Tạo Class"
        className="modal-custom"
        centered
        open={isOpenModalCreateClass}
        onCancel={() => setOpenModalCreateClass(false)}
        footer={
          <FooterModalSubmit
            onOk={handleSubmit((values) => createClass(values))}
            onCancel={() => setOpenModalCreateClass(false)}
            isLoadingOnOk={isLoadingCreateClass}
          />
        }
      >
        <Grid container gap={2}>
          <Grid item xs={12}>
            <CustomTextField
              name="title"
              control={control}
              label="Tên Class"
              errors={errors}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              name="description"
              control={control}
              label="Mô tả"
              errors={errors}
              rows={8}
            />
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default SideBar;
