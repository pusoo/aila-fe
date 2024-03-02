import { useState } from "react";
import { Button, Modal, Flex } from "antd";
import {
  FilePdfOutlined,
  VideoCameraOutlined,
  AudioOutlined,
  YoutubeOutlined,
  FontSizeOutlined,
  GlobalOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import YoutubeUrlForm from "./YoutubeUrlForm";
import TextForm from "./TextForm";
import UrlForm from "./UrlForm";
import UploadForm from "./UploadForm";

function EmptyStateCreateNoteButton() {
  const [openModal, setOpenModal] = useState(false);
  const showModal = () => setOpenModal(true);
  const hideModal = () => setOpenModal(false);

  const [selectedType, setSelectedType] = useState(null);

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
        onClick={showModal}
        className="bg-primary hover:!bg-[#359EDD] hover:!text-white border-primary text-white h-9"
      >
        <PlusOutlined />
        Create Note
      </Button>
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
    </>
  );
}

export default EmptyStateCreateNoteButton;
