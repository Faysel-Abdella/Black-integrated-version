"use client";
import React, { useState } from "react";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import AddFaqModal from "../../components/AddFaqModal";
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
const { Search } = Input;

export default function Faq() {
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
      title: "FAQ 타이틀",
      dataIndex: "faqTitle",
    },
    {
      title: "제목",
      dataIndex: "title",
    },
    {
      title: "클릭수",
      dataIndex: "clickNum",
    },
    {
      title: "등록일",
      dataIndex: "registerDate",
    },
    {
      title: "관리자",
      dataIndex: "admin",
    },
  ];
  const data = [
    {
      key: "1",
      faqTitle: "조회 문의",
      title: "사용",
      clickNum: 5,
      registerDate: "2023.08.23",
      admin: "이중재",
    },
    {
      key: "2",
      faqTitle: "옵션 문의",
      title: "미사용",
      clickNum: 2,
      registerDate: "2023.08.25",
      admin: "이중재",
    },
    {
      key: "3",
      faqTitle: "내용 문의",
      title: "?!",
      clickNum: 3,
      registerDate: "2023.08.27",
      admin: "이중재",
    },
    {
      key: "4",
      faqTitle: "시간 문의",
      title: "?!",
      clickNum: 5,
      registerDate: "2023.09.01",
      admin: "이중재",
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
  // GET /api/v1/admins/post/faqs
  // This is the API for fetching the FAQ list.
  // You need to retrieve the data and insert it into the Table tag.
  // Pagination should be implemented if there is a large amount of data.
  // As you can see at the top of the page, the posts in the list should be searchable based on the date, status, and search terms.

  // POST /api/v1/admins/post/faqs
  // Below code,
  // <Button
  // style={{
  //   padding: 0,
  //   width: 144,
  //   height: 61,
  //   fontWeight: 700,
  //   }}
  //   type="primary"
  //   shape="round"
  //   className="min-w-[120px]"
  //   onClick={() => showModal()}
  //   >
  //   등록
  //   </Button>
  // When this button is pressed, it should be possible to register a new FAQ.

  // code line 39 ~ 42

  // {
  //   title: "FAQ 타이틀",
  //   dataIndex: "faqTitle",
  // },
  // PATCH /api/v1/admins/post/faqs/{id}
  // Just like with other lists, when you click on the title of a post, the information for that particular post should appear in a modal, allowing for modifications.

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
      <Row justify="space-between" align="middle" className="mb-[60px]">
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
                <Radio value={2}>사용</Radio>
                <Radio value={3}>미사용</Radio>
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
            onClick={() => showModal()}
          >
            등록
          </Button>
        </Col>
      </Row>
      <Row gutter={[54, 40]}>
        <Col span={24}>
          <Card title="" bodyStyle={{ padding: "75px 84px 40px" }}>
            <div className="card-heading">
              <h2 style={{ fontWeight: 400 }} className="font-normal">
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
        <div className="px-[52px] pt-[37px]">
          <Button
            className="left-icon p-0 border-0 shadow-none text-left text-[30px] leading-none mb-[43px]"
            onClick={handleCancel}
          >
            <img src="/assets/images/backIcon.png" />
          </Button>
          <AddFaqModal onCancel={handleCancel} />
        </div>
      </Modal>
    </DefaultLayout>
  );
}
