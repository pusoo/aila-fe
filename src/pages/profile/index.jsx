import { ArrowLeftOutlined, CheckCircleFilled, CloseCircleFilled, UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Typography, Card, Avatar, message } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import authAxios from "../../api/authAxios";
import { API_URL } from "../../config";

const { Title } = Typography;
const ProfilePage = () => {
  const navigate = useNavigate();

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
      message.success("Check your email")
    }, onError: () => {
      message.error("Something went wrong, please contact your admin")
    }
  });

  return (
    <div className="flex flex-col h-full">
      <Header className="flex items-center justify-center bg-white relative drop-shadow-sm">
        <div className="logo absolute left-8 bg-white mr-5 flex items-center">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              navigate("/notes");
            }}
          ></Button>
        </div>
        <Title level={4} className="!mb-0">Profile</Title>
      </Header>

      <div className="flex-1 flex items-center justify-center ">
        <Card className="w-96 ">
          <div className="flex flex-col items-center justify-center gap-2">
            <Avatar icon={<UserOutlined />} size={100} />
            <Button className="flex items-center"
              icon={profile && profile.isEmailVerified ? <CheckCircleFilled className="text-xl text-green-500" /> : <CloseCircleFilled className="text-xl text-red-500" />}
              disabled={profile && profile.isEmailVerified}
              onClick={() => verifyEmailMutation.mutateAsync()}
              loading={verifyEmailMutation.isPending}>
              {profile && profile.isEmailVerified ? "Verified" : "Verify Email"}
            </Button>
            <Title level={2} className="!mb-0">{profile && profile.name}</Title>
            <span>{profile && profile.email}</span>
          </div>
        </Card>
      </div>
    </div>


  )
}

export default ProfilePage