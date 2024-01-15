import { useState } from "react";
import { Button, Modal } from "antd";
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

function CreateNoteModal() {
  const [openModal, setOpenModal] = useState(false);
  const showModal = () => setOpenModal(true);
  const hideModal = () => setOpenModal(false);

  const [selectedType, setSelectedType] = useState(null);

  const noteTypes = [
    {
      name: "pdf",
      Icon: FilePdfOutlined,
    },
    {
      name: "video",
      Icon: VideoCameraOutlined,
    },
    {
      name: "audio",
      Icon: AudioOutlined,
    },
    {
      name: "youtube",
      Icon: YoutubeOutlined,
    },
    {
      name: "url",
      Icon: GlobalOutlined,
    },
    {
      name: "text",
      Icon: FontSizeOutlined,
    },
  ];

  return (
    <>
      <Button
        type="primary"
        block
        onClick={showModal}
        icon={<PlusOutlined />}
        className="bg-blue-400 h-12 sm:h-9 !w-full rounded-xl"
      >
        Create Note
      </Button>
      <Modal
        title="Create Note"
        open={openModal}
        onCancel={hideModal}
        footer={null}
        header={<h2>M</h2>}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <p style={{ marginBottom: 8 }}>Please select the type of content:</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
            }}
          >
            {noteTypes.map(({ name, Icon }) => {
              return (
                <Button
                  key={name}
                  style={{
                    borderColor:
                      name === selectedType
                        ? "rgba(61, 142, 242, 0.992)"
                        : "rgba(0, 0, 0, 0.88)",
                  }}
                  onClick={() => setSelectedType(name)}
                >
                  <span
                    style={{
                      fontSize: 16,
                    }}
                  >
                    <Icon
                      style={{
                        color:
                          name === selectedType
                            ? "rgba(61, 142, 242, 0.992)"
                            : "rgba(0, 0, 0, 0.88)",
                      }}
                    />
                  </span>
                </Button>
              );
            })}
          </div>

          {selectedType === "pdf" && (
            <UploadForm
              type="pdf"
              closeModal={() => {
                setOpenModal(false);
              }}
            />
          )}
          {selectedType === "video" && (
            <UploadForm
              type="video"
              closeModal={() => {
                setOpenModal(false);
              }}
            />
          )}
          {selectedType === "audio" && (
            <UploadForm
              type="audio"
              closeModal={() => {
                setOpenModal(false);
              }}
            />
          )}
          {selectedType === "youtube" && (
            <YoutubeUrlForm
              closeModal={() => {
                setOpenModal(false);
              }}
            />
          )}
          {selectedType === "text" && (
            <TextForm
              closeModal={() => {
                setOpenModal(false);
              }}
            />
          )}
          {selectedType === "url" && (
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

export default CreateNoteModal;
