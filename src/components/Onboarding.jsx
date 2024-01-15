import { useState } from "react";
import learning from "../assets/learning.svg";
import engage from "../assets/engage.svg";
import multimedia from "../assets/multimedia.png";
import { Flex, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const stepsData = {
  0: {
    avatar: learning,
    title: "Simplify Learning Materials",
    description:
      "AILA simplifies your learning materials, making them easy to understand.",
  },
  1: {
    avatar: engage,
    title: "Engage with AILA",
    description:
      "Chat with AILA! Ask questions, get explanations, and explore your content interactively.",
  },
  2: {
    avatar: multimedia,
    title: "Create Engaging Multimedia",
    description:
      "Turn simplified content into multimedia! Create short videos, podcasts, or easy-to-read PDFs with AILA.",
  },
};

const Onboarding = ({ handleClose }) => {
  const [step, setStep] = useState(0);

  const handleStepClick = (index) => {
    setStep(index);
  };

  return (
    <div className="p-5">
      <div className="tion duration-1000 ease-in-out flex flex-col items-center mb-5">
        <div className="h-[271px]">
          <img src={stepsData[step].avatar} className="mb-5" />
        </div>
        <Typography.Title className="text-gray-700" level={4}>
          {stepsData[step].title}
        </Typography.Title>
        <Typography.Text className="!text-sm text-center">
          {stepsData[step].description}
        </Typography.Text>
      </div>
      <Flex vertical className="items-center gap-5">
        <div className="flex w-full items-center justify-center gap-3">
          {["1", "2", "3"].map((_, index) => (
            <button
              onClick={() => handleStepClick(index)}
              key={index.toString()}
              disabled={step === index}
              className={`${
                step === index ? "bg-gray-300" : "bg-gray-400"
              } w-[10px] h-[10px] rounded-full inline-block transition duration-300 ease-in-out`}
            ></button>
          ))}
        </div>
        <button
          className="h-12 w-12 bg-blue-400 rounded-full"
          onClick={() => {
            if (step === 2) {
              handleClose();
            } else {
              setStep((prev) => prev + 1);
            }
          }}
        >
          <ArrowRightOutlined className="text-white" />
        </button>
      </Flex>
    </div>
  );
};

export default Onboarding;
