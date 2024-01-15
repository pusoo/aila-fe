import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Input, Upload, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { API_URL } from "../config";
import {
  FilePdfOutlined,
  VideoCameraOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import authAxios from "../api/authAxios";
import useNoteContext from "../hooks/useNoteContext";
const { Dragger } = Upload;

const UploadForm = ({ type = "pdf", closeModal = () => { } }) => {
  const queryClient = useQueryClient();
  const { setSelectedNote } = useNoteContext()

  const [file, setFile] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (url) => {
      return authAxios.post(`${API_URL}/notes/${type}`, {
        title,
        url,
      });
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setSelectedNote(data)
    },
  });

  const handleSubmitUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    setLoading(true);
    try {
      const { data } = await authAxios.get(
        `http://localhost:3000/v1/uploads/s3-signed-url?fileName=${file.name}&fileType=${file.type}`
      );

      const { signedRequest, url } = data;
      console.log({ data });
      await axios.put(signedRequest, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      await mutation.mutateAsync(url);

      message.success("Note created successfully!");
      closeModal();
      setFile([]);
      setTitle("");
    } catch (err) {
      message.error("Note creation failed!");
    } finally {
      setLoading(false);
    }
  };

  const acceptMap = {
    pdf: "application/pdf",
    video: "video/mp4,video/x-m4v,video/*",
    audio: "audio/mp3,audio/*",
  };

  // const labelMap = {
  //   pdf: "PDF",
  //   video: "Video",
  //   audio: "Audio",
  // };

  const iconMap = {
    pdf: FilePdfOutlined,
    video: VideoCameraOutlined,
    audio: AudioOutlined,
  };

  const Icon = iconMap[type];
  return (
    <form
      onSubmit={handleSubmitUpload}
      style={{
        marginTop: 16,
      }}>
      <p style={{ marginBottom: 4 }}>Note:</p>
      <Input
        placeholder="Enter note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Dragger
        {...{
          name: "file",
          multiple: false,
          accept: acceptMap[type],
          onChange(e) {
            console.log(e);
            if (e.fileList[0]) {
              setFile(e.fileList[0].originFileObj);
            }
          },
          beforeUpload() {
            return false;
          },
          maxCount: 1,
          style: {
            marginTop: 8,
            // marginBottom: 16,
          },
        }}>
        <p className="ant-upload-drag-icon" style={{ marginTop: 32 }}>
          <Icon />
        </p>
        <p className="ant-upload-text" style={{ marginBottom: 32 }}>
          Click or drag a {type} file to this area to upload
        </p>
        {/* <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p> */}
      </Dragger>

      <Flex justify="end">
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginTop: 8 }}
          loading={loading}
          disabled={!title.trim() || !file}>
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default UploadForm;
