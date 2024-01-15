import { Button, Flex, Input } from "antd";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import authAxios from "../api/authAxios";
import { API_URL } from "../config";

const AudioUrlForm = () => {
  const [url, setUrl] = useState("");

  const mutation = useMutation({
    mutationFn: (url) => {
      return authAxios.post(
        `${API_URL}/notes/audio`,
        {
          title: (+new Date()).toString(),
          url,
        },
      );
    },
  });

  const handleSubmitPdfUrl = (e) => {
    e.preventDefault();
    mutation.mutateAsync(url);
  };

  return (
    <form onSubmit={handleSubmitPdfUrl}>
      <label>Audio Url</label>
      <Flex>
        <Input
          placeholder="Enter audio url"
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

export default AudioUrlForm;
