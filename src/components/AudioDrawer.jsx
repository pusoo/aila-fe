import { Flex, Button, Input, Slider, Typography } from "antd";
import sparkleIcon from "../assets/sparkle-icon.svg";

function AudioDrawer() {
  return (
    <div className="px-3 sm:px-7 py-3 sm:py-7 flex flex-col justify-between flex-1 bg-white h-full">
      <div className="flex flex-col justify-between gap-6 sm:gap-3">
        <div>
          <Typography.Paragraph className="!mb-2 !text-base sm:!text-sm">
            Content Title
          </Typography.Paragraph>

          <Input className="!border-t-0 !border-l-0 !border-r-0 !bg-transparent !rounded-none" />
        </div>

        <Flex vertical gap={10}>
          <Flex vertical>
            <Typography.Paragraph className="!mb-2 !text-base sm:!text-sm">
              Voice Type
            </Typography.Paragraph>
            <Button
              type="Text"
              size="large"
              block
              className="!h-11 opacity-90 border-primary !text-base sm:!text-sm"
            >
              Tony-Professional
            </Button>
          </Flex>
          <Flex vertical>
            <div className="flex gap-3 justify-center items-center">
              <Typography.Paragraph className="!mb-2 !text-base sm:!text-sm">
                Pitch
              </Typography.Paragraph>
              <Slider
                defaultValue={1}
                max={16}
                tooltip={{ formatter: null }}
                className="flex-1"
              />
            </div>

            <div className="flex gap-3 justify-center items-center">
              <Typography.Paragraph className="!mb-2 !text-base sm:!text-sm">
                Speed
              </Typography.Paragraph>
              <Slider
                defaultValue={1}
                max={16}
                tooltip={{ formatter: null }}
                className="flex-1"
              />
            </div>
          </Flex>
        </Flex>
      </div>

      <Button
        block
        type="primary"
        size="large"
        className="bg-primary hover:!bg-[#359EDD] h-12 sm:h-11"
      >
        <div className="flex items-center justify-center gap-2">
          <img className="h-5 aspect-square" src={sparkleIcon} />
          <Typography.Text className="text-white text-base sm:!text-base">
            Generate Audio
          </Typography.Text>
        </div>
      </Button>
    </div>
  );
}

export default AudioDrawer;
