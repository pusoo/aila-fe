import { Button, Flex, Input, message } from "antd";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAxios from "../api/authAxios";
import { API_URL } from "../config";

const UrlForm = ({ closeModal = () => { } }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const mutation = useMutation({
    mutationFn: (url) => {
      return authAxios.post(
        `${API_URL}/notes/url`,
        {
          title,
          url,
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  function validateUrl(url) {
    const regExp =
      /^(http(s)?:\/\/)?(www\.)?([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-z]{2,}(:[0-9]+)?(\/.*)?$/;
    return regExp.test(url);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await mutation.mutateAsync(url);

      message.success("Note created successfully!");
      closeModal();
      setUrl("");
      setTitle("");
    } catch (err) {
      message.error("Note creation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <p style={{ marginBottom: 4 }}>Note:</p>
      <Input
        placeholder="Enter note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p style={{ marginBottom: 4, marginTop: 8 }}>
        Enter a valid website URL:
      </p>
      <Flex vertical>
        <Input
          placeholder="Enter site url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          type="primary"
          htmlType="submit"
          style={{ alignSelf: "end", marginTop: 8 }}
          loading={loading}
          disabled={!title.trim() || !validateUrl(url)}
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default UrlForm;
