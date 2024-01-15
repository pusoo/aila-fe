import { Avatar, Drawer, Dropdown, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/aila-logo.svg";
import useNoteContext from "../hooks/useNoteContext";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import {
  FileOutlined,
  FolderOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import aila from "../assets/aila.svg";
import { useState } from "react";

import authAxios from "../api/authAxios";
import { TOKEN_KEY } from "../constants";
import { API_URL } from "../config";



const { Header } = Layout;

const Navbar = () => {
  const { notes } = useNoteContext();
  const hasNotes = Array.isArray(notes) && notes.length > 0;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();
  const tokensString = localStorage.getItem(TOKEN_KEY);
  const tokens = JSON.parse(tokensString);
  const refreshToken = tokens.refresh.token;

  const logoutMutation = useMutation({
    mutationFn: () => {
      return authAxios.post(`${API_URL}/auth/logout`, { refreshToken });
    },
  });

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error({ ERROR: error });
    }
  };
  const location = useLocation();
  const isNotePage =
    location.pathname === "/" || location.pathname === "/notes";

  useEffect(() => {
    if (logoutMutation.isSuccess) {
      localStorage.removeItem(TOKEN_KEY);
      navigate("/signin", { replace: true });
    }
  }, [logoutMutation.isSuccess, navigate]);

  const items = [
    {
      key: '1',
      label: (
        <span onClick={handleLogout}>
          Logout
        </span>
      ),
    },]

  if (isNotePage) {
    return (
      <>
        <div className="hidden sm:block">
          <Header className="flex items-center justify-between bg-white">
            <div className="logo  bg-white mr-5">
              <Link to="/notes" className="flex items-center justify-center">
                <img src={logo} className="w-60" />
              </Link>
            </div>
            <Menu mode="horizontal" className="flex-1 text-right justify-end">
              <Menu.Item key="1">
                <Link to="/notes">
                  <FileOutlined className="text-blue-400 mr-2" />
                  Notes
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/media">
                  <FolderOutlined className="text-blue-400 mr-2" />
                  Media
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Dropdown menu={{ items }}>
                  <Menu.Item onClick={() => console.info("click profile")}>
                    <Avatar className="bg-blue-400 px" icon={<UserOutlined />} />
                  </Menu.Item>
                </Dropdown>
              </Menu.Item>

            </Menu>
          </Header>
        </div>

        <div className="block sm:hidden">
          <Header
            className={`flex items-center ${hasNotes ? "justify-end" : "justify-center"
              } bg-transparent`}
          >
            {hasNotes ? (
              <div className="w-[50vw] flex justify-between items-center">
                <img src={aila} className="w-20 text-center aspect-square" />
                <UnorderedListOutlined
                  className="text-xl cursor-pointer"
                  onClick={() => {
                    setIsDrawerOpen(true);
                  }}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <img src={aila} className="w-20 text-center aspect-square" />
              </div>
            )}
          </Header>
        </div>

        <Drawer
          placement="bottom"
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
        >
          <Menu mode="vertical">
            <Menu.Item key="1">
              <Link to="/notes">
                <FolderOutlined className="text-blue-400 mr-2" />
                Notes
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/media">
                <FolderOutlined className="text-blue-400 mr-2" />
                Media
              </Link>
            </Menu.Item>
            <Menu.Item
              onClick={() => console.info("click profile")}
              className="flex"
            >
              <div className="">
                <UserOutlined className="text-blue-400" />
                My Account
              </div>
            </Menu.Item>
          </Menu>
        </Drawer>
      </>
    );
  }

};

export default Navbar;
