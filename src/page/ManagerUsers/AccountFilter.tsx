import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

import { images } from "core/assets";

interface IProps {
  handleSearch: any;
  resetFilter: () => void;
}

export default function AccountFilter({ handleSearch, resetFilter }: IProps) {
  const [form] = Form.useForm();
  const [t] = useTranslation();

  return (
    <>
      <Form form={form}>
        <Form.Item name="keyword" className="mb-0">
          <Input
            placeholder={t("placeholder.keyword")}
            prefix={<img src={images.searchIcon} />}
            className="inputCustom fs-12"
            onChange={handleSearch.keywordSearch}
          />
        </Form.Item>
        <div className="mt-20">
          <Button
            className="btn btnForm btn--reset"
            icon={<img src={images.refreshIcon} />}
            onClick={() => {
              form.setFieldsValue({ keyword: "" });
              resetFilter();
            }}
          >
            {t("btn.reset")}
          </Button>
        </div>
      </Form>
    </>
  );
}
