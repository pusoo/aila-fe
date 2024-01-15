import { Button, Empty, Typography } from "antd";

const EmptyFile = () => {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 120 }}
      description={
        <Typography.Paragraph className=" !text-lg text-center max-w-[40ch] mx-auto !mt-12 !mb-6">
          Create your first PDF, audio, or video effortlessly and elevate your
          learning experience. Click to begin!
        </Typography.Paragraph>
      }
    >
      <Button type="primary" className="bg-blue-400 h-9 ">
        Create Now
      </Button>
    </Empty>
  );
};

export default EmptyFile;
