import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { images } from "../../assets";
import styled from "styled-components";
import routes from "routes/routes-base";
import { useAuth } from "auth/contexts/AuthProvider";

import { Avatar } from "@mui/material";
import { Modal } from "antd";

import { ExclamationCircleOutlined } from "@ant-design/icons";

const HeaderContainer = styled.div`
  height: 60px;
  background-color: #222433;
  display: flex;
  position: relative;
`;

const Logo = styled.div`
  background-image: url(${images.logoRecruit});
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
  padding-right: 20px;
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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const NavItem = styled(({ isActive, ...props }) => (
  <StyledLink to={props.path}>
    <div {...props}>{props.name}</div>
  </StyledLink>
))`
  color: white;
  height: 100%;
  background-color: ${(props) =>
    props.isActive ? "hsla(0, 0%, 100%, 0.1)" : "#222433"};
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding-right: 15px;
  padding-left: 15px;
  border-left: 1px solid hsla(0, 0%, 100%, 0.1);
  border-right: 1px solid hsla(0, 0%, 100%, 0.1);
  border-bottom: ${(props) =>
    props.isActive ? "3px solid #368797" : "3px solid transparent"};
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
    border-bottom: 3px solid #368797;
  }
`;

const HeaderBar = () => {
  const { hasRole, logout, userInfo } = useAuth();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const showConfirmLogout = () => {
    Modal.confirm({
      title: t("alert.areYouSureLogout"),
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
      <BrandName>Recruit</BrandName>
      {routes.map((route, index) => {
        if (route?.private && hasRole(route.roles)) {
          return (
            <NavItem
              key={index}
              path={route.path}
              name={route.name}
              isActive={"/" + pathname.split("/")[1] === route.path}
            />
          );
        }
      })}
      <OtherInfo>
        <Avatar src={userInfo?.avatar} />
        <Logout onClick={() => showConfirmLogout()} />
      </OtherInfo>
    </HeaderContainer>
  );
};

export default HeaderBar;
