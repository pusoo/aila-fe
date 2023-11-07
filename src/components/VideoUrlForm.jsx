import { Button, Flex, Input } from "antd";
import { useState } from "react";
import { TOKEN } from "../config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const VideoUrlForm = () => {
  const [url, setUrl] = useState("");

  const mutation = useMutation({
    mutationFn: (url) => {
      return axios.post(
        "http://localhost:3000/v1/notes/video",
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

  const handleSubmitPdfUrl = (e) => {
    e.preventDefault();
    mutation.mutateAsync(url);
  };

  return (
    <form onSubmit={handleSubmitPdfUrl}>
      <label>Video Url</label>
      <Flex>
        <Input
          placeholder="Enter video url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default VideoUrlForm;
