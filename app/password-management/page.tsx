"use client";
import React, { useState } from "react";
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
  Input,
  Flex,
  Modal,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
const { Search } = Input;

type TableData = {
  key: any;
  id: string;
  name: string;
  department: string;
  sanctionDate: string;
  situation: string;
};

export default function PasswordManagement() {
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

  const tableColumns: ColumnsType<TableData> = [
    {
      title: "번호",
      dataIndex: "number",
      render(value, record, index) {
        return <span>{(index + 1).toString().padStart(2, "0")}</span>;
      },
    },
    {
      title: "이름",
      dataIndex: "name",
    },
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "부서",
      dataIndex: "department",
    },
    {
      title: "제재일",
      dataIndex: "sanctionDate",
    },
    {
      title: "상태",
      dataIndex: "situation",
      render(value, record, index) {
        return (
          <span
            onClick={showModal}
            role="button"
            className="text-[#28A7E1] underline-offset-2 underline"
          >
            {value}
          </span>
        );
      },
    },
  ];
  const data: TableData[] = [
    {
      key: 1,
      name: "이중재",
      id: "Fdpd100",
      department: "기획팀",
      sanctionDate: "2023.08.21 14:21:21",
      situation: "제재 해지",
    },
    {
      key: 2,
      name: "이중재",
      id: "Fdpd100",
      department: "기획팀",
      sanctionDate: "2023.08.21 14:21:21",
      situation: "제재 해지",
    },
    {
      key: 3,
      name: "이중재",
      id: "Fdpd100",
      department: "기획팀",
      sanctionDate: "2023.08.21 14:21:21",
      situation: "제재 해지",
    },
    {
      key: 4,
      name: "이중재",
      id: "Fdpd100",
      department: "기획팀",
      sanctionDate: "2023.08.21 14:21:21",
      situation: "제재 해지",
    },
    {
      key: 5,
      name: "이중재",
      id: "Fdpd100",
      department: "기획팀",
      sanctionDate: "2023.08.21 14:21:21",
      situation: "제재 해지",
    },
    {
      key: 6,
      name: "이중재",
      id: "Fdpd100",
      department: "기획팀",
      sanctionDate: "2023.08.21 14:21:21",
      situation: "제재 해지",
    },
    {
      key: 7,
      name: "이중재",
      id: "Fdpd100",
      department: "기획팀",
      sanctionDate: "2023.08.21 14:21:21",
      situation: "제재 해지",
    },
  ];
  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onChangeDate = (date: any, dateString: any) => {
    console.log(date, dateString);
  };
  return (
    <DefaultLayout>
      <Row
        gutter={[54, 40]}
        className="flex-1"
        justify={"center"}
        align={"middle"}
      >
        <Col span={24}>
          <Card title="" bodyStyle={{ padding: "78px 85px 95px 84px" }}>
            <Col span={20}>
              <Table
                pagination={false}
                bordered
                columns={tableColumns}
                dataSource={data}
                onChange={onChange}
              />
            </Col>
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
        width={467}
        className="custom-mini-modal-password"
        centered
      >
        <div>
          <Button
            className="left-icon p-0 border-0 shadow-none text-left text-[30px] leading-none mb-[43px]"
            block
            onClick={handleCancel}
          >
            <img src="/assets/images/backIcon.png" />
          </Button>
          <p className="text-[20px] mb-[77px] ">
            해당 계정 잠금을 해제 하시겠습니까?
          </p>
          <Flex gap="middle" align="center" justify="center">
            <Button
              style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
              className="ant-btn ant-btn-info"
            >
              등록
            </Button>
            <Button
              onClick={handleCancel}
              style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
              className="ant-btn ant-btn-info"
            >
              취소
            </Button>
          </Flex>
        </div>
      </Modal>
    </DefaultLayout>
  );
}
