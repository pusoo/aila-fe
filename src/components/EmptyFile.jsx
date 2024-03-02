import { Empty, Typography } from "antd";

const EmptyFile = () => {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <Typography.Paragraph className=" !text-base text-center max-w-[40ch] mx-auto !mt-12 !mb-6 opacity-30">
          It looks like you don&apos;t have any files yet. <br /> Create your first
          PDF, audio, or video effortlessly to elevate your learning experience.
        </Typography.Paragraph>
      }
    ></Empty>
  );
};

export default EmptyFile;
