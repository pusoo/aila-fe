import { Card, Typography } from "antd";

import CreateNoteModal from "./CreateNoteModal";
import useNoteContext from "../hooks/useNoteContext";

const NoteSidebar = () => {
  const { notes, setSelectedNote, selectedNote } = useNoteContext();
  return (notes || []).length > 0 ? (
    <div className="flex flex-col gap-2  text-gray-800 text-sm pt-8 px-3 pb-3.5">
      <CreateNoteModal />

      {(notes || []).map((note) => {
        return (
          <Card
            key={note._id}
            bodyStyle={{
              cursor: "pointer",
              padding: "0 10px",
              display: "flex",
              alignItems: "center",
              height: "40px",
              border: 0,
            }}
            className={`rounded-none  ${
              selectedNote && note._id === selectedNote._id
                ? "bg-sky-100 border-t-0 border-b-0 border-l-0 border-r-4 border-sky-500"
                : "border-none"
            }`}
            onClick={() => {
              setSelectedNote(note);
            }}
          >
            <Typography.Title level={5} className="!mb-0">
              {note.title}
            </Typography.Title>
          </Card>
        );
      })}
    </div>
  ) : (
    <div className="mt-12 px-6">
      <CreateNoteModal />
    </div>
  );
};

export default NoteSidebar;
