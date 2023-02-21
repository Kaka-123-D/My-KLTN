import { Link, useLocation } from "react-router-dom";
import { images } from "../../assets";
import styled from "styled-components";
import routes from "routes/routes-base";
import { useAuth } from "auth/contexts/AuthProvider";

import { Avatar, TextField } from "@mui/material";
import { Modal } from "antd";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import CustomAutocomplete from "core/components/ReactHookForm/Autocomplete";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

const HeaderContainer = styled.div`
  height: 70px;
  background-color: #222433;
  display: flex;
  position: relative;
  align-items: center;
  box-shadow: 0px 5px 25px -5px rgba(254, 166, 40, 0.5);
  -webkit-box-shadow: 0px 5px 25px -5px rgba(254, 166, 40, 0.5);
  z-index: 10;
`;

const Logo = styled.div`
  background-image: url(${images.logo});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin: auto 15px;
`;

const BrandName = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  align-items: center;
  display: flex;
  padding-right: 100px;
`;

const Logout = styled.div`
  background-image: url(${images.logoutIcon});
  height: 30px;
  width: 30px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  margin-right: 30px;
  margin-left: 20px;
`;

const OtherInfo = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 99%;
`;

const HeaderBar = () => {
  const { hasRole, logout, userInfo, listClass } = useAuth();
  const { pathname } = useLocation();

  const {
    control,
    formState: { errors },
  } = useForm();

  const showConfirmLogout = () => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn đăng xuất?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return logout().catch(() => console.log("Oops errors!"));
      },
      centered: true,
    });
  };

  return (
    <HeaderContainer>
      <Logo />
      <BrandName>MyProject</BrandName>
      <div>
        <CustomAutocomplete
          name="keyword"
          control={control}
          errors={errors}
          listOptions={listClass}
          placeholder="Tìm kiếm class"
          getOptionLabel={(option) => option.name}
          customRenderOption={(option) => <>{option.name}</>}
          onChange={(option) => alert(option.name)}
          className={styles.searchBar}
          isSearchBar
        />
      </div>
      <OtherInfo>
        <Avatar src={userInfo?.avatar} />
        <Logout onClick={() => showConfirmLogout()} />
      </OtherInfo>
    </HeaderContainer>
  );
};

export default HeaderBar;
