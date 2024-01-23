"use client";
import React, { useEffect, useState } from "react";
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
import customFetch from "@/utils/customFetch";

const { Search } = Input;

export default function Faq() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [buttonType, setButtonType] = useState("");

  const [faqsAllDataList, setFaqsAllDataList] = useState([]);
  const [faqsList, setFaqsList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  // Search functionality states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // Updating faq data
  const [clickedFaqData, setClickedFaqData] = useState([]);

  const [total, setTotal] = useState(0);

  const fetchFaqLists = async () => {
    setIsFetching(true);
    const accessToken = localStorage.getItem("accessToken");
    const faqsList = await customFetch.get("/api/v1/admins/post/faqs", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const faqsData = faqsList.data.data;

    const transformedFaqsList = faqsData.map((faq: any, index: number) => ({
      key: index + 1 < 9 ? `0${index + 1}` : `${index + 1}`,
      faqTitle: faq.title,
      title: faq.content,
      clickNum: faq.clickCount,
      registerDate: new Date(faq.createdAt).toISOString().split("T")[0],
      admin: faq.authorName,
      // Non-included in tha table fields

      id: faq.id,
      status: faq.status,
    }));

    setFaqsList(transformedFaqsList);
    setTotal(transformedFaqsList.length);
    setFaqsAllDataList(faqsData);
    setIsFetching(false);
  };

  useEffect(() => {
    try {
      fetchFaqLists();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const filteredFaqs = faqsList.filter((faq: any) =>
      faq.faqTitle.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredFaqs);
  };

  const handleClickFaq = (data: any) => {
    const thisFaqData: any = faqsAllDataList.filter(
      (faq: any) => faq.id.toString() == data.id.toString()
    );

    setClickedFaqData(thisFaqData);
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
  const columns = [
    {
      title: "번호",
      dataIndex: "key",
    },
    {
      title: "FAQ 타이틀",
      dataIndex: "faqTitle",
      render: (value: any, record: any, index: number) => (
        <a onClick={() => handleClickFaq(record)}>{value}</a>
      ),
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
      key: "1", // YES
      faqTitle: "조회 문의", // YES
      title: "사용", //content
      clickNum: 5, // YES (clickCount)
      registerDate: "2023.08.23", // YES (createdAt)
      admin: "이중재", // YES (authorName)
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

  // ################ DONE /완전한 ############## //

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
                onChange={(e) => handleSearch(e.target.value)}
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
          <Card title="" bodyStyle={{ padding: "75px 84px 40px" }}>
            <div className="card-heading">
              <h2 style={{ fontWeight: 400 }} className="font-normal">
                <strong className="font-semibold">{total}건</strong>의 게시물이
                검색되었습니다
              </h2>
            </div>
            {isFetching ? (
              <div className="flex justify-center items-center h-[100%]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
              </div>
            ) : (
              <Table
                bordered
                columns={columns}
                dataSource={searchQuery !== "" ? searchResults : faqsList}
                onChange={onChange}
              />
            )}
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
          <AddFaqModal
            onCancel={handleCancel}
            buttonType={buttonType}
            clickedFaqData={clickedFaqData}
            fetchFaqLists={fetchFaqLists}
          />
        </div>
      </Modal>
    </DefaultLayout>
  );
}
