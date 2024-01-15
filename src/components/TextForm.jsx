import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Input, message } from "antd";
import { useState } from "react";

import authAxios from "../api/authAxios";
import { API_URL } from "../config";
import useNoteContext from "../hooks/useNoteContext";

const TextForm = ({ closeModal = () => { } }) => {
  const queryClient = useQueryClient();
  const { setSelectedNote } = useNoteContext()
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState("");

  const mutation = useMutation({
    mutationFn: (transcription) => {
      return authAxios.post(
        `${API_URL}/notes/text`,
        {
          title,
          transcription,
        },
      );
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setSelectedNote(data)
    },
  });

  const handleSubmitText = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await mutation.mutateAsync(transcription);
      message.success("Note created successfully!");
      closeModal();
      setTranscription("");
      setTitle("");
    } catch (err) {
      console.log("dito")
      message.error("Note creation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitText} style={{ marginTop: 16 }}>
      <p style={{ marginBottom: 4 }}>Note:</p>
      <Input
        placeholder="Enter note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p style={{ marginBottom: 4, marginTop: 8 }}>Enter transcription:</p>
      <Flex vertical>
        <Input.TextArea
          value={transcription}
          rows={10}
          onChange={(e) => setTranscription(e.target.value)}
        />
        <Button
          type="primary"
          htmlType="submit"
          style={{ alignSelf: "end", marginTop: 8 }}
          loading={loading}
          disabled={!title.trim() || !transcription.trim()}
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default TextForm;
