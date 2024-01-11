"use client";
import React, { useState } from "react";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import RequestConfirmation from "../../components/RequestConfirmation";
import RequestRejection from "../../components/RequestRejection";
import ApprovalModal from "../../components/ApprovalModal";
import { Card, Col, Row, Table, Button, Space, Modal, Tag } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
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
              onClick={() => showModal("approval")}
            >
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
              onClick={() => showModal("activate")}
            >
              승인
            </Tag>
            <Tag
              style={{ width: 75, height: 32, textAlign: "center" }}
              className="cursor-pointer !px-[25px]"
              onClick={() => showModal("deactivate")}
            >
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
      approvalDate: "2023-08-05",
      registrantId: "Fdpd100",
      consumerName: "이중재",
      consumerNumber: "010-4012-1146",
      consumerDOB: "901024",
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
  // nside this modal, you need to insert the id from the list and, if there is a reason for rejection, include it as well in a PATCH request to '/api/v1/admins/blacks/reject/{id}'.
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
                <strong style={{ fontWeight: 600 }}>N건</strong>의 게시물이
                검색되었습니다
              </h2>
            </div>
            <Table
              bordered
              dataSource={data}
              onChange={onChange}
              columns={tableColumns}
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
            <RequestConfirmation onCancel={handleCancel} />
          ) : modalType === "approval" ? (
            <ApprovalModal />
          ) : (
            <RequestRejection onCancel={handleCancel} />
          )}
        </div>
      </Modal>
    </DefaultLayout>
  );
}
