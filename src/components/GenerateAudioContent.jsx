
import { Input, Typography } from "antd";

function GenerateAudioContent() {
  return (
    <>
      <div className="basis-3/12 bg-[#E2E2E2] flex justify-center items-center p-8 ">
        <audio controls style={{ width: "60%" }}>
          <source
            src={"https://samplelib.com/lib/preview/mp3/sample-3s.mp3"}
            type="audio/mp3"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="basis-9/12 bg-[#F5F5F5] flex flex-col justify-center items-center p-8">
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

export default GenerateAudioContent
