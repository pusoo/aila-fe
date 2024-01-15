import NoteSidebar from "../../components/NoteSidebar";
import NoteMainContent from "../../components/NoteMainContent";
import NoteChatSidebar from "../../components/NoteChatSidebar";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import useNoteContext from "../../hooks/useNoteContext";

function Notes() {
  const [showNoteTab, setShowNoteTab] = useState(true);
  const toggleNoteTab = () => setShowNoteTab((prev) => !prev);
  const { selectedNote } = useNoteContext();

  const [showChatTab, setShowChatTab] = useState(true);
  const toggleChatTab = () => setShowChatTab((prev) => !prev);

  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden">
      {/* Note Sidebar */}
      <Sidebar showTab={showNoteTab} width={"260px"} toggleTab={toggleNoteTab}>
        <NoteSidebar />
      </Sidebar>
      {/* Content */}
      <NoteMainContent
        showNoteTab={showNoteTab}
        showChatTab={showChatTab}
        toggleNoteTab={toggleNoteTab}
        toggleChatTab={toggleChatTab}
      />
      {/* Chat Sidebar*/}
      {selectedNote && <Sidebar
        showTab={showChatTab}
        width={"350px"}
        toggleTab={toggleChatTab}
        position="bottom"
      >
        <NoteChatSidebar toggleTab={toggleChatTab} />
      </Sidebar>}

    </div>
  );
}

export default Notes;
