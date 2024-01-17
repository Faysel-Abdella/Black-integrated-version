"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import PrivacyEditor from "../../components/PrivacyEditor";
import { Card, Col, Row, Table, Button, Modal } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import Sidebar from "../../components/Sidebar";
import customFetch from "@/utils/customFetch";

type TableData = {
  key: any;
  title: string;
  admin: string;
  date: string;
};

export default function PrivacyPolicy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonType, setButtonType] = useState("");

  const [privaciesList, setPrivaciesList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  // Updating privacy data
  const [clickedPrivacyData, setClickedPrivacyData] = useState([]);

  const fetchPrivacyLists = async () => {
    setIsFetching(true);
    const accessToken = localStorage.getItem("accessToken");
    const privaciesList = await customFetch.get(
      "/api/v1/admins/post/privacy-policies",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const privaciesData = privaciesList.data.data;

    const transformedPrivaciesList = privaciesData.map(
      (privacy: any, index: number) => ({
        key: index + 1 < 9 ? `0${index + 1}` : `${index + 1}`,
        title: privacy.title,
        admin: privacy.authorName,
        date: new Date(privacy.createdAt).toISOString().split("T")[0],
        // Non-included in tha table fields

        id: privacy.id,
        content: privacy.content,
      })
    );

    setPrivaciesList(transformedPrivaciesList);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchPrivacyLists();
  }, []);

  const handleClickPrivacy = (data: any) => {
    const thisPrivacyData: any = privaciesList.filter(
      (privacy: any) => privacy.id.toString() == data.id.toString()
    );

    setClickedPrivacyData(thisPrivacyData);
    setButtonType("modification");
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns: ColumnsType<TableData> = [
    {
      title: "번호",
      dataIndex: "key",
      render(value, record, index) {
        return <span>{(index + 1).toString().padStart(2, "0")}</span>;
      },
    },
    {
      title: "제목",
      dataIndex: "title",
      render: (value, record, index) => (
        <a onClick={() => handleClickPrivacy(record)}>{value}</a>
      ),
    },
    {
      title: "관리자",
      dataIndex: "admin",
    },
    {
      title: "처리일자",
      dataIndex: "date",
    },
  ];
  const data = [
    {
      key: "1", // YES
      title: "개인정보 처리방침 v0.3", // YES
      admin: "이중재", // YES
      date: "2023.08.23 14:11:21", // YES
    },
    {
      key: "2",
      title: "개인정보 처리방침 v0.2",
      admin: "이중재",
      date: "2023.07.23 14:11:21",
    },
    {
      key: "3",
      title: "개인정보 처리방침 v0.1",
      admin: "이중재",
      date: "2023.06.23 14:11:21",
    },
  ];
  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // ################ DONE /완전한 ############## //

  // ***** You need to use a text editor. *****
  // faysel4:
  // GET /api/v1/admins/post/privacy-policies
  // This API is for fetching the list of privacy policy documents.
  // You need to retrieve the data and insert it into the Table tag.
  // Pagination should be implemented if there is a large amount of data.

  // code line 38 ~ 42
  // {
  //   title: "제목",
  //   dataIndex: "title",
  //   render: (value, recode, index) => <a onClick={showModal}>{value}</a>,
  // },
  // PATCH /api/v1/admins/post/privacy-policies/{id}
  // When you click on the title in the list, the relevant information for that item should correctly appear in a modal.
  // Furthermore, the information within the modal should be editable.

  // Below code,
  //   <Button
  //   style={{
  //     padding: 0,
  //     width: 144,
  //     height: 61,
  //     fontWeight: 700,
  //   }}
  //   type="primary"
  //   shape="round"
  //   className="min-w-[120px]"
  //   onClick={() => showModal()}
  //  >
  //   등록
  //  </Button>
  // POST /api/v1/admins/post/privacy-policies
  // When this button is pressed, it should be possible to register a new privacy policy.

  // For more details, please refer to the Swagger documentation."

  return (
    <DefaultLayout>
      <div style={{ paddingTop: 82 }}>
        <Row justify="end" align="middle" className="mb-[50px]">
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
              onClick={() => {
                setButtonType("register");
                showModal();
              }}
            >
              등록
            </Button>
          </Col>
        </Row>
        <Row gutter={[54, 40]}>
          <Col span={24}>
            <Card title="" className="pt-[53px] pl-[33px]">
              <Col md={18}>
                {isFetching ? (
                  <div className="flex justify-center items-center h-[100%]">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
                  </div>
                ) : (
                  <Table
                    bordered
                    columns={columns}
                    dataSource={privaciesList}
                    onChange={onChange}
                  />
                )}
              </Col>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title=""
        footer=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        width={860}
        centered
      >
        <div className="px-8">
          <Button
            className="left-icon p-0 border-0 shadow-none text-left text-[30px] leading-none mb-[43px]"
            block
            onClick={handleCancel}
          >
            <img src="/assets/images/backIcon.png" />
          </Button>
          <PrivacyEditor
            usedOnPage="privacyPolicy"
            buttonType={buttonType}
            clickedData={clickedPrivacyData}
            handleCancel={handleCancel}
            fetchDataLists={fetchPrivacyLists}
            isFetching={isFetching}
          />
        </div>
      </Modal>
    </DefaultLayout>
  );
}
