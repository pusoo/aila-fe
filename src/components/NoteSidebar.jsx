import { Card, Typography, Flex } from "antd";
import CreateNoteFolder from "./CreateNoteFolder";
import useNoteContext from "../hooks/useNoteContext";

const NoteSidebar = () => {
  const { notes, setSelectedNote, selectedNote } = useNoteContext();

  return (notes || []).length > 0 ? (
    <div className="sm:mt-5 sm:mx-5 p-0">
      <CreateNoteFolder />

      <Flex vertical className="mt-5">
        {(notes || []).map((note) => {
          return (
            <Card
              key={note._id}
              style={{
                cursor: "pointer",
                padding: "0",
                display: "flex",
                alignItems: "center",
                height: "40px",
                border: 0,
              }}
              className={`rounded-lg  ${
                selectedNote && note._id === selectedNote._id
                  ? "bg-tertiary"
                  : "bg-transparent"
              }`}
              onClick={() => {
                setSelectedNote(note);
              }}
            >
              <Typography.Title level={5} className="!mb-0 truncate w-[11rem]">
                {note.title}
              </Typography.Title>
            </Card>
          );
        })}
      </Flex>
    </div>
  ) : (
    <div className="sm:pt-5 sm:px-5 p-0">
      <CreateNoteFolder />
    </div>
  );
};

export default NoteSidebar;
