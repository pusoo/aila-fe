import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAxios from "../api/authAxios";
import { API_URL } from "../config";
import { Button, Dropdown, message, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import EditNoteModal from "./EditNoteModal";

const WarningArea = ({ id, onArchive }) => {
  const queryClient = useQueryClient();

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
        loading: deleteMutation.isLoading,
        disabled: deleteMutation.isLoading,
      },
      cancelButtonProps: {
        disabled: deleteMutation.isLoading,
      },
    });
  };

  const menuItems = [
    {
      key: "1",
      label: <EditNoteModal />,
    },
    {
      key: "2",
      label: "Archive",
      onClick: onArchive,
    },
    {
      key: "3",
      label: "Delete",
      onClick: () => handleDelete(id),
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      placement="bottomRight"
      trigger={["click"]}
    >
      <Button
        shape="circle"
        type="text"
        icon={<MoreOutlined />}
        className="border border-gray-400 text-gray-400 hover:!text-primary hover:border-primary hover:!bg-transparent"
      />
    </Dropdown>
  );
};

export default WarningArea;
