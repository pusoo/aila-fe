import { useMutation } from "@tanstack/react-query";
import { Button, Flex } from "antd";
import axios from "axios";
import { useState } from "react";
import { TOKEN } from "../config";

const UploadForm = ({ type = "pdf" }) => {
  const [file, setFile] = useState(null);

  const mutation = useMutation({
    mutationFn: (url) => {
      return axios.post(
        `http://localhost:3000/v1/notes/${type}`,
        {
          title: (+new Date()).toString(),
          url,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
    },
  });

  const handleSubmitUploadPdf = async (e) => {
    e.preventDefault();

    console.log({ file });
    if (!file) {
      return;
    }

    const { data } = await axios.get(
      `http://localhost:3000/v1/uploads?fileName=${file.name}&fileType=${file.type}`
    );

    const { signedRequest, url } = data;
    console.log({ data });
    await axios.put(signedRequest, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    await mutation.mutateAsync(url);
  };

  const acceptMap = {
    pdf: "application/pdf",
    video: "video/mp4,video/x-m4v,video/*",
    audio: "audio/mp3,audio/*;capture=microphone",
  };

  return (
    <form onSubmit={handleSubmitUploadPdf}>
      <label>Upload {type}</label>
      <Flex>
        <input
          placeholder={`Upload ${type}`}
          type="file"
          accept={acceptMap[type]}
          name="pdf"
          onChange={(e) => {
            console.log(e.target.files);
            if (e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default UploadForm;
