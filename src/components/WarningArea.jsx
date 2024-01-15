import { Button, Card, Flex, Typography } from "antd";
import EditNoteModal from "./EditNoteModal";

const WarningArea = ({ transcription, onDelete }) => {
  return (
    <Flex vertical className="w-full gap-3 pb-8">
      <Typography.Title level={4} className="!text-red-500">
        Warning Area
      </Typography.Title>

      <Card className="bg-transparent border-red-400 w-full">
        <Flex vertical className="gap-5">
          <Typography.Text>
            Modifying the transcription will affect the summary and chatbot
            responses.
          </Typography.Text>
          <div>
            <EditNoteModal transcription={transcription} />
          </div>
        </Flex>
      </Card>

      <Card className="bg-transparent border-red-400 w-full">
        <Flex vertical className="gap-5">
          <Typography.Text>
            Once deleted, notes cannot be recovered. Be careful.
          </Typography.Text>
          <div>
            <Button danger type="primary" onClick={onDelete}>
              Delete Note
            </Button>
          </div>
        </Flex>
      </Card>
    </Flex>
  );
};

export default WarningArea;
