import { useState } from "react";
import simplify from "../assets/simplify.svg";
import engage from "../assets/engage.svg";
import create from "../assets/create.svg";
import ailaIcon from "../assets/aila-icon.png";
import { Flex, Typography, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const stepsData = {
  0: {
    avatar: simplify,
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
    avatar: create,
    title: "Create Engaging Multimedia",
    description:
      "Turn simplified content into multimedia! Create short videos, podcasts, or easy-to-read PDFs with AILA.",
  },
  3: {
    avatar: ailaIcon,
    description: (
      <ol className="flex flex-col gap-2 px-4 pb-3 text-base text-left">
        <li>
          Click the &quot;Create Note&quot; button to upload your learning
          material.
        </li>
        <li>
          Use the chatbot if you have any questions about your uploaded file.
        </li>
        <li>
          Optionally, you can convert the summary into a PDF, audio, or video in
          the &quot;Generate Media&quot; section.
        </li>
      </ol>
    ),
  },
};

const Onboarding = ({ setOpenTourMobile }) => {
  const [step, setStep] = useState(0);

  const handleStepClick = (index) => {
    setStep(index);
  };

  const handleNextStep = () => {
    if (step === 3) {
      setOpenTourMobile(false);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-5 h-full gap-12">
      <div className="duration-1000 ease-in-out flex flex-col items-center mb-5">
        <div className="h-72 mb-5 overflow-hidden">
          <img
            src={stepsData[step].avatar}
            alt={stepsData[step].title}
            className="object-contain w-full h-full"
          />
        </div>
        <Typography.Title className="text-gray-700" level={4}>
          {stepsData[step].title}
        </Typography.Title>
        <Typography.Text className="!text-sm text-center">
          {stepsData[step].description}
        </Typography.Text>
      </div>
      <Flex vertical className="items-center gap-7">
        <div className="flex w-full items-center justify-center gap-3">
          {["1", "2", "3", "4"].map((_, index) => (
            <button
              onClick={() => handleStepClick(index)}
              key={index.toString()}
              disabled={step === index}
              className={`${
                step === index ? "bg-gray-300" : "bg-gray-400"
              } w-[10px] h-[10px] rounded-full transition duration-300 ease-in-out border-none`}
            ></button>
          ))}
        </div>
        <Button
          className="h-12 w-12 bg-primary hover:!bg-[#359EDD]"
          shape="circle"
          onClick={handleNextStep}
        >
          <ArrowRightOutlined className="text-white" />
        </Button>
      </Flex>
    </div>
  );
};

export default Onboarding;
