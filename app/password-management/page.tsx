"use client";
import React, { useState, useEffect } from "react";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
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
  Flex,
  Modal,
} from "antd";
import { toast } from "react-toastify";
import { LeftOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
const { Search } = Input;
import customFetch from "@/utils/customFetch";

type TableadminsList = {
  key: any;
  id: string;
  name: string;
  department: string;
  sanctionDate: string;
  situation: string;
};

export default function PasswordManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminsList, setAdminsList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  // Search functionality states
  // Updating admin data
  const [clickedAdminId, setClickedAdminId] = useState([]);

  const fetchAdminLists = async () => {
    setIsFetching(true);
    const accessToken = localStorage.getItem("accessToken");
    const adminsList = await customFetch.get("/api/v1/admins/ban", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const adminsData = adminsList.data.data;

    const transformedAdminsList = adminsData.map((admin: any) => ({
      key: admin.id,
      name: admin.admin.name,
      id: admin.admin.id,
      department: admin.admin.department,
      sanctionDate: new Date(admin.bannedDate).toISOString().split("T")[0],
      situation: "제재 해지",
    }));

    setAdminsList(transformedAdminsList);
    setIsFetching(false);
  };

  useEffect(() => {
    try {
      fetchAdminLists();
    } catch (error) {
      console.log("Error when fetching admins list", error);
    }
  }, []);

  const handleDelete = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await customFetch.delete(
        `/api/v1/admins/ban/${clickedAdminId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      closeModal();
      toast.success("제재가 해제되었습니다.", { autoClose: 3000 });
    } catch (error) {
      console.log(error);
    }

    fetchAdminLists();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const tableColumns: ColumnsType<any> = [
    {
      title: "번호",
      dataIndex: "number",
      render(value, record, index) {
        return <span>{(index + 1).toString().padStart(2, "0")}</span>;
      },
    },
    {
      title: "이름",
      dataIndex: "name",
    },
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "부서",
      dataIndex: "department",
    },
    {
      title: "제재일",
      dataIndex: "sanctionDate",
    },
    {
      title: "상태",
      dataIndex: "situation",
      render(value, record, index) {
        return (
          <span
            onClick={() => {
              showModal();
              setClickedAdminId(record.id);
            }}
            role="button"
            className="text-[#28A7E1] underline-offset-2 underline"
          >
            {value}
          </span>
        );
      },
    },
  ];
  const data: TableData[] = [
    {
      key: 1,
      name: "이중재",
      id: "Fdpd100",
      department: "기획팀",
      sanctionDate: "2023.08.21 14:21:21",
      situation: "제재 해지",
    },
    {
      key: 2,
      name: "이중재",
      id: "Fdpd100",
      department: "기획팀",
      sanctionDate: "2023.08.21 14:21:21",
      situation: "제재 해지",
    },
    {
      key: 3,
      name: "이중재",
      id: "Fdpd100",
      department: "기획팀",
      sanctionDate: "2023.08.21 14:21:21",
      situation: "제재 해지",
    },
    {
      key: 4,
      name: "이중재",
      id: "Fdpd100",
      department: "기획팀",
      sanctionDate: "2023.08.21 14:21:21",
      situation: "제재 해지",
    },
    {
      key: 5,
      name: "이중재",
      id: "Fdpd100",
      department: "기획팀",
      sanctionDate: "2023.08.21 14:21:21",
      situation: "제재 해지",
    },
    {
      key: 6,
      name: "이중재",
      id: "Fdpd100",
      department: "기획팀",
      sanctionDate: "2023.08.21 14:21:21",
      situation: "제재 해지",
    },
    {
      key: 7,
      name: "이중재",
      id: "Fdpd100",
      department: "기획팀",
      sanctionDate: "2023.08.21 14:21:21",
      situation: "제재 해지",
    },
  ];
  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onChangeDate = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  // ######################### DONE / 완전한 ##########################

  // faysel2:
  // This is a page displaying a list of sanctioned administrators.
  // The list data of sanctioned administrators needs to be inserted into a table tag.
  // When this button is clicked,
  //   <Button
  //   style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
  //   className="ant-btn ant-btn-info"
  //   >
  //   등록
  //   </Button>
  // you should be able to carry the ID of the user corresponding to the list and have the capability to delete it."

  // GET /api/v1/admins/ban
  // DELETE /api/v1/admins/ban/{id}

  return (
    <DefaultLayout>
      <Row
        gutter={[54, 40]}
        className="flex-1"
        justify={"center"}
        align={"middle"}
      >
        <Col span={24}>
          <Card title="" bodyStyle={{ padding: "78px 85px 95px 84px" }}>
            <Col span={20}>
              {isFetching ? (
                <div className="flex justify-center items-center h-screen">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
                </div>
              ) : (
                <Table
                  // pagination={false}
                  bordered
                  columns={tableColumns}
                  dataSource={adminsList}
                  onChange={onChange}
                />
              )}
            </Col>
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
        width={467}
        className="custom-mini-modal-password"
        centered
      >
        <div>
          <Button
            className="left-icon p-0 border-0 shadow-none text-left text-[30px] leading-none mb-[43px]"
            block
            onClick={handleCancel}
          >
            <img src="/assets/images/backIcon.png" />
          </Button>
          <p className="text-[20px] mb-[77px] ">
            해당 계정 잠금을 해제 하시겠습니까?
          </p>
          <Flex gap="middle" align="center" justify="center">
            <Button
              style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
              className="ant-btn ant-btn-info"
              onClick={handleDelete}
            >
              등록
            </Button>
            <Button
              onClick={handleCancel}
              style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
              className="ant-btn ant-btn-info"
            >
              취소
            </Button>
          </Flex>
        </div>
      </Modal>
    </DefaultLayout>
  );
}
