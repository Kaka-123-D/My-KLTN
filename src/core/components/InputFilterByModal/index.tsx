import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button } from "antd";
import styled from "styled-components";
import { colors } from "core/assets";

import FooterModalSubmit from "core/components/FooterModalSubmit";

const RowItem = styled(({ isSelected, ...props }) => (
  <>
    <div {...props}>{props.name}</div>
    <hr />
  </>
))`
  cursor: pointer;
  overflow-y: hidden;
  padding: 16px 24px;
  margin: 0px -24px;
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => (props.isSelected ? "white" : `${colors.mainColor}`)};
  background-color: ${(props) => props.isSelected && colors.mainColorHover};
  &:hover {
    color: ${colors.textHover};
  }
`;

interface IProps {
  titleModal: string;
  placeholderInput: string;
  listFilter?: any[];
  itemIdSelected?: any;
  setItemIdSelected?: any;
}

const InputFilterByModal = (props: IProps) => {
  const { placeholderInput, titleModal, listFilter, itemIdSelected, setItemIdSelected } = props;
  const { t } = useTranslation();
  const [openModalFilter, setOpenModalFilter] = useState(false);
  const [itemIdSelectedTemp, setItemIdSelectedTemp] = useState(itemIdSelected);

  const getNameItemSelected = () => {
    if (!listFilter || !itemIdSelected) return null;
    return listFilter.find((item) => item.id === itemIdSelected)?.name;
  };

  return (
    <>
      <Button onClick={() => setOpenModalFilter(true)} className="btn-filter">
        {getNameItemSelected() ?? placeholderInput}
      </Button>
      <Modal
        title={titleModal}
        open={openModalFilter}
        onCancel={() => setOpenModalFilter(false)}
        centered
        footer={
          <FooterModalSubmit
            onOk={() => {
              setItemIdSelected(itemIdSelectedTemp);
              setOpenModalFilter(false);
            }}
          />
        }
        className="modal-custom"
      >
        {listFilter?.map((item) => (
          <RowItem
            key={item.id}
            name={item.name}
            onClick={() => {
              if (item.id === itemIdSelectedTemp) setItemIdSelectedTemp(null);
              else setItemIdSelectedTemp(item.id);
            }}
            isSelected={item.id === itemIdSelectedTemp}
          />
        ))}
      </Modal>
    </>
  );
};

export default InputFilterByModal;
