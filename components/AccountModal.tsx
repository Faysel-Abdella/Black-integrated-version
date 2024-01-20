import { Form, Row, Button, Radio, Input, Col, Flex, Modal } from "antd";
import { toast } from "react-toastify";
import ConfirmMembership from "./ConfirmMembership";
import { useEffect, useState } from "react";
import customFetch from "@/utils/customFetch";

interface AccountModalProps {
  onCancel: () => void;
  buttonType: string;
  clickedAdminData?: any;
  fetchAdminLists?: () => void;
}

export default function AccountModal({
  onCancel,
  buttonType,
  clickedAdminData,
  fetchAdminLists,
}: AccountModalProps) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("ConfirmMembership");
  const [changeInfoAdminData, setChangeInfoAdminData] =
    useState(clickedAdminData);
  const [allowedPermissions, setAllowedPermissions] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  // Tracking Radio buttons
  const [isDashboardSelected, setIsDashboardSelected] = useState(false);
  const [isSummarySelected, setIsSummarySelected] = useState(false);
  const [isUser_ManagementSelected, setIsUser_ManagementSelected] =
    useState(false);
  const [isUser_BanSelected, setIsUser_BanSelected] = useState(false);
  const [
    isBlack_registration_approvalSelected,
    setIsBlack_registration_approvalSelected,
  ] = useState(false);
  const [isAdmin_managementSelected, setIsAdmin_managementSelected] =
    useState(false);
  const [
    isAdmin_password_mismatchSelected,
    setAdmin_password_mismatchSelected,
  ] = useState(false);

  const [isFaq_managementSelected, setFaq_managementSelected] = useState(false);
  const [isInquiry_managementSelected, setInquiry_managementSelected] =
    useState(false);

  useEffect(() => {
    setChangeInfoAdminData(clickedAdminData);
    setAllowedPermissions([]);
    form.setFieldsValue({
      name: buttonType === "changeInfo" ? clickedAdminData[0].name : null,
      id: buttonType === "changeInfo" ? clickedAdminData[0].id : null,
      department:
        buttonType === "changeInfo" ? clickedAdminData[0].department : null,
      phone: buttonType === "changeInfo" ? clickedAdminData[0].phone : null,
      email: buttonType === "changeInfo" ? clickedAdminData[0].email : null,
      allowedIp:
        buttonType === "changeInfo"
          ? clickedAdminData[0].allowedIp
            ? clickedAdminData[0].allowedIp
            : "---"
          : null,
      permissions:
        buttonType === "changeInfo" ? clickedAdminData[0].permissions : null,
    });
    if (buttonType === "changeInfo") {
      if (
        clickedAdminData[0].permissions &&
        clickedAdminData[0].permissions.length > 0
      ) {
        const thisAdminPermissions = clickedAdminData[0].permissions.map(
          (permission: string) => permission
        );
        setAllowedPermissions(clickedAdminData[0].permissions);
        console.log(allowedPermissions);
      } else {
        setAllowedPermissions([]);
        console.log(allowedPermissions);
      }
      setActivePermissions();
    }
  }, [clickedAdminData, buttonType, form]);

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
        console.log(response);
        closeModal();
        onCancel();
        // Reset all permissions
        setSelectedPermissions([]);
        // Clear all fields
        form.resetFields();
        toast.success("완료", { autoClose: 3500 });
        fetchAdminLists!();
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
        // Close the modal
        closeModal();
        onCancel();
        // Reset all permissions
        setSelectedPermissions([]);
        // Clear all fields
        form.resetFields();
        toast.success("완료", { autoClose: 3500 });

        fetchAdminLists!();
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

  const handleDelete = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await customFetch.delete(
        `/api/v1/admins/${changeInfoAdminData[0].id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      closeModal();
      onCancel();
      toast.success("완료", { autoClose: 3500 });
      fetchAdminLists!();
    } catch (error) {
      console.log(error);
    }
  };

  const permissionExists = (permission: string) => {
    return allowedPermissions.some(
      (element) => element.toLowerCase() === permission.toLowerCase()
    );
  };

  const setActivePermissions = () => {
    setIsDashboardSelected(
      allowedPermissions.some(
        (element) => element.toLowerCase() === "dashboard".toLowerCase()
      )
    );

    setIsSummarySelected(
      allowedPermissions.some(
        (element) => element.toLowerCase() === "summary".toLowerCase()
      )
    );

    setIsUser_ManagementSelected(
      allowedPermissions.some(
        (element) => element.toLowerCase() === "user_management".toLowerCase()
      )
    );

    setIsUser_BanSelected(
      allowedPermissions.some(
        (element) => element.toLowerCase() === "user_ban".toLowerCase()
      )
    );

    setIsBlack_registration_approvalSelected(
      allowedPermissions.some(
        (element) =>
          element.toLowerCase() === "black_registration_approval".toLowerCase()
      )
    );

    setIsAdmin_managementSelected(
      allowedPermissions.some(
        (element) => element.toLowerCase() === "admin_management".toLowerCase()
      )
    );

    setAdmin_password_mismatchSelected(
      allowedPermissions.some(
        (element) =>
          element.toLowerCase() === "admin_password_mismatch".toLowerCase()
      )
    );

    setFaq_managementSelected(
      allowedPermissions.some(
        (element) => element.toLowerCase() === "faq_management".toLowerCase()
      )
    );

    setInquiry_managementSelected(
      allowedPermissions.some(
        (element) =>
          element.toLowerCase() === "inquiry_management".toLowerCase()
      )
    );
  };

  const handlePermissionChange = (newPermission: string) => {
    const isExist = allowedPermissions.indexOf(newPermission);

    if (isExist == -1) {
      setAllowedPermissions((prev) => [...prev, newPermission]);
      setIsDashboardSelected(true);
    } else {
      const removedPermissions = allowedPermissions.filter(
        (permission) => permission !== newPermission
      );

      setIsDashboardSelected(false);

      setAllowedPermissions(removedPermissions);
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

  // ################ DONE /완전한 ############## //

  // faysel5:
  // DELETE /api/v1/admins/{id}
  // This is an API for deleting a specific user.

  const showModal = (type: any) => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
                    onClick={handleDelete}
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
                {/* select all */}
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
              {/* <Radio.Group onChange={(e) => handlePermissionChange(e, "home")}> */}
              <Radio
                value="dashboard"
                checked={isDashboardSelected}
                onClick={() => handlePermissionChange("dashboard")}
              >
                대시보드
              </Radio>
              <Radio value="summary" checked={isSummarySelected}>
                종합지표
              </Radio>
              {/* </Radio.Group> */}
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="memberManagement"
              label={<span style={{ textAlign: "left" }}>회원관리</span>}
              className="input-group"
            >
              {/* <Radio.Group */}
              {/* onChange={(e) => handlePermissionChange(e, "memberManagement")} */}
              {/* > */}
              <Radio
                value="user_management"
                checked={isUser_ManagementSelected}
              >
                회원 관리
              </Radio>
              <Radio value="user_ban" checked={isUser_BanSelected}>
                회원 제재
              </Radio>
              {/* <Radio value="2_user_update">등록 관리</Radio> */}
              {/* </Radio.Group> */}
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="consumerManagement"
              label={<span style={{ textAlign: "left" }}>블랙리스트 관리</span>}
              className="input-group"
            >
              {/* <Radio.Group */}
              {/* onChange={(e) => */}
              {/* handlePermissionChange(e, "consumerManagement") */}
              {/* } */}
              {/* > */}
              <Radio
                value="black_registration_approval"
                checked={isBlack_registration_approvalSelected}
              >
                승인요청 관리
              </Radio>
              {/* Appeal Management */}
              {/* <Radio value="3_Appeal Management">이의신청 관리</Radio> */}
              {/* </Radio.Group> */}
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 15 }}
              name="accountManagement"
              label={<span style={{ textAlign: "left" }}>계정 관리</span>}
              className="input-group"
            >
              {/* <Radio.Group */}
              {/*  onChange={(e) => handlePermissionChange(e, "accountManagement")} */}
              {/*  > */}
              <Radio
                value="admin_management"
                checked={isAdmin_managementSelected}
              >
                계정관리
              </Radio>
              <Radio
                value="admin_password_mismatch"
                checked={isAdmin_password_mismatchSelected}
              >
                비밀번호 불일치 관리
              </Radio>
              {/* admin_create */}
              {/* <Radio value="4_admin_create">등록 관리</Radio> */}
              {/* </Radio.Group> */}
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              name="noticeManagement"
              label={<span style={{ textAlign: "left" }}>공지 관리</span>}
              className="input-group"
            >
              {/* <Radio.Group */}
              {/* onChange={(e) => handlePermissionChange(e, "noticeManagement")} */}
              {/*  > */}
              <Radio value="faq_management" checked={isFaq_managementSelected}>
                FAQ 관리
              </Radio>
              <Radio
                value="inquiry_management"
                checked={isInquiry_managementSelected}
              >
                1 : 1 문의하기
              </Radio>
              {/* </Radio.Group> */}
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
            onClick={() => showModal(ConfirmMembership)}
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
          <ConfirmMembership
            onCancel={handleCancel}
            executeFunction={handleSubmit}
          />
        </div>
      </Modal>
    </div>
  );
}
