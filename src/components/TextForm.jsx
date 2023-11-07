import { useMutation } from "@tanstack/react-query";
import { Button, Flex } from "antd";
import { useState } from "react";
import { TOKEN } from "../config";
import axios from "axios";

const TextForm = () => {
  const [transcription, setTranscription] = useState("");

  const mutation = useMutation({
    mutationFn: (transcription) => {
      return axios.post(
        "http://localhost:3000/v1/notes/text",
        {
          title: (+new Date()).toString(),
          transcription,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
    },
  });

  const handleSubmitText = async (e) => {
    e.preventDefault();

    await mutation.mutateAsync(transcription);
  };

  return (
    <form onSubmit={handleSubmitText}>
      <label>Text</label>
      <Flex>
        <textarea
          placeholder="Enter text"
          name="text"
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          rows={3}
        />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default TextForm;
