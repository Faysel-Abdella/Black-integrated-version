import { Button, Flex } from "antd";

interface RejectmMembershipProps {
  onCancel: () => void;
}

export default function RejectmMembership({
  onCancel,
}: RejectmMembershipProps) {
  // faysel3:
  // PATCH /api/v1/admins/users/phone-email/{id}

  // For more details, please refer to the Swagger documentation."

  return (
    <>
      <p className="text-[20px] mb-12 text-center font-bold">
        정보를 변경하시겠습니까?
      </p>
      <Flex gap="middle" align="center" justify="center">
        <Button className="ant-btn ant-btn-info" size="small">
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
