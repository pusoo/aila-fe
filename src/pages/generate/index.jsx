import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, Layout } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
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
  const { noteId } = useParams()
  const [searchParams] = useSearchParams();

  const { data: note } = useQuery({
    queryKey: ["notes", noteId],
    queryFn: async () => {
      const { data } = await authAxios.get(
        `${API_URL}/notes/${noteId}`
      );
      return data;
    },
    staleTime: 0,
  });

  const [showTab, setShowTab] = useState(true);
  const toggleTab = () => setShowTab((prev) => !prev);
  const { Header } = Layout;
  const genType = searchParams.get("type");

  if (!note) {
    return <>No notes</>
  }

  return (
    <div className="flex flex-col h-screen">
      <Header className="flex items-center justify-between bg-white py-4">
        <div className="logo  bg-white mr-5 flex items-center">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              navigate("/notes");
            }}
          ></Button>
          <Link to="/notes" className="flex items-center justify-center">
            <img src={logo} className="w-60" />
          </Link>
        </div>

        <Button type="primary" size="large" className="bg-[#40A9E8]">
          Submit
        </Button>
      </Header>

      <div className="flex flex-1 w-full bg-gray-100">
        <Sidebar showTab={showTab} width={"350px"} toggleTab={toggleTab}>
          <div className="flex h-[calc(100vh-4rem)]">
            {genType === "audio" ? <AudioDrawer /> : <VideoDrawer />}
          </div>
        </Sidebar>
        <div className="flex-1 flex flex-col relative">
          {genType === "audio" ? (
            <GenerateAudioContent />
          ) : (
            <GenerateVideoContent />
          )}
          <div className="fixed left-0 top-1/2 z-40" onClick={toggleTab}>
            {showTab ? (
              <div
                className="hidden sm:block py-4 px-1 bg-[#024264] text-white rounded-full cursor-pointer"
                style={{
                  transform:
                    "translateX(340px) translateY(-50%) rotate(0deg) translateZ(0px)",
                }}
              >
                <ArrowLeftOutlined />
              </div>
            ) : (
              <div
                className="py-4 px-1 bg-[#024264] text-white rounded-full cursor-pointer"
                style={{
                  transform:
                    "translateX(0px) translateY(-50%) rotate(180deg) translateZ(0px)",
                }}
              >
                <ArrowLeftOutlined />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;



