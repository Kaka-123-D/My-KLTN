import React from "react";
import styled from "styled-components";
import { colors } from "core/assets";

const getColorByCount = (count: number) => {
  if (count === 0) return colors.newColor;
  if (count < 100) return colors.haveImageColor;
  return colors.bigImageColor;
};

const BoxContainer = styled((props) => <div {...props}></div>)`
  width: 100%;
  border: 1px solid gray;
  border-top: ${(props) => `3px solid ${getColorByCount(props.count)}`};
  border-radius: 5px;
  padding: 15px;
  cursor: pointer;
  background: #fff7ec;
`;

const NameRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const BoxName = styled.span`
  color: ${colors.titleForm};
  font-weight: 700;
  font-size: 16px;
`;

const Description = styled.div`
  color: ${colors.contentForm};
  font-weight: 700;
  font-size: 16px;
`;

interface IProps {
  title: string;
  description?: string;
  totalItems?: number;
}

const BoxClassInfo = (props: IProps) => {
  const { title, description, totalItems = 0 } = props;
  return (
    <BoxContainer>
      <NameRow>
        <BoxName>{title}</BoxName>
      </NameRow>
      <div>{totalItems + " ảnh"}</div>
      <hr className="mt-10 mb-10" />
      <Description>{description}</Description>
    </BoxContainer>
  );
};

export default BoxClassInfo;
