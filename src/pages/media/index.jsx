import { Button, Modal, Segmented, Space, Table, Typography, message } from "antd";
import EmptyMedia from "../../components/EmptyMedia";
import { useState } from "react";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authAxios from "../../api/authAxios";
import { API_URL } from "../../config";
const { Title } = Typography;


const Media = () => {
  const [value, setValue] = useState("All");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: notes } = useQuery({
    queryKey: ["archived-notes"],
    queryFn: async () => {
      const filter = JSON.stringify({ isArchived: true })
      const { data } = await authAxios.get(`${API_URL}/notes?limit=1000&filter=${filter}`)
      return data.results;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      if (!id) return;
      return authAxios.delete(`${API_URL}/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["archived-notes"] });

    },
  });

  const retrivedMutation = useMutation({
    mutationFn: (id) => {
      if (!id) return;
      return authAxios.post(`${API_URL}/notes/${id}/retrieve`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["archived-notes"] });

    },
  });

  const handleDeleteNote = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
      message.success("Note archived successfully!");
    } catch (err) {
      message.error("Failed to archive the note!");
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete note",
      content: "Once deleted, notes cannot be recovered. Be careful.",
      onOk: () => handleDeleteNote(id),
      okButtonProps: {
        isLoading: deleteMutation.isLoading,
        disabled: deleteMutation.isLoading,
      },
      cancelButtonProps: {
        disabled: deleteMutation.isLoading,
      },
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => retrivedMutation.mutateAsync(record._id)}>Retrieve</Button>
          <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

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
            {
              label: <span className="px-2 py-1 rounded-xl">Archived</span>,
              value: "Archived",
            },
          ]}
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
        />
        {value === "Archived" ? <Table dataSource={notes} columns={columns} className="py-5" /> : <EmptyMedia />}

      </div>
    </>
  );
};

export default Media;
