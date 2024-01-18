"use client";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import {
  Card,
  Col,
  Row,
  Table,
  Button,
  Radio,
  Space,
  DatePicker,
  Modal,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { tablesData } from "./constants";
import { useState } from "react";
import ExcelModal from "@/components/ExcelModal";

export default function Indicator() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("excel");

  const showModal = (type: any) => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onChangeDate = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  // faysel5:
  // GET /api/v1/admins/indicator/register
  // 회원가입 = registerCount, 리스트 조회 수 = blackSumViewCount, 리스트 등록 수 = blackCount
  // This is the API for the registration status of this week.
  // The dummy data is for reference purposes.
  // For TOTAL, you should insert the data found within the 'sum' in the data fetched from /api/v1/admins/indicator/register.

  // GET /api/v1/admins/indicator/blacks
  // 요청 = totalCount, 승인 = approvedCount, 거절 = rejectedCount
  // "먹튀", "실내흡연", "주변 이웃과 다툼", "기타" are located within damageTypes in the received data.
  // 기타 = other
  //
  // This is an API for the status and count of blacklisted entities, as well as the count by type of registration.
  // The dummy data is for reference purposes.

  // Please carefully review the Swagger documentation before proceeding with the work.
  return (
    <DefaultLayout>
      <Row justify="space-between" align="middle" className="mb-[50px]">
        <Col md={10}>
          <Space
            className="filter-section rounded-full bg-white w-[541px] h-[61px] pl-[42px]"
            size="middle"
          >
            <label htmlFor="#" className="font-black">
              일자
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
            <Button
              icon={
                <img src="/assets/images/search_icon.png" alt="search_icon" />
              }
              className="pt-5 border-0 shadow-none"
            ></Button>
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
      <Row gutter={[54, 24]}>
        <Col span={24}>
          <Card title="" bodyStyle={{ padding: "36px 0px 22px 84px" }}>
            <Row gutter={30}>
              <Col md={15} xs={24}>
                <Table
                  bordered
                  columns={tablesData.table1Columns}
                  dataSource={tablesData.table1Data}
                  onChange={onChange}
                  pagination={false}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="" bodyStyle={{ padding: "26px 84px 22px 84px" }}>
            <Table
              bordered
              columns={tablesData.table2Columns}
              dataSource={tablesData.table2Data}
              onChange={onChange}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        title=""
        footer=""
        open={isModalOpen}
        onCancel={handleCancel}
        closable={false}
        width={740}
        centered
      >
        <div className="px-8 pt-[56px] mb-[73px]">
          <Button
            className="left-icon p-0 border-0 shadow-none text-left text-[30px] leading-none mb-[53px]"
            onClick={handleCancel}
          >
            <img src="/assets/images/backIcon.png" />
          </Button>
          <ExcelModal />
        </div>
      </Modal>
    </DefaultLayout>
  );
}
