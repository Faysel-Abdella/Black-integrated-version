import { Form, Row, Button, Radio, Input, Col, Flex } from "antd";

interface AccountModalProps {
  onCancel: () => void;
}

export default function AccountModal({ onCancel }: AccountModalProps) {
  const [form] = Form.useForm();

  //   faysel:

  //   "This modal has two functions: registration and modification.

  //   1. Modification Function:
  //   In 'admin-site / app / account / page.tsx', when a name is clicked,
  //   the modal should fetch and display data about the clicked user as props.
  //   If any information is modified, at code line 217, the PATCH request PATCH /api/v1/admins/{id} should be executed.

  //   2. Registration Function:
  //   In 'admin-site / app / account / page.tsx',
  //   at code line 203, when the following button is clicked:

  //   <Button
  //   style={{
  //     padding: 0,
  //     width: 144,
  //     height: 61,
  //     fontWeight: 700,
  //   }}
  //   type="primary"
  //   onClick={showModal}
  //   shape="round"
  //   className="min-w-[120px]"
  // >
  //   등록 (=== register)
  // </Button>

  //   the modal should open with the functionality to register a new administrator.
  //   At code line 217, the POST request POST /api/v1/admins should be executed for registration."

  //   Please carefully review the Swagger documentation before proceeding with the work.
  //   Thank you."

  return (
    <div className="modal-form form-inline">
      <Form colon={false} layout="horizontal" form={form}>
        <Row gutter={[16, 0]}>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="id"
              label={
                <span style={{ textAlign: "left" }}>
                  ID
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="name"
              label={
                <span style={{ textAlign: "left" }}>
                  이름
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="department"
              label={
                <span style={{ textAlign: "left" }}>
                  소속부서
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="phone"
              label={
                <span style={{ textAlign: "left" }}>
                  휴대폰번호
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="email"
              label={
                <span style={{ textAlign: "left" }}>
                  이메일 주소
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="ip"
              label={<span style={{ textAlign: "left" }}>허용 IP</span>}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="settings"
              label={<span style={{ textAlign: "left" }}>권한 설정</span>}
              className="input-group"
            >
              <Radio.Group>
                <Radio value="horizontal">전체 선택</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="home"
              label={<span style={{ textAlign: "left" }}>홈</span>}
              className="input-group"
            >
              <Radio.Group>
                <Radio value="horizontal1">대시보드</Radio>
                <Radio value="horizontal2">종합지표</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="memberManagement"
              label={<span style={{ textAlign: "left" }}>회원관리</span>}
              className="input-group"
            >
              <Radio.Group>
                <Radio value="horizontal3">회원 관리</Radio>
                <Radio value="horizontal4">회원 제재</Radio>
                <Radio value="horizontal5">등록 관리</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="consumerManagement"
              label={<span style={{ textAlign: "left" }}>블랙리스트 관리</span>}
              className="input-group"
            >
              <Radio.Group>
                <Radio value="horizontal6">승인요청 관리</Radio>
                <Radio value="horizontal7">이의신청 관리</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="accountManagement"
              label={<span style={{ textAlign: "left" }}>계정 관리</span>}
              className="input-group"
            >
              <Radio.Group>
                <Radio value="horizontal0">계정관리</Radio>
                <Radio value="horizontal11">비밀번호 불일치 관리</Radio>
                <Radio value="horizontal22">등록 관리</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              name="noticeManagement"
              label={<span style={{ textAlign: "left" }}>공지 관리</span>}
              className="input-group"
            >
              <Radio.Group>
                <Radio value="horizontal33">FAQ 관리</Radio>
                <Radio value="horizontal44">1 : 1 문의하기</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Flex
          style={{ marginTop: 30 }}
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
