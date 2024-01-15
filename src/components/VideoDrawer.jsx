import { Avatar, Button, Input, Slider, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";

import authAxios from "../api/authAxios";
import { API_URL } from "../config";
import UploadModal from "./UploadModal";
import sparkleIcon from "../assets/sparkle-icon.svg";

function VideoDrawer() {
  const { data: uploads } = useQuery({
    queryKey: ["avatars"],
    queryFn: async () => {
      const { data } = await authAxios.get(`${API_URL}/uploads`);
      return data;
    },
    staleTime: Infinity,
  });


  return (
    <div className="p-9 flex flex-col justify-between flex-1 bg-[#024264]">
      <div className="flex flex-col gap-10">
        <div className="">
          <Typography.Paragraph className="!text-white !text-md !mb-2">
            Content Title
          </Typography.Paragraph>

          <Input
            size="large"
            className="!border-t-0 !border-l-0 !border-r-0 !border-b-white !bg-transparent !shadow-none !rounded-none text-white"
          />
        </div>

        <div className="">
          <Typography.Paragraph className="!text-white !text-md">
            Voice Type
          </Typography.Paragraph>

          <Button
            type="Text"
            size="large"
            block
            className=" opacity-90 bg-[#FFFFFFE5]"
          >
            Tony-Professional
          </Button>
        </div>

        <div className="flex gap-4 items-center">
          <Typography.Paragraph className="!text-white !text-md !mb-0">
            Pitch
          </Typography.Paragraph>
          <Slider
            defaultValue={1}
            max={16}
            tooltip={{ formatter: null }}
            className="flex-1"
          />
        </div>

        <div className="flex gap-4 items-center">
          <Typography.Paragraph className="!text-white !text-md !mb-0">
            Speed
          </Typography.Paragraph>
          <Slider
            defaultValue={1}
            max={16}
            tooltip={{ formatter: null }}
            className="flex-1"
          />
        </div>

        <div className="">
          <Typography.Paragraph className="!text-white !text-md">
            Avatar
          </Typography.Paragraph>
          <Button
            type="Text"
            size="large"
            block
            className="!h-14 opacity-90 bg-[#FFFFFFE5] flex items-center gap-2 "
          >
            <div className="flex gap-3">
              {uploads && Array.isArray(uploads.results) ? uploads.results.map(upload => <Avatar key={upload._id} size={40} src={upload.url}></Avatar>
              ) : null}

            </div>
            <UploadModal />
          </Button>
        </div>

        <div className="">
          <Typography.Paragraph className="!text-white !text-md">
            Background Color
          </Typography.Paragraph>
          <Button
            type="Text"
            size="large"
            block
            className="!h-full !max-h-[3rem] opacity-90 bg-[#FFFFFFE5] flex items-center justify-between"
          >
            <div className="">Select Color</div>

            <div className="h-8 w-8 bg-stone-600"></div>
          </Button>
        </div>
      </div>

      <Button
        block
        type="primary"
        size="large"
        className="bg-[#40A9E8]  !text-md !h-full !max-h-[3.5rem]"
      >
        <div className="flex items-center justify-center gap-2">
          <img className="h-8 aspect-square" src={sparkleIcon} />
          <Typography.Text className="text-white text-lg">
            Generate Video
          </Typography.Text>
        </div>
      </Button>
    </div>
  );
}

export default VideoDrawer