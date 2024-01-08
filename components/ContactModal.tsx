import { Form, Row, Button, Input, Col, Flex } from "antd";

interface ContactModalProps {
  onCancel: () => void;
}

export default function ContactModal({ onCancel }: ContactModalProps) {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  return (
    <div className="modal-form form-inline">
      <Form colon={false} layout="horizontal" form={form}>
        <Row gutter={[16, 0]}>
          <Col md={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              style={{ marginBottom: 13, paddingRight: 9 }}
              name="status"
              label={<span style={{ lineHeight: "32px" }}>상태</span>}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ marginBottom: 13 }}
              name="id"
              label={<span style={{ lineHeight: "32px" }}>ID</span>}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ marginBottom: 13, paddingRight: 10 }}
              name="name"
              label={
                <span style={{ lineHeight: "32px", marginLeft: "40px" }}>
                  이름
                </span>
              }
            >
              <Input disabled />
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ marginBottom: 13 }}
              name="phone"
              label={<span style={{ lineHeight: "32px" }}>휴대폰번호</span>}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ marginBottom: 13, paddingRight: 10 }}
              name="createdAt"
              label={
                <span style={{ lineHeight: "32px", marginLeft: "30px" }}>
                  작성일
                </span>
              }
            >
              <Input disabled />
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ marginBottom: 13 }}
              name="email"
              label={<span style={{ lineHeight: "32px" }}>이메일</span>}
            >
              <Input disabled />
            </Form.Item>
          </Col>

          <Col md={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              style={{ marginBottom: 13, paddingRight: 9 }}
              name="title"
              label={<span style={{ lineHeight: "32px" }}>제목</span>}
            >
              <Input disabled />
            </Form.Item>
          </Col>

          <Col md={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              style={{ marginBottom: 13, paddingRight: 9 }}
              name="contact"
              label={<span>문의내용</span>}
            >
              <TextArea disabled rows={4} style={{ resize: "none" }} />
            </Form.Item>
          </Col>

          <Col md={24}>
            <Form.Item
              style={{ paddingRight: 9 }}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="answer"
              label="답변내용"
            >
              <TextArea rows={4} style={{ resize: "none" }} />
            </Form.Item>
          </Col>
        </Row>
        <Flex
          gap="middle"
          align="center"
          justify="center"
          className="mt-[20px] mb-[35px]"
        >
          <Button
            style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
            className="ant-btn ant-btn-info"
          >
            답변
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
