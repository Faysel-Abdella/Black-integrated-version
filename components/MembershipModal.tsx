"use client";
import React, { useState } from "react";
import { Form, Col, Row, Button, Space, Input, Modal } from "antd";

import ConfirmMembership from "./ConfirmMembership";
import RejectmMembership from "./RejectmMembership";
import MembershipSanction from "./MembershipSanction";
import MembershipUnblock from "./MembershipUnblock";

export default function MembershipModal() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("ConfirmMembership");
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

  // ################### The api (/api/v1/admins/users) is not ready ##########

  // faysel:
  // "This is the API for modifying member information.
  // It allows changes to be made to the password, email, and phone number.

  // The member information can be found in 'admin-site / app / membership-management / pages.tsx'.
  // The relevant information should be retrieved as props from the member list and inserted into the value fields."
  // PATCH /api/v1/admins/users/{id}

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
                  <Input placeholder="자체 기입" disabled />
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row align="middle">
                <Col md={5}>
                  <label htmlFor="">닉네임</label>
                </Col>
                <Col md={19}>
                  <Input placeholder="부평부평" disabled />
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row align="middle">
                <Col md={8}>
                  <label htmlFor="">ID</label>
                </Col>
                <Col md={16}>
                  <Input placeholder="fdpd100" disabled />
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row align="middle">
                <Col md={5}>
                  <label htmlFor="">이름</label>
                </Col>
                <Col md={19}>
                  <Input placeholder="이중재" disabled />
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row align="middle">
                <Col md={8}>
                  <label htmlFor="">휴대폰번호</label>
                </Col>
                <Col md={16}>
                  <Space size={5}>
                    <Input placeholder="010-4012-1146" disabled />
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
                  <Space size={5}>
                    <Input placeholder="fdpd100@naver.com" disabled />
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
                  <Input placeholder="2023-08-04" disabled />
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
                  <Input placeholder="2023-08-11  ㅣ  11 : 21 : 31" disabled />
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
                  <Space size={5}>
                    <Input placeholder="동의" />
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
                  <Input
                    style={{ width: "102%" }}
                    placeholder="정상"
                    disabled
                  />
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
                  <Input style={{ width: "102%" }} placeholder="----" />
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
            <ConfirmMembership onCancel={handleCancel} />
          ) : modalType === "MembershipSanction" ? (
            <MembershipSanction onCancel={handleCancel} />
          ) : modalType === "MembershipUnblock" ? (
            <MembershipUnblock onCancel={handleCancel} />
          ) : (
            <RejectmMembership onCancel={handleCancel} />
          )}
        </div>
      </Modal>
    </div>
  );
}
