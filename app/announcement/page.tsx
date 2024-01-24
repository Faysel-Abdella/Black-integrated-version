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
  const [buttonType, setButtonType] = useState("");

  const [noticesAllDataList, setNoticesAllDataList] = useState([]);
  const [noticesList, setNoticesList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  // Search functionality states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // Updating notice data
  const [clickedNoticeData, setClickedNoticeData] = useState([]);

  const [total, setTotal] = useState(0);

  const [showNotFound, setShowNotFound] = useState(false);

  // Filtering states

  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDataFilter, setEndDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [latestFiltersResult, setLatestFiltersResult] = useState([]);

  const [isDateFilteringAllowed, setIsDateFilteringAllowed] = useState(false);

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
        id: notice.id,
        content: notice.content,
        files: notice.files,
        // non included in tables values
        startDateTime: new Date(notice.startDateTime)
          .toISOString()
          .split("T")[0],
        endDateTime: new Date(notice.endDateTime).toISOString().split("T")[0],
      })
    );

    setNoticesList(transformedNoticesList);
    setTotal(transformedNoticesList.length);
    setNoticesAllDataList(noticesData);
    setIsFetching(false);
  };

  const handleClickNotice = (data: any) => {
    const thisNoticeData: any = noticesAllDataList.filter(
      (notice: any) => notice.id.toString() == data.id.toString()
    );

    setClickedNoticeData(thisNoticeData);
    setButtonType("modification");
    showModal();
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  // ############ Filtering operations ###########

  const onChangeStartDate = (date: any, dateString: any) => {
    setStartDateFilter(dateString);
    setShowNotFound(false);

    let filterResult: any = [];
    if (dateString) {
      const standardStartDate = new Date(dateString);
      if (!endDataFilter) {
        console.log(statusFilter);
        // If the end date is not specified filter all dates greater than or equal start date

        filterResult = noticesList.filter(
          (list: any) => new Date(list.startDateTime) >= standardStartDate
        );

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (statusFilter != "" && statusFilter != "all") {
          filterResult = filterResult.filter(
            (list: any) => list.status == statusFilter
          );
        }

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        setLatestFiltersResult(filterResult);
      } else {
        // If the end date is  specified filter all dates greater than or equal start date and less than or equal to end date

        filterResult = noticesList.filter(
          (list: any) =>
            new Date(list.startDateTime) >= standardStartDate &&
            new Date(list.endDateTime) <= new Date(endDataFilter)
        );

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (statusFilter != "" && statusFilter != "all") {
          filterResult = filterResult.filter(
            (list: any) => list.status == statusFilter
          );
        }

        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        setLatestFiltersResult(filterResult);
      }
    } else {
      let filterResult: any = [];
      if (statusFilter != "" && statusFilter != "all") {
        filterResult = noticesList.filter(
          (list: any) => list.status == statusFilter
        );
        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (filterResult.length == 0) {
            return setShowNotFound(true);
          }
        }
      } else {
        if (searchQuery) {
          filterResult = noticesList.filter((member: any) =>
            member.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (filterResult.length == 0) {
            return setShowNotFound(true);
          }
        }
      }

      setLatestFiltersResult(filterResult);
    }
  };

  const onChangeEndDate = (date: any, dateString: any) => {
    setEndDateFilter(dateString);
    setShowNotFound(false);

    if (dateString) {
      const standardEndDate = new Date(dateString);
      let filterResult: any = [];

      if (startDateFilter) {
        const standardStartDate = new Date(startDateFilter);
        filterResult = noticesList.filter(
          (list: any) =>
            new Date(list.startDateTime) >= standardStartDate &&
            new Date(list.endDateTime) <= standardEndDate
        );

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (statusFilter != "" && statusFilter != "all") {
          filterResult = filterResult.filter(
            (list: any) => list.status == statusFilter
          );
        }

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        setLatestFiltersResult(filterResult);
      }
    } else {
      let filterResult: any = [];
      if (startDateFilter) {
        filterResult = noticesList.filter(
          (list: any) =>
            new Date(list.startDateTime) >= new Date(startDateFilter)
        );

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
        if (statusFilter != "" && statusFilter != "all") {
          filterResult = filterResult.filter(
            (list: any) => list.status == statusFilter
          );
        }

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
      }
      if (statusFilter != "" && statusFilter != "all") {
        filterResult = noticesList.filter(
          (list: any) => list.status == statusFilter
        );
        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
      }
      setLatestFiltersResult(filterResult);
    }
  };

  const handleAllowDateFiltering = (event: any) => {
    const selectedValue = event.target.value;
    if (selectedValue === "all") {
      setIsDateFilteringAllowed(false);
    } else {
      setIsDateFilteringAllowed(true);
    }
  };

  const handleStatusFiltering = (event: any) => {
    const selectedValue = event.target.value;
    setStatusFilter(selectedValue);
    setShowNotFound(false);

    console.log(searchQuery);

    const filterFrom = noticesList;

    // let filterResult: any = [];
    let filterResult: any = [];
    console.log(selectedValue);

    if (selectedValue !== "all") {
      filterResult = filterFrom.filter(
        (list: any) => list.status == selectedValue
      );

      if (startDateFilter && endDataFilter) {
        filterResult = filterResult.filter(
          (list: any) =>
            new Date(list.startDateTime) >= new Date(startDateFilter) &&
            new Date(list.endDateTime) <= new Date(endDataFilter)
        );
      } else if (startDateFilter) {
        filterResult = filterResult.filter(
          (list: any) =>
            new Date(list.startDateTime) >= new Date(startDateFilter)
        );
      }
      if (searchQuery) {
        filterResult = filterResult.filter((member: any) =>
          member.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      console.log(filterResult);
      if (filterResult.length == 0) {
        return setShowNotFound(true);
      }
      setLatestFiltersResult(filterResult);
    } else {
      if (startDateFilter && endDataFilter) {
        filterResult = noticesList.filter(
          (list: any) =>
            new Date(list.startDateTime) >= new Date(startDateFilter) &&
            new Date(list.endDateTime) <= new Date(endDataFilter)
        );
        if (filterResult.length == 0 && !searchQuery) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        if (filterResult.length == 0 && searchQuery) {
          return setShowNotFound(true);
        }
      } else if (startDateFilter) {
        console.log(startDateFilter);
        console.log(searchQuery);
        filterResult = noticesList.filter(
          (list: any) => new Date(list.joinDate) >= new Date(startDateFilter)
        );
        if (filterResult.length == 0 && searchQuery) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        if (filterResult.length == 0 && searchQuery) {
          return setShowNotFound(true);
        }
        console.log(filterResult);
      } else {
        if (searchQuery) {
          filterResult = noticesList.filter((member: any) =>
            member.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (filterResult.length == 0 && searchQuery) {
            return setShowNotFound(true);
          }
        }
      }

      setLatestFiltersResult(filterResult);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setShowNotFound(false);

    let filterResult: any = [];

    filterResult = noticesList.filter((member: any) =>
      member.title.toLowerCase().includes(value.toLowerCase())
    );

    if (filterResult.length == 0) {
      return setShowNotFound(true);
    }

    if (statusFilter != "" && statusFilter != "all") {
      filterResult = filterResult.filter(
        (list: any) => list.status == statusFilter
      );
    }

    if (filterResult.length == 0) {
      return setShowNotFound(true);
    }

    if (startDateFilter && endDataFilter) {
      filterResult = filterResult.filter(
        (list: any) =>
          new Date(list.startDateTime) >= new Date(startDateFilter) &&
          new Date(list.endDateTime) <= new Date(endDataFilter)
      );
    } else if (startDateFilter) {
      filterResult = filterResult.filter(
        (list: any) => new Date(list.joinDate) >= new Date(startDateFilter)
      );
    }

    if (filterResult.length == 0) {
      return setShowNotFound(true);
    }

    setLatestFiltersResult(filterResult);
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
      render: (value, record, index) => (
        <a onClick={() => handleClickNotice(record)}>{value}</a>
      ),
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

  // ################ DONE /완전한 ############## //
  // ***** You need to use a text editor. *****

  // faysel4:

  // GET /api/v1/admins/post/notices
  // "This is the API for fetching the list of announcements.
  // You need to retrieve the data and insert it into the Table tag.
  // Pagination should be implemented if there is a large amount of data.
  // As you can see at the top of the page, the posts in the list should be searchable based on the date, status, and search terms."

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
            <Radio.Group
              name="radiogroup"
              onChange={handleAllowDateFiltering}
              defaultValue="all"
            >
              <Radio value="all">전체</Radio>
              <Radio value="custom">설정</Radio>
            </Radio.Group>
            <Space className="date-range" size="small">
              <DatePicker
                className="h-[41px] border-none"
                onChange={onChangeStartDate}
                disabled={!isDateFilteringAllowed}
              />
              <p className="m-0">~</p>
              <DatePicker
                className="h-[41px] border-none"
                onChange={onChangeEndDate}
                disabled={!isDateFilteringAllowed}
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
              <Radio.Group
                name="radiogroup"
                defaultValue="all"
                onChange={handleStatusFiltering}
              >
                <Radio value="all">전체</Radio>
                <Radio value="PROGRESS">진행</Radio>
                <Radio value="COMPLETED">종료</Radio>
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
            ) : showNotFound ? (
              <div className="flex justify-center items-center">
                <h2 className="text-center font-semibold text-[26px] ">
                  Not Found
                </h2>
              </div>
            ) : (
              <Table
                bordered
                columns={columns}
                dataSource={
                  latestFiltersResult.length > 0
                    ? latestFiltersResult
                    : noticesList
                }
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
          <PrivacyEditor
            usedOnPage="announcement"
            extraFilter={extraFilter}
            buttonType={buttonType}
            clickedData={clickedNoticeData}
            fetchDataLists={fetchNoticesLists}
            handleCancel={handleCancel}
            isFetching={isFetching}
          />
        </div>
      </Modal>
    </DefaultLayout>
  );
}
