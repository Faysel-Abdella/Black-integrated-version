import { Form, Row, Button, Radio, Input, Col, Flex } from "antd";

interface MembershipProps {
  onCancel: () => void;
}

export default function Membership({ onCancel }: MembershipProps) {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  return (
    <div className="modal-form form-inline">
      <p className="text-[20px] mb-4">
        거부 사유를 입력해주세요 <br />
        거부 일자와 거부사유가 같이 저장됩니다
      </p>
      <Form layout="horizontal" form={form}>
        <Row gutter={[16, 0]}>
          <Col md={24}>
            <TextArea rows={4} className="h-[96px]" />
          </Col>
        </Row>
        <Flex
          gap="middle"
          align="center"
          justify="center"
          className="mt-[24px]"
        >
          <Button
            style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
            className="ant-btn ant-btn-info"
          >
            거부
          </Button>
          <Button
            onClick={onCancel}
            style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
            className="ant-btn ant-btn-info"
          >
            취소
          </Button>
        </Flex>
      </Form>
    </div>
  );
}
