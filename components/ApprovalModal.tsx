import React, { useState, useEffect } from "react";
import { Form, Row, Button, Radio, Input, Col, Flex } from "antd";
import Image from "next/image";
import Sample1 from "../public/assets/images/smaple-1.png";
import Sample2 from "../public/assets/images/smaple-2.png";
import Sample3 from "../public/assets/images/smaple-3.png";
import Sample4 from "../public/assets/images/smaple-4.png";

export default function ApprovalModal({
  clickedViewDetails,
}: {
  clickedViewDetails: any;
}) {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  // ################ DONE / 완전한 ############## //

  // faysel3:
  // When the modal is open, the data from the list should be appropriately entered into the inputs."

  useEffect(() => {
    if (clickedViewDetails) {
      form.setFieldsValue({
        name: clickedViewDetails[0].consumerName,
        phone: clickedViewDetails[0].consumerNumber,
        birth: clickedViewDetails[0].consumerDOB,
        dateOfDamage: new Date(clickedViewDetails[0].damageDate)
          .toISOString()
          .split("T")[0],
        damageDetails: clickedViewDetails[0].damageContent,
      });
    }
  }, [clickedViewDetails]);

  return (
    <div className="modal-form">
      <Form colon={false} layout="horizontal" form={form}>
        <Row gutter={[10, 0]}>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 13 }}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 20 }}
              name="name"
              label={
                <span style={{ textAlign: "left" }}>
                  블랙컨슈머
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                  <p>이름</p>
                </span>
              }
            >
              <Input style={{ marginLeft: 20 }} name="name" />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 13 }}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 20 }}
              name="phone"
              label={
                <span style={{ textAlign: "left" }}>
                  블랙컨슈머
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                  <p>휴대폰번호</p>
                </span>
              }
            >
              <Input style={{ marginLeft: 20 }} name="phone" />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 13 }}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 20 }}
              name="birth"
              label={
                <span style={{ textAlign: "left" }}>
                  블랙컨슈머
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                  <p>생년월일</p>
                </span>
              }
            >
              <Input style={{ marginLeft: 20 }} name="birth" />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 13 }}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 20 }}
              name="dateOfDamage"
              label={
                <span style={{ textAlign: "left" }}>
                  피해발생일
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
            >
              <Input style={{ marginLeft: 20 }} name="dateOfDamage" />
            </Form.Item>
          </Col>

          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 13 }}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 20 }}
              name="damageDetails"
              label={
                <span style={{ textAlign: "left", marginRight: 5 }}>
                  피해 내용
                  <span className="required-asterisk ml-1 text-red-500">*</span>
                </span>
              }
            >
              <TextArea
                style={{ marginLeft: 20, resize: "none" }}
                rows={4}
                className="h-52"
                name="damageDetails"
              />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              style={{ marginBottom: 13 }}
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 20 }}
              name="note"
              label="사진첨부"
            >
              <div
                style={{ marginLeft: 47 }}
                className="block w-full border border-primary p-3 rounded-[5px]"
              >
                <Row gutter={[10, 10]}>
                  <Col flex="20%">
                    <Image
                      src={Sample1}
                      alt="smaple"
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col flex="20%">
                    <Image
                      src={Sample2}
                      alt="smaple"
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col flex="20%">
                    <Image
                      src={Sample3}
                      alt="smaple"
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col flex="20%">
                    <Image
                      src={Sample4}
                      alt="smaple"
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col flex="20%">
                    <Image
                      src={Sample2}
                      alt="smaple"
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col flex="20%">
                    <Image
                      src={Sample3}
                      alt="smaple"
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col flex="20%">
                    <Image
                      src={Sample4}
                      alt="smaple"
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
              </div>
              {/* <TextArea rows={4} className='h-52' /> */}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
