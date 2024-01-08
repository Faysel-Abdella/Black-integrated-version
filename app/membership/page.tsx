"use client";
import React, { useState } from "react";

import Sidebar from "../../components/Sidebar";
import MembershipManagementModal from "../../components/MembershipManagementModal";
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
import BlockRegisterModal from "@/components/BlockRegisterModal";
const { Search } = Input;

type TableData = {
  key: any;
  id: string;
  name: string;
  phoneNumber: string;
  sanctionPeriod: string;
  reason: string;
  manager: string;
  clear: number;
};

export default function MembershipManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("clear");
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
      title: "ID",
      dataIndex: "id",
      render(value, record, index) {
        return (
          <span className="text-[#28A7E1] underline-offset-2 underline cursor-pointer">
            {value}
          </span>
        );
      },
    },
    {
      title: "이름",
      dataIndex: "name",
    },
    {
      title: "휴대폰번호",
      dataIndex: "phoneNumber",
    },
    {
      title: "제재기간",
      dataIndex: "sanctionPeriod",
    },
    {
      title: "사유",
      dataIndex: "reason",
    },
    {
      title: "관리자",
      dataIndex: "manager",
    },
    {
      title: "해제",
      dataIndex: "clear",
      render(value, record, index) {
        return (
          <button
            onClick={() => showModal("clear")}
            className="rounded-full text-sm leading-[18px] bg-[#A3A6AB] px-[14px] py-[7px] text-white"
          >
            해제하기
          </button>
        );
      },
    },
  ];

  const tableData: TableData[] = [
    {
      key: 1,
      id: "Fdpd100",
      name: "이중재",
      phoneNumber: "010-0416-3114",
      sanctionPeriod: "2023-01-08",
      reason: "정상",
      manager: "아이디",
      clear: 32,
    },
    {
      key: 2,
      id: "Fdpd100",
      name: "이중재",
      phoneNumber: "010-0416-3114",
      sanctionPeriod: "2023-01-08",
      reason: "정상",
      manager: "아이디",
      clear: 32,
    },
    {
      key: 3,
      id: "Fdpd100",
      name: "이중재",
      phoneNumber: "010-0416-3114",
      sanctionPeriod: "2023-01-08",
      reason: "정상",
      manager: "아이디",
      clear: 32,
    },
    {
      key: 4,
      id: "Fdpd100",
      name: "이중재",
      phoneNumber: "010-0416-3114",
      sanctionPeriod: "2023-01-08",
      reason: "정상",
      manager: "아이디",
      clear: 32,
    },
    {
      key: 5,
      id: "Fdpd100",
      name: "이중재",
      phoneNumber: "010-0416-3114",
      sanctionPeriod: "2023-01-08",
      reason: "정상",
      manager: "아이디",
      clear: 32,
    },
  ];

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onChangeDate = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  //   faysel:
  //   "This is the API for displaying the list of sanctioned administrators.
  //   The Table tag should contain data about the list of sanctioned administrators.
  //   If the administrator list becomes large, pagination should be implemented.

  //   code line

  //   <Search
  //   placeholder="Please enter a search term"
  //   style={{ width: 258 }}
  //   className="custom-search-icon"
  //   />

  //   When a search is performed in this section, it should yield search results.
  //   The implementation is similar to the list display in 'admin-site / app / account / page.tsx'.
  //   Please thoroughly check the Swagger documentation and proceed with the work.
  //   Thank you."
  //   GET /api/v1/admins/ban

  //   "In this section:
  //   code line 90 ~ 103
  //   {
  //     title: "해제",
  //     dataIndex: "clear",
  //     render(value, record, index) {
  //     return (
  //     <button
  //     onClick={() => showModal("clear")}
  //     className="rounded-full text-sm leading-[18px] bg-[#A3A6AB] px-[14px] py-[7px] text-white"
  //      >
  //      해제하기
  //      </button>
  //    );
  //    },
  //    },

  //   When clicking the button,
  //   the corresponding ID needs to be passed to the <MembershipManagementModal/> tag.
  //   This is necessary because, within the <MembershipManagementModal/>,
  //   the API for lifting the sanction (or unblocking) must be executed,
  //   which is the DELETE /api/v1/admins/ban/{id} API."

  return (
    <div className="main-dashboard">
      <Sidebar />
      <main>
        <div className="container flex flex-col min-h-screen justify-center">
          <Row justify="space-between" align="middle" className="mb-[57px]">
            <Col md={16}>
              <Space
                className="filter-section rounded-full bg-white pl-[42px] pr-[20px] py-3.5 h-[61px]"
                size="middle"
              >
                <label htmlFor="#" className="font-black">
                  검색어
                </label>
                <Select
                  defaultValue="lucy"
                  style={{ width: 110, fontSize: 14 }}
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
            </Col>
            <Col>
              <Button
                style={{
                  padding: 0,
                  width: 144,
                  height: 61,
                  fontWeight: 700,
                }}
                type="primary"
                shape="round"
                className="min-w-[120px]"
                onClick={() => showModal("register")}
              >
                등록
              </Button>
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
            className={
              modalType === "clear"
                ? "custom-mini-modal-clear"
                : "custom-mini-modal-searchId"
            }
            title=""
            footer=""
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
            width={753}
            centered
          >
            <div className="px-8">
              <Button
                className="left-icon p-0 border-0 shadow-none text-left text-[30px] leading-none mb-[40px]"
                block
                onClick={handleCancel}
              >
                <img src="/assets/images/backIcon.png" />
              </Button>
              {modalType === "clear" ? (
                <MembershipManagementModal />
              ) : (
                <BlockRegisterModal />
              )}
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
}
