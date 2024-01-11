import { Form, Row, Button, Radio, Input, Col, Flex } from "antd";

interface MembershipUnblockProps {
  onCancel: () => void;
}

export default function MembershipUnblock({
  onCancel,
}: MembershipUnblockProps) {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  // faysel3:
  // DELETE /api/v1/admins/users/ban/{id}
  // For more details, please refer to the Swagger documentation."

  return (
    <div className="modal-form form-inline">
      <p className="text-[20px] mb-4">차단을 해제하시겠습니까?</p>
      <Form layout="horizontal" form={form}>
        <Row gutter={[16, 0]}>
          <Col md={24}>
            <TextArea style={{ height: 78 }} rows={4} />
          </Col>
        </Row>
        <Flex gap="middle" align="center" justify="center" className="mt-8">
          <Button
            style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
            className="ant-btn ant-btn-info"
          >
            변경
          </Button>
          <Button
            style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
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
