import HeaderBar from "./components/HeaderBar";
import styled from "styled-components";
import SideBar from "./components/SideBar";

const ContainerPage = styled.div`
  background-color: #fff;
  height: 100vh;
`;

interface LayoutProps {
  children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ContainerPage>
      <HeaderBar />
      {/* <SideBar /> */}
      {children}
    </ContainerPage>
  );
};
export default Layout;
