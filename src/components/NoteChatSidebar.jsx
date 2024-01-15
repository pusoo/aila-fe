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
      <div
        className={`bg-slate-100 flex flex-col gap-2 pb-2  text-gray-800 text-sm shadow h-full`}
      >
        <div className="shadow flex items-center justify-center sm:justify-start !h-[50px] relative">
          <Typography.Title level={5} className="!mb-0 px-3">
            Chat
          </Typography.Title>

          <CloseOutlined
            className="block sm:hidden absolute left-4"
            onClick={toggleTab}
          />
        </div>

        <Flex
          vertical
          className="flex-1"
          style={{
            width: isMobile ? "100%" : "350px",
            padding: 16,
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
