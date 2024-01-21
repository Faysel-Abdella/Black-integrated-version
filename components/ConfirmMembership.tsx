import customFetch from "@/utils/customFetch";
import { Button, Flex } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ConfirmMembershipProps {
  onCancel?: () => void;
  executeFunction?: any;
  isLoading?: boolean;
}

// ################ DONE / 완전한 ############## //

export default function ConfirmMembership({
  onCancel,
  executeFunction,
  isLoading,
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
          disabled={isLoading}
        >
          {isLoading! ? (
            <div
              className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-slate-50 rounded-full"
              role="status"
              aria-label="loading"
            ></div>
          ) : (
            "발송"
          )}
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
