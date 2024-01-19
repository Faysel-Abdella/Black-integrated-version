import customFetch from "@/utils/customFetch";
import { Button, Flex } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ConfirmMembershipProps {
  onCancel?: () => void;
  executeFunction?: any;
}

// ################ DONE / 완전한 ############## //

export default function ConfirmMembership({
  onCancel,
  executeFunction,
}: ConfirmMembershipProps) {
  // useEffect(() => {
  //   console.log(memberId);
  //   console.log(updatedPhone);
  // }, [memberId, updatedPhone]);

  return (
    <>
      <p className="text-[20px] mb-12 text-center font-bold">
        임시 비밀번호를 발송하시겠습니까?
      </p>
      <Flex gap="middle" align="center" justify="center">
        <Button
          onClick={() => executeFunction!()}
          className="ant-btn ant-btn-info"
          size="small"
        >
          발송
        </Button>
        <Button
          className="ant-btn ant-btn-info"
          size="small"
          onClick={onCancel}
        >
          취소
        </Button>
      </Flex>
    </>
  );
}
