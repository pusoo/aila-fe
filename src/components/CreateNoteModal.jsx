import { useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { Flex, Button, Modal, Drawer, Typography, Menu } from "antd";
import {
  FilePdfOutlined,
  VideoCameraOutlined,
  AudioOutlined,
  YoutubeOutlined,
  FontSizeOutlined,
  GlobalOutlined,
  FormOutlined,
} from "@ant-design/icons";
const { Text } = Typography;
import YoutubeUrlForm from "./YoutubeUrlForm";
import TextForm from "./TextForm";
import UrlForm from "./UrlForm";
import UploadForm from "./UploadForm";

function CreateNoteModal() {
  const [openModal, setOpenModal] = useState(false);
  const [openChildrenDrawer, setChildrenDrawer] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const { width: screenWidth } = useWindowSize();

  const showModal = () => setOpenModal(true);
  const hideModal = () => setOpenModal(false);
  const showChildrenDrawer = () => setChildrenDrawer(true);
  const hideChildrenDrawer = () => setChildrenDrawer(false);

  const noteTypes = [
    {
      name: "PDF",
      Icon: FilePdfOutlined,
    },
    {
      name: "Video",
      Icon: VideoCameraOutlined,
    },
    {
      name: "Audio",
      Icon: AudioOutlined,
    },
    {
      name: "Youtube",
      Icon: YoutubeOutlined,
    },
    {
      name: "URL",
      Icon: GlobalOutlined,
    },
    {
      name: "Text",
      Icon: FontSizeOutlined,
    },
  ];

  return (
    <>
      <Button
        className="flex flex-1 items-center w-full h-full max-w-96 rounded-xl py-4 px-5 border-solid border-2 !bg-transparent border-tertiary hover:!border-[#359EDD] sm:w-full"
        onClick={showModal}
      >
        <Flex gap={15}>
          <FormOutlined className="text-primary text-xl" />
          <Flex vertical className="text-left">
            <Text strong>Create Note</Text>
            <Text type="secondary">Start your notes on a blank page</Text>
          </Flex>
        </Flex>
      </Button>
      {screenWidth < 640 ? (
        <Drawer
          open={openModal}
          onClose={hideModal}
          placement="bottom"
          className="rounded-t-2xl"
          height="fit-content"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <p style={{ marginBottom: 8 }}>
              Please select the type of content:
            </p>
            <Menu>
              {noteTypes.map(({ name, Icon }) => {
                return (
                  <Menu.Item
                    key={name}
                    style={{
                      borderColor:
                        name === selectedType
                          ? "rgba(61, 142, 242, 0.992)"
                          : "#8C8F92",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      gap: "10px",
                      padding: "5px",
                    }}
                    onClick={() => {
                      setSelectedType(name);
                      showChildrenDrawer();
                    }}
                  >
                    <span className="flex items-center gap-1">
                      <Icon
                        style={{
                          color:
                            name === selectedType
                              ? "rgba(61, 142, 242, 0.992)"
                              : "#8C8F92",
                          fontSize: "16px",
                          backgroundColor: "#F2F8F7",
                          borderRadius: "50%",
                          padding: "10px",
                        }}
                      />
                      <span className="text-base">{name}</span>
                    </span>
                  </Menu.Item>
                );
              })}
            </Menu>
            {/* <UploadImageForm /> */}
          </div>
          <Drawer
            open={openChildrenDrawer}
            onClose={hideChildrenDrawer}
            closable={false}
            placement="bottom"
            height="fit-content"
          >
            {selectedType === "PDF" && (
              <UploadForm
                type="pdf"
                closeModal={() => {
                  setOpenModal(false);
                }}
              />
            )}
            {selectedType === "Video" && (
              <UploadForm
                type="video"
                closeModal={() => {
                  setOpenModal(false);
                }}
              />
            )}
            {selectedType === "Audio" && (
              <UploadForm
                type="audio"
                closeModal={() => {
                  setOpenModal(false);
                }}
              />
            )}
            {selectedType === "Youtube" && (
              <YoutubeUrlForm
                closeModal={() => {
                  setOpenModal(false);
                }}
              />
            )}
            {selectedType === "Text" && (
              <TextForm
                closeModal={() => {
                  setOpenModal(false);
                }}
              />
            )}
            {selectedType === "URL" && (
              <UrlForm
                closeModal={() => {
                  setOpenModal(false);
                }}
              />
            )}
          </Drawer>
        </Drawer>
      ) : (
        <Modal
          title="Create Note"
          open={openModal}
          onCancel={hideModal}
          footer={null}
          header={<h2>M</h2>}
          centered
          width="fit-content"
        >
          <div className="flex flex-col gap-4">
            <Flex gap={8} vertical>
              <p>Please select the type of content:</p>
              <div className="flex justify-center gap-2">
                {noteTypes.map(({ name, Icon }) => {
                  return (
                    <Button
                      key={name}
                      style={{
                        borderColor:
                          name === selectedType
                            ? "rgba(61, 142, 242, 0.992)"
                            : "#8C8F92",
                        display: "flex",
                        alignItems: "center",
                        padding: "3px 18px",
                        height: "100%",
                      }}
                      onClick={() => setSelectedType(name)}
                    >
                      <span className="text-lg">
                        <Icon
                          style={{
                            color:
                              name === selectedType
                                ? "rgba(61, 142, 242, 0.992)"
                                : "#8C8F92",
                          }}
                        />
                      </span>
                    </Button>
                  );
                })}
              </div>
            </Flex>

            {selectedType === "PDF" && (
              <UploadForm
                type="pdf"
                closeModal={() => {
                  setOpenModal(false);
                }}
              />
            )}
            {selectedType === "Video" && (
              <UploadForm
                type="video"
                closeModal={() => {
                  setOpenModal(false);
                }}
              />
            )}
            {selectedType === "Audio" && (
              <UploadForm
                type="audio"
                closeModal={() => {
                  setOpenModal(false);
                }}
              />
            )}
            {selectedType === "Youtube" && (
              <YoutubeUrlForm
                closeModal={() => {
                  setOpenModal(false);
                }}
              />
            )}
            {selectedType === "Text" && (
              <TextForm
                closeModal={() => {
                  setOpenModal(false);
                }}
              />
            )}
            {selectedType === "URL" && (
              <UrlForm
                closeModal={() => {
                  setOpenModal(false);
                }}
              />
            )}

            {/* <UploadImageForm /> */}
          </div>
        </Modal>
      )}
    </>
  );
}

export default CreateNoteModal;
