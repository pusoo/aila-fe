import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Note from "./components/Note";
import ChatBox from "./components/ChatBox";
import { Button, Flex } from "antd";
import CreateNoteModal from "./components/CreateNoteModal";
import { TOKEN } from "./config";

function App() {
  const [selectedNote, setSelectedNote] = useState(null);

  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/v1/notes?limit=1000",
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      return data.results;
    },
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <aside style={{ width: "350px", background: "#fafafa" }}>
        <CreateNoteModal />
        <Flex gap="middle" vertical>
          {(notes || []).map((note) => {
            return (
              <Flex key={note._id} vertical>
                <h4>
                  {note.title} ({note.type})
                </h4>
                <div>
                  <Button
                    onClick={() => {
                      setSelectedNote(note);
                    }}
                  >
                    Select
                  </Button>
                </div>
              </Flex>
            );
          })}
        </Flex>
      </aside>
      <main style={{ flex: 1, padding: 10 }}>
        <Note note={selectedNote} />
      </main>
      <aside style={{ width: "350px", background: "#fafafa" }}>
        <ChatBox note={selectedNote} />
      </aside>
    </div>
  );
}

export default App;
