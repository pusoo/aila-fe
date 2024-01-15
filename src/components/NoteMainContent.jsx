import { Empty, Flex, Tooltip, Typography } from "antd";

import useNoteContext from "../hooks/useNoteContext";
import Note from "./Note";
import CreateNoteModal from "./CreateNoteModal";
import cloudLogo from "../assets/cloud-backup.svg";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import robotIcon from "../assets/robot-icon.svg";
const NoteMainContent = ({
  showNoteTab,
  showChatTab,
  toggleNoteTab,
  toggleChatTab,
}) => {
  const { notes, setSelectedNote, selectedNote } = useNoteContext();

  return (
    <div className="flex flex-1 p-5 overflow-y-scroll relative">
      {(notes || []).length > 0 ? (
        selectedNote ? (
          <Note note={selectedNote} setNote={setSelectedNote} />
        ) : (
          <Flex
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Empty
              imageStyle={{ height: 160 }}
              description={<span>Please select a note</span>}
            ></Empty>
          </Flex>
        )
      ) : (
        <Flex
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Flex
            vertical
            gap={200}
            className="w-full md:w-[28.063rem] justify-end items-center h-full"
          >
            <div className="flex flex-col">
              <img src={cloudLogo} width={315} />
              <div className="flex flex-col gap-4">
                <Typography.Title
                  level={4}
                  className="!text-gray-600 text-center"
                >
                  Create Note
                </Typography.Title>
                <Typography.Text className="!text-sm text-center !text-gray-600">
                  Upload your educational materials for the chatbot to analyze
                  and simplify the uploaded materials. Use our convenient file
                  upload feature to streamline the process.
                </Typography.Text>
              </div>
            </div>

            <CreateNoteModal />
          </Flex>
        </Flex>
      )}
      <div className="fixed left-0 top-1/2 z-40" onClick={toggleNoteTab}>
        {showNoteTab ? (
          <div
            className="hidden sm:block py-4 px-1 bg-white rounded-full cursor-pointer"
            style={{
              transform:
                "translateX(250px) translateY(-50%) rotate(0deg) translateZ(0px)",
            }}
          >
            <ArrowLeftOutlined />
          </div>
        ) : (
          <div
            className=" py-4 px-1 bg-white rounded-full cursor-pointer"
            style={{
              transform:
                "translateX(0px) translateY(-50%) rotate(180deg) translateZ(0px)",
            }}
          >
            <ArrowLeftOutlined />
          </div>
        )}
      </div>

      {selectedNote && (
        <div className="fixed right-0 top-1/2 z-40" onClick={toggleChatTab}>
          {showChatTab ? (
            <div
              className="hidden sm:block py-4 px-1 bg-white rounded-full cursor-pointer"
              style={{
                transform:
                  "translateX(-340px) translateY(-50%) rotate(0deg) translateZ(0px)",
              }}
            >
              <ArrowRightOutlined />
            </div>
          ) : (
            <div
              className="hidden sm:block py-4 px-1 bg-white rounded-full cursor-pointer"
              style={{
                transform:
                  "translateX(0px) translateY(-50%) rotate(180deg) translateZ(0px)",
              }}
            >
              <ArrowRightOutlined />
            </div>
          )}
        </div>
      )}

      <Tooltip
        placement="left"
        title={"Need Help?"}
        onClick={toggleChatTab}
        className="block sm:hidden"
      >
        <div className="fixed h-12 w-12 bg-green-400 rounded-full p-1 bottom-10 right-6 cursor-pointer">
          <img src={robotIcon} alt="" className="h-10 w-10" />
        </div>
      </Tooltip>
    </div>
  );
};

export default NoteMainContent;
