import { Form, Row, Button, Radio, Input, Col, Flex } from "antd";

interface MembershipSanctionProps {
  onCancel: () => void;
}

export default function MembershipSanction({
  onCancel,
}: MembershipSanctionProps) {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  // faysel3:
  // POST /api/v1/admins/users/ban/{id}
  // For more details, please refer to the Swagger documentation."

  return (
    <div className="modal-form form-inline">
      <Form colon={false} layout="horizontal" form={form}>
        <Row gutter={[32, 0]}>
          <Col md={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="date"
              label="제재기간"
              className="input-group custom-label-margin"
            >
              <Radio.Group>
                <Radio value="7일">7일</Radio>
                <Radio value="30일">30일</Radio>
                <Radio value="영구">영구</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="reason"
              className="custom-label-margin"
              label="제재사유"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Flex gap="middle" align="center" justify="center">
          <Button
            style={{ padding: 0, width: 148, height: 42 }}
            className="ant-btn ant-btn-info"
          >
            변경
          </Button>
          <Button
            style={{ padding: 0, width: 148, height: 42 }}
            className="ant-btn ant-btn-info"
            onClick={onCancel}
          >
            취소
          </Button>
        </Flex>
      </Form>
    </div>
  );
}
