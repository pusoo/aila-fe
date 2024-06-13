import {
  Button,
  Card,
  Col,
  Dropdown,
  Row,
  Segmented,
  Typography,
  Menu,
} from "antd";
import { useState } from "react";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import authAxios from "../../api/authAxios";
import { API_URL } from "../../config";
import { PiFileAudio } from "react-icons/pi";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { BsClockHistory } from "react-icons/bs";
import Archive from "../../components/Archive";
import History from "../../components/History";
const { Title } = Typography;

const Media = () => {
  const [value, setValue] = useState("Audios");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: medias } = useQuery({
    queryKey: ["medias"],
    queryFn: async () => {
      const { data } = await authAxios.get(
        `${API_URL}/medias?limit=1000&populate=note`
      );
      return data.results;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await authAxios.delete(`${API_URL}/medias/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["medias"]);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const menu = (id) => (
    <Menu>
      <Menu.Item
        key="1"
        icon={<DeleteOutlined />}
        onClick={() => handleDelete(id)}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Header className="flex items-center justify-center bg-quaternary relative shadow">
        <div className="logo absolute left-8 mr-5 flex items-center">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              navigate("/notes");
            }}
            className="border-none"
          ></Button>
        </div>
        <Title level={4} style={{ color: "white" }}>
          Projects
        </Title>
      </Header>
      <div className="px-7 py-5 sm:px-10 sm:py-8">
        <Menu
          mode="horizontal"
          selectedKeys={[value]}
          onClick={({ key }) => setValue(key)}
          className="flex justify-center items-center bg-transparent w-full"
        >
          <Menu.Item
            key="Audios"
            icon={<PiFileAudio className="!text-primary text-lg" />}
          >
            Audios
          </Menu.Item>
          <Menu.Item
            key="Videos"
            icon={<AiOutlineVideoCamera className="!text-primary text-lg" />}
          >
            Videos
          </Menu.Item>
          <Menu.Item
            key="Archived"
            icon={<RiArchiveDrawerLine className="!text-primary text-lg" />}
          >
            Archived
          </Menu.Item>
          <Menu.Item
            key="History"
            icon={<BsClockHistory className="!text-primary text-lg" />}
          >
            History
          </Menu.Item>
        </Menu>
        {value === "Videos" && (
          <Row className="gap-5 py-7">
            {Array.isArray(medias) &&
              medias
                .filter((media) => media.url && media.type === "video")
                .map((media) => (
                  <Col xs={24} sm={6} key={media._id}>
                    <Card>
                      <Dropdown
                        overlay={menu(media._id)}
                        placement="bottomRight"
                        trigger={["click"]}
                        className="absolute top-2 right-2"
                      >
                        <Button
                          shape="circle"
                          size="small"
                          icon={<EllipsisOutlined />}
                        />
                      </Dropdown>
                      <video
                        autoPlay={false}
                        controls={true}
                        className="w-full rounded"
                      >
                        <source src={media.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <p className="mt-2 font-semibold">
                        {media.note && media.note.title}
                      </p>
                    </Card>
                  </Col>
                ))}
          </Row>
        )}

        {value === "Audios" && (
          <Row className="gap-5 py-7">
            {Array.isArray(medias) &&
              medias
                .filter((media) => media.url && media.type === "audio")
                .map((media) => (
                  <Col xs={24} sm={6} key={media._id}>
                    <Card className="relative">
                      <Dropdown
                        overlay={menu(media._id)}
                        placement="bottomRight"
                        trigger={["click"]}
                        className="absolute top-2 right-2"
                      >
                        <Button
                          shape="circle"
                          size="small"
                          icon={<EllipsisOutlined />}
                        />
                      </Dropdown>
                      <audio
                        autoPlay={false}
                        controls={true}
                        className="w-full border-1 border-slate-300"
                      >
                        <source src={media.url} type="audio/ogg" />
                        <source src={media.url} type="audio/mpeg" />
                        Your browser does not support the audio tag.
                      </audio>
                      <p className="mt-2 font-semibold">
                        {media.note && media.note.title}
                      </p>
                    </Card>
                  </Col>
                ))}
          </Row>
        )}

        {value === "Archived" && <Archive />}

        {value === "History" && <History />}
      </div>
    </>
  );
};

export default Media;
