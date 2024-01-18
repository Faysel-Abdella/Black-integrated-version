import customFetch from "@/utils/customFetch";
import { Button, Flex } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ConfirmMembershipProps {
  onCancel: () => void;
  memberId?: any;
  updatedPhone?: string;
  fetchMembersLists?: () => void;
}

export default function ConfirmMembership({
  onCancel,
  memberId,
  updatedPhone,
  fetchMembersLists,
}: ConfirmMembershipProps) {
  useEffect(() => {
    console.log(memberId);
    console.log(updatedPhone);
  }, [memberId, updatedPhone]);

  const handleChangePhone = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!updatedPhone) {
      return toast.error("Please insert a valid phone number", {
        autoClose: 4000,
      });
    }

    try {
      const response = await customFetch.patch(
        `/api/v1/admins/users/phone-email/${memberId}`,
        {
          PHONE: updatedPhone,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response);
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
        임시 비밀번호를 발송하시겠습니까?
      </p>
      <Flex gap="middle" align="center" justify="center">
        <Button
          onClick={handleChangePhone}
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
