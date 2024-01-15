import { Card, Typography } from "antd";
import { Link } from "react-router-dom";

import pdfIcon from "../assets/pdf-icon.png";
import audioIcon from "../assets/audio-icon.png";
import videoIcon from "../assets/video-icon.png";
import useNoteContext from "../hooks/useNoteContext";

const NotesCategory = () => {
  const { selectedNote } = useNoteContext();

  return (
    <div className="w-full gap-5 flex flex-col sm:flex-row px-8 sm:px-0">
      <Card
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
        }}
        className=" flex-1  bg-white border-[#d9d9d9] shadow border-dashed border-2 text-center cursor-pointer min-h-24 hover:scale-105 duration-200 ease-in-out"
        onClick={() => { }}
      >
        <div className="w-12 aspect-square">
          <img src={pdfIcon} alt="pdf icon" />
        </div>
        <Typography.Title level={4}>PDF</Typography.Title>
        <Typography.Text>
          Click to transform text into a document.
        </Typography.Text>
      </Card>
      <Link to={`/generate/${selectedNote._id}?type=audio`} className="flex-1">
        <Card
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
          }}
          className=" bg-white border-[#d9d9d9] h-full shadow border-dashed border-2 text-center cursor-pointer min-h-24 hover:scale-105 duration-200 ease-in-out"
        >
          <div className="w-12 aspect-square">
            <img src={audioIcon} alt="audio icon" />
          </div>
          <Typography.Title level={4}>Audio</Typography.Title>
          <Typography.Text>
            Convert your content into an engaging podcast.
          </Typography.Text>
        </Card>
      </Link>
      <Link to={`/generate/${selectedNote._id}?type=video`} className="flex-1">
        <Card
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
          }}
          className="  bg-white border-[#d9d9d9] shadow border-dashed border-2 text-center cursor-pointer min-h-24 hover:scale-105 duration-200 ease-in-out h-full"
        >
          <div className="w-12 aspect-square">
            <img src={videoIcon} alt="video icon" />
          </div>
          <Typography.Title level={4}>Video</Typography.Title>
          <Typography.Text>
            Transform your text into interactive content.
          </Typography.Text>
        </Card>
      </Link>
    </div>
  );
};

export default NotesCategory;
