import { MoreOutlined } from "@ant-design/icons";
import { Card, Flex, Typography } from "antd";
import EmptyFile from "./EmptyFile";

const { Text } = Typography;

const Files = () => {
  return (
    <>
      <Text
        strong
        style={{ marginBottom: "15px", color: "#8C8F92" }}
      >
        Files
      </Text>
      <EmptyFile />

      {/* <Flex vertical className="w-full">
        <Typography.Title level={5}>Files:</Typography.Title>
        <Flex className="w-full gap-5">
          <Flex
            vertical
            className="flex-1 gap-1 hover:scale-105 duration-200 ease-in-out"
          >
            <Card className="h-60 w-full p-3 relative" style={{ padding: 0 }}>
              <button>
                <MoreOutlined className="text-lg absolute top-3 right-3" />
              </button>
            </Card>
            <Typography.Title level={4} className="!mb-0">
              Sample File
            </Typography.Title>
            <Typography.Text>PDF</Typography.Text>
          </Flex>

          <Flex
            vertical
            className="flex-1 gap-1 hover:scale-105 duration-200 ease-in-out"
          >
            <Card className="h-60 w-full p-3 relative" style={{ padding: 0 }}>
              <button>
                <MoreOutlined className="text-lg absolute top-3 right-3" />
              </button>
            </Card>
            <Typography.Title level={4} className="!mb-0">
              Sample File
            </Typography.Title>
            <Typography.Text>Audio</Typography.Text>
          </Flex>

          <Flex
            vertical
            className="flex-1 gap-1 hover:scale-105 duration-200 ease-in-out"
          >
            <Card className="h-60 w-full p-3 relative" style={{ padding: 0 }}>
              <button>
                <MoreOutlined className="text-lg absolute top-3 right-3" />
              </button>
            </Card>
            <Typography.Title level={4} className="!mb-0">
              Sample File
            </Typography.Title>
            <Typography.Text>Video</Typography.Text>
          </Flex>
        </Flex>
      </Flex> */}
    </>
  );
};

export default Files;
