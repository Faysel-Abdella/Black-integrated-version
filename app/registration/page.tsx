"use client";
import React, { useState } from "react";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import RegistrationModal from "../../components/RegistrationModal";
import HistoryModal from "../../components/HistoryModal";
import {
  Card,
  Col,
  Row,
  Table,
  Button,
  Radio,
  Space,
  DatePicker,
  Input,
  Select,
  Modal,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
const { Search } = Input;

type TableData = {
  key: any;
  approvalDate: string;
  situation: string;
  registrationId: string;
  consumerName: string;
  consumerNumber: string;
  consumerDOB: string;
  cumulativeViews: number;
  manager: string;
};

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("registration");
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

  const tableColumns: ColumnsType<TableData> = [
    {
      title: "번호",
      dataIndex: "number",
      render(value, record, index) {
        return <span>{(index + 1).toString().padStart(2, "0")}</span>;
      },
    },
    {
      title: "승인일",
      dataIndex: "approvalDate",
    },
    {
      title: "상태",
      dataIndex: "situation",
    },
    {
      title: "등록자 ID",
      dataIndex: "registrationId",
    },
    {
      title: "블랙컨슈머 이름",
      dataIndex: "consumerName",
    },
    {
      title: "블랙컨슈머 번호",
      dataIndex: "consumerNumber",
    },
    {
      title: "블랙컨슈머 생년월일",
      dataIndex: "consumerDOB",
    },
    {
      title: "누적 조회 수",
      dataIndex: "views",
      render(value, record, index) {
        return (
          <span>{record.cumulativeViews.toString().padStart(2, "0")}</span>
        );
      },
    },
    {
      title: "상세보기",
      dataIndex: "viewDetails",
      render(value, record, index) {
        return (
          <button
            onClick={() => showModal("registration")}
            className="rounded-full text-sm leading-[18px] bg-[#A3A6AB] px-[14px] py-[7px] text-white"
          >
            상세보기
          </button>
        );
      },
    },
    {
      title: "관리자",
      dataIndex: "manager",
    },
  ];

  const tableData: TableData[] = [
    {
      key: 1,
      approvalDate: "2023-08-05",
      situation: "노출",
      registrationId: "Fdpd100",
      consumerName: "이중재",
      consumerNumber: "010-4012-1146",
      consumerDOB: "901024",
      cumulativeViews: 32,
      manager: "이중재",
    },
    {
      key: 2,
      approvalDate: "2023-08-05",
      situation: "노출",
      registrationId: "Fdpd100",
      consumerName: "이중재",
      consumerNumber: "010-4012-1146",
      consumerDOB: "901024",
      cumulativeViews: 32,
      manager: "이중재",
    },
    {
      key: 3,
      approvalDate: "2023-08-05",
      situation: "노출",
      registrationId: "Fdpd100",
      consumerName: "이중재",
      consumerNumber: "010-4012-1146",
      consumerDOB: "901024",
      cumulativeViews: 32,
      manager: "이중재",
    },
    {
      key: 4,
      approvalDate: "2023-08-05",
      situation: "노출",
      registrationId: "Fdpd100",
      consumerName: "이중재",
      consumerNumber: "010-4012-1146",
      consumerDOB: "901024",
      cumulativeViews: 32,
      manager: "이중재",
    },
    {
      key: 5,
      approvalDate: "2023-08-05",
      situation: "노출",
      registrationId: "Fdpd100",
      consumerName: "이중재",
      consumerNumber: "010-4012-1146",
      consumerDOB: "901024",
      cumulativeViews: 32,
      manager: "이중재",
    },
  ];

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onChangeDate = (date: any, dateString: any) => {
    console.log(date, dateString);
  };
  return (
    <DefaultLayout>
      <Row justify="space-between" align="middle" className="mb-[21px]">
        <Col md={10}>
          <Space
            className="filter-section rounded-full bg-white w-[541px] h-[61px] pl-[42px]"
            size="middle"
          >
            <label htmlFor="#" className="font-black">
              승인일
            </label>
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>전체</Radio>
              <Radio value={2}>설정</Radio>
            </Radio.Group>
            <Space className="date-range" size="small">
              <DatePicker
                className="h-[41px] border-none"
                onChange={onChangeDate}
              />
              <p className="m-0">~</p>
              <DatePicker
                className="h-[41px] border-none"
                onChange={onChangeDate}
              />
            </Space>
          </Space>
        </Col>
      </Row>
      <Row justify="space-between" align="middle" className="mb-[57px]">
        <Col md={16}>
          <Space size="middle">
            <Space
              className="filter-section rounded-full bg-white pl-[42px] py-0 w-[354px] h-[61px]"
              size={15}
            >
              <label htmlFor="#" className="font-black">
                상태
              </label>
              <Radio.Group name="radiogroup" defaultValue={1}>
                <Radio value={1}>전체</Radio>
                <Radio value={2}>설정</Radio>
                <Radio value={3}>미노출</Radio>
              </Radio.Group>
            </Space>
            <Space
              className="filter-section rounded-full bg-white pl-[42px] pr-[20px] py-3.5 h-[61px]"
              size="middle"
            >
              <label htmlFor="#" className="font-black">
                검색어
              </label>
              <Select
                defaultValue="lucy"
                style={{ width: 110 }}
                options={[
                  { value: "jack", label: "ID" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
              <Search
                placeholder="검색어를 입력해주세요"
                style={{ width: 258 }}
                className="custom-search-icon"
              />
            </Space>
          </Space>
        </Col>
        <Col>
          <Space size="middle">
            <Button
              style={{ padding: 0, width: 144, height: 61, fontWeight: 400 }}
              shape="round"
              className="ant-btn ant-btn-white"
              onClick={() => showModal("history")}
            >
              유형관리
            </Button>
            <Button
              style={{ padding: 0, width: 144, height: 61, fontWeight: 400 }}
              type="primary"
              shape="round"
              onClick={() => showModal("registration")}
            >
              등록
            </Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={[54, 40]}>
        <Col span={24}>
          <Card title="" bodyStyle={{ padding: "75px 85px 40px 85px" }}>
            <div className="card-heading">
              <h2 style={{ fontWeight: 400 }}>
                <strong style={{ fontWeight: 600 }}>N건</strong>의 게시물이
                검색되었습니다
              </h2>
            </div>
            <Table
              bordered
              columns={tableColumns}
              dataSource={tableData}
              onChange={onChange}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        title=""
        footer=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        width={modalType === "registration" ? 753 : 596}
        className={
          modalType === "registration"
            ? "custom-mini-modal-register"
            : "custom-mini-modal-history"
        }
        centered
      >
        <div className="px-8">
          <Button
            className={`left-icon p-0 border-0 shadow-none text-left text-[30px] leading-none mt-[10px] ${
              modalType === "registration" ? "mb-[47px]" : "mb-[53px]"
            }`}
            onClick={handleCancel}
          >
            <img src="/assets/images/backIcon.png" />
          </Button>
          {modalType === "registration" ? (
            <RegistrationModal onCancel={handleCancel} />
          ) : (
            <HistoryModal />
          )}
        </div>
      </Modal>
    </DefaultLayout>
  );
}
