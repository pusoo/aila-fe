import { Button, Flex, Input, message } from "antd";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAxios from "../api/authAxios";
import { API_URL } from "../config";
import useNoteContext from "../hooks/useNoteContext";

const UrlForm = ({ closeModal = () => { } }) => {
  const queryClient = useQueryClient();
  const { setSelectedNote } = useNoteContext()

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const mutation = useMutation({
    mutationFn: (url) => {
      return authAxios.post(
        `${API_URL}/notes/youtube`,
        {
          title,
          url,
        },
      );
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setSelectedNote(data)
    },
  });

  function validateYouTubeUrl(url) {
    const regExp = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
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
        Enter a valid Youtube URL:


      </p>
      <Flex vertical>
        <Input
          placeholder="Enter youtube url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          type="primary"
          htmlType="submit"
          style={{ alignSelf: "end", marginTop: 8 }}
          loading={loading}
          disabled={!title.trim() || !validateYouTubeUrl(url)}
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default UrlForm;
