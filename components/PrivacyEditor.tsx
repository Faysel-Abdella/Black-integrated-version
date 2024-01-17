"use client";
import React, { useEffect, useRef, useState } from "react";
import { Form, Row, Button, Space, Input, Col, Flex, Select } from "antd";
import Editor from "./CKEditor";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import customFetch from "@/utils/customFetch";

export default function PrivacyEditor({
  extraFilter,
  buttonType,
  clickedNoticeData,
  fetchNoticesLists,
  handleCancel,
  isFetching,
}: {
  extraFilter?: boolean;
  buttonType?: any;
  clickedNoticeData?: any;
  fetchNoticesLists?: () => void;
  handleCancel: () => void;
  isFetching: boolean;
}) {
  const [form] = Form.useForm();
  const Editor = dynamic(() => import("./CKEditor"), { ssr: false });

  let editorText = "";

  useEffect(() => {
    if (buttonType! === "modification") {
      form.setFieldsValue({
        title: clickedNoticeData[0].title,
        startDateTime: new Date(clickedNoticeData[0].startDateTime)
          .toISOString()
          .split("T")[0],
        endDateTime: new Date(clickedNoticeData[0].endDateTime)
          .toISOString()
          .split("T")[0],
        content: clickedNoticeData[0].content,
      });
    } else {
      form.resetFields();
    }
  }, [clickedNoticeData, buttonType, extraFilter]);

  useEffect(() => {
    form.resetFields();
  }, []);

  const handleEditorChange = (data: string) => {
    editorText = data;
  };

  const handleCorrection = async () => {
    console.log(editorText);
    if (
      !form.getFieldValue("title") ||
      !form.getFieldValue("startDateTime") ||
      !form.getFieldValue("endDateTime") ||
      !editorText
    ) {
      return toast.error("Please fill all inputs", { autoClose: 4000 });
    }
    const title = form.getFieldValue("title");
    const startDateTime = new Date(
      form.getFieldValue("startDateTime")
    ).toISOString();
    const endDateTime = new Date(
      form.getFieldValue("endDateTime")
    ).toISOString();
    const content = editorText;

    const accessToken = localStorage.getItem("accessToken");

    if (buttonType! === "modification") {
      const id = clickedNoticeData[0].id;
      try {
        const response = await customFetch.patch(
          `/api/v1/admins/post/notices/${id}`,
          {
            title: title,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            content: content,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        handleCancel();
        form.resetFields();
        toast.success("완료", { autoClose: 3500 });
        fetchNoticesLists!();
      } catch (error: any) {
        toast.success("The date must be in the yyyy-mm-dd format", {
          autoClose: 3500,
        });
        console.log(error);
      }
    } else {
      try {
        const response = await customFetch.post(
          `/api/v1/admins/post/notices`,
          {
            title: title,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            content: content,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        handleCancel();
        form.resetFields();
        toast.success("완료", { autoClose: 3500 });
        fetchNoticesLists!();
      } catch (error: any) {
        toast.success("The date must be in the yyyy-mm-dd format", {
          autoClose: 3500,
        });
        console.log(error);
      }
    }
  };

  return (
    <div className="modal-form form-inline">
      <Form layout="horizontal" form={form}>
        <Row gutter={[16, 0]}>
          <Col md={24}>
            <Form.Item name="title" label="제목" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          {extraFilter ? (
            <Col md={24}>
              <Form.Item
                name="period"
                label="노출기간"
                rules={[{ required: true }]}
              >
                <Space>
                  <Space.Compact block>
                    <Form.Item
                      name="startDateTime"
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
                      name="endDateTime"
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
            <Form.Item name="content" label="내용" rules={[{ required: true }]}>
              {/* <Editor onChange={handleEditorChange} /> */}
              <Editor
                // editor={ClassicEditor}
                onChange={handleEditorChange}
                buttonType={buttonType}
                clickedNoticeContent={clickedNoticeData[0].content}
              />
            </Form.Item>
          </Col>
        </Row>
        <Flex gap="middle" align="center" justify="center" className="mt-8">
          <Button className="ant-btn ant-btn-info" onClick={handleCorrection}>
            수정
          </Button>
          <Button className="ant-btn ant-btn-info">닫기</Button>
        </Flex>
      </Form>
    </div>
  );
}
