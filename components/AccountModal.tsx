import { Form, Row, Button, Radio, Input, Col, Flex, Modal } from "antd";
import { toast } from "react-toastify";
import ConfirmMembership from "./ConfirmMembership";
import { useEffect, useState } from "react";
import customFetch from "@/utils/customFetch";

interface AccountModalProps {
  onCancel: () => void;
  buttonType: string;
  clickedAdminData?: any;
}

export default function AccountModal({
  onCancel,
  buttonType,
  clickedAdminData,
}: AccountModalProps) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("ConfirmMembership");
  const [changeInfoAdminData, setChangeInfoAdminData] =
    useState(clickedAdminData);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  console.log();

  useEffect(() => {
    setChangeInfoAdminData(clickedAdminData);
    form.setFieldsValue({
      name: buttonType === "changeInfo" ? clickedAdminData[0].name : null,
      id: buttonType === "changeInfo" ? clickedAdminData[0].id : null,
      department:
        buttonType === "changeInfo"
          ? clickedAdminData[0].author.department
          : null,
      phone: buttonType === "changeInfo" ? clickedAdminData[0].phone : null,
      email: buttonType === "changeInfo" ? clickedAdminData[0].email : null,
      allowedIp:
        buttonType === "changeInfo" ? clickedAdminData[0].allowedIp : null,
      permissions:
        buttonType === "changeInfo" ? clickedAdminData[0].permissions : null,
    });
  }, [clickedAdminData, buttonType, form]);

  useEffect(() => {
    console.log(clickedAdminData);
  }, []);

  const handlePermissionChange = (e: any, permissionName: string) => {
    const value = e.target.value;
    let updatedPermissions = [...selectedPermissions];

    // Check if the value already exists in selectedPermissions
    updatedPermissions = updatedPermissions.filter(
      (item) => !item.includes(value[0])
    );

    if (value != "3_Appeal Management") {
      updatedPermissions.push(value.slice(2));
    }

    setSelectedPermissions(updatedPermissions);
  };

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      if (buttonType === "changeInfo") {
        const response = await customFetch.patch(
          `/api/v1/admins/${changeInfoAdminData[0].id}`,
          {
            password: changeInfoAdminData[0].password,
            name: form.getFieldValue("name"),
            department: form.getFieldValue("department"),
            email: form.getFieldValue("email"),
            phone: form.getFieldValue("phone"),
            allowedIp: form.getFieldValue("allowedIp"),
            permissions: selectedPermissions,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // Reset all permissions
        setSelectedPermissions([]);
        // Clear all fields
        form.resetFields();
        // Close the modal
        closeModal();
      } else {
        const response = await customFetch.post(
          "/api/v1/admins",
          {
            loginId: form.getFieldValue("id"),
            password: form.getFieldValue("password"),
            name: form.getFieldValue("name"),
            department: form.getFieldValue("department"),
            email: form.getFieldValue("email"),
            phone: form.getFieldValue("phone"),
            allowedIp: form.getFieldValue("allowedIp"),
            permissions: selectedPermissions,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response);
        // Reset all permissions
        setSelectedPermissions([]);
        // Clear all fields
        form.resetFields();
        // Close the modal
        closeModal();
      }
    } catch (error: any) {
      console.error(error);
      if (
        Array.isArray(error.response.data.message) &&
        error.response.data.message[0]
      ) {
        toast.error(error.response.data.message[0], {
          autoClose: 4000,
        });
      } else {
        toast.error(error.response.data.message, {
          autoClose: 4000,
        });
      }
    }
  };

  // ################ DONE /완전한 ############## //

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

  // ################ In progress (Ready to go) ############## //

  // faysel3:
  // dear faysel,
  // "It seems that the implementation of radio buttons has not been done.
  // If there are radio buttons corresponding to 'permissions' in the received data, they should be activated. Also, the radio buttons should not be limited to one selection per line; instead, all of them should be selectable.

  // Within the received 'permissions' data, if 'dashboard' exists, then the '대시보드' radio button should be activated, if 'summary' exists, then the '종합지표' radio button should be activated, and similarly for the following:
  // 'user_management' -> '회원 관리'
  // 'user_ban' -> '회원 제재'
  // 'black_registration_approval' -> '승인요청 관리'
  // 'admin_management' -> '계정관리'
  // 'admin_password_mismatch' -> '비밀번호 불일치 관리'
  // 'faq_management' -> 'FAQ관리'
  // 'inquiry_management' -> '1:1 문의하기'

  // Those not in the 'permissions' array should remain deactivated. However, if any of the listed terms are in the array, the corresponding button should be activated.
  // Additionally, you can remove 'Registration Management' '등록 관리' and 'Objection Management' '이의신청 관리' as they were not mentioned."
  // This translation clearly explains the required implementation of radio buttons based on 'permissions' data, specifying which buttons to activate and noting that the unmentioned buttons can be removed.
  // I always wish you happiness.
  // Thank you.

  // faysel5:
  // DELETE /api/v1/admins/{id}
  // This is an API for deleting a specific user.

  const showModal = (type: any) => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const closeModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="modal-form form-inline">
      <Form colon={false} layout="horizontal" form={form}>
        <Row gutter={[16, 0]}>
          {buttonType === "changeInfo" && (
            <>
              <Col md={12} />
              <Col md={12} className="mb-[10px]">
                <div className="text-right">
                  <Button
                    shape="round"
                    size="small"
                    style={{
                      padding: 0,
                      width: 120,
                      height: 32,
                      fontWeight: 400,
                      marginRight: 10,
                    }}
                    className="ant-btn-info"
                    onClick={() => showModal("ConfirmMembership")}
                  >
                    임시비밀번호 발송
                  </Button>
                  <Button
                    shape="round"
                    size="small"
                    style={{
                      padding: 0,
                      width: 40,
                      height: 32,
                      fontWeight: 400,
                    }}
                    className="ant-btn-info"
                    onClick={() => {
                      console.log("delete button");
                    }}
                  >
                    삭제
                  </Button>
                </div>
              </Col>
            </>
          )}
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
              <Input name="id" />
            </Form.Item>
          </Col>
          {buttonType === "register" && (
            <>
              <Col md={12}>
                <Form.Item
                  style={{ marginBottom: 15 }}
                  name="password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  label={
                    <span style={{ textAlign: "left" }}>
                      비밀번호
                      <span className="required-asterisk ml-1 text-red-500">
                        *
                      </span>
                    </span>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item
                  style={{ marginBottom: 15 }}
                  name="checkPassword"
                  label={
                    <span style={{ textAlign: "left" }}>
                      비밀번호 확인
                      <span className="required-asterisk ml-1 text-red-500">
                        *
                      </span>
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </>
          )}
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
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="name" />
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
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="department" />
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
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="phone" />
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
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="email" required={true} />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="allowedIp"
              label={<span style={{ textAlign: "left" }}>허용 IP</span>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="allowedIp" required />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 15 }}
              // name="settings"
              name="permissions"
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
              <Radio.Group onChange={(e) => handlePermissionChange(e, "home")}>
                {/* dashboard */}
                <Radio value="1_dashboard">대시보드</Radio>
                {/* summary */}
                <Radio value="1_summary">종합지표</Radio>
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
              <Radio.Group
                onChange={(e) => handlePermissionChange(e, "memberManagement")}
              >
                {/* user_management */}
                <Radio value="2_user_management">회원 관리</Radio>
                {/* user_ban */}
                <Radio value="2_user_ban">회원 제재</Radio>
                {/* user_update  */}
                {/* <Radio value="2_user_update">등록 관리</Radio> */}
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
              <Radio.Group
                onChange={(e) =>
                  handlePermissionChange(e, "consumerManagement")
                }
              >
                {/* black_registration_approval */}
                <Radio value="3_black_registration_approval">
                  승인요청 관리
                </Radio>
                {/* Appeal Management */}
                {/* <Radio value="3_Appeal Management">이의신청 관리</Radio> */}
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
              <Radio.Group
                onChange={(e) => handlePermissionChange(e, "accountManagement")}
              >
                {/* admin_management */}
                <Radio value="4_admin_management">계정관리</Radio>
                {/* admin_password_mismatch */}
                <Radio value="4_admin_password_mismatch">
                  비밀번호 불일치 관리
                </Radio>
                {/* admin_create */}
                {/* <Radio value="4_admin_create">등록 관리</Radio> */}
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              name="noticeManagement"
              label={<span style={{ textAlign: "left" }}>공지 관리</span>}
              className="input-group"
            >
              <Radio.Group
                onChange={(e) => handlePermissionChange(e, "noticeManagement")}
              >
                {/* faq_management */}
                <Radio value="5_faq_management">FAQ 관리</Radio>
                {/* inquiry_management  */}
                <Radio value="5_inquiry_management">1 : 1 문의하기</Radio>
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
            onClick={handleSubmit}
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
      <Modal
        className={"ConfirmMembership"}
        title=""
        footer=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        width={510}
        centered
      >
        <div className="px-1">
          <ConfirmMembership onCancel={handleCancel} />
        </div>
      </Modal>
    </div>
  );
}
