import { Button, Card, Flex, Typography } from "antd";
import EditNoteModal from "./EditNoteModal";

const { Text } = Typography;

const WarningArea = ({ transcription, onDelete }) => {
  return (
    <Flex vertical className="w-full pb-8">
      <Text strong style={{ marginBottom: "15px", color: "#8C8F92" }}>
        Warning Area
      </Text>

      <Flex gap={15} vertical>
        <Card className="bg-transparent border-2 border-tertiary w-full">
          <Flex vertical className="gap-5">
            <Typography.Text>
              Modifying the transcription will affect the summary and chatbot responses.
            </Typography.Text>
            <div>
              <EditNoteModal transcription={transcription} />
            </div>
          </Flex>
        </Card>

        <Card className="bg-transparent border-2 border-tertiary w-full">
          <Flex vertical className="gap-5">
            <Typography.Text>
              Once deleted, notes cannot be recovered. Be careful.
            </Typography.Text>
            <div>
              <Button onClick={onDelete} className="bg-primary hover:!bg-[#359EDD] hover:!text-white border-primary text-white h-9">
                Delete Note
              </Button>
            </div>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default WarningArea;
