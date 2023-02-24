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
  width: 100%;
`;
const MainContent = styled.div`
  padding: 20px;
  width: 100%;
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
        <MainContent>{children}</MainContent>
      </BodyPage>
    </ContainerPage>
  );
};
export default Layout;
