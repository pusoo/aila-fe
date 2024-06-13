import { useState } from "react";
import { Layout, Drawer, Tour } from "antd";
import { Outlet } from "react-router-dom";
import { NoteProvider } from "../../hooks/note-provider";
import Navbar from "../../components/Navbar";
const { Content } = Layout;
import { useWindowSize } from "../../hooks/useWindowSize";

import create from "../../assets/create.svg";
import engage from "../../assets/engage.svg";
import simplify from "../../assets/simplify.svg";
import Onboarding from "../../components/Onboarding";

function Home() {
  const [openTour, setOpenTour] = useState(true);
  const [openTourMobile, setOpenTourMobile] = useState(true);
  const { width: screenWidth } = useWindowSize();
  const isMobile = screenWidth < 640;

  // useEffect(() => {
  //   const isFirstVisit = localStorage.getItem("isFirstVisit");
  //   if (isFirstVisit) {
  //     setOpenTour(true);
  //     localStorage.setItem("isFirstVisit", "false");
  //   }
  // }, []);

  const steps = [
    {
      title: "Simplify Learning Materials",
      description:
        "AILA simplifies your learning materials, making them easy to understand.",
      cover: <img src={simplify} width="200" height="167.46" />,
    },
    {
      title: "Engage with AILA",
      description:
        "Chat with AILA! Ask questions, get explanations, and explore your content interactively.",
      cover: <img src={engage} width="200" height="198.22" />,
    },
    {
      title: "Create Engaging Multimedia",
      description:
        "Turn simplified content into multimedia! Create short videos, podcasts, or easy-to-read PDFs with AILA.",
      cover: <img src={create} width="200" height="180.97" />,
    },
    {
      title: "Instructions:",
      description: (
        <ol className="flex flex-col gap-1 px-4 pb-3 text-left">
          <li>
            Click the &quot;Create Note&quot; button to upload your learning
            material.
          </li>
          <li>
            Use the chatbot if you have any questions about your uploaded file.
          </li>
          <li>
            Optionally, you can convert the summary into a PDF, audio, or video
            in the &quot;Generate Media&quot; section.
          </li>
        </ol>
      ),
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <NoteProvider>
        <Navbar />
        <Content
          className="bg-background"
          style={{ padding: "0", overflow: "auto" }}
        >
          {isMobile ? (
            <Drawer
              open={openTourMobile}
              onClose={() => setOpenTourMobile(false)}
              centered
              placement="bottom"
              height={"100%"}
              footer={null}
              className="onboarding"
            >
              <Onboarding setOpenTourMobile={setOpenTourMobile} />
            </Drawer>
          ) : (
            <Tour
              open={openTour}
              onClose={() => setOpenTour(false)}
              steps={steps}
            />
          )}
          <Outlet />
        </Content>
      </NoteProvider>
    </Layout>
  );
}

export default Home;
