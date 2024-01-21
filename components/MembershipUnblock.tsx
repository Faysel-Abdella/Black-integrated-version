import customFetch from "@/utils/customFetch";
import { Form, Row, Button, Radio, Input, Col, Flex } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface MembershipUnblockProps {
  onCancel: () => void;
  closeParentModal?: () => void;
  memberId: string | number;
  fetchMembersLists: () => void;
}

export default function MembershipUnblock({
  onCancel,
  closeParentModal,
  memberId,
  fetchMembersLists,
}: MembershipUnblockProps) {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const [isLoading, setIsLoading] = useState(false);

  // ################ DONE / 완전한 ############## //

  // faysel3:
  // DELETE /api/v1/admins/users/ban/{id}
  // For more details, please refer to the Swagger documentation."

  const id = memberId;

  const handleDeleteBan = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const releaseReason = form.getFieldValue("releaseReason");

    if (!releaseReason) {
      return toast.error("Please insert the release reason", {
        autoClose: 4000,
      });
    }

    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        releaseReason: releaseReason,
      },
    };

    try {
      setIsLoading(true);
      const response = await customFetch.delete(
        `/api/v1/admins/users/ban/${id}`,
        config
      );

      onCancel();
      closeParentModal!();
      setIsLoading(false);

      form.resetFields();
      toast.success("완료", { autoClose: 3500 });
      fetchMembersLists();
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      const errorMessage = error.response.data.message;
      toast.error(errorMessage, { autoClose: 4000 });
      onCancel();
    }
  };

  useEffect(() => {
    form.resetFields();
  }, [memberId]);

  return (
    <div className="modal-form form-inline">
      <p className="text-[20px] mb-4">차단을 해제하시겠습니까?</p>
      <Form layout="horizontal" form={form}>
        <Row gutter={[16, 0]}>
          <Col md={24}>
            <Form.Item name="releaseReason">
              <TextArea style={{ height: 78 }} rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Flex gap="middle" align="center" justify="center" className="mt-8">
          <Button
            onClick={handleDeleteBan}
            disabled={isLoading}
            style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
            className="ant-btn ant-btn-info"
          >
            {isLoading ? (
              <div
                className="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-slate-50 rounded-full"
                role="status"
                aria-label="loading"
              ></div>
            ) : (
              "변경"
            )}
          </Button>
          <Button
            style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
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
