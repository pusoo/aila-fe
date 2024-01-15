import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Form, Input, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import useLocalStorage from "../../hooks/useLocalStorage";
import { TOKEN_KEY } from "../../constants";
import { API_URL } from "../../config";

// import Onboarding from "../../components/OnBoarding";

const Signin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const [onBoardingModalIsOpen, setOnBoardingModalIsOpen] = useState(true);

  const [_, setTokens] = useLocalStorage(TOKEN_KEY, null);

  const mutation = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${API_URL}/auth/login`, payload);
    },
  });

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      await mutation.mutateAsync(values);
    } catch (error) {
      message.error("An error occurred during login!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mutation.isSuccess && mutation.data.data.tokens) {
      setTokens(mutation.data.data.tokens);
      navigate("/notes", { replace: true });
      message.success("Login successfully!");
    }
  }, [mutation.isSuccess, mutation.data, setTokens, navigate]);

  // const handleCancel = () => {
  //   setOnBoardingModalIsOpen(false);
  // };
  return (
    <Flex
      style={{
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="bg-primary"
    >
      {/* <Modal
        open={false}
        title=""
        onCancel={handleCancel}
        footer={null}
        className="!w-[494px]"
      >
        <Onboarding handleClose={handleCancel} />
      </Modal> */}

      <div className="flex flex-col gap-5 sm:rounded-xl bg-neutral-100   md:m-0 w-screen h-screen sm:w-[24.375rem] sm:h-[36.25rem] relative px-9 py-12">
        {/* header */}
        <Flex gap={5} style={{ justifyContent: "center" }}>
          <p className="text-lg font-bold  border-0 border-b-4 border-solid border-b-secondary">
            Login
          </p>{" "}
          <p className="text-lg font-bold">to AILA</p>
        </Flex>
        {/* sub header */}
        <p className="text-sm text-center">
          Welcome back! Sign in using your email to continue to us
        </p>

        {/* form */}
        <div className="flex-1 mt-16">
          <Form
            name="basic"
            initialValues={{
              email: "",
              password: "",
            }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className="custom-forms flex flex-col justify-between h-full"
          >
            <div className="relative">
              <Form.Item
                label="Your Email"
                name="email"
                className="custom-label"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                    type: "email",
                  },
                ]}
              >
                <Input className="border-t-0 border-l-0 border-r-0 rounded-none focus:shadow-none custom-input bg-transparent" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                className="custom-label relative"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password className="border-t-0 border-l-0 border-r-0 rounded-none custom-input bg-transparent" />
              </Form.Item>
              <div className="text-center pt-5 absolute bottom-0 right-0 invisible">
                <a href="#" className=" text-secondary">
                  Forgot Password?
                </a>
              </div>
            </div>

            <Form.Item>
              <div className="space-y-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isLoading}
                  loading={isLoading}
                  className="bg-secondary hover:bg-white custom-button w-full h-12 rounded-xl"
                >
                  Login
                </Button>
                <p className="text-center text-secondary">
                  Don&apos;t have an account yet?
                  <Link to="/register" className="text-secondary">
                    {" "}
                    Sign up
                  </Link>
                </p>
              </div>
            </Form.Item>
          </Form>
          {/* <Flex style={{ justifyContent: "space-between" }}>
            <Link to="/register">Register</Link>
          </Flex> */}
        </div>
      </div>
    </Flex>
  );
};

export default Signin;
