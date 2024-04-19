import { Input, Typography } from "antd";
const { TextArea } = Input;

function GenerateVideoContent({ note, setNote, video }) {
  if (!note) return null;
  return (
    <>
      <div className="basis-5/12 bg-generateBackground flex justify-center items-center">
        {video && (
          <>
            <video
              className="w-full max-w-[820px] h-full max-h-[15em]"
              autoPlay={false}
              controls={true}
            >
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </>
        )}


      </div>
      <div className="basis-8/12 flex justify-center items-end bg-generateBackground">
        <div className="w-full h-full bg-white xl:w-[53.125rem] 2xl:w-[65rem] p-5 mb-5 mx-5 sm:mx-0 rounded-lg">
          <Typography.Title level={5} type="secondary">
            Summary
          </Typography.Title>
          <TextArea
            autoSize={{ minRows: 12, maxRows: 12 }}
            bordered={false}
            className="w-full flex-1 border-0 p-0 mt-2"
            value={note.summary}
            onChange={(e) => {
              setNote((prevNote) => ({
                ...prevNote,
                summary: e.target.value,
              }));
            }}
          ></TextArea>
        </div>
      </div>
    </>
  );
}

export default GenerateVideoContent;
