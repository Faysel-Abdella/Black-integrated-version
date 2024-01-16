"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import PrivacyEditor from "../../components/PrivacyEditor";
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
import customFetch from "@/utils/customFetch";

const { Search } = Input;

type TableData = {
  key: any;
  exposeDate: string;
  title: string;
  status: string;
  clickNum: number;
  registerDate: string;
  admin: string;
};

export default function Announcement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [extraFilter, setExtraFilter] = useState(true);

  const [noticesAllDataList, setNoticesAllDataList] = useState([]);
  const [noticesList, setNoticesList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  // Search functionality states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // Updating notice data
  const [clickedNoticeData, setClickedNoticeData] = useState([]);

  const fetchNoticesLists = async () => {
    setIsFetching(true);
    const accessToken = localStorage.getItem("accessToken");
    const noticesList = await customFetch.get("/api/v1/admins/post/notices", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const noticesData = noticesList.data.data;

    const transformedNoticesList = noticesData.map(
      (notice: any, index: number) => ({
        key: index + 1 < 9 ? `0${index + 1}` : `${index + 1}`,
        exposeDate: `${
          new Date(notice.startDateTime).toISOString().split("T")[0]
        } ~ ${new Date(notice.endDateTime).toISOString().split("T")[0]}`,
        title: notice.title,
        status: notice.status,
        clickNum: notice.clickCount,
        registerDate: new Date(notice.createdAt).toISOString().split("T")[0],
        admin: notice.authorName,
        // non-included in the table fields
        content: notice.content,
        file: notice.file,
      })
    );

    setNoticesList(transformedNoticesList);
    setNoticesAllDataList(noticesData);
    setIsFetching(false);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const filteredNotices = noticesList.filter((notice: any) =>
      notice.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredNotices);
  };

  const handleClickNotice = (data: any) => {
    const thisNoticeData: any = noticesAllDataList.filter(
      (notice: any) => notice.key.toString() == data.key.toString()
    );

    setClickedNoticeData(thisNoticeData);
  };

  useEffect(() => {
    try {
      fetchNoticesLists();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    },
    {
      title: "노출기간",
      dataIndex: "exposeDate",
    },
    {
      title: "제목",
      dataIndex: "title",
      render: (value, recode, index) => <a onClick={showModal}>{value}</a>,
    },
    {
      title: "상태",
      dataIndex: "status",
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
      exposeDate: "2023.08.23 ~ 2023.09.01", // YES
      title: "나노의 서재 이벤트", // YES
      status: "진행", // YES
      clickNum: 10, // YES
      registerDate: "2023.08.23", // YES
      admin: "이중재", // YES
    },
    {
      key: "2",
      exposeDate: "2023.07.23 ~ 2023.08.01",
      title: "마이크로의 서재 이벤트",
      status: "종료",
      clickNum: 5,
      registerDate: "2023.07.23",
      admin: "이중재",
    },
    {
      key: "3",
      exposeDate: "2023.07.01 ~ 2023.07.31",
      title: "7월 이벤트",
      status: "진행",
      clickNum: 30,
      registerDate: "2023.07.01",
      admin: "이중재",
    },
  ];
  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onChangeDate = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  // ***** You need to use a text editor. *****
  // ############################### In progress....  ##################
  // faysel4:

  // ############################### GET is done ##################
  // GET /api/v1/admins/post/notices
  // "This is the API for fetching the list of announcements.
  // You need to retrieve the data and insert it into the Table tag.
  // Pagination should be implemented if there is a large amount of data.
  // As you can see at the top of the page, the posts in the list should be searchable based on the date, status, and search terms."

  // ############################### In progress....  ##################
  // POST /api/v1/admins/post/notices
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
  //   onClick={showModal}
  //  >
  //  등록
  //  </Button>
  // When this button is pressed, it should be possible to register a new announcement.

  // ############################### In progress....  ##################
  // code line 57 ~ 59
  //
  //  {
  //   title: "제목",
  //   dataIndex: "title",
  //   render: (value, recode, index) => <a onClick={showModal}>{value}</a>,
  //  },
  // PATCH /api/v1/admins/post/notices/{id}
  // Just like with other lists, when you click on the title of a post, the information for that particular post should appear in a modal, allowing for modifications.

  // For more details, please refer to the Swagger documentation."

  return (
    <DefaultLayout>
      <Row justify="space-between" align="middle" className="mb-[21px]">
        <Col md={10}>
          <Space
            className="filter-section rounded-full pl-[42px] bg-white w-[541px] h-[61px]"
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
                <Radio value={2}>진행</Radio>
                <Radio value={3}>종료</Radio>
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
            onClick={showModal}
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
            {isFetching ? (
              <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
              </div>
            ) : (
              <Table
                bordered
                columns={columns}
                dataSource={searchQuery !== "" ? searchResults : noticesList}
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
        width={965}
        centered
      >
        <div className="px-8">
          <Button
            className="left-icon p-0 border-0 shadow-none text-left text-[30px] leading-none mb-[43px]"
            onClick={handleCancel}
          >
            <img src="/assets/images/backIcon.png" />
          </Button>
          <PrivacyEditor extraFilter={extraFilter} />
        </div>
      </Modal>
    </DefaultLayout>
  );
}
