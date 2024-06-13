import { Card, Typography, Flex, Progress } from "antd";
import { CloudOutlined } from "@ant-design/icons";
import CreateNoteFolder from "./CreateNoteFolder";
import useNoteContext from "../hooks/useNoteContext";

const NoteSidebar = () => {
  const { notes, setSelectedNote, selectedNote } = useNoteContext();

  const conicColors = {
    "0%": "#4285F4",
    "70%": "#FBBC05",
    "100%": "#EA4335",
  };

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
              className={`rounded-lg  ${
                selectedNote && note._id === selectedNote._id
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
          percent={50}
          // percentPosition={{
          //   align: "center",
          //   type: "outer",
          // }}
          size="small"
          strokeColor={conicColors}
          className="m-0"
        />
        <p>5 of 10 GB used</p>
      </Flex>
    </div>
  ) : (
    <div className="sm:pt-5 sm:px-5 p-0">
      <CreateNoteFolder />
    </div>
  );
};

export default NoteSidebar;
