import { Form, Row, Button, Radio, Input, Col, Flex, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";

type TableData = {
  key: any;
  type: string;
  selectNum: string;
  reason: string;
};

export default function HistoryModal() {
  const [form] = Form.useForm();
  const columns: ColumnsType<TableData> = [
    {
      title: "번호",
      dataIndex: "key",
      align: "center",
      render(value, record, index) {
        return <span>{(index + 1).toString().padStart(2, "0")}</span>;
      },
    },
    {
      title: "유형명",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "선택수",
      dataIndex: "selectNum",
      align: "center",
    },
    {
      title: "변경사유",
      dataIndex: "reason",
      align: "center",
    },
  ];
  const data = [
    {
      key: "1",
      type: "청소", // YES
      selectNum: "3",
      reason: "2023.09.01", // YES
    },
    {
      key: "2",
      type: "계약금",
      selectNum: "5",
      reason: "2023.09.02",
    },
    {
      key: "3",
      type: "납입금",
      selectNum: "2",
      reason: "2023.09.03",
    },
    {
      key: "4",
      type: "위생",
      selectNum: "1",
      reason: "2023.09.04",
    },
  ];
  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // #################### There is a mismatch between the expected data and the repsonse

  // faysel2:
  // This is the API for retrieving and registering types of damages.
  // In the table tag, data regarding the list of damage types must be included.
  // You should enter the type of damage in the input named 'note', and upon pressing the button, the type of damage will be registered.
  // For more details, please refer to the Swagger documentation and ask Jin if you have any questions.
  // Thank you."
  // GET /api/v1/admins/blacks/damagetypes
  // POST /api/v1/admins/blacks/damagetypes

  return (
    <div className="modal-form form-inline">
      <Form colon={false} layout="horizontal" form={form}>
        <Row gutter={[16, 0]}>
          <Col md={24}>
            <Form.Item
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              name="note"
              label="유형명"
              className="m-0 custom-label-margin"
            >
              <Space style={{ display: "block" }}>
                <div style={{ display: "flex" }}>
                  <Input />
                  <Button size="small" className="ant-btn-info ml-2">
                    추가
                  </Button>
                </div>
              </Space>
            </Form.Item>
          </Col>
          <Col md={24} className="mt-12">
            <Table
              pagination={false}
              bordered
              columns={columns}
              dataSource={data}
              onChange={onChange}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
