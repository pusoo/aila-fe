import { Button, Segmented, Typography } from "antd";
import EmptyMedia from "../../components/EmptyMedia";
import { useState } from "react";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
const { Title } = Typography;

const Media = () => {
  const [value, setValue] = useState("All");
  const navigate = useNavigate();
  return (
    <>
      <Header className="flex items-center justify-center bg-white relative drop-shadow-sm">
        <div className="logo absolute left-8 bg-white mr-5 flex items-center">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              navigate("/notes");
            }}
          ></Button>
        </div>
        <Title level={4}>Projects</Title>
      </Header>
      <div className="px-10 py-8 text-center sm:text-left">
        <Segmented
          size="middle"
          className="p-2 border rounded-xl border-tertiary border-solid bg-transparent"
          options={[
            {
              label: <span className="px-2 py-1 rounded-xl">All</span>,
              value: "All",
            },
            {
              label: <span className="px-2 py-1 rounded-xl">Files</span>,
              value: "Files",
            },
            {
              label: <span className="px-2 py-1 rounded-xl">Podcasts</span>,
              value: "Podcasts",
            },
            {
              label: <span className="px-2 py-1 rounded-xl">Videos</span>,
              value: "Videos",
            },
          ]}
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
        />
        <EmptyMedia />
      </div>
    </>
  );
};

export default Media;
