import { Button, Flex } from "antd";

interface RequestConfirmationProps {
  onCancel: () => void;
}

export default function RequestConfirmation({
  onCancel,
}: RequestConfirmationProps) {
  // faysel3:
  // PATCH request to '/api/v1/admins/blacks/approval/{id}
  // This API is for approving the registration of black consumers.
  // For more details, please refer to the Swagger documentation."

  return (
    <>
      <p className="text-[20px] mb-12 text-center">
        해당 요청을 승인하시겠습니까?
      </p>
      <Flex gap="middle" align="center" justify="center">
        <Button
          style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
          className="ant-btn ant-btn-info"
        >
          승인
        </Button>
        <Button
          onClick={onCancel}
          style={{ padding: 0, width: 148, height: 42, fontWeight: 400 }}
          className="ant-btn ant-btn-info"
        >
          닫기
        </Button>
      </Flex>
    </>
  );
}
