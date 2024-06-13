import {
  CheckCircleFilled,
  CloseCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Typography, Avatar, message } from "antd";
import authAxios from "../api/authAxios";
import { API_URL } from "../config";

const { Title } = Typography;
const   ProfilePage = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await authAxios.get(`${API_URL}/auth/me`);
      return data;
    },
    staleTime: Infinity,
  });

  const verifyEmailMutation = useMutation({
    mutationFn: () => {
      return authAxios.post(`${API_URL}/auth/send-verification-email`);
    },
    onSuccess: () => {
      message.success("Check your email");
    },
    onError: () => {
      message.error("Something went wrong, please contact your admin");
    },
  });

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <Avatar icon={<UserOutlined />} size={50} />
        <Button
          className="flex items-center"
          icon={
            profile && profile.isEmailVerified ? (
              <CheckCircleFilled className="text-xl text-green-500" />
            ) : (
              <CloseCircleFilled className="text-xl text-red-500" />
            )
          }
          disabled={profile && profile.isEmailVerified}
          onClick={() => verifyEmailMutation.mutateAsync()}
          loading={verifyEmailMutation.isPending}
        >
          {profile && profile.isEmailVerified ? "Verified" : "Verify Email"}
        </Button>
        <Title level={3} className="!mb-0">
          {profile && profile.name}
        </Title>
        <span>{profile && profile.email}</span>
      </div>
    </div>
  );
};

export default ProfilePage;
