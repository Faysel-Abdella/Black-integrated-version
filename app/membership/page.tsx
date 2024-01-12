"use client";
import React, { useState, useEffect } from "react";

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
import customFetch from "@/utils/customFetch";
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
  const [adminsAllDataList, setAdminsAllDataList] = useState([]);
  const [adminsList, setAdminsList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  // Search functionality states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // Updating admin data
  const [clickedAdminId, setClickedAdminId] = useState("");

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

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const filteredAdmins = adminsList.filter((admin: AdminType) =>
      admin.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredAdmins);
  };

  useEffect(() => {
    const fetchAdminLists = async () => {
      setIsFetching(true);
      const accessToken = localStorage.getItem("accessToken");
      const adminsList = await customFetch.get("/api/v1/admins/ban", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const adminsData = adminsList.data.data;

      const transformedAdminsBanList = adminsData.map((admin: any) => ({
        key: admin.id < 9 ? `0${admin.id}` : admin.id,
        id: admin.admin.id,
        name: admin.admin.name,
        phoneNumber: admin.admin.phone,
        sanctionPeriod: admin.bannedDate,
        // reason,  ??
        // manager, ??
        // clear,  ??

        // lastAccessDate: new Date(admin.lastLoginDate)
        //   .toISOString()
        //   .split("T")[0],
      }));

      setAdminsList(transformedAdminsBanList);
      setAdminsAllDataList(adminsData);
      setIsFetching(false);
    };

    try {
      fetchAdminLists();
    } catch (error) {
      console.log("Error when fetching admins list", error);
    }
  }, []);

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
            onClick={() => {
              showModal("clear");
              setClickedAdminId(record.id);
            }}
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
      id: "1",
      name: "이중재",
      phoneNumber: "010-0416-3114",
      sanctionPeriod: "2023-01-08",
      reason: "정상",
      manager: "아이디",
      clear: 32,
    },
    {
      key: 2,
      id: "2",
      name: "이중재",
      phoneNumber: "010-0416-3114",
      sanctionPeriod: "2023-01-08",
      reason: "정상",
      manager: "아이디",
      clear: 32,
    },
    {
      key: 3,
      id: "3",
      name: "이중재",
      phoneNumber: "010-0416-3114",
      sanctionPeriod: "2023-01-08",
      reason: "정상",
      manager: "아이디",
      clear: 32,
    },
    {
      key: 4,
      id: "4",
      name: "이중재",
      phoneNumber: "010-0416-3114",
      sanctionPeriod: "2023-01-08",
      reason: "정상",
      manager: "아이디",
      clear: 32,
    },
    {
      key: 5,
      id: "5",
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

  // ################## The API is not available (Jin is preparing the data)  #########################

  // faysel2: * Jin is preparing the data. The membership-management page is also the same.
  // I left a confusing comment on the membership page at first, and I'm sorry

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
                  onChange={(e) => handleSearch(e.target.value)}
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
                <MembershipManagementModal clickedAdminId={clickedAdminId} />
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
