import { Card, Typography, Flex, Progress } from "antd";
import { CloudOutlined } from "@ant-design/icons";
import CreateNoteFolder from "./CreateNoteFolder";
import useNoteContext from "../hooks/useNoteContext";
import { useMemo } from "react";

const NoteSidebar = () => {
  const { notes, setSelectedNote, selectedNote, memorySize } = useNoteContext();

  const conicColors = {
    "0%": "#4285F4",
    "70%": "#FBBC05",
    "100%": "#EA4335",
  };

  const convertSizeToPercentage = useMemo(() => {
    if (!memorySize) return "0 KB"
    const totalSizeGB = 10
    const [value, unit] = memorySize.trim().split(' ');
    let bytes = parseFloat(value);

    if (unit === 'GB') {
      bytes *= 1024 * 1024 * 1024;
    } else if (unit === 'MB') {
      bytes *= 1024 * 1024;
    } else if (unit === 'KB') {
      bytes *= 1024;
    }

    const totalBytes = totalSizeGB * 1024 * 1024 * 1024;
    const percentage = (bytes / totalBytes) * 100;
    return percentage.toFixed(5);
  }, [memorySize])
  console.info(convertSizeToPercentage)
  return (notes || []).length > 0 ? (
    <div className="relative sm:mt-5 sm:mx-5 p-0 h-full">
      <CreateNoteFolder />

      <Flex vertical className="mt-5">
        {(notes || []).map((note) => {
          return (
            <Card
              key={note._id}
              style={{
                cursor: "pointer",
                padding: "0",
                display: "flex",
                alignItems: "center",
                height: "40px",
                border: 0,
              }}
              className={`rounded-lg  ${selectedNote && note._id === selectedNote._id
                ? "bg-gray-100 hover:bg-gray-200"
                : "bg-transparent hover:bg-gray-200"
                }`}
              onClick={() => {
                setSelectedNote(note);
              }}
            >
              <Typography.Title level={5} className="!mb-0 truncate w-[11rem]">
                {note.title}
              </Typography.Title>
            </Card>
          );
        })}
      </Flex>

      <Flex
        className="absolute bottom-5 bg-[#f9fdfe] py-3 w-full z-10"
        vertical
      >
        <Flex gap={5}>
          <CloudOutlined />
          <p>Storage</p>
        </Flex>
        <Progress
          percent={convertSizeToPercentage}
          size="small"
          strokeColor={conicColors}
          className="m-0"
          showInfo={false}
        />
        <p>{memorySize} of 10 GB used</p>
      </Flex>
    </div>
  ) : (
    <div className="sm:pt-5 sm:px-5 p-0">
      <CreateNoteFolder />
    </div>
  );
};

export default NoteSidebar;
