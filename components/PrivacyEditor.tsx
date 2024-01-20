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
  usedOnPage,
  extraFilter,
  buttonType,
  clickedData,
  fetchDataLists,
  handleCancel,
  isFetching,
}: {
  usedOnPage: string;
  extraFilter?: boolean;
  buttonType?: any;
  clickedData?: any;
  fetchDataLists?: () => void;
  handleCancel: () => void;
  isFetching?: boolean;
}) {
  const [form] = Form.useForm();
  const Editor = dynamic(() => import("./CKEditor"), { ssr: false });

  let editorText = "";

  const firstFilling = () => {
    if (buttonType! === "modification" && usedOnPage === "announcement") {
      form.setFieldsValue({
        title: clickedData[0].title,
        startDateTime: new Date(clickedData[0].startDateTime)
          .toISOString()
          .split("T")[0],
        endDateTime: new Date(clickedData[0].endDateTime)
          .toISOString()
          .split("T")[0],
        content: clickedData[0].content,
      });
    } else if (
      buttonType! === "modification" &&
      usedOnPage === "privacyPolicy"
    ) {
      form.setFieldsValue({
        title: clickedData[0].title,
        content: clickedData[0].content,
      });
    } else if (buttonType! === "modification" && usedOnPage === "term") {
      form.setFieldsValue({
        title: clickedData[0].title,
        content: clickedData[0].content,
      });
    }
  };

  useEffect(() => {
    firstFilling();
    if (buttonType == "register") {
      form.resetFields();
    }
  }, [clickedData, buttonType, extraFilter]);

  useEffect(() => {
    firstFilling();
    if (buttonType == "register") {
      form.resetFields();
    }
  }, []);

  const handleEditorChange = (data: string) => {
    editorText = data;
  };

  const handleCorrection = async () => {
    if (usedOnPage === "announcement") {
      if (
        !form.getFieldValue("title") ||
        !form.getFieldValue("startDateTime") ||
        !form.getFieldValue("endDateTime") ||
        !editorText
      ) {
        return toast.error("Please fill all inputs", { autoClose: 4000 });
      }

      if (!isValidDateFormat(form.getFieldValue("startDateTime"))) {
        return toast.error("Please insert a start date like yyyy-mm-dd");
      }

      if (!isValidDateFormat(form.getFieldValue("endDateTime"))) {
        return toast.error("Please insert a end date like yyyy-mm-dd");
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
        const id = clickedData[0].id;
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
          editorText = "";
          toast.success("완료", { autoClose: 3500 });
          fetchDataLists!();
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
          editorText = "";
          toast.success("완료", { autoClose: 3500 });
          fetchDataLists!();
        } catch (error: any) {
          toast.success("The date must be in the yyyy-mm-dd format", {
            autoClose: 3500,
          });
          console.log(error);
        }
      }
    } else if (usedOnPage === "privacyPolicy") {
      if (!form.getFieldValue("title") || !editorText) {
        return toast.error("Please fill all inputs", { autoClose: 4000 });
      }
      const title = form.getFieldValue("title");
      const content = editorText;

      const accessToken = localStorage.getItem("accessToken");

      if (buttonType! === "modification") {
        const id = clickedData[0].id;
        try {
          const response = await customFetch.patch(
            `/api/v1/admins/post/privacy-policies/${id}`,
            {
              title: title,
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
          editorText = "";
          toast.success("완료", { autoClose: 3500 });
          fetchDataLists!();
        } catch (error: any) {
          console.log(error);
        }
      } else {
        try {
          const response = await customFetch.post(
            `/api/v1/admins/post/privacy-policies`,
            {
              title: title,
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
          editorText = "";
          toast.success("완료", { autoClose: 3500 });
          fetchDataLists!();
        } catch (error: any) {
          console.log(error);
        }
      }
    } else if (usedOnPage === "term") {
      if (!form.getFieldValue("title") || !editorText) {
        return toast.error("Please fill all inputs", { autoClose: 4000 });
      }
      const title = form.getFieldValue("title");
      const content = editorText;

      const accessToken = localStorage.getItem("accessToken");

      if (buttonType! === "modification") {
        const id = clickedData[0].id;
        try {
          const response = await customFetch.patch(
            `/api/v1/admins/post/terms/${id}`,
            {
              title: title,
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
          editorText = "";
          toast.success("완료", { autoClose: 3500 });
          fetchDataLists!();
        } catch (error: any) {
          console.log(error);
        }
      } else {
        console.log(title);
        console.log(content);
        try {
          const response = await customFetch.post(
            `/api/v1/admins/post/terms`,
            {
              title: title,
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
          editorText = "";
          toast.success("완료", { autoClose: 3500 });
          fetchDataLists!();
        } catch (error: any) {
          console.log(error);
        }
      }
    }
  };

  const isValidDateFormat = (dateString: any) => {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormatRegex.test(dateString);
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
                clickedDataContent={
                  clickedData
                    ? clickedData[0]
                      ? clickedData[0].content
                        ? clickedData[0].content
                        : " "
                      : " "
                    : " "
                }
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
