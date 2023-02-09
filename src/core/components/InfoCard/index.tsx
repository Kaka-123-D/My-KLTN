import styled from "styled-components";
import { Avatar } from "antd";
import { colors } from "core/assets";

const ContainerCard = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.mainColor};
  display: block;
`;

const Description = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: gray;
`;

const Info = styled((props) => (
  <div {...props}>
    <Name>{props.name}</Name>
    <Description>{props.description}</Description>
  </div>
))`
  margin-left: 10px;
`;

interface IProps {
  avatar?: string;
  name?: string;
  description?: string;
}
const InfoCard = (props: IProps) => {
  const { avatar, name, description } = props;
  return (
    <ContainerCard>
      <Avatar src={avatar} size={40} />
      <Info name={name} description={description} />
    </ContainerCard>
  );
};

export default InfoCard;
