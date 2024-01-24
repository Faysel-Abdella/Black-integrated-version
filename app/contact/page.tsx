"use client";
import React, { useEffect, useState } from "react";
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
import customFetch from "@/utils/customFetch";

const { Search } = Input;

export default function Contact() {
  const [queriesAllDataList, setQueriesAllDataList] = useState([]);
  const [queriesList, setQueriesList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  // Search functionality states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // Updating admin data
  const [clickedQueryData, setClickedQueryData] = useState([]);

  const [total, setTotal] = useState(0);

  // Filtering states

  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDataFilter, setEndDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [latestFiltersResult, setLatestFiltersResult] = useState([]);

  const [showNotFound, setShowNotFound] = useState(false);

  const [isDateFilteringAllowed, setIsDateFilteringAllowed] = useState(false);

  const fetchQueryLists = async () => {
    setIsFetching(true);
    const accessToken = localStorage.getItem("accessToken");
    const queriesList = await customFetch.get("/api/v1/admins/post/inquiries", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const queriesData = queriesList.data.data;

    const transformedQueriesList = queriesData.map(
      (query: any, index: number) => ({
        key: index + 1 < 9 ? `0${index + 1}` : `${index + 1}`,
        title: query.title ? query.title : "--",
        id: query.id,
        name: query.author.name,
        phone: query.phone,
        registrationDate: query.createdAt
          ? new Date(query.createdAt).toISOString().split("T")[0]
          : "-",
        admin: query.adminName ? query.adminName : "--",
        processingDate: query.processingDate
          ? new Date(query.completionDate).toISOString().split("T")[0]
          : "--",
        status: query.status,
        // fields that are not part of the table
        answerContent: query.answerContent ? query.answerContent : "-",
        email: query.email,
        authorEmail: query.author.email,
      })
    );

    setQueriesList(transformedQueriesList);
    setTotal(transformedQueriesList.length);
    setQueriesAllDataList(queriesData);
    setIsFetching(false);
  };

  const handleClickQuery = (data: any) => {
    const thisQueryData: any = queriesAllDataList.filter(
      (query: any) => query.id.toString() == data.id.toString()
    );

    setClickedQueryData(thisQueryData);
    showModal();
  };

  useEffect(() => {
    try {
      fetchQueryLists();
    } catch (error) {
      console.log(error);
    }
  }, []);

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

        filterResult = queriesList.filter(
          (list: any) => new Date(list.registrationDate) >= standardStartDate
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

        filterResult = queriesList.filter(
          (list: any) =>
            new Date(list.registrationDate) >= standardStartDate &&
            new Date(list.registrationDate) <= new Date(endDataFilter)
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
        filterResult = queriesList.filter(
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
          filterResult = queriesList.filter((member: any) =>
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
        filterResult = queriesList.filter(
          (list: any) =>
            new Date(list.registrationDate) >= standardStartDate &&
            new Date(list.registrationDate) <= standardEndDate
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
        filterResult = queriesList.filter(
          (list: any) =>
            new Date(list.registrationDate) >= new Date(startDateFilter)
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
        filterResult = queriesList.filter(
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

    const filterFrom = queriesList;

    // let filterResult: any = [];
    let filterResult: any = [];

    if (selectedValue !== "all") {
      filterResult = filterFrom.filter(
        (list: any) => list.status == selectedValue
      );
      if (startDateFilter && endDataFilter) {
        filterResult = filterResult.filter(
          (list: any) =>
            new Date(list.registrationDate) >= new Date(startDateFilter) &&
            new Date(list.registrationDate) <= new Date(endDataFilter)
        );
      } else if (startDateFilter) {
        filterResult = filterResult.filter(
          (list: any) =>
            new Date(list.registrationDate) >= new Date(startDateFilter)
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
    } else {
      if (startDateFilter && endDataFilter) {
        filterResult = queriesList.filter(
          (list: any) =>
            new Date(list.registrationDate) >= new Date(startDateFilter) &&
            new Date(list.registrationDate) <= new Date(endDataFilter)
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
        filterResult = queriesList.filter(
          (list: any) =>
            new Date(list.registrationDate) >= new Date(startDateFilter)
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
          filterResult = queriesList.filter((member: any) =>
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

    filterResult = queriesList.filter((member: any) =>
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
          new Date(list.registrationDate) >= new Date(startDateFilter) &&
          new Date(list.registrationDate) <= new Date(endDataFilter)
      );
    } else if (startDateFilter) {
      filterResult = filterResult.filter(
        (list: any) =>
          new Date(list.registrationDate) >= new Date(startDateFilter)
      );
    }

    if (filterResult.length == 0) {
      return setShowNotFound(true);
    }

    setLatestFiltersResult(filterResult);
  };

  const columns = [
    {
      title: "번호",
      dataIndex: "key",
    },
    {
      title: "제목",
      dataIndex: "title",
      render: (text: any, record: any) => (
        <a onClick={() => handleClickQuery(record)}>{record.title}</a>
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
      key: "1", // YES
      title: "인증번호 초과", // YES(title)
      id: "Fd123", // YES(id)
      name: "천지인", // YES (authorName)
      phone: "010-1234-1234", // YES(phone)
      registrationDate: "2023.08.21 14:11:21", // YES (createdAt)
      admin: "이중재", // YES (authorName)
      processingDate: "2023.08.23 14:11:21", // YES (completionDate)
      status: "답변완료", // YES (status)
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

  // ################ DONE / 완전한 ############## //

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

              <Radio.Group
                name="radiogroup"
                defaultValue="all"
                onChange={handleStatusFiltering}
              >
                <Radio value="all">전체</Radio>
                <Radio value="WAITING">대기</Radio>
                <Radio value="COMPLETED">답변완료</Radio>
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
      </Row>
      <Row gutter={[54, 40]}>
        <Col span={24}>
          <Card title="" bodyStyle={{ padding: "75px 84px 40px" }}>
            <div className="card-heading">
              <h2 style={{ fontWeight: 400 }}>
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
                    : queriesList
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
          <ContactModal
            onCancel={handleCancel}
            clickedQueryData={clickedQueryData}
            fetchQueryLists={fetchQueryLists}
          />
        </div>
      </Modal>
    </DefaultLayout>
  );
}
