import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router";
import { Outlet } from "react-router-dom";
import { API_URL } from "../../config";
import { TOKEN_KEY } from "../../constants";
import authAxios from "../../api/authAxios";
import { NoteProvider } from "../../hooks/note-provider";
import Navbar from "../../components/Navbar";
const { Content } = Layout;

function Home() {
  const navigate = useNavigate();
  const tokensString = localStorage.getItem(TOKEN_KEY);
  const tokens = JSON.parse(tokensString);
  const refreshToken = tokens.refresh.token;

  const logoutMutation = useMutation({
    mutationFn: () => {
      return authAxios.post(`${API_URL}/auth/logout`, { refreshToken });
    },
  });



  useEffect(() => {
    if (logoutMutation.isSuccess) {
      localStorage.removeItem(TOKEN_KEY);
      navigate("/signin", { replace: true });
    }
  }, [logoutMutation.isSuccess, navigate]);

  return (
    <Layout style={{ height: "100vh" }}>
      <NoteProvider>
        <Navbar />
        <Content style={{ padding: "0", overflow: "auto" }}>
          <Outlet />
        </Content>
      </NoteProvider>
    </Layout>
  );
}

export default Home;