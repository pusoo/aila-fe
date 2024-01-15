import { Input, Typography } from "antd";

function GenerateVideoContent() {
  return (
    <>
      <div className="basis-3/6 bg-[#E2E2E2] flex justify-center items-center p-8 ">
        <video
          className="w-full max-w-[820px] h-full max-h-[15em]"
          autoPlay={false}
          controls={true}
        >
          <source
            src={"samplelib.com/lib/preview/mp4/sample-5s.mp4"}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="basis-3/6 bg-[#F5F5F5] flex justify-center items-center p-8">
        <div className="w-full max-w-3xl flex flex-col h-full">
          <Typography.Title level={3}>Summary</Typography.Title>
          <Input.TextArea
            autoSize
            className="w-full !max-w-[920px] flex-1"
          ></Input.TextArea>
        </div>
      </div>
    </>
  );
}

export default GenerateVideoContent
