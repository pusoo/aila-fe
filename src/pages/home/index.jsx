import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { NoteProvider } from "../../hooks/note-provider";
import Navbar from "../../components/Navbar";
const { Content } = Layout;

function Home() {
  return (
    <Layout style={{ height: "100vh" }}>
      <NoteProvider>
        <Navbar />
        <Content className="bg-background" style={{ padding: "0", overflow: "auto" }}>
          <Outlet />
        </Content>
      </NoteProvider>
    </Layout>
  );
}

export default Home;