import { Input, Typography } from "antd";

function GenerateAudioContent() {
  return (
    <>
      <div className="basis-5/12 bg-generateBackground flex justify-center items-center">
        <audio controls className="w-10/12 sm:w-8/12">
          <source
            src={"https://samplelib.com/lib/preview/mp3/sample-3s.mp3"}
            type="audio/mp3"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="basis-8/12 flex justify-center items-end bg-generateBackground">
        <div className="w-full h-full bg-white xl:w-[53.125rem] 2xl:w-[65rem] p-5 mb-5 mx-5 sm:mx-0 rounded-lg">
          <Typography.Title level={5} type="secondary">
            Summary
          </Typography.Title>
          <Input.TextArea
            autoSize={{ minRows: 12, maxRows: 12 }}
            bordered={false}
            className="w-full flex-1 border-0 p-0 mt-2"
          ></Input.TextArea>
        </div>
      </div>
    </>
  );
}

export default GenerateAudioContent;
