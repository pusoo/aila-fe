import { Input, Button, Modal } from "antd";
import gcash from "../assets/GCash_logo.png";
import { useQuery } from "@tanstack/react-query";
import authAxios from "../api/authAxios";
import { API_URL } from "../config";

const Payment = ({
  isModalOpen,
  handleOk,
  handleCancel,
  offerType,
  offerPrice,
}) => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await authAxios.get(`${API_URL}/auth/me`);
      return data;
    },
    staleTime: Infinity,
  });

  const renderOfferType = () => {
    switch (offerType) {
      case "basic":
        return "Basic ";
      case "premium":
        return "Premium ";
      case "grand":
        return "Grand ";
      default:
        return "";
    }
  };
  const renderPriceType = () => {
    switch (offerPrice) {
      case "180":
        return "180 ";
      case "450":
        return "450 ";
      case "750":
        return "750 ";
      case "50":
        return "50 ";
      case "20":
        return "20 ";
      default:
        return "";
    }
  };

  return (
    <Modal
      title="Payment"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <div className="flex">
        <div className="flex flex-col justify-center items-center pr-5 py-5 text-center">
          <p>Subscribe to AILA {renderOfferType()}offer</p>
          <div>
            <div className="flex justify-center items-baseline my-3">
              <span className="mr-2 text-3xl font-bold">
                ₱{renderPriceType()}
              </span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 pl-5 py-5 w-full">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Contact Information</label>
            <Input prefix="Email:" disabled value={profile && profile.email} />
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-medium">Payment Method</p>
            <div
              className="flex items-center rounded-lg p-2 w-full"
              style={{ border: "1px solid #E5E9EA" }}
            >
              <img src={gcash} alt="GCash" className="w-20" />
            </div>

            <Button
              className="text-white hover:!text-white bg-primary hover:!bg-[#4aa3e8] font-medium rounded-lg text-sm h-10"
              block
              onClick={handleCancel}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default Payment;
