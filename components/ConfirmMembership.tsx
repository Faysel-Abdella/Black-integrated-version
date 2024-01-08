import { Button, Flex } from "antd";

interface ConfirmMembershipProps {
  onCancel: () => void;
}

export default function ConfirmMembership({
  onCancel,
}: ConfirmMembershipProps) {
  return (
    <>
      <p className="text-[20px] mb-12 text-center font-bold">
        임시 비밀번호를 발송하시겠습니까?
      </p>
      <Flex gap="middle" align="center" justify="center">
        <Button className="ant-btn ant-btn-info" size="small">
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
