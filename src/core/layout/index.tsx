import HeaderBar from "./components/HeaderBar";
import styled from "styled-components";
import SideBar from "./components/SideBar";

const ContainerPage = styled.div`
  background-color: #fff;
  height: 100vh;
`;

const BodyPage = styled.div`
  display: flex;
  height: 100%;
`;

interface LayoutProps {
  children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ContainerPage>
      <HeaderBar />
      <BodyPage>
        <SideBar />
        {children}
      </BodyPage>
    </ContainerPage>
  );
};
export default Layout;
