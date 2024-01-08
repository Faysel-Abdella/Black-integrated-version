import { Form, Row, Button, Radio, Input, Col, Flex, Space } from "antd";

export default function BlockRegisterModal() {
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
              className="custom-label-margin"
              name="user"
              label={
                <span style={{ textAlign: "left" }}>
                  대상설정
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
            >
              <Space style={{ display: "block" }}>
                <div className="flex">
                  <Input placeholder="fdpd100@naver.com" />
                  <Button
                    size="small"
                    style={{ fontWeight: 400 }}
                    className="ant-btn-info ml-2"
                    onClick={() => console.log("클릭")}
                  >
                    아이디 조회
                  </Button>
                </div>
              </Space>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="date"
              label={
                <span style={{ textAlign: "left" }}>
                  상태
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
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
              label="제재사유"
              className="custom-label-margin"
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
          >
            취소
          </Button>
        </Flex>
      </Form>
    </div>
  );
}
