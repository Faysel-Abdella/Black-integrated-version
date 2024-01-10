import customFetch from "@/utils/customFetch";
import { Form, Row, Button, Radio, Input, Col, Flex } from "antd";
import { error } from "console";

type MembershipManagementModalProps = {
  clickedAdminId?: string;
};

export default function MembershipManagementModal(
  props: MembershipManagementModalProps
) {
  const { clickedAdminId } = props;
  const adminId = Number(clickedAdminId);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  //   faysel:
  //   "This is the API for lifting the sanctions (or unblocking) an administrator.
  //   It takes an ID as input and removes the sanction imposed on the specified administrator."
  //   Please carefully review the Swagger documentation before proceeding with the work.
  //   Thank you."
  //   DELETE /api/v1/admins/ban/{id}

  const handleUnblock = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await customFetch.delete(
        `/api/v1/admins/ban/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-form form-inline">
      <p className="text-[20px] mb-4">차단을 해제하시겠습니까?</p>
      <Form layout="horizontal" form={form}>
        <Row gutter={[16, 0]}>
          <Col md={24}>
            <TextArea style={{ height: 78 }} rows={4} />
          </Col>
        </Row>
        <Flex gap="middle" align="center" justify="center" className="mt-8">
          <Button
            style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
            className="ant-btn ant-btn-info"
            onClick={handleUnblock}
          >
            변경
          </Button>
          <Button
            style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
            className="ant-btn ant-btn-info"
          >
            취소
          </Button>
        </Flex>
      </Form>
    </div>
  );
}
