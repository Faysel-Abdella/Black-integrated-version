import { useEffect } from "react";

import { Button, Flex } from "antd";
import customFetch from "@/utils/customFetch";
import { toast } from "react-toastify";

interface RejectmMembershipProps {
  onCancel: () => void;
  memberId?: any;
  updatedEmail?: string;
  fetchMembersLists?: () => void;
}

export default function RejectmMembership({
  onCancel,
  memberId,
  updatedEmail,
  fetchMembersLists,
}: RejectmMembershipProps) {
  // ################ DONE / 완전한 ############## //

  // faysel3:
  // PATCH /api/v1/admins/users/phone-email/{id}

  // For more details, please refer to the Swagger documentation."

  const handleChangeEmail = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!updatedEmail) {
      return toast.error("Please insert a valid email", {
        autoClose: 4000,
      });
    }

    try {
      const response = await customFetch.patch(
        `/api/v1/admins/users/phone-email/${memberId}?field=EMAIL`,
        {
          data: updatedEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      onCancel();
      toast.success("완료", { autoClose: 3500 });
      fetchMembersLists!();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p className="text-[20px] mb-12 text-center font-bold">
        정보를 변경하시겠습니까?
      </p>
      <Flex gap="middle" align="center" justify="center">
        <Button
          onClick={handleChangeEmail}
          className="ant-btn ant-btn-info"
          size="small"
        >
          변경
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
