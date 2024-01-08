import { Form, Row, Button, Radio, Input, Col, Flex } from "antd";

interface AccountModalProps {
  onCancel: () => void;
}

export default function AccountModal({ onCancel }: AccountModalProps) {
  const [form] = Form.useForm();
  return (
    <div className="modal-form form-inline">
      <Form colon={false} layout="horizontal" form={form}>
        <Row gutter={[16, 0]}>
          <Col md={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              style={{ marginBottom: 11 }}
              name="note"
              label={
                <span style={{ textAlign: "left" }}>
                  FAQ 타이틀
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              style={{ marginBottom: 11 }}
              name="note"
              label={
                <span style={{ textAlign: "left" }}>
                  FAQ 내용
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="note"
              label={
                <span style={{ textAlign: "left" }}>
                  상태
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
              className="input-group"
            >
              <Radio.Group>
                <Radio value="horizontal1">사용</Radio>
                <Radio value="미사용">종합지표</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Flex
          style={{ marginTop: 11, marginBottom: 27 }}
          gap="middle"
          align="center"
          justify="center"
        >
          <Button
            style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
            className="ant-btn ant-btn-info"
          >
            등록
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
