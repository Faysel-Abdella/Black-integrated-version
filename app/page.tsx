"use client";
import { Card, Col, Row, Table, Space } from "antd";

import Sidebar from "../components/Sidebar";
import LineChart from "../components/LineChart";

export default function Home() {
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Line 1",
        data: [10, 25, 35, 40, 50, 60, 70],
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Line 2",
        data: [5, 15, 25, 30, 40, 50, 60],
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };
  const columnsThree = [
    {
      title: "Week",
      dataIndex: "date",
      sorter: {
        compare: (a: any, b: any) => a.name - b.name,
        multiple: 3,
      },
    },
    {
      title: "가입",
      dataIndex: "signUp",
      sorter: {
        compare: (a: any, b: any) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "합계",
      dataIndex: "total",
      sorter: {
        compare: (a: any, b: any) => a.math - b.math,
        multiple: 2,
      },
    },
  ];
  const columns = [
    {
      title: "승인요청 일시",
      dataIndex: "name",
      sorter: {
        compare: (a: any, b: any) => a.name - b.name,
        multiple: 3,
      },
    },
    {
      title: "등록자 ID",
      dataIndex: "chinese",
      sorter: {
        compare: (a: any, b: any) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "블랙컨슈머 이름",
      dataIndex: "math",
      sorter: {
        compare: (a: any, b: any) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "상세보기",
      dataIndex: "english",
      sorter: {
        compare: (a: any, b: any) => a.english - b.english,
        multiple: 1,
      },
      render: () => <a>자세히보기</a>,
    },
  ];
  const columnsTwo = [
    {
      title: "이의신청 일시",
      dataIndex: "date",
      sorter: {
        compare: (a: any, b: any) => a.name - b.name,
        multiple: 3,
      },
    },
    {
      title: "이의신청자 ID",
      dataIndex: "id",
      sorter: {
        compare: (a: any, b: any) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "이의신청자 ID",
      dataIndex: "idTwo",
      sorter: {
        compare: (a: any, b: any) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "블랙컨슈머 이름",
      dataIndex: "name",
      sorter: {
        compare: (a: any, b: any) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "상세보기",
      dataIndex: "detail",
      sorter: {
        compare: (a: any, b: any) => a.english - b.english,
        multiple: 1,
      },
      render: () => <a>자세히보기</a>,
    },
  ];
  const dataThree = [
    {
      key: "1",
      date: "2023.08.23",
      signUp: 40,
      total: 200,
    },
    {
      key: "2",
      date: "2023.08.11",
      signUp: 30,
      total: 300,
    },
    {
      key: "3",
      date: "2023.08.05",
      signUp: 10,
      total: 500,
    },
    {
      key: "4",
      date: "2023.08.01",
      signUp: 3,
      total: 100,
    },
    {
      key: "5",
      date: "2023.07.27",
      signUp: 5,
      total: 50,
    },
  ];
  const data = [
    {
      key: "1",
      name: "2023.08.23 14:11:21",
      chinese: "Fdpd100",
      math: "이중재",
      english: "자세히보기",
    },
    {
      key: "2",
      name: "2023.08.23 14:11:21",
      chinese: "Fdpd100",
      math: "이중재",
      english: "자세히보기",
    },
    {
      key: "3",
      name: "2023.08.23 14:11:21",
      chinese: "Fdpd100",
      math: "이중재",
      english: "자세히보기",
    },
    {
      key: "4",
      name: "2023.08.23 14:11:21",
      chinese: "Fdpd100",
      math: "이중재",
      english: "자세히보기",
    },
  ];
  const dataTwo = [
    {
      key: "1",
      date: "2023.08.23 14:11:21",
      id: "Fdpd100",
      idTwo: "abc123",
      name: "이중재",
      detail: "자세히보기",
    },
    {
      key: "2",
      date: "2023.08.23 14:11:21",
      id: "Fdpd100",
      idTwo: "abc123",
      name: "이중재",
      detail: "자세히보기",
    },
    {
      key: "3",
      date: "2023.08.23 14:11:21",
      id: "Fdpd100",
      idTwo: "abc123",
      name: "이중재",
      detail: "자세히보기",
    },
    {
      key: "4",
      date: "2023.08.23 14:11:21",
      id: "Fdpd100",
      idTwo: "abc123",
      name: "이중재",
      detail: "자세히보기",
    },
  ];
  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // faysel5:
  // GET /api/v1/admins/dashboard/register
  // This is the API for this week's registration status.
  // You should integrate the data with the <LineChart /> tag to ensure that the graph is drawn correctly.

  // GET /api/v1/admins/dashboard/blacks/approval-request
  // This is the API for requesting approval of the blacklist.

  // Please carefully review the Swagger documentation before proceeding with the work.
  return (
    <div className="main-dashboard">
      <Sidebar />
      <main>
        <div className="container flex flex-col min-h-screen justify-center">
          <Row gutter={[54, 40]}>
            <Col span={12}>
              <Card title="이번주 가입 현황">
                <div className="h-[310px]">
                  <LineChart data={chartData} />
                </div>
                <div className="mt-3 table-dark">
                  <Table
                    pagination={false}
                    columns={columnsThree}
                    dataSource={dataThree}
                    onChange={onChange}
                  />
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Space direction="vertical" size="large" className="w-full">
                <Card title="블랙리스트 승인 요청 리스트">
                  <div className="table-dark">
                    <Table
                      pagination={false}
                      columns={columns}
                      dataSource={data}
                      onChange={onChange}
                    />
                  </div>
                </Card>
                <Card title="이의신청 리스트">
                  <div className="table-dark">
                    <Table
                      pagination={false}
                      columns={columnsTwo}
                      dataSource={dataTwo}
                      onChange={onChange}
                    />
                  </div>
                </Card>
              </Space>
            </Col>
          </Row>
        </div>
      </main>
    </div>
  );
}
