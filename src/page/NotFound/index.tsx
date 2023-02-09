import { images } from "../../core/assets";
import styled from "styled-components";

const BackgroundNotFound = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`;

const NotFound = () => {
  return <BackgroundNotFound src={images.notFound} alt="Not Found" />;
};

export default NotFound;
