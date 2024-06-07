import { Typography, Flex, Spin, Modal } from "antd";
import { Link } from "react-router-dom";

import pdfIcon from "../assets/pdf-icon.png";
import audioIcon from "../assets/audio-icon.png";
import videoIcon from "../assets/video-icon.png";
import { SlDiamond } from "react-icons/sl";
import useNoteContext from "../hooks/useNoteContext";
import { useSubscription } from "../hooks/SubscriptionContext";
import { useState } from "react";

const { Text } = Typography;

const NotesCategory = ({ handleDownloadPdf, isGeneratingPdf }) => {
  const [subscription, setSubscription] = useState(false);
  const { selectedNote } = useNoteContext();
  const { subscribedPlan } = useSubscription();

  const isAllowed =
    subscribedPlan === "free" ||
    subscribedPlan === "basic" ||
    subscribedPlan === "premium" ||
    subscribedPlan === "weekly" ||
    subscribedPlan === "daily pass";

  const handleSubscriptionModal = (e) => {
    if (!isAllowed) {
      e.preventDefault();
      setSubscription(true);
    }
  };

  return (
    <>
      <div className="w-full justify-center items-center flex-col h-full flex pb-7">
        <Text
          strong
          style={{
            marginBottom: "15px",
            color: "#8C8F92",
            alignSelf: "flex-start",
          }}
        >
          Generate Media
        </Text>
        <Flex
          gap={20}
          className="w-full justify-center items-center flex-col sm:flex-row"
        >
          <button
            className="flex items-center w-full h-full rounded-xl py-4 px-5 border-solid border-2 border-tertiary bg-transparent hover:border-primary"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
          >
            <Flex
              align="center"
              gap={15}
              className=" flex-row sm:flex-col w-full"
            >
              {isGeneratingPdf ? (
                <Spin className="w-6 h-6 sm:w-9 sm:h-9" />
              ) : (
                <img
                  src={pdfIcon}
                  alt="pdf icon"
                  className="w-6 h-6 sm:w-9 sm:h-9"
                />
              )}

              <Flex vertical className="text-left sm:text-center">
                <Text strong>PDF</Text>
                <Text type="secondary leading-snug">
                  Convert text into a document.
                </Text>
              </Flex>
            </Flex>
          </button>
          <Link
            to={`/generate/${selectedNote._id}?type=audio`}
            className="flex justify-center w-full h-full"
            onClick={handleSubscriptionModal}
          >
            <button className="relative items-center w-full h-full rounded-xl py-4 px-5 border-solid border-2 border-tertiary bg-transparent hover:border-primary">
              <Flex align="center" gap={15} className="flex-row sm:flex-col">
                <SlDiamond className="absolute top-1 right-0 bg-primary text-white p-1 mr-2 text-2xl rounded-full" />
                <img
                  src={audioIcon}
                  alt="audio icon"
                  className="w-6 h-6 sm:w-9 sm:h-9"
                />
                <Flex vertical className="text-left sm:text-center">
                  <Text strong>Audio</Text>
                  <Text type="secondary leading-snug">
                    Transform content into audio.
                  </Text>
                </Flex>
              </Flex>
            </button>
          </Link>
          <Link
            to={`/generate/${selectedNote._id}?type=video`}
            className="flex justify-center w-full h-full"
            onClick={handleSubscriptionModal}
          >
            <button className="relative items-center w-full h-full rounded-xl py-4 px-5 border-solid border-2 border-tertiary bg-transparent hover:border-primary">
              <Flex align="center" gap={15} className="flex-row sm:flex-col">
                <SlDiamond className="absolute top-1 right-0 bg-primary text-white p-1 mr-2 text-2xl rounded-full" />
                <img
                  src={videoIcon}
                  alt="video icon"
                  className="w-6 h-6 sm:w-9 sm:h-9"
                />
                <Flex vertical className="text-left sm:text-center">
                  <Text strong>Video</Text>
                  <Text type="secondary leading-snug">
                    Turn text into interactive content.
                  </Text>
                </Flex>
              </Flex>
            </button>
          </Link>
        </Flex>
      </div>
      <Modal
        title="Subscription Required"
        centered
        open={subscription}
        onOk={() => setSubscription(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        maskClosable={false}
        closable={false}
      >
        <p>You need to subscribe to access this feature.</p>
      </Modal>
    </>
  );
};

export default NotesCategory;
