"use client";
import React, { useState, useEffect } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

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

import moment from "moment";
import ExcelModal from "@/components/ExcelModal";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import MembershipModal from "../../components/MembershipModal";
import customFetch from "@/utils/customFetch";

const { Search } = Input;

type TableData = {
  key: any;
  id: string;
  name: string;
  phoneNumber: string;
  joinDate: string;
  accountStatus: string;
  subscriptionType: string;
  views: number;
  numOfRegistrations: number;
};

export default function Membership() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("user");

  const [membersAllDataList, setMembersAllDataList] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  // Search functionality states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDataFilter, setEndDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [latestFiltersResult, setLatestFiltersResult] = useState([]);

  const [showNotFound, setShowNotFound] = useState(false);

  const [isDateFilteringAllowed, setIsDateFilteringAllowed] = useState(false);

  // Updating admin data
  const [clickedMemberData, setClickedMemberData] = useState([]);

  const [total, setTotal] = useState(0);

  const fetchMembersLists = async () => {
    setIsFetching(true);
    const accessToken = localStorage.getItem("accessToken");
    const membersList = await customFetch.get("/api/v1/admins/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const membersData = membersList.data.data;

    const transformedMembersList = membersData.map(
      (member: any, index: number) => ({
        key: index + 1 < 9 ? `0${index + 1}` : `${index + 1}`,
        id: member.id,
        name: member.name,
        phoneNumber: member.phone,
        joinDate: new Date(member.createdAt).toISOString().split("T")[0],
        accountStatus: member.isActive.toString(),
        subscriptionType: "아이디",
        views: member.blacksViewCount,
        numOfRegistrations: membersData.length,
        // non-include in table fields
        email: member.email,
        loginId: member.loginId,
        gosiwonName: member.gosiwonName,
        gosiwonAddress: member.gosiwonAddress,
        releaseReason: member.releaseReason ? member.releaseReason : "---",
        lastLoginDate: member.lastLoginDate
          ? new Date(member.lastLoginDate).toISOString().split("T")[0]
          : "---",
        blacks: member.blacks ? member.blacks : "---",
      })
    );

    setMembersList(transformedMembersList);
    setTotal(transformedMembersList.length);
    setMembersAllDataList(membersData);
    setIsFetching(false);
  };

  useEffect(() => {
    try {
      fetchMembersLists();
    } catch (error) {
      console.log("Error when fetching admins list", error);
    }
  }, []);

  const handleClickMember = (data: any) => {
    const thisMemberData: any = membersList.filter(
      (member: any) => member.id.toString() == data.id.toString()
    );

    setClickedMemberData(thisMemberData);
    showModal("user");
  };

  const onChangeDateSearch = (date: any) => {
    console.log(date);
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

  const closeParentModal = () => {
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

        filterResult = membersList.filter(
          (list: any) => new Date(list.joinDate) >= standardStartDate
        );

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (statusFilter != "" && statusFilter != "all") {
          filterResult = filterResult.filter(
            (list: any) => list.accountStatus == statusFilter
          );
        }

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        setLatestFiltersResult(filterResult);
      } else {
        // If the end date is  specified filter all dates greater than or equal start date and less than or equal to end date

        filterResult = membersList.filter(
          (list: any) =>
            new Date(list.joinDate) >= standardStartDate &&
            new Date(list.joinDate) <= new Date(endDataFilter)
        );

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (statusFilter != "" && statusFilter != "all") {
          filterResult = filterResult.filter(
            (list: any) => list.accountStatus == statusFilter
          );
        }

        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        filterResult = membersList.filter(
          (list: any) => list.accountStatus == statusFilter
        );
        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (filterResult.length == 0) {
            return setShowNotFound(true);
          }
        }
      } else {
        if (searchQuery) {
          filterResult = membersList.filter((member: any) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        filterResult = membersList.filter(
          (list: any) =>
            new Date(list.joinDate) >= standardStartDate &&
            new Date(list.joinDate) <= standardEndDate
        );

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (statusFilter != "" && statusFilter != "all") {
          filterResult = filterResult.filter(
            (list: any) => list.accountStatus == statusFilter
          );
        }

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }

        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        filterResult = membersList.filter(
          (list: any) => new Date(list.joinDate) >= new Date(startDateFilter)
        );

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
        if (statusFilter != "" && statusFilter != "all") {
          filterResult = filterResult.filter(
            (list: any) => list.accountStatus == statusFilter
          );
        }

        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
      }
      if (statusFilter != "" && statusFilter != "all") {
        filterResult = membersList.filter(
          (list: any) => list.accountStatus == statusFilter
        );
        if (filterResult.length == 0) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
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

    const filterFrom = membersList;

    // let filterResult: any = [];
    let filterResult: any = [];

    if (selectedValue !== "all") {
      filterResult = filterFrom.filter(
        (list: any) => list.accountStatus == selectedValue
      );
      if (startDateFilter && endDataFilter) {
        filterResult = filterResult.filter(
          (list: any) =>
            new Date(list.joinDate) >= new Date(startDateFilter) &&
            new Date(list.joinDate) <= new Date(endDataFilter)
        );
      } else if (startDateFilter) {
        filterResult = filterResult.filter(
          (list: any) => new Date(list.joinDate) >= new Date(startDateFilter)
        );
      }
      if (searchQuery) {
        filterResult = filterResult.filter((member: any) =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (filterResult.length == 0) {
        return setShowNotFound(true);
      }
      setLatestFiltersResult(filterResult);
    } else {
      if (startDateFilter && endDataFilter) {
        filterResult = membersList.filter(
          (list: any) =>
            new Date(list.joinDate) >= new Date(startDateFilter) &&
            new Date(list.joinDate) <= new Date(endDataFilter)
        );
        if (filterResult.length == 0 && !searchQuery) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        if (filterResult.length == 0 && searchQuery) {
          return setShowNotFound(true);
        }
      } else if (startDateFilter) {
        console.log(startDateFilter);
        console.log(searchQuery);
        filterResult = membersList.filter(
          (list: any) => new Date(list.joinDate) >= new Date(startDateFilter)
        );
        if (filterResult.length == 0 && searchQuery) {
          return setShowNotFound(true);
        }
        if (searchQuery) {
          filterResult = filterResult.filter((member: any) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        if (filterResult.length == 0 && searchQuery) {
          return setShowNotFound(true);
        }
        console.log(filterResult);
      } else {
        if (searchQuery) {
          filterResult = membersList.filter((member: any) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
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

    filterResult = membersList.filter((member: any) =>
      member.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filterResult.length == 0) {
      return setShowNotFound(true);
    }

    if (statusFilter != "" && statusFilter != "all") {
      filterResult = filterResult.filter(
        (list: any) => list.accountStatus == statusFilter
      );
    }

    if (filterResult.length == 0) {
      return setShowNotFound(true);
    }

    if (startDateFilter && endDataFilter) {
      filterResult = filterResult.filter(
        (list: any) =>
          new Date(list.joinDate) >= new Date(startDateFilter) &&
          new Date(list.joinDate) <= new Date(endDataFilter)
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
          <span
            onClick={() => handleClickMember(record)}
            className="text-[#28A7E1] underline-offset-2 underline cursor-pointer"
          >
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
      title: "가입일",
      dataIndex: "joinDate",
    },
    {
      title: "계정상태",
      dataIndex: "accountStatus",
    },
    {
      title: "가입유형",
      dataIndex: "subscriptionType",
    },
    {
      title: "조회수",
      dataIndex: "views",
      render(value, record, index) {
        return <span>{record.views.toString().padStart(2, "0")}</span>;
      },
    },
    {
      title: "등록수",
      dataIndex: "numOfRegistrations",
      render(value, record, index) {
        return (
          <span>{record.numOfRegistrations.toString().padStart(2, "0")}</span>
        );
      },
    },
  ];

  const tableData: TableData[] = [
    {
      key: 1, // YES
      id: "Fdpd100", // YES
      name: "이중재", // YES
      phoneNumber: "010-0416-3114", // YES
      joinDate: "2023-01-08", // YES (Created at)
      accountStatus: "정상", // YES
      subscriptionType: "아이디", // YES (This is fixed)
      views: 32, // YES
      numOfRegistrations: 32, // YES (blacks.length (data.length))
    },
    {
      key: 2,
      id: "Fdpd100",
      name: "이중재",
      phoneNumber: "010-0416-3114",
      joinDate: "2023-01-08",
      accountStatus: "정상",
      subscriptionType: "아이디",
      views: 32,
      numOfRegistrations: 32,
    },
    {
      key: 3,
      id: "Fdpd100",
      name: "이중재",
      phoneNumber: "010-0416-3114",
      joinDate: "2023-01-08",
      accountStatus: "정상",
      subscriptionType: "아이디",
      views: 32,
      numOfRegistrations: 32,
    },
    {
      key: 4,
      id: "Fdpd100",
      name: "이중재",
      phoneNumber: "010-0416-3114",
      joinDate: "2023-01-08",
      accountStatus: "정상",
      subscriptionType: "아이디",
      views: 32,
      numOfRegistrations: 32,
    },
    {
      key: 5,
      id: "Fdpd100",
      name: "이중재",
      phoneNumber: "010-0416-3114",
      joinDate: "2023-01-08",
      accountStatus: "정상",
      subscriptionType: "아이디",
      views: 32,
      numOfRegistrations: 32,
    },
  ];

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const search = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  // ################ DONE/완전한 -- Except the search by date  #############

  // * Jin is preparing the data.
  // faysel:
  // "This is the API for displaying the list of members.
  // The Table tag needs to contain data about the member list.
  // If there is a large amount of data in the member list, pagination should be implemented.

  // Below code, lines 250 to 320.
  //   <Radio.Group name="radiogroup" defaultValue={1}>
  //   <Radio value={1}>All</Radio>
  //   <Radio value={2}>Set</Radio>
  //   </Radio.Group>

  //   <Space className="date-range" size="small">
  //   <DatePicker
  //     className="h-[41px] border-none"
  //     onChange={onChangeDate}
  //   />
  //   <p className="m-0">~</p>
  //   <DatePicker
  //     className="h-[41px] border-none"
  //     onChange={onChangeDate}
  //   />
  //  </Space>

  //   <Space
  //   className="filter-section rounded-full bg-white pl-[42px] py-0 w-[354px] h-[61px]"
  //   size="middle"
  // >
  //   <label htmlFor="#" className="font-black">
  //     Account Status
  //   </label>
  //   <Radio.Group name="radiogroup" defaultValue={1}>
  //     <Radio value={1}>All</Radio>
  //     <Radio value={2}>Set</Radio>
  //     <Radio value={3}>Suspended</Radio>
  //   </Radio.Group>
  //  </Space>

  //   <Space
  //   className="filter-section rounded-full bg-white pl-[42px] pr-[20px] py-3.5 h-[61px]"
  //   size="middle"
  // >
  //   <label htmlFor="#" className="font-black">
  //     Search Term
  //   </label>
  //   <Select
  //     defaultValue="lucy"
  //     style={{ width: 110, fontSize: 14 }}
  //     options={[
  //       { value: "jack", label: "ID" },
  //       { value: "lucy", label: "Lucy" },
  //       { value: "Yiminghe", label: "yiminghe" },
  //       { value: "disabled", label: "Disabled", disabled: true },
  //     ]}
  //   />
  //   <Search
  //     placeholder="Please enter a search term"
  //     style={{ width: 258 }}
  //     className="custom-search-icon"
  //   />
  //  </Space>

  // These options, such as date, ID, etc., must allow for searchable listings.
  // For more details, please refer to the Swagger documentation."
  // GET /api/v1/admins/users

  // "When a member's ID is clicked in the code lines 65 to 71,
  // a modal displaying the member's information should open.
  // In this modal, the information of the clicked member needs to be displayed by passing it through. Additionally, within this modal, there should be the capability to modify the information of the selected member."

  return (
    <DefaultLayout>
      <Row justify="space-between" align="middle" className="mb-[21px]">
        <Col md={10}>
          <Space
            className="filter-section rounded-full bg-white  w-[541px] h-[61px] pl-[42px]"
            size="middle"
          >
            <label htmlFor="#" className="font-black">
              가입일자
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
        <Col>
          <Button
            type="primary"
            shape="round"
            className="text-[14px] w-[144px] h-[61px] font-bold"
            onClick={() => showModal("excel")}
          >
            Excel 다운로드
          </Button>
        </Col>
      </Row>
      <Row justify="space-between" align="middle" className="mb-[57px]">
        <Col md={16}>
          <Space size="middle">
            <Space
              className="filter-section rounded-full bg-white pl-[42px] py-0 w-[354px] h-[61px]"
              size="middle"
            >
              <label htmlFor="#" className="font-black">
                계정 상태
              </label>
              <Radio.Group
                name="radiogroup"
                defaultValue="all"
                onChange={handleStatusFiltering}
              >
                <Radio value="all">전체</Radio>
                {/* <Radio value={2}>설정</Radio> */}
                <Radio value="true">활동적인</Radio>
                <Radio value="false">정지</Radio>
              </Radio.Group>
            </Space>
            <Space
              className="filter-section rounded-full bg-white pl-[42px] pr-[20px] py-3.5 h-[61px]"
              size="middle"
            >
              <label htmlFor="#" className="font-black whitespace-nowrap">
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
                    : membersList
                }
                onChange={onChange}
              />
            )}
          </Card>
        </Col>
      </Row>

      <Modal
        className={modalType === "user" ? "custom-modal" : ""}
        title=""
        footer=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        width={modalType === "user" ? 865 : 740}
        centered
      >
        <div className={modalType === "user" ? "" : "px-8 pt-[56px] mb-[73px]"}>
          <Button
            className="left-icon p-0 border-0 shadow-none text-left text-[30px] leading-none mb-[53px]"
            onClick={handleCancel}
          >
            <img src="/assets/images/backIcon.png" />
          </Button>
          {modalType === "user" ? (
            <MembershipModal
              clickedMemberData={clickedMemberData}
              fetchMembersLists={fetchMembersLists}
              closeParentModal={closeParentModal}
            />
          ) : (
            <ExcelModal />
          )}
        </div>
      </Modal>
    </DefaultLayout>
  );
}
