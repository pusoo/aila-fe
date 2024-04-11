import { Flex } from "antd";
import useNoteContext from "../hooks/useNoteContext";
import ChatBox from "./ChatBox";
import Typography from "antd/es/typography/Typography";
import { useWindowSize } from "../hooks/useWindowSize";
import { CloseOutlined } from "@ant-design/icons";

const NoteChatSidebar = ({ toggleTab }) => {
  const { selectedNote } = useNoteContext();
  const { width: screenWidth } = useWindowSize();
  const isMobile = screenWidth < 640;

  return (
    selectedNote && (
      <div className="flex flex-col gap-2 pb-2 text-sm h-full">
        <div className="flex items-center justify-center sm:justify-start !h-[50px] relative">
          <Typography.Title
            className="!mb-0 px-3 sm:level-3 !text-2xl sm:!text-base"
          >
            Chat
          </Typography.Title>

          <CloseOutlined
            className="block sm:hidden absolute left-2 sm:left-4 text-xl"
            onClick={toggleTab}
          />
        </div>

        <Flex
          vertical
          className="flex-1"
          style={{
            width: isMobile ? "100%" : "280px",
            padding: isMobile ? "0px" : "16px",
            height: "100%",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <ChatBox note={selectedNote} />
        </Flex>
      </div>
    )
  );
};

export default NoteChatSidebar;
