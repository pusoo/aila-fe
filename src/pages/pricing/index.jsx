import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import { Button, Typography, Segmented, notification } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Payment from "../../components/Payment";
import { useSubscription } from "../../hooks/SubscriptionContext";
const { Title } = Typography;

const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerType, setOfferType] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const { subscribedPlan, updateSubscriptionPlan } = useSubscription();

  const showModal = (type, price) => {
    setOfferType(type);
    setOfferPrice(price);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubscription = () => {
    updateSubscriptionPlan(offerType);
    setIsModalOpen(false);
    notification.success({
      message: "Subscription Confirmed",
      description: "You have successfully subscribed to the plan.",
    });
  };

  const [value, setValue] = useState("Recurring");
  const navigate = useNavigate();

  return (
    <>
      <Header className="sticky top-0 z-10 flex items-center justify-center bg-quaternary shadow">
        <div className="logo absolute left-8 mr-5 flex items-center">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              navigate("/notes");
            }}
            className="border-none"
          ></Button>
        </div>
        <Title level={4} style={{color: "white"}}>Pricing</Title>
      </Header>
      <div className="flex flex-col justify-center items-center gap-7 py-8 px-4 mx-auto max-w-screen-xl lg:py-[1.375rem] lg:px-12">
        <Segmented
          options={[
            { label: <span>Recurring</span>, value: "Recurring" },
            { label: <span>One-time</span>, value: "One-time" },
          ]}
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
          className="custom-segmented"
        />
        {value === "Recurring" && (
          <div className="space-y-8 lg:grid lg:grid-cols-3 lg:space-y-0 rounded-xl flex flex-col gap-5 max-w-[21rem] lg:max-w-fit">
            {/* Pricing Card */}
            <div className="flex flex-col mx-auto w-full">
              <div className="w-full flex flex-col bg-[#40a9e81f] p-6 border-t-2 border-l-2 border-r-2 border-solid rounded-t-2xl border-[#40a9e81f]">
                <h3 className="mb-3 text-2xl font-semibold">Trial offer</h3>
                <p className="sm:text-lg lg:text-sm">
                  Perfect for new learners enjoy our free trials.
                </p>
                <p>&nbsp;</p>
                <div className="flex items-baseline my-3">
                  <span className="mr-2 text-3xl font-bold">Free 1 Month</span>
                </div>
                <Button
                  className="text-white hover:!text-white bg-primary hover:!bg-[#4aa3e8] font-medium rounded-md text-sm px-5 py-2.5 text-center mt-4 h-11"
                  onClick={() =>
                    subscribedPlan !== "free" && showModal("free", "0")
                  }
                  disabled={subscribedPlan === "free"}
                >
                  {subscribedPlan === "free" ? "Current plan" : "Choose plan"}
                </Button>
              </div>
              {/* List */}
              <ul
                role="list"
                className="mb-8 space-y-4 text-left p-6 bg-white border-b-2 border-l-2 border-r-2 border-solid rounded-b-2xl border-[#40a9e81f]"
              >
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>5 Credits</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>1 free video conversion</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>1 free audio conversion</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Free access to all features</span>
                </li>
              </ul>
            </div>
            {/* Pricing Card */}
            <div className="flex flex-col mx-auto w-full">
              <div className="w-full flex flex-col bg-[#40a9e81f] p-6 border-t-2 border-l-2 border-r-2 border-solid rounded-t-2xl border-[#40a9e81f]">
                <h3 className="mb-3 text-2xl font-semibold">Basic offer</h3>
                <p className="sm:text-lg lg:text-sm">
                  Ideal for casual learners exploring various topics.
                </p>
                <p>&nbsp;</p>
                <div className="flex items-baseline my-3">
                  <span className="mr-2 text-3xl font-bold">₱150</span>
                  <span>/month</span>
                </div>
                <Button
                  className="text-white hover:!text-white bg-primary hover:!bg-[#4aa3e8] font-medium rounded-md text-sm px-5 py-2.5 text-center mt-4 h-11"
                  onClick={() =>
                    subscribedPlan !== "basic" && showModal("basic", "150")
                  }
                  disabled={subscribedPlan === "basic"}
                >
                  {subscribedPlan === "basic" ? "Current plan" : "Choose plan"}
                </Button>
              </div>
              {/* List */}
              <ul
                role="list"
                className="mb-8 space-y-4 text-left p-6 bg-white border-b-2 border-l-2 border-r-2 border-solid rounded-b-2xl border-[#40a9e81f]"
              >
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>15 Credits</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>3 free video conversion</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>5 free audio conversion</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Free access to all features</span>
                </li>
              </ul>
            </div>
            {/* Pricing Card */}
            <div className="flex flex-col mx-auto w-full">
              <div className="w-full flex flex-col bg-[#40a9e81f] p-6 border-t-2 border-l-2 border-r-2 border-solid rounded-t-2xl border-[#40a9e81f]">
                <h3 className="mb-3 text-2xl font-semibold">Premium offer</h3>
                <p className="sm:text-lg lg:text-sm">
                  Perfect for dedicated learners engaging in deeper research or
                  study.
                </p>
                <div className="flex items-baseline my-3">
                  <span className="mr-2 text-3xl font-bold">₱300</span>
                  <span>/month</span>
                </div>
                <Button
                  className="text-white hover:!text-white bg-primary hover:!bg-[#4aa3e8] font-medium rounded-md text-sm px-5 py-2.5 text-center mt-4 h-11"
                  onClick={() =>
                    subscribedPlan !== "premium" && showModal("premium", "300")
                  }
                  disabled={subscribedPlan === "premium"}
                >
                  {subscribedPlan === "premium"
                    ? "Current plan"
                    : "Choose plan"}
                </Button>
              </div>
              {/* List */}
              <ul
                role="list"
                className="mb-8 space-y-4 text-left p-6 bg-white border-b-2 border-l-2 border-r-2 border-solid rounded-b-2xl border-[#40a9e81f]"
              >
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>30 Credits</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>6 free video conversion</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>8 free audio conversion</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Free access to all features</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        {value === "One-time" && (
          <div className="space-y-8 lg:grid lg:grid-cols-2 lg:space-y-0 rounded-xl flex flex-col gap-5 max-w-[21rem] lg:max-w-fit">
            {/* Pricing Card */}
            <div className="flex flex-col mx-auto w-full">
              <div className="w-full flex flex-col bg-[#40a9e81f] p-6 border-t-2 border-l-2 border-r-2 border-solid rounded-t-2xl border-[#40a9e81f]">
                <h3 className="mb-3 text-2xl font-semibold">Weekly pass</h3>
                <p className="sm:text-lg lg:text-sm">
                  Perfect for casual learners exploring various topics
                </p>
                <div className="flex items-baseline my-3">
                  <span className="mr-2 text-3xl font-bold">₱100</span>
                  <span>/week</span>
                </div>
                <Button
                  className="text-white hover:!text-white bg-primary hover:!bg-[#4aa3e8] font-medium rounded-md text-sm px-5 py-2.5 text-center mt-4 h-11"
                  onClick={() =>
                    subscribedPlan !== "weekly" && showModal("weekly", "100")
                  }
                  disabled={subscribedPlan === "weekly"}
                >
                  {subscribedPlan === "weekly" ? "Current plan" : "Choose plan"}
                </Button>
              </div>
              {/* List */}
              <ul
                role="list"
                className="mb-8 space-y-4 text-left p-6 bg-white border-b-2 border-l-2 border-r-2 border-solid rounded-b-2xl border-[#40a9e81f]"
              >
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>10 Credits</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>2 free video conversion</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>4 free audio conversion</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Free access to all features</span>
                </li>
              </ul>
            </div>
            {/* Pricing Card */}
            <div className="flex flex-col mx-auto w-full">
              <div className="w-full flex flex-col bg-[#40a9e81f] p-6 border-t-2 border-l-2 border-r-2 border-solid rounded-t-2xl border-[#40a9e81f]">
                <h3 className="mb-3 text-2xl font-semibold">Daily pass</h3>
                <p className="sm:text-lg lg:text-sm">
                  Perfect for learners engaging research or study
                </p>
                <div className="flex items-baseline my-3">
                  <span className="mr-2 text-3xl font-bold">₱50</span>
                  <span>/day</span>
                </div>
                <Button
                  className="text-white hover:!text-white bg-primary hover:!bg-[#4aa3e8] font-medium rounded-md text-sm px-5 py-2.5 text-center mt-4 h-11"
                  onClick={() =>
                    subscribedPlan !== "daily pass" &&
                    showModal("daily pass", "50")
                  }
                  disabled={subscribedPlan === "daily pass"}
                >
                  {subscribedPlan === "daily pass"
                    ? "Current plan"
                    : "Choose plan"}
                </Button>
              </div>
              {/* List */}
              <ul
                role="list"
                className="mb-8 space-y-4 text-left p-6 bg-white border-b-2 border-l-2 border-r-2 border-solid rounded-b-2xl border-[#40a9e81f]"
              >
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>5 Credits</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>1 free video conversion</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>3 free audio conversion</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Free access to all features</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* Payment Modal */}
      <Payment
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        offerType={offerType}
        offerPrice={offerPrice}
        handleSubscription={handleSubscription}
      />
    </>
  );
};
export default Pricing;
