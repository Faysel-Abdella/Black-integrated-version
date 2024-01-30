import customFetch from "@/utils/customFetch";
import { Form, Row, Button, Radio, Input, Col, Flex } from "antd";
import { toast } from "react-toastify";

import { error } from "console";
import { useEffect, useState } from "react";

type MembershipManagementModalProps = {
  clickedMemberId?: string;
  fetchMemberLists: () => void;
  closeModal: () => void;
  changingState?: boolean;
};

export default function MembershipManagementModal(
  props: MembershipManagementModalProps
) {
  const { clickedMemberId, fetchMemberLists, closeModal, changingState } =
    props;
  const memberId = Number(clickedMemberId);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  // ################ DONE /완전한 ############## //

  //   faysel:
  //   "This is the API for lifting the sanctions (or unblocking) a member.
  //   It takes an ID as input and removes the sanction imposed on the specified member."
  //   Please carefully review the Swagger documentation before proceeding with the work.
  //   Thank you."
  //   DELETE /api/v1/admins/users/ban/{id}

  useEffect(() => {
    form.resetFields();
    console.log("HADLE");
  }, [clickedMemberId, changingState]);

  useEffect(() => {
    form.resetFields();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleUnblock = async () => {
    const releaseReason = form.getFieldValue("releaseReason");

    const accessToken = localStorage.getItem("accessToken");

    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        releaseReason: releaseReason,
      },
    };

    if (!releaseReason) {
      return toast.error("Please fill the release reason", { autoClose: 4000 });
    }
    setIsLoading(true);
    try {
      const response = await customFetch.delete(
        `/api/v1/admins/users/ban/${memberId}`,
        config
      );
      setIsLoading(false);
      closeModal();
      form.resetFields();
      toast.success("완료", { autoClose: 3500 });
      fetchMemberLists();
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

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
            style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
            className="ant-btn ant-btn-info"
            disabled={isLoading}
            onClick={handleUnblock}
          >
            {isLoading ? (
              <div
                className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-slate-50 rounded-full"
                role="status"
                aria-label="loading"
              ></div>
            ) : (
              "변경"
            )}
          </Button>
          <Button
            onClick={closeModal}
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
