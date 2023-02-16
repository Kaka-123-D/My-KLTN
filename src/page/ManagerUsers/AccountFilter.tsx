import { Button, Form, Input } from "antd";
import { images } from "core/assets";

interface IProps {
  handleSearch: any;
  resetFilter: () => void;
}

export default function AccountFilter({ handleSearch, resetFilter }: IProps) {
  const [form] = Form.useForm();

  return (
    <>
      <Form form={form}>
        <Form.Item name="keyword" className="mb-0">
          <Input
            placeholder={"keyword"}
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
            {"reset"}
          </Button>
        </div>
      </Form>
    </>
  );
}
