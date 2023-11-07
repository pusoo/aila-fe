import { useState } from "react";
import { Button, Flex, Modal } from "antd";
import YoutubeUrlForm from "./YoutubeUrlForm";
import TextForm from "./TextForm";
import UploadImageForm from "./UploadImageForm";
import UrlForm from "./UrlForm";
import UploadForm from "./UploadForm";

function CreateNoteModal() {
  const [openModal, setOpenModal] = useState(false);
  const showModal = () => setOpenModal(true);
  const hideModal = () => setOpenModal(false);

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ marginTop: "10px" }}>
        Create Note
      </Button>

      <Modal
        title="Create Note"
        open={openModal}
        onCancel={hideModal}
        footer={null}
      >
        <Flex vertical gap="middle">
          {/* Upload PDF */}
          <UploadForm type="pdf" />
          {/* Upload PDF url */}
          {/* <PdfUrlForm /> */}
          {/* Upload Youtube url */}
          <YoutubeUrlForm />
          {/* Upload Video */}
          <UploadForm type="video" />
          {/* Video Url */}
          {/* <VideoUrlForm /> */}
          {/* Upload Audio */}
          <UploadForm type="audio" />
          {/* Audio Url */}
          {/* <AudioUrlForm /> */}
          {/* Text */}
          <TextForm />
          {/* Upload Image*/}
          <UploadImageForm />
          {/* Url */}
          <UrlForm />
        </Flex>
      </Modal>
    </>
  );
}

export default CreateNoteModal;
