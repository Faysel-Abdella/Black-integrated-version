"use client";
import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button, Space, Input, Modal } from "antd";

import ConfirmMembership from "./ConfirmMembership";
import RejectmMembership from "./RejectmMembership";
import MembershipSanction from "./MembershipSanction";
import MembershipUnblock from "./MembershipUnblock";

export default function MembershipModal({
  clickedMemberData,
  fetchMembersLists,
  closeParentModal,
}: {
  clickedMemberData?: any;
  fetchMembersLists?: () => void;
  closeParentModal: () => void;
}) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("ConfirmMembership");

  const setFirstValue = () => {
    form.setFieldsValue({
      subscriptionType: clickedMemberData[0].subscriptionType,
      nickName: clickedMemberData[0].name,
      id: clickedMemberData[0].id,
      name: clickedMemberData[0].name,
      phone: clickedMemberData[0].phoneNumber,
      email: clickedMemberData[0].email,
      joinDate: clickedMemberData[0].joinDate,
      lastLoginDate: clickedMemberData[0].lastLoginDate,
      situation: clickedMemberData[0].accountStatus,
      releaseReason: clickedMemberData[0].releaseReason,
      agreement: clickedMemberData[0].agreement
        ? clickedMemberData[0].agreement
        : "---",
    });
  };

  useEffect(() => {
    setFirstValue();
  }, [clickedMemberData]);

  useEffect(() => {
    setFirstValue();
  }, []);

  const showModal = (type: any) => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // ################### In progress ##########

  // faysel:
  // "This is the API for modifying member information.
  // It allows changes to be made to the password, email, and phone number.

  // The member information can be found in 'admin-site / app / membership-management / pages.tsx'.
  // The relevant information should be retrieved as props from the member list and inserted into the value fields."
  // PATCH /api/v1/admins/users/{id}

  // faysel3:
  // I didn't delete the original text to avoid any conflicts and instead added it below.
  // The API I mentioned above has changed to 'PATCH /api/v1/admins/users/phone-email/{id}'.
  // This tag is located below. <RejectmMembership onCancel={handleCancel} />
  // I previously stated on code line 31 that it's possible to change the password, email, and phone number, but let me correct that.
  // You can change either the email or phone number.
  // If you send the corresponding id and email, the email will be changed, and if you send the corresponding id and phone number, the phone number will be changed.
  // Please contact Jin for any data-related inquiries.

  // <Space size={5}>
  // <Input placeholder="010-4012-1146" readOnly />
  //   <Button
  //     size="small"
  //     className="ant-btn-info"
  //     style={{ fontWeight: 400 }}
  //     onClick={() => showModal("ConfirmMembership")} -> This part also needs to be changed to 'RejectMembership', just like the email.
  //   >
  //     변경
  //   </Button>
  // </Space>

  // This tag is located below. <MembershipUnblock onCancel={handleCancel} />
  // DELETE /api/v1/admins/users/ban/{id}

  // This tag is located below. <MembershipSanction onCancel={handleCancel} />
  // POST /api/v1/admins/users/ban/{id}

  // For more details, please refer to the Swagger documentation."

  return (
    <div className="modal-form">
      <Form colon={false} layout="horizontal" form={form}>
        <Space className="w-full" direction="vertical" size={30}>
          <Row align="middle" gutter={[67, 15]}>
            <Col md={12}>
              <Row align="middle">
                <Col md={8}>
                  <label htmlFor="">가입 유형</label>
                </Col>
                <Col md={16}>
                  <Form.Item name="subscriptionType">
                    <Input placeholder="자체 기입" readOnly />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row align="middle">
                <Col md={5}>
                  <label htmlFor="">닉네임</label>
                </Col>
                <Col md={19}>
                  <Form.Item name="nickName">
                    <Input placeholder="부평부평" readOnly />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row align="middle">
                <Col md={8}>
                  <label htmlFor="">ID</label>
                </Col>
                <Col md={16}>
                  <Form.Item name="id">
                    <Input placeholder="fdpd100" readOnly />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row align="middle">
                <Col md={5}>
                  <label htmlFor="">이름</label>
                </Col>
                <Col md={19}>
                  <Form.Item name="name">
                    <Input placeholder="이중재" readOnly />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row align="middle">
                <Col md={8}>
                  <label htmlFor="">휴대폰번호</label>
                </Col>
                <Col md={16}>
                  <Space size={5} className="self-start items-start">
                    <Form.Item name="phone">
                      <Input placeholder="010-4012-1146" />
                    </Form.Item>
                    <Button
                      size="small"
                      className="ant-btn-info"
                      style={{ fontWeight: 400 }}
                      onClick={() => showModal("ConfirmMembership")}
                    >
                      변경
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row align="middle">
                <Col md={5}>
                  <label htmlFor="">이메일</label>
                </Col>
                <Col md={19}>
                  <Space size={5} className="self-start items-start">
                    <Form.Item name="email">
                      <Input placeholder="fdpd100@naver.com" />
                    </Form.Item>
                    <Button
                      size="small"
                      className="ant-btn-info"
                      style={{ fontWeight: 400 }}
                      onClick={() => showModal("RejectmMembership")}
                    >
                      변경
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Col>
            <Col md={12} />
            <Col md={12}>
              <div className="text-right">
                <Button
                  shape="round"
                  size="small"
                  style={{
                    padding: 0,
                    width: 120,
                    height: 32,
                    fontWeight: 400,
                  }}
                  className="ant-btn-info"
                  onClick={() => showModal("ConfirmMembership")}
                >
                  임시비밀번호 발송
                </Button>
              </div>
            </Col>
          </Row>
          <Row align="middle" gutter={[67, 15]}>
            <Col md={12}>
              <Row align="middle">
                <Col md={8}>
                  <label htmlFor="">가입일</label>
                </Col>
                <Col md={16}>
                  <Form.Item name="joinDate">
                    <Input placeholder="2023-08-04" readOnly />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row align="middle">
                <Col md={5}>
                  <label htmlFor="">
                    최근
                    <br /> 접속일시
                  </label>
                </Col>
                <Col md={19}>
                  <Form.Item name="lastLoginDate">
                    <Input
                      placeholder="2023-08-11  ㅣ  11 : 21 : 31"
                      readOnly
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row align="middle">
                <Col md={8}>
                  <label htmlFor="">
                    마케팅
                    <br />
                    수신동의
                  </label>
                </Col>
                <Col md={16}>
                  <Space size={5} className="items-start self-start">
                    <Form.Item name="agreement">
                      <Input placeholder="동의" />
                    </Form.Item>
                    <Button size="small" className="ant-btn-info">
                      변경
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Col>
            <Col md={24}>
              <Row align="middle">
                <Col md={4} style={{ marginRight: "-10px" }}>
                  <label htmlFor="">상태</label>
                </Col>
                <Col md={20}>
                  <Form.Item name="situation">
                    <Input
                      style={{ width: "102%" }}
                      placeholder="정상"
                      readOnly
                    />
                  </Form.Item>
                  <Button
                    style={{
                      padding: 0,
                      width: 75,
                      height: 32,
                      position: "absolute",
                      top: "5px",
                      right: "-3px",
                      borderRadius: 100,
                      fontWeight: 400,
                    }}
                    size="small"
                    className="ant-btn-info"
                    onClick={() => showModal("MembershipSanction")}
                  >
                    제재하기
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col md={24}>
              <Row align="middle">
                <Col md={4} style={{ marginRight: "-10px" }}>
                  <label htmlFor="">사유</label>
                </Col>
                <Col md={20}>
                  <Form.Item name="releaseReason">
                    <Input style={{ width: "102%" }} placeholder="----" />
                  </Form.Item>
                  <Button
                    style={{
                      padding: 0,
                      width: 75,
                      height: 32,
                      position: "absolute",
                      top: "5px",
                      right: "-3px",
                      borderRadius: 100,
                      fontWeight: 400,
                    }}
                    size="small"
                    className="ant-btn-info"
                    onClick={() => showModal("MembershipUnblock")}
                  >
                    해제하기
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Space>
      </Form>
      <Modal
        className={
          modalType === "ConfirmMembership"
            ? "custom-mini-modal"
            : modalType === "MembershipSanction"
            ? "custom-mini-modal-restriction"
            : modalType === "MembershipUnblock"
            ? "custom-mini-modal-clear"
            : "custom-mini-modal"
        }
        title=""
        footer=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        width={
          modalType === "MembershipSanction" ||
          modalType === "MembershipUnblock"
            ? 753
            : 510
        }
        centered
      >
        <div className="px-1">
          {(modalType === "MembershipSanction" ||
            modalType === "MembershipUnblock") && (
            <Button
              className="left-icon p-0 border-0 shadow-none text-left text-[30px] leading-none mb-[40px]"
              block
              onClick={handleCancel}
            >
              <img src="/assets/images/backIcon.png" />
            </Button>
          )}
          {modalType === "ConfirmMembership" ? (
            <ConfirmMembership
              onCancel={handleCancel}
              memberId={clickedMemberData[0].id}
              updatedPhone={form.getFieldValue("phone")}
              fetchMembersLists={fetchMembersLists!}
            />
          ) : modalType === "MembershipSanction" ? (
            <MembershipSanction
              onCancel={handleCancel}
              closeParentModal={closeParentModal}
              memberId={clickedMemberData[0].id}
              fetchMembersLists={fetchMembersLists!}
            />
          ) : modalType === "MembershipUnblock" ? (
            <MembershipUnblock
              onCancel={handleCancel}
              closeParentModal={closeParentModal}
              memberId={clickedMemberData[0].id}
              fetchMembersLists={fetchMembersLists!}
            />
          ) : (
            <RejectmMembership
              onCancel={handleCancel}
              memberId={clickedMemberData[0].id}
              updatedEmail={form.getFieldValue("email")}
              fetchMembersLists={fetchMembersLists!}
            />
          )}
        </div>
      </Modal>
    </div>
  );
}
