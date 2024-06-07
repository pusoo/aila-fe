import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authAxios from "../api/authAxios";
import { API_URL } from "../config";
import { Button, Modal, Space, Table, message } from "antd";

const Archive = () => {
  const queryClient = useQueryClient();

  const { data: notes } = useQuery({
    queryKey: ["archived-notes"],
    queryFn: async () => {
      const filter = JSON.stringify({ isArchived: true });
      const { data } = await authAxios.get(
        `${API_URL}/notes?limit=1000&filter=${filter}`
      );
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
      message.success("Note deleted successfully!");
    } catch (err) {
      message.error("Failed to delete the note!");
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
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => retrivedMutation.mutateAsync(record._id)}>
            Retrieve
          </Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={notes}
        columns={columns}
        className="py-5"
        rowKey="_id"
      />
    </div>
  );
};
export default Archive;
