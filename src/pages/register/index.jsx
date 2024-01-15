import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Form, Input, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import useLocalStorage from "../../hooks/useLocalStorage";
import { TOKEN_KEY } from "../../constants";
import { API_URL } from "../../config";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [_, setTokens] = useLocalStorage(TOKEN_KEY, null);

  const mutation = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${API_URL}/auth/register`, payload);
    },
  });

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      await mutation.mutateAsync(values);
    } catch (error) {
      message.error("Registering account failed!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mutation.isSuccess && mutation.data.data.tokens) {
      setTokens(mutation.data.data.tokens);
      navigate("/notes", { replace: true });
      message.success("Register account successfully!");
    }
  }, [mutation.isSuccess, mutation.data, setTokens, navigate]);

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
      <div className="flex flex-col gap-5 sm:rounded-xl bg-neutral-100   md:m-0 w-screen h-screen sm:w-[24.375rem] sm:h-[36.25rem] relative px-9 py-12">
        <Flex gap={5} style={{ justifyContent: "center" }}>
          <p className="text-lg font-bold">Sign up with</p>
          <p className="text-lg font-bold  border-0 border-b-4 border-solid border-b-secondary">
            Email
          </p>
        </Flex>
        <p className="text-sm text-center">
          Please enter you’re name, email & password to create an account
        </p>
        <div className="flex-1 mt-16">
          <Form
            name="basic"
            initialValues={{
              email: "",
              password: "",
              name: "",
            }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className="custom-forms flex flex-col justify-between h-full"
          >
            <div>
              <Form.Item
                label="Your name"
                name="name"
                className="custom-label"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input className="border-t-0 border-l-0 border-r-0 rounded-none focus:shadow-none custom-input bg-transparent" />
              </Form.Item>

              <Form.Item
                label="Your email"
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
                className="custom-label"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password className="border-t-0 border-l-0 border-r-0 rounded-none custom-input bg-transparent" />
              </Form.Item>
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
                  Create an account
                </Button>
                <p className="text-center text-secondary">
                  Already have an account?
                  <Link to="/signin" className="text-secondary">
                    {" "}
                    Sign In
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

export default Register;
