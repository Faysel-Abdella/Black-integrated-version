import { useState, useEffect } from "react";

import {
  Form,
  Row,
  Button,
  Radio,
  Input,
  Col,
  Flex,
  Space,
  Select,
} from "antd";
import { toast } from "react-toastify";

import customFetch from "@/utils/customFetch";

interface MembershipProps {
  onCancel: () => void;
  clickedBlackListData?: any;
  fetchBlackLists?: () => void;
  isForRegister?: boolean;
}

// ################ DONE But there is internal server error (Waiting for Jin to fix it)

// faysel2:
// <Button className="ant-btn ant-btn-info">등록</Button>
// POST /api/v1/admins/blacks

export default function Membership({
  onCancel,
  clickedBlackListData,
  fetchBlackLists,
  isForRegister,
}: MembershipProps) {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    if (!isForRegister) {
      form.setFieldsValue({
        name: clickedBlackListData[0].consumerName,
        phone: clickedBlackListData[0].consumerNumber,
        birth: clickedBlackListData[0].consumerDOB,
        type: clickedBlackListData[0].damageType,
        date: clickedBlackListData[0].approvalDate,
        description: clickedBlackListData[0].damageContent,
      });
    } else {
      form.resetFields();
    }
  });

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");

    console.log(form.getFieldValue("name"));
    console.log(form.getFieldValue("phone"));
    console.log(form.getFieldValue("birth"));
    console.log(form.getFieldValue("date"));
    console.log(form.getFieldValue("description"));
    console.log(form.getFieldValue("damageType"));

    try {
      if (isForRegister) {
        const response = await customFetch.post(
          `/api/v1/admins/blacks`,
          {
            name: form.getFieldValue("name"),
            phone: form.getFieldValue("phone"),
            birth: form.getFieldValue("birth"),
            damageDate: form.getFieldValue("date"),
            damageContent: form.getFieldValue("description"),
            damageTypeId: form.getFieldValue("damageType"),
            files: form.getFieldValue("files"),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log(response);
      } else {
        const response = await customFetch.patch(
          `/api/v1/admins/blacks/${clickedBlackListData[0].id}`,
          {
            name: form.getFieldValue("name"),
            phone: form.getFieldValue("phone"),
            birth: form.getFieldValue("birth"),
            damageDate: form.getFieldValue("date"),
            damageContent: form.getFieldValue("description"),
            damageTypeId: form.getFieldValue("damageType"),
            files: form.getFieldValue("files"),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log(response);
      }

      onCancel();
      form.resetFields();
      toast.success("완료", { autoClose: 3500 });
      fetchBlackLists!();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="modal-form form-inline">
      <Form colon={false} layout="horizontal" form={form}>
        <Row gutter={[16, 0]}>
          <Col md={24}>
            <h2 className="text-[20px] font-normal ">
              블랙컨슈머 필수 입력 정보
            </h2>
          </Col>
          <Col md={24}>
            <h2 className="text-[14px] mb-4 mt-[8px] text-[#A3A6AB]">
              블랙컨슈머 이름, 휴대폰번호, 생년월일 중 2개 이상의 정보를
              입력해주세요
            </h2>
          </Col>
          <Col md={24}>
            <Form.Item
              className="custom-label-margin"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
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
          <Col md={24}>
            <Form.Item
              className="custom-label-margin"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
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
          <Col md={24}>
            <Form.Item
              className="custom-label-margin"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="birth"
              label={
                <span style={{ textAlign: "left" }}>
                  생년월일
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
            >
              <Input />
            </Form.Item>
          </Col>

          <Col md={24}>
            <h2 className="text-[20px] font-normal mt-[30px] mb-[15px]">
              피해 정보
            </h2>
          </Col>

          <Col md={12}>
            <Form.Item
              className="custom-label-margin"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              name="damageType"
              label={
                <span style={{ textAlign: "left" }}>
                  피해 유형
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
            >
              <Select
                style={{ height: 42, borderRadius: 5 }}
                placeholder="피해 유형 선택"
                options={[
                  { value: "피해유형1", label: "피해유형1" },
                  { value: "피해유형2", label: "피해유형2" },
                  { value: "피해유형3", label: "피해유형3" },
                  { value: "피해유형4", label: "피해유형4" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              name="dateInput"
              label={
                <span style={{ marginLeft: 8, textAlign: "left" }}>
                  피해발생일
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
              className="m-0 custom-label-margin"
            >
              <Space>
                <div className="flex">
                  <Form.Item name="date">
                    <Input />
                  </Form.Item>
                  <Button
                    size="small"
                    className="ant-btn-info ml-2 font-normal"
                  >
                    변경
                  </Button>
                </div>
              </Space>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              className="custom-mini-modal-form"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="description"
              label="피해 내용"
            >
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="files"
              label="사진첨부"
              className="m-0"
            >
              <Space style={{ display: "block" }}>
                <div style={{ display: "flex" }}>
                  <Input />
                  <Button size="small" className="ant-btn-info ml-2">
                    파일 선택
                  </Button>
                </div>
              </Space>
            </Form.Item>
          </Col>
        </Row>
        <Flex gap="middle" align="center" justify="center" className="mt-10">
          <Button onClick={handleSubmit} className="ant-btn ant-btn-info">
            등록
          </Button>
          <Button className="ant-btn ant-btn-info" onClick={onCancel}>
            취소
          </Button>
        </Flex>
      </Form>
    </div>
  );
}
