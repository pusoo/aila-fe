import { useState } from "react";
import { Button, Modal, Flex, Input } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import { useWindowSize } from "../hooks/useWindowSize";
// const { Text } = Typography;

const CreateNoteFolder = () => {
  const [openModal, setOpenModal] = useState(false);
  // const showModal = () => setOpenModal(true);
  const hideModal = () => setOpenModal(false);

  const { width: screenWidth } = useWindowSize();

  return (
    <>
      {/* <Flex align="center" className="justify-between">
        <Text className="text-gray-500">Folders</Text>
        <Button
          shape="circle"
          size="small"
          icon={<PlusOutlined className="text-gray-500 w-3" />}
          onClick={showModal}
          className="bg-tertiary hover:!border-tertiary"
        />
      </Flex> */}
      {screenWidth < 640 ? (
        <Modal
          title="Create New Folder"
          open={openModal}
          onCancel={hideModal}
          footer={null}
          centered
          width="80%">
          <Flex gap="middle" vertical className="pt-2.5">
            <Input placeholder="Folder name" />
            <Button
              className="bg-primary text-white rounded-lg border-none"
              block
              size="large">
              Create
            </Button>
          </Flex>
        </Modal>
      ) : (
        <Modal
          title="Create New Folder"
          open={openModal}
          onCancel={hideModal}
          footer={null}
          width="25%"
          style={{
            top: 150,
          }}>
          <Flex gap="middle" vertical className="pt-2.5">
            <Input placeholder="Folder name" />
            <Button
              className="bg-primary hover:!bg-[#359EDD] hover:!text-white border-primary text-white h-9"
              block>
              Create
            </Button>
          </Flex>
        </Modal>
      )}
    </>
  );
};

export default CreateNoteFolder;
