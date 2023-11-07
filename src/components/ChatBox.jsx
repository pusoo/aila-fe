import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { TOKEN } from "../config";

function ChatBox({ note }) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
    setQuery("");
  }, [note]);

  const mutation = useMutation({
    mutationFn: (query) => {
      return axios.post(
        "http://localhost:3000/v1/notes/query",
        {
          id: note._id,
          query,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
    },
  });

  const handleSendQuery = async (query) => {
    setMessages((prevMessages) => {
      return [
        ...prevMessages,
        {
          sender: "me",
          message: query,
        },
      ];
    });
    setQuery("");
    const response = await mutation.mutateAsync(query);
    setMessages((prevMessages) => {
      return [
        ...prevMessages,
        {
          sender: "ai",
          message: response.data.response.trim(),
        },
      ];
    });
  };

  if (!note) {
    return null;
  }

  const senderMap = {
    ai: "AILA",
    me: "Me",
  };

  return (
    <Flex gap="middle" vertical>
      {messages.map((message, index) => {
        return (
          <p key={index}>
            {senderMap[message.sender]}: {message.message}
          </p>
        );
      })}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendQuery(query);
        }}
      >
        <Flex>
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            type="primary"
            htmlType="submit"
            disabled={mutation.isPending}
          >
            Send
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

export default ChatBox;
