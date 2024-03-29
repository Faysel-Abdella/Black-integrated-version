"use client";
import React, { useState, useEffect } from "react";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import RegistrationModal from "../../components/RegistrationModal";
import HistoryModal from "../../components/HistoryModal";
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
  approvalDate: string;
  situation: string;
  registrationId: string;
  consumerName: string;
  consumerNumber: string;
  consumerDOB: string;
  cumulativeViews: number;
  manager: string;
};

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("registration");
  const [changingState, setChangingState] = useState(false);

  const [isForRegister, setIsForRegister] = useState(false);
  const [blacksAllDataList, setBlacksAllDataList] = useState([]);
  const [blacksList, setBlacksList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  // Search functionality states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // Updating admin data
  const [clickedBlackListData, setClickedBlackListData] = useState([]);

  const [total, setTotal] = useState(0);

  // Filtering states

  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDataFilter, setEndDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [latestFiltersResult, setLatestFiltersResult] = useState([]);

  const [isDateFilteringAllowed, setIsDateFilteringAllowed] = useState(false);

  const [showNotFound, setShowNotFound] = useState(false);

  const fetchBlackLists = async () => {
    setIsFetching(true);
    const accessToken = localStorage.getItem("accessToken");
    const blacksList = await customFetch.get("/api/v1/admins/blacks", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const blacksData = blacksList.data.data;

    const transformedBlacksList = blacksData.map(
      (admin: any, index: number) => ({
        key: index + 1 < 9 ? `0${index + 1}` : `${index + 1}`,
        approvalDate: new Date(admin.approvedDate).toISOString().split("T")[0],
        situation: admin.status,
        registrationId: admin.id,
        consumerName: admin.name,
        consumerNumber: admin.phone,
        consumerDOB: admin.birth,
        cumulativeViews: admin.viewCount,
        manager: admin.approvedName,
        id: admin.id,
        damageContent: admin.damageContent,
        damageType: admin.damageType.name,
        damageDate: admin.damageDate,
      })
    );

    setBlacksList(transformedBlacksList);
    setBlacksAllDataList(blacksData);
    setTotal(transformedBlacksList.length);

    setIsFetching(false);
  };

  useEffect(() => {
    try {
      fetchBlackLists();
    } catch (error) {
      console.log("Error when fetching admins list", error);
    }
  }, []);

  const handleClickAdmin = (data: any) => {
    const thisBlackListData: any = blacksList.filter(
      (admin: any) => admin.id.toString() == data.registrationId.toString()
    );

    setClickedBlackListData(thisBlackListData);
    setIsForRegister(false);
    showModal("registration");
  };

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

  // ############ Filtering operations ###########

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

        filterResult = blacksList.filter(
          (list: any) => new Date(list.approvalDate) >= standardStartDate
        );

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (statusFilter != "" && statusFilter != "all") {
          filterResult = filterResult.filter(
            (list: any) => list.situation == statusFilter
          );
        }

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.consumerName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
        }

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        setLatestFiltersResult(filterResult);
      } else {
        // If the end date is  specified filter all dates greater than or equal start date and less than or equal to end date

        filterResult = blacksList.filter(
          (list: any) =>
            new Date(list.approvalDate) >= standardStartDate &&
            new Date(list.approvalDate) <= new Date(endDataFilter)
        );

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (statusFilter != "" && statusFilter != "all") {
          filterResult = filterResult.filter(
            (list: any) => list.situation == statusFilter
          );
        }

        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.consumerName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
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
        filterResult = blacksList.filter(
          (list: any) => list.situation == statusFilter
        );
        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.consumerName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          if (filterResult.length == 0) {
            return setShowNotFound(true);
          }
        }
      } else {
        if (searchQuery) {
          filterResult = blacksList.filter((member: any) =>
            member.consumerName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
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
        filterResult = blacksList.filter(
          (list: any) =>
            new Date(list.approvalDate) >= standardStartDate &&
            new Date(list.approvalDate) <= standardEndDate
        );

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (statusFilter != "" && statusFilter != "all") {
          filterResult = filterResult.filter(
            (list: any) => list.situation == statusFilter
          );
        }

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.consumerName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
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
        filterResult = blacksList.filter(
          (list: any) =>
            new Date(list.approvalDate) >= new Date(startDateFilter)
        );

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
        if (statusFilter != "" && statusFilter != "all") {
          filterResult = filterResult.filter(
            (list: any) => list.situation == statusFilter
          );
        }

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.consumerName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
        }
        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
      }
      if (statusFilter != "" && statusFilter != "all") {
        filterResult = blacksList.filter(
          (list: any) => list.situation == statusFilter
        );
        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.consumerName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
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

    const filterFrom = blacksList;

    // let filterResult: any = [];
    let filterResult: any = [];

    if (selectedValue !== "all") {
      filterResult = filterFrom.filter(
        (list: any) => list.situation == selectedValue
      );
      if (startDateFilter && endDataFilter) {
        filterResult = filterResult.filter(
          (list: any) =>
            new Date(list.approvalDate) >= new Date(startDateFilter) &&
            new Date(list.approvalDate) <= new Date(endDataFilter)
        );
      } else if (startDateFilter) {
        filterResult = filterResult.filter(
          (list: any) =>
            new Date(list.approvalDate) >= new Date(startDateFilter)
        );
      }
      if (searchQuery) {
        filterResult = filterResult.filter((member: any) =>
          member.consumerName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (filterResult.length == 0) {
        return setShowNotFound(true);
      }
      setLatestFiltersResult(filterResult);
    } else {
      if (startDateFilter && endDataFilter) {
        filterResult = blacksList.filter(
          (list: any) =>
            new Date(list.approvalDate) >= new Date(startDateFilter) &&
            new Date(list.approvalDate) <= new Date(endDataFilter)
        );
        if (filterResult.length == 0 && !searchQuery) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.consumerName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
        }
        if (filterResult.length == 0 && searchQuery) {
          return setShowNotFound(true);
        }
      } else if (startDateFilter) {
        console.log(startDateFilter);
        console.log(searchQuery);
        filterResult = blacksList.filter(
          (list: any) =>
            new Date(list.approvalDate) >= new Date(startDateFilter)
        );
        if (filterResult.length == 0 && searchQuery) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.consumerName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
        }
        if (filterResult.length == 0 && searchQuery) {
          return setShowNotFound(true);
        }
        console.log(filterResult);
      } else {
        if (searchQuery) {
          filterResult = blacksList.filter((member: any) =>
            member.consumerName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
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

    filterResult = blacksList.filter((member: any) =>
      member.consumerName.toLowerCase().includes(value.toLowerCase())
    );

    if (filterResult.length == 0) {
      return setShowNotFound(true);
    }

    if (statusFilter != "" && statusFilter != "all") {
      filterResult = filterResult.filter(
        (list: any) => list.situation == statusFilter
      );
    }

    if (filterResult.length == 0) {
      return setShowNotFound(true);
    }

    if (startDateFilter && endDataFilter) {
      filterResult = filterResult.filter(
        (list: any) =>
          new Date(list.approvalDate) >= new Date(startDateFilter) &&
          new Date(list.approvalDate) <= new Date(endDataFilter)
      );
    } else if (startDateFilter) {
      filterResult = filterResult.filter(
        (list: any) => new Date(list.approvalDate) >= new Date(startDateFilter)
      );
    }

    if (filterResult.length == 0) {
      return setShowNotFound(true);
    }

    setLatestFiltersResult(filterResult);
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
      title: "승인일",
      dataIndex: "approvalDate",
    },
    {
      title: "상태",
      dataIndex: "situation",
    },
    {
      title: "등록자 ID",
      dataIndex: "registrationId",
    },
    {
      title: "블랙컨슈머 이름",
      dataIndex: "consumerName",
    },
    {
      title: "블랙컨슈머 번호",
      dataIndex: "consumerNumber",
    },
    {
      title: "블랙컨슈머 생년월일",
      dataIndex: "consumerDOB",
    },
    {
      title: "누적 조회 수",
      dataIndex: "views",
      render(value, record, index) {
        return (
          <span>{record.cumulativeViews.toString().padStart(2, "0")}</span>
        );
      },
    },
    {
      title: "상세보기",
      dataIndex: "viewDetails",
      render(value, record, index) {
        return (
          <button
            onClick={() => {
              handleClickAdmin(record);
            }}
            className="rounded-full text-sm leading-[18px] bg-[#A3A6AB] px-[14px] py-[7px] text-white"
          >
            상세보기
          </button>
        );
      },
    },
    {
      title: "관리자",
      dataIndex: "manager",
    },
  ];

  const tableData: TableData[] = [
    {
      key: 1, // YES
      approvalDate: "2023-08-05", // YES (approvedDate)
      situation: "노출", // YES (postStatus)
      registrationId: "Fdpd100", // YES
      consumerName: "이중재", // YES
      consumerNumber: "010-4012-1146", // YES
      consumerDOB: "901024", // YES
      cumulativeViews: 32, // YES (viewCount)
      manager: "이중재", // YES (approvedBy)
    },
    {
      key: 2,
      approvalDate: "2023-08-05",
      situation: "노출",
      registrationId: "Fdpd100",
      consumerName: "이중재",
      consumerNumber: "010-4012-1146",
      consumerDOB: "901024",
      cumulativeViews: 32,
      manager: "이중재",
    },
    {
      key: 3,
      approvalDate: "2023-08-05",
      situation: "노출",
      registrationId: "Fdpd100",
      consumerName: "이중재",
      consumerNumber: "010-4012-1146",
      consumerDOB: "901024",
      cumulativeViews: 32,
      manager: "이중재",
    },
    {
      key: 4,
      approvalDate: "2023-08-05",
      situation: "노출",
      registrationId: "Fdpd100",
      consumerName: "이중재",
      consumerNumber: "010-4012-1146",
      consumerDOB: "901024",
      cumulativeViews: 32,
      manager: "이중재",
    },
    {
      key: 5,
      approvalDate: "2023-08-05",
      situation: "노출",
      registrationId: "Fdpd100",
      consumerName: "이중재",
      consumerNumber: "010-4012-1146",
      consumerDOB: "901024",
      cumulativeViews: 32,
      manager: "이중재",
    },
  ];

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onChangeDate = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  // ################ DONE/완전한 -- Except the search by date  #############

  // faysel2:
  // This is the API for displaying the blacklist.
  // The Table tag must include data related to the blacklist.
  // If the blacklist grows, pagination should be implemented.
  // On this page's interface, there are options for date input, status setting, and search terms at the top, and these should be used to facilitate searching the list.
  // Similar to what you implemented on the account page, when lines 93 and 103 are clicked, the data for the respective member from /api/v1/admins/blacks should be passed to the modal, and the inputs inside the modal should be filled with the appropriate data.
  // For more details, please refer to the Swagger documentation and ask Jin if you have any questions. Thank you.
  // GET /api/v1/admins/blacks

  // "When this button is clicked,
  //   <Button
  //   style={{ padding: 0, width: 144, height: 61, fontWeight: 400 }}
  //   type="primary"
  //   shape="round"
  //   onClick={() => showModal("registration")}
  //   >
  //   Register
  //   </Button>
  //   it will open a modal for registering a new black consumer.
  //   You should be able to register a new black consumer through this modal.
  //   The corresponding API for this is POST /api/v1/admins/blacks.
  //  Please check the parameters of the API in the Swagger documentation. Thank you."

  // ################ DONE/완전한  ###################
  // faysel5:
  // PATCH /api/v1/admins/blacks/{id}
  // Additionally, it should be possible to modify the information of the corresponding black consumer.

  return (
    <DefaultLayout>
      <Row justify="space-between" align="middle" className="mb-[21px]">
        <Col md={10}>
          <Space
            className="filter-section rounded-full bg-white w-[541px] h-[61px] pl-[42px]"
            size="middle"
          >
            <label htmlFor="#" className="font-black">
              승인일
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
      <Row justify="space-between" align="middle" className="mb-[57px]">
        <Col md={16}>
          <Space size="middle">
            <Space
              className="filter-section rounded-full bg-white pl-[42px] py-0 w-[354px] h-[61px]"
              size={15}
            >
              <label htmlFor="#" className="font-black">
                상태
              </label>
              <Radio.Group
                name="radiogroup"
                defaultValue="all"
                onChange={handleStatusFiltering}
              >
                <Radio value="all">전체</Radio>
                {/* <Radio value={2}>설정</Radio> */}
                <Radio value="APPROVED">노출된</Radio>
                <Radio value="INVISIBLE">미노출</Radio>
              </Radio.Group>
            </Space>
            <Space
              className="filter-section rounded-full bg-white pl-[42px] pr-[20px] py-3.5 h-[61px]"
              size="middle"
            >
              <label htmlFor="#" className="font-black">
                검색어
              </label>
              <Select
                defaultValue="lucy"
                style={{ width: 110 }}
                options={[
                  { value: "jack", label: "ID" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
              <Search
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="검색어를 입력해주세요"
                style={{ width: 258 }}
                className="custom-search-icon"
              />
            </Space>
          </Space>
        </Col>
        <Col>
          <Space size="middle">
            <Button
              style={{ padding: 0, width: 144, height: 61, fontWeight: 400 }}
              shape="round"
              className="ant-btn ant-btn-white"
              onClick={() => showModal("history")}
            >
              유형관리
            </Button>
            <Button
              style={{ padding: 0, width: 144, height: 61, fontWeight: 400 }}
              type="primary"
              shape="round"
              onClick={() => {
                setChangingState((prev: boolean) => !prev);
                setIsForRegister(true);
                showModal("registration");
              }}
            >
              등록
            </Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={[54, 40]}>
        <Col span={24}>
          <Card title="" bodyStyle={{ padding: "75px 85px 40px 85px" }}>
            <div className="card-heading">
              <h2 style={{ fontWeight: 400 }}>
                <strong style={{ fontWeight: 600 }}>{total}건</strong>의
                게시물이 검색되었습니다
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
                columns={tableColumns}
                dataSource={
                  latestFiltersResult.length > 0
                    ? latestFiltersResult
                    : blacksList
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
        width={modalType === "registration" ? 753 : 596}
        className={
          modalType === "registration"
            ? "custom-mini-modal-register"
            : "custom-mini-modal-history"
        }
        centered
      >
        <div className="px-8">
          <Button
            className={`left-icon p-0 border-0 shadow-none text-left text-[30px] leading-none mt-[10px] ${
              modalType === "registration" ? "mb-[47px]" : "mb-[53px]"
            }`}
            onClick={handleCancel}
          >
            <img src="/assets/images/backIcon.png" />
          </Button>
          {modalType === "registration" ? (
            <RegistrationModal
              onCancel={handleCancel}
              clickedBlackListData={clickedBlackListData}
              fetchBlackLists={fetchBlackLists}
              isForRegister={isForRegister}
              changingState={changingState}
            />
          ) : (
            <HistoryModal />
          )}
        </div>
      </Modal>
    </DefaultLayout>
  );
}
