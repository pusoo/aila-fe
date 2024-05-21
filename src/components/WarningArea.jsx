import { Button, Menu, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import EditNoteModal from "./EditNoteModal";

const WarningArea = ({ onDelete }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <EditNoteModal />
      </Menu.Item>
      <Menu.Item key="2" onClick={onDelete}>
        Archive
      </Menu.Item>
    </Menu>
  );

  return (
    // <Flex vertical className="gap-2">
    //   <EditNoteModal transcription={transcription} />
    //   <Button
    //     danger
    //     icon={<DeleteOutlined />}
    //     onClick={onDelete}
    //     className="h-9 !bg-transparent hover:!bg-transparent"
    //   >
    //     Delete Note
    //   </Button>
    // </Flex>

    <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
      <Button
        shape="circle"
        type="text"
        icon={<MoreOutlined />}
        className="border border-gray-400 text-gray-400 hover:!text-primary hover:border-primary hover:!bg-transparent"
      />
    </Dropdown>
  );
};

export default WarningArea;
