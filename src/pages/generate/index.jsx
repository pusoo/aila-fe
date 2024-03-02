import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Button, Layout } from "antd";
import { LeftOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import authAxios from "../../api/authAxios";
import { API_URL } from "../../config";

import Sidebar from "../../components/Sidebar";
import VideoDrawer from "../../components/VideoDrawer";
import GenerateVideoContent from "../../components/GenerateVideoContent";
import AudioDrawer from "../../components/AudioDrawer";
import GenerateAudioContent from "../../components/GenerateAudioContent";
import logo from "../../assets/aila-logo.svg";

const Generate = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [searchParams] = useSearchParams();
  const toggleTab = () => setShowTab((prev) => !prev);
  const { Header } = Layout;
  const genType = searchParams.get("type");

  const [currentNote, setCurrentNote] = useState(null);
  const [showTab, setShowTab] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [mediaVideo, setMediaVideo] = useState(null);

  const { data: note } = useQuery({
    queryKey: ["notes", noteId],
    queryFn: async () => {
      const { data } = await authAxios.get(`${API_URL}/notes/${noteId}`);
      return data;
    },
    staleTime: 0,
  });

  const { data: response } = useQuery({
    queryKey: ["video-status", noteId],
    queryFn: async () => {
      if (!note.media && !note.media.video && !note.media.video.media) return;
      const { data } = await authAxios.get(
        `${API_URL}/heygens/${note.media.video.media}/status`
      );
      return data;
    },
    staleTime: 0,
    refetchInterval: isComplete === false ? 2000 : false,
    enabled: isComplete === false,
  });

  const { data: video } = useQuery({
    queryKey: ["video", noteId],
    queryFn: async () => {
      if (!note.media && !note.media.video && !note.media.video.media) return;
      const { data } = await authAxios.get(
        `${API_URL}/medias/${note.media.video.media}`
      );
      return data;
    },
    staleTime: 0,
    enabled: isComplete,
  });

  useEffect(() => {
    if (response && response.status === "completed") {
      setIsComplete(true);
      setIsFetching(true);
    } else {
      setIsComplete(false);
      setIsFetching(false);
    }
  }, [response]);

  useEffect(() => {
    if (note) {
      setCurrentNote(note);
    }
  }, [note]);

  useEffect(() => {
    if (video) {
      setMediaVideo(video);
    }
  }, [video]);

  if (!note) {
    return <>No notes</>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header className="flex items-center justify-between bg-white py-4 px-7 sm:px-12">
        <div className="logo bg-white mr-5 flex items-center gap-8">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              navigate("/notes");
            }}
          ></Button>
        </div>

        <Button type="primary" className="bg-primary hover:!bg-[#359EDD]">
          Submit
        </Button>
      </Header>

      <div className="flex flex-1 w-full bg-generateBackground">
        <Sidebar showTab={showTab} width={"320px"} toggleTab={toggleTab}>
          <div className="flex h-full">
            {genType === "audio" ? (
              <AudioDrawer />
            ) : (
              <VideoDrawer note={currentNote} setNote={setCurrentNote} />
            )}
          </div>
        </Sidebar>
        <div className="flex-1 flex flex-col relative">
          {genType === "audio" ? (
            <GenerateAudioContent />
          ) : (
            <GenerateVideoContent
              note={currentNote}
              setNote={setCurrentNote}
              video={mediaVideo}
            />
          )}
          <div className="fixed left-0 top-1/2 z-40" onClick={toggleTab}>
            {showTab ? (
              <div
                className="hidden sm:block py-4 px-0.5 rounded-r-2xl cursor-pointer bg-white"
                style={{
                  transform:
                    "translateX(328px) translateY(-50%) rotate(0deg) translateZ(0px)",
                }}
              >
                <LeftOutlined className="text-[#C5C9CA] text-xs" />
              </div>
            ) : (
              <div
                className="py-5 px-0.5 rounded-l-2xl cursor-pointer bg-white"
                style={{
                  transform:
                    "translateX(0px) translateY(-50%) rotate(180deg) translateZ(0px)",
                }}
              >
                <LeftOutlined className="text-[#C5C9CA] text-xs" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
