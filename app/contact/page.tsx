"use client";
import React, { useState } from "react";
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

import DefaultLayout from "../DefaultLayout/DefaultLayout";
import ContactModal from "@/components/ContactModal";

const { Search } = Input;

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "번호",
      dataIndex: "key",
    },
    {
      title: "제목",
      dataIndex: "title",
      render: (text: any, recode: any) => (
        <a onClick={showModal}>{recode.title}</a>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "이름",
      dataIndex: "name",
    },
    {
      title: "휴대폰번호",
      dataIndex: "phone",
    },
    {
      title: "등록날짜",
      dataIndex: "registrationDate",
    },
    {
      title: "관리자",
      dataIndex: "admin",
    },
    {
      title: "처리일자",
      dataIndex: "processingDate",
    },
    {
      title: "상태",
      dataIndex: "status",
    },
  ];
  const data = [
    {
      key: "1",
      title: "인증번호 초과",
      id: "Fd123",
      name: "천지인",
      phone: "010-1234-1234",
      registrationDate: "2023.08.21 14:11:21",
      admin: "이중재",
      processingDate: "2023.08.23 14:11:21",
      status: "답변완료",
    },
    {
      key: "2",
      title: "조회가 안되는데 어떻게 해요?",
      id: "edd123",
      name: "김현지",
      phone: "010-4567-5678",
      registrationDate: "2023.08.22 14:11:21",
      admin: "이중재",
      processingDate: "2023.08.23 14:11:21",
      status: "답변완료",
    },
    {
      key: "3",
      title: "테스트",
      id: "test123",
      name: "테스트",
      phone: "010-1111-2222",
      registrationDate: "2023.09.22 14:11:21",
      admin: "이중재",
      processingDate: "2023.09.23 14:11:21",
      status: "답변완료",
    },
  ];
  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onChangeDate = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  // ############################### Waiting for Jin to add dummy data ##################

  // faysel4:
  // GET /api/v1/admins/post/inquiries
  // This API is for fetching the list of 1:1 inquiries.
  // You need to retrieve the data and insert it into the Table tag.
  // Pagination should be implemented if there is a large amount of data.
  // As you can see at the top of the page, the posts in the list should be searchable based on the date, status, and search terms.

  // code line 40 ~ 46
  // {
  //   title: "제목",
  //   dataIndex: "title",
  //   render: (text: any, recode: any) => (
  //     <a onClick={showModal}>{recode.title}</a>
  //   ),
  // },
  // // PATCH /api/v1/admins/post/inquiries/{id}
  // When you click on the title in the list, the information about that list should be appropriately displayed in a modal.
  // Additionally, within the modal, you should be able to register a response to the user's question.

  // For more details, please refer to the Swagger documentation."

  return (
    <DefaultLayout>
      <Row justify="space-between" align="middle" className="mb-[21px]">
        <Col md={10}>
          <Space
            className="filter-section rounded-full bg-white pl-[42px] w-[541px] h-[61px]"
            size="middle"
          >
            <label htmlFor="#" className="font-black mr-[19px]">
              등록일
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
      <Row align="middle" className="mb-[60px]">
        <Col md={16}>
          <Space size="middle">
            <Space
              className="filter-section rounded-full bg-white pl-[42px] py-0 w-[360px] h-[61px]"
              size="middle"
            >
              <label htmlFor="#" className="font-black mr-[30px]">
                상태
              </label>
              <Radio.Group name="radiogroup" defaultValue={1}>
                <Radio value={1}>전체</Radio>
                <Radio value={2}>대기</Radio>
                <Radio value={3}>답변완료</Radio>
              </Radio.Group>
            </Space>
            <Space
              className="filter-section rounded-full bg-white pl-[42px] pr-[20px] py-3.5"
              size="middle"
            >
              <label htmlFor="#" className="font-black">
                검색어
              </label>
              <Search
                placeholder="검색어를 입력해주세요"
                style={{ width: 398 }}
                className="custom-search-icon"
              />
            </Space>
          </Space>
        </Col>
      </Row>
      <Row gutter={[54, 40]}>
        <Col span={24}>
          <Card title="" bodyStyle={{ padding: "75px 84px 40px" }}>
            <div className="card-heading">
              <h2 style={{ fontWeight: 400 }}>
                <strong className="font-semibold">N건</strong>의 게시물이
                검색되었습니다
              </h2>
            </div>
            <Table
              bordered
              columns={columns}
              dataSource={data}
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
        width={753}
        centered
      >
        <div className="pl-[59px] pr-[56px]">
          <Button
            className="left-icon p-0 border-0 shadow-none text-left text-[30px] leading-none mt-[37px] mb-[43px]"
            block
            onClick={handleCancel}
          >
            <img src="/assets/images/backIcon.png" />
          </Button>
          <ContactModal onCancel={handleCancel} />
        </div>
      </Modal>
    </DefaultLayout>
  );
}
