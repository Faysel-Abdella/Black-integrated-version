import customFetch from "@/utils/customFetch";
import { Form, Row, Button, Radio, Input, Col, Flex } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface MembershipSanctionProps {
  onCancel: () => void;
  closeParentModal?: () => void;
  memberId: string | number;
  fetchMembersLists: () => void;
}

export default function MembershipSanction({
  onCancel,
  closeParentModal,
  memberId,
  fetchMembersLists,
}: MembershipSanctionProps) {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const id = memberId;

  useEffect(() => {
    form.resetFields();
  }, []);

  const handlePostBan = async () => {
    const reason = form.getFieldValue("reason");
    const period = form.getFieldValue("period");
    if (!reason) {
      return toast.error("Please insert the reason", { autoClose: 4000 });
    }
    const accessToken = localStorage.getItem("accessToken");

    try {
      console.log(reason);
      console.log(period);
      const response = await customFetch.post(
        `/api/v1/admins/users/ban/${id}`,
        {
          reason: reason,
          status: period,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      onCancel();
      closeParentModal!();
      form.resetFields();
      toast.success("완료", { autoClose: 3500 });
      fetchMembersLists();
    } catch (error) {
      console.log(error);
    }
  };

  // ################ DONE / 완전한 ############## //

  // faysel3:
  // POST /api/v1/admins/users/ban/{id}
  // For more details, please refer to the Swagger documentation."

  return (
    <div className="modal-form form-inline">
      <Form colon={false} layout="horizontal" form={form}>
        <Row gutter={[32, 0]}>
          <Col md={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="period"
              label="제재기간"
              className="input-group custom-label-margin"
            >
              <Radio.Group>
                <Radio value="SEVEN_DAYS">7일</Radio>
                <Radio value="THIRTY_DAYS">30일</Radio>
                <Radio value="PERMANENT">영구</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="reason"
              className="custom-label-margin"
              label="제재사유"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Flex gap="middle" align="center" justify="center">
          <Button
            onClick={handlePostBan}
            style={{ padding: 0, width: 148, height: 42 }}
            className="ant-btn ant-btn-info"
          >
            변경
          </Button>
          <Button
            style={{ padding: 0, width: 148, height: 42 }}
            className="ant-btn ant-btn-info"
            onClick={onCancel}
          >
            취소
          </Button>
        </Flex>
      </Form>
    </div>
  );
}
