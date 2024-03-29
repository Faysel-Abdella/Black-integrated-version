"use client";
import React, { useState, useEffect } from "react";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import RequestConfirmation from "../../components/RequestConfirmation";
import RequestRejection from "../../components/RequestRejection";
import ApprovalModal from "../../components/ApprovalModal";
import { Card, Col, Row, Table, Button, Space, Modal, Tag } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import customFetch from "@/utils/customFetch";
const { Column } = Table;

type TableData = {
  key: any;
  approvalDate: string;
  registrantId: string;
  consumerName: string;
  consumerNumber: string;
  consumerDOB: string;
};

export default function PasswordManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("activate");
  const [changingState, setChangingState] = useState(false);

  const [approvalRequestsList, setApprovalRequestsList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [clickedViewDetails, setClickedViewDetails] = useState<any>([]);

  const [total, setTotal] = useState(0);

  const fetchApprovalRequests: () => void = async () => {
    setIsFetching(true);
    const accessToken = localStorage.getItem("accessToken");
    const response = await customFetch.get(
      "/api/v1/admins/blacks/approval-request",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const requestsData = response.data.data;

    const transformedAdminsList = requestsData.map(
      (request: any, index: any) => ({
        key: index + 1 < 9 ? `0${index + 1}` : `${index}`,
        approvalDate: request.approvedDate
          ? new Date(request.approvedDate).toISOString().split("T")[0]
          : new Date("01-01-2024").toISOString().split("T")[0],
        registrantId: request.authorLoginId,
        consumerName: request.name,
        consumerNumber: request.phone,
        consumerDOB: request.birth,
        damageDate: request.damageDate,
        damageContent: request.damageContent,
        id: request.id,
      })
    );

    setApprovalRequestsList(transformedAdminsList);
    setTotal(transformedAdminsList.length);
    setIsFetching(false);
  };

  useEffect(() => {
    try {
      fetchApprovalRequests();
    } catch (error) {
      console.log("Error when fetching approval requests", error);
    }
  }, []);

  const handleViewDetails = (data: any) => {
    const thisAdminData = approvalRequestsList.filter(
      (admin: any) => admin.id.toString() == data.id.toString()
    );

    setClickedViewDetails(thisAdminData);
    showModal("approval");
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

  const tableColumns: ColumnsType<TableData> = [
    {
      title: "번호",
      dataIndex: "number",
      render(value, record, index) {
        return <span>{(index + 1).toString().padStart(2, "0")}</span>;
      },
    },
    {
      title: "승인요청 일시",
      dataIndex: "approvalDate",
    },
    {
      title: "등록자 ID",
      dataIndex: "registrantId",
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
      title: "상세보기",
      dataIndex: "viewDetails",
      render(value, record, index) {
        return (
          <Space size="middle">
            <Tag
              style={{ width: 75, height: 32, textAlign: "center" }}
              className="cursor-pointer"
              onClick={() => {
                handleViewDetails(record);
              }}
            >
              {/* View details */}
              상세보기
            </Tag>
          </Space>
        );
      },
    },
    {
      title: "승인처리",
      dataIndex: "approvalProcessing",
      render(value, record, index) {
        return (
          <Space size="small">
            <Tag
              style={{ width: 75, height: 32, textAlign: "center" }}
              className="cursor-pointer !px-[25px]"
              color="#4A4E57"
              onClick={() => {
                handleViewDetails(record);
                showModal("activate");
              }}
            >
              {/* Approval */}
              승인
            </Tag>
            <Tag
              style={{ width: 75, height: 32, textAlign: "center" }}
              className="cursor-pointer !px-[25px]"
              onClick={() => {
                handleViewDetails(record);

                setChangingState((prev: boolean) => !prev);

                showModal("deactivate");
              }}
            >
              {/* refusal/reject */}
              거부
            </Tag>
          </Space>
        );
      },
    },
  ];

  const data: TableData[] = [
    {
      key: 1,
      approvalDate: "2023-08-05", // YES (approvedDate)
      registrantId: "Fdpd100", // YES (user.loginId)
      consumerName: "이중재", // YES (user.name)
      consumerNumber: "010-4012-1146", // YES (user.phone)
      consumerDOB: "901024", // YES (birth)
    },
    {
      key: 2,
      approvalDate: "2023-08-05",
      registrantId: "Fdpd100",
      consumerName: "이중재",
      consumerNumber: "010-4012-1146",
      consumerDOB: "901024",
    },
    {
      key: 3,
      approvalDate: "2023-08-05",
      registrantId: "Fdpd100",
      consumerName: "이중재",
      consumerNumber: "010-4012-1146",
      consumerDOB: "901024",
    },
    {
      key: 4,
      approvalDate: "2023-08-05",
      registrantId: "Fdpd100",
      consumerName: "이중재",
      consumerNumber: "010-4012-1146",
      consumerDOB: "901024",
    },
    {
      key: 5,
      approvalDate: "2023-08-05",
      registrantId: "Fdpd100",
      consumerName: "이중재",
      consumerNumber: "010-4012-1146",
      consumerDOB: "901024",
    },
  ];

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onChangeDate = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  // ################ DONE / 완전한 ############## //

  // faysel3:
  // This is the API for retrieving the list of black consumer approval requests.
  // You should fetch the data and insert it into the Table tag.
  // When you click on code lines 65 to 81, a modal will open.
  // When the modal is open, the data from the list should be appropriately entered into the inputs.
  // This tag is located below. <ApprovalModal />
  // GET /api/v1/admins/blacks/approval-request

  // When you click on code lines 88 to 95, a modal for approval will open.
  // Inside this modal, you need to make a PATCH request to '/api/v1/admins/blacks/approval/{id}' using the id from the list.
  // This API is for approving the registration of black consumers.
  // This tag is located below. <RequestConfirmation onCancel={handleCancel} />

  // And when you click on code lines 96 to 102, a modal for rejection will open.
  // Inside this modal, you need to insert the id from the list and, if there is a reason for rejection, include it as well in a PATCH request to '/api/v1/admins/blacks/reject/{id}'.
  // This API is for rejecting the registration of black consumers
  // This tag is located below. <RequestRejection onCancel={handleCancel} />

  // For more details, please refer to the Swagger documentation."

  return (
    <DefaultLayout>
      <Row gutter={[54, 40]} className="flex-1" align={"middle"}>
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
            ) : (
              <Table
                bordered
                dataSource={approvalRequestsList}
                onChange={onChange}
                columns={tableColumns}
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
        className={
          modalType === "activate"
            ? "custom-mini-modal-activate"
            : modalType === "approval"
            ? "custom-mini-modal-approval"
            : "custom-mini-modal-deactivate"
        }
        width={
          modalType === "activate" ? 426 : modalType === "approval" ? 753 : 636
        }
        centered
      >
        <div className="px-8">
          <Button
            className="left-icon p-0 border-0 shadow-none text-left text-[30px] leading-none mt-[37px] mb-[33px]"
            onClick={handleCancel}
          >
            <img src="/assets/images/backIcon.png" />
          </Button>
          {modalType === "activate" ? (
            <RequestConfirmation
              onCancel={handleCancel}
              fetchApprovalRequests={fetchApprovalRequests}
              clickedRequestId={clickedViewDetails}
            />
          ) : modalType === "approval" ? (
            <ApprovalModal clickedViewDetails={clickedViewDetails} />
          ) : (
            <RequestRejection
              onCancel={handleCancel}
              clickedRequestId={clickedViewDetails}
              fetchApprovalRequests={fetchApprovalRequests}
              changingState={changingState}
            />
          )}
        </div>
      </Modal>
    </DefaultLayout>
  );
}
