"use client";
import React, { useState } from "react";
import Image from "next/image";
import AdminLayout from "../AdminLayout/AdminLayout";
import { Col, Row, Button, Form, Input, Typography, Space, Modal } from "antd";
import adminLogo from "../../public/assets/images/adminLogo.png";
import loginBg from "../../public/assets/images/loginBg.png";

export default function Home() {
  const { Text, Link } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // faysel: "It's the API for login."(authorization basic) POST /api/v1/auth/admins/login
  return (
    <AdminLayout>
      <Row align="middle">
        <Col span={12}>
          <div className="auth-section">
            <Image src={adminLogo} className="mb-4 mx-auto" alt="admin-log" />
            <p>Admin page</p>
            <div className="or">
              <p>or</p>
            </div>
            <Form layout="vertical">
              <Form.Item
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>Email</span>
                    <span style={{ marginLeft: "4px", color: "red" }}>*</span>
                  </div>
                }
                rules={[{ required: true }]}
                help={<Button>Forget email?</Button>}
              >
                <Input placeholder="mail@moty.com" />
              </Form.Item>
              <Form.Item
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>Password</span>
                    <span style={{ marginLeft: "4px", color: "red" }}>*</span>
                  </div>
                }
                rules={[{ required: true }]}
                help={<Button>Forget password?</Button>}
              >
                <Input.Password placeholder="Min. 8 characters" />
              </Form.Item>
              <Space direction="vertical">
                <Button
                  type="primary"
                  className="mt-[80px] mb-3"
                  onClick={showModal}
                >
                  Login
                </Button>
                <Text
                  style={{ fontSize: 16, color: "#FF0000", fontWeight: 400 }}
                  type="danger"
                >
                  로그인 허용 IP가 아닙니다
                </Text>
              </Space>
            </Form>
          </div>
        </Col>
        <Col span={12}>
          <div className="login-img">
            <Image src={loginBg} alt="login-bg" />
          </div>
        </Col>
      </Row>
      <Modal
        title=""
        footer=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        centered
      >
        <div className="text-center pt-[50px]">
          <p>(미입력정보명)를/을 입력해주세요.</p>
          <Button
            type="primary"
            href="/"
            className="mt-[40px] mb-3 w-4/6"
            onClick={handleCancel}
          >
            확인
          </Button>
        </div>
      </Modal>
    </AdminLayout>
  );
}
