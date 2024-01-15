import { Button, Input, Slider, Typography } from "antd";
import sparkleIcon from "../assets/sparkle-icon.svg";

function AudioDrawer() {
  return (
    <div className="p-9 flex flex-col justify-between flex-1 bg-[#024264] h-full">
      <div className="flex flex-col gap-14">
        <div className="">
          <Typography.Paragraph className="!text-white !text-lg !mb-2">
            Content Title
          </Typography.Paragraph>

          <Input
            size="large"
            className="!border-t-0 !border-l-0 !border-r-0 !border-b-white !bg-transparent !shadow-none !rounded-none text-white"
          />
        </div>

        <div className="">
          <Typography.Paragraph className="!text-white !text-lg">
            Voice Type
          </Typography.Paragraph>

          <Button
            type="Text"
            size="large"
            block
            className="!h-14 opacity-90 bg-[#FFFFFFE5]"
          >
            Tony-Professional
          </Button>
        </div>

        <div className="flex gap-4 items-center">
          <Typography.Paragraph className="!text-white !text-lg !mb-0">
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
          <Typography.Paragraph className="!text-white !text-lg !mb-0">
            Speed
          </Typography.Paragraph>
          <Slider
            defaultValue={1}
            max={16}
            tooltip={{ formatter: null }}
            className="flex-1"
          />
        </div>
      </div>

      <Button
        block
        type="primary"
        size="large"
        className="bg-[#40A9E8] !h-16 !text-lg"
      >
        <div className="flex items-center justify-center gap-2">
          <img className="h-7 aspect-square" src={sparkleIcon} />
          <Typography.Text className="text-white text-lg">
            Generate Audio
          </Typography.Text>
        </div>
      </Button>
    </div>
  );
}

export default AudioDrawer
