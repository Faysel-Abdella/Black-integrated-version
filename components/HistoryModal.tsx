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
      type: "청소",
      selectNum: "3",
      reason: "2023.09.01",
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
