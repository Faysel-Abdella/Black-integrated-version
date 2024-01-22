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
  DatePicker,
} from "antd";
import { toast } from "react-toastify";
import dayjs from "dayjs";

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

  const [availableTypes, setAvailableTypes] = useState([]);

  const [damageDate, setDamageDate] = useState("");

  const [firstDamageType, setFirstDamageType] = useState<string | null>("");

  const onChangeDamageDate = (date: any, dateString: any) => {
    setDamageDate(dateString);
  };

  const [selectedFiles, setSelectedFiles] = useState<any>([]);

  const handleFileChange = (event: any) => {
    const files = event.target.files;
    console.log(typeof files);

    // const fileNames = Array.from(files).map((file: any) => file.name);
    setSelectedFiles((prevSelectedFiles: any) => [
      ...prevSelectedFiles,
      ...files,
    ]);
  };

  const getAvailableTypes = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await customFetch.get(
        `/api/v1/admins/blacks/damagetypes`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const types = response.data;

      const transformedTypes = types.map((type: any) => ({
        value: type.name,
        label: type.name,
      }));

      setAvailableTypes(transformedTypes);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isForRegister) {
      console.log(isForRegister);
      setFirstDamageType("먹튀");
    } else {
      console.log(isForRegister);
      setFirstDamageType("");
      setSelectedFiles([]);
    }
  }, [isForRegister]);

  useEffect(() => {
    // console.log(isForRegister);
    // console.log(clickedBlackListData[0]);
    getAvailableTypes();

    if (!isForRegister) {
      form.setFieldsValue({
        name: clickedBlackListData[0].consumerName,
        phone: clickedBlackListData[0].consumerNumber,
        birth: clickedBlackListData[0].consumerDOB,
        // type: clickedBlackListData[0].damageType,
        date: clickedBlackListData[0].approvalDate,
        description: clickedBlackListData[0].damageContent,
      });
      setDamageDate(clickedBlackListData[0].damageDate);
    } else {
      form.resetFields();
      setDamageDate("");
      setSelectedFiles([]);
    }
  }, [clickedBlackListData, isForRegister]);

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const formData = new FormData();
      console.log(selectedFiles);

      formData.append(
        "files",
        selectedFiles.map((selected: any) => selected)
      );

      console.log("PASSED");

      formData.append("name", form.getFieldValue("name"));
      formData.append("phone", form.getFieldValue("phone"));
      formData.append("birth", form.getFieldValue("birth"));
      formData.append("damageDate", damageDate);
      formData.append("damageContent", form.getFieldValue("description"));
      formData.append("damageTypeId", "1");

      console.log(formData.keys);

      if (isForRegister) {
        const response = await customFetch.post(
          `/api/v1/admins/blacks`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response);
      } else {
        const response = await customFetch.patch(
          `/api/v1/admins/blacks/${clickedBlackListData[0].id}`,
          formData,
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
                options={availableTypes}
                defaultValue={firstDamageType}
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
                  <DatePicker
                    className="h-[41px] border-cyan-600 rounded-xl"
                    onChange={onChangeDamageDate}
                    value={
                      !isForRegister && damageDate == ""
                        ? dayjs(
                            new Date(clickedBlackListData[0].damageDate)
                              .toISOString()
                              .split("T")[0]
                          )
                        : damageDate == ""
                        ? null
                        : dayjs(damageDate)
                    }
                    placeholder="변경"
                  />
                  {/* <Form.Item name="date">
                    <Input />
                  </Form.Item>
                  <Button
                    size="small"
                    className="ant-btn-info ml-2 font-normal"
                  >
                    변경
                  </Button> */}
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
                <div className="flex justify-center items-center">
                  <TextArea
                    value={selectedFiles.join(", ")}
                    readOnly
                    autoSize={{ minRows: 1, maxRows: 6 }}
                  />
                  <label
                    htmlFor="file-upload"
                    className="ant-btn ant-btn-info py-2 px-2 ml-2 cursor-pointer"
                  >
                    <p style={{ whiteSpace: "nowrap" }}>파일 선택</p>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                  {/* <Button size="small" className="ant-btn-info ml-2">
                    파일 선택
                  </Button> */}
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
