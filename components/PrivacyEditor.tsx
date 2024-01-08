"use client";
import React, { useEffect } from "react";
import { Form, Row, Button, Space, Input, Col, Flex, Select } from "antd";
// import Editor from './CKEditor';
import dynamic from "next/dynamic";

export default function PrivacyEditor({
  extraFilter,
}: {
  extraFilter?: boolean;
}) {
  const [form] = Form.useForm();
  const Editor = dynamic(() => import("./CKEditor"), { ssr: false });

  useEffect(() => {
    console.log(extraFilter);
  }, []);
  const handleEditorChange = (data: string) => {
    console.log("Editor data:", data);
    // You can handle the editor data as needed
  };
  return (
    <div className="modal-form form-inline">
      <Form layout="horizontal" form={form}>
        <Row gutter={[16, 0]}>
          <Col md={24}>
            <Form.Item name="note" label="제목" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          {extraFilter ? (
            <Col md={24}>
              <Form.Item
                name="note"
                label="노출기간"
                rules={[{ required: true }]}
              >
                <Space>
                  <Space.Compact block>
                    <Form.Item
                      name="note"
                      rules={[{ required: true }]}
                      className="m-0"
                      style={{ width: "calc(100% - 74px)" }}
                    >
                      <Input />
                    </Form.Item>
                    <Button size="small" className="ant-btn-info">
                      변경
                    </Button>
                  </Space.Compact>
                  <Select
                    defaultValue="lucy"
                    style={{ width: 70 }}
                    options={[
                      { value: "jack", label: "21" },
                      { value: "lucy", label: "22" },
                    ]}
                  />
                  <p>시</p>
                  <Select
                    defaultValue="lucy"
                    style={{ width: 70 }}
                    options={[
                      { value: "jack", label: "21" },
                      { value: "lucy", label: "22" },
                    ]}
                  />
                  <p className="whitespace-nowrap">분 ~</p>
                  <Space.Compact block>
                    <Form.Item
                      name="note"
                      rules={[{ required: true }]}
                      className="m-0"
                      style={{ width: "calc(100% - 74px)" }}
                    >
                      <Input />
                    </Form.Item>
                    <Button size="small" className="ant-btn-info">
                      변경
                    </Button>
                  </Space.Compact>
                  <Select
                    defaultValue="lucy"
                    style={{ width: 70 }}
                    options={[
                      { value: "jack", label: "21" },
                      { value: "lucy", label: "22" },
                    ]}
                  />
                  <p>시</p>
                  <Select
                    defaultValue="lucy"
                    style={{ width: 70 }}
                    options={[
                      { value: "jack", label: "21" },
                      { value: "lucy", label: "22" },
                    ]}
                  />
                  <p>분</p>
                </Space>
              </Form.Item>
            </Col>
          ) : (
            ""
          )}
          <Col md={24}>
            <Form.Item name="note" label="내용" rules={[{ required: true }]}>
              <Editor onChange={handleEditorChange} />
            </Form.Item>
          </Col>
        </Row>
        <Flex gap="middle" align="center" justify="center" className="mt-8">
          <Button className="ant-btn ant-btn-info">수정</Button>
          <Button className="ant-btn ant-btn-info">닫기</Button>
        </Flex>
      </Form>
    </div>
  );
}
