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
              label: <span className="px-2 py-1 rounded-xl">Audios</span>,
              value: "Audios",
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

        {value === "Videos" && (
          <Row className="gap-5 py-5">
            {Array.isArray(medias) &&
              medias
                .filter((media) => media.url && media.type === "video")
                .map((media) => {
                  return (
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
                          className="w-full rounded "
                        >
                          <source src={media.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </Card>
                      <p className="mt-2 font-semibold">
                        {media.note && media.note.title}
                      </p>
                    </Col>
                  );
                })}
          </Row>
        )}
        {value === "Audios" && (
          <Row className="gap-5 py-5">
            {Array.isArray(medias) &&
              medias
                .filter((media) => media.url && media.type === "audio")
                .map((media) => {
                  return (
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
                      </Card>
                      <p className="mt-2 font-semibold">
                        {media.note && media.note.title}
                      </p>
                    </Col>
                  );
                })}
          </Row>
        )}
      </div>
    </>
  );
};

export default Media;
