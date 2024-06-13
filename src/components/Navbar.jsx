import { Flex, Avatar, Drawer, Dropdown, Layout, Menu, Modal } from "antd";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import logo from "../assets/logo.svg";
import useNoteContext from "../hooks/useNoteContext";
import {
  FolderOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  HistoryOutlined,
  InboxOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { SlDiamond } from "react-icons/sl";
import { MdOutlinePrivacyTip } from "react-icons/md";
import aila from "../assets/aila.svg";

import authAxios from "../api/authAxios";
import { TOKEN_KEY } from "../constants";
import { API_URL } from "../config";
import ProfilePage from "./Profile";
const { Header } = Layout;

const Navbar = () => {
  const { notes } = useNoteContext();
  const hasNotes = Array.isArray(notes) && notes.length > 0;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
  const [isSettingsContentDrawerOpen, setIsSettingsContentDrawerOpen] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const showProfileModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSettingsClick = () => {
    setIsSettingsContentDrawerOpen(true);
  };

  const tokensString = localStorage.getItem(TOKEN_KEY);

  const logoutMutation = useMutation({
    mutationFn: () => {
      if (tokensString) {
        const tokens = JSON.parse(tokensString);
        const refreshToken = tokens.refresh.token;

        localStorage.removeItem(TOKEN_KEY);
        return authAxios.post(`${API_URL}/auth/logout`, { refreshToken });
      }
    },
    onSuccess: () => {
      localStorage.removeItem(TOKEN_KEY);
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

  const items = [
    {
      key: "1",
      label: "Profile",
      onClick: showProfileModal,
    },
    {
      key: "2",
      label: "Terms & policies",
      onClick: () => navigate("/policies"),
    },
    {
      key: "3",
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  if (!tokensString) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (isNotePage) {
    return (
      <>
        <div className="hidden sm:block drop-shadow-sm">
          <Header className="flex items-center justify-between bg-quaternary px-5 shadow">
            <div className="logo mr-5">
              <Link to="/notes" className="flex items-center justify-center">
                <img src={logo} />
              </Link>
            </div>
            <Menu
              mode="horizontal"
              className="flex-1 text-right justify-end bg-transparent"
            >
              <Menu.Item key="1">
                <Link
                  to="/projects"
                  className="flex items-center"
                  style={{ color: "white" }}
                >
                  <FolderOutlined
                    className="text-primary mr-2"
                    style={{ fontSize: "16px" }}
                  />
                  Projects
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link
                  to="/pricing"
                  className="flex items-center"
                  style={{ color: "white" }}
                >
                  <SlDiamond
                    className="text-primary mr-2"
                    style={{ fontSize: "12px" }}
                  />
                  Pricing
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Dropdown menu={{ items }}>
                  <Avatar
                    className="bg-white"
                    icon={<UserOutlined className="text-primary" />}
                  />
                </Dropdown>
              </Menu.Item>
            </Menu>
          </Header>
        </div>

        <div className="block sm:hidden">
          <Header
            className={`flex items-center px-8 ${
              hasNotes ? "justify-end" : "justify-center"
            } bg-quaternary`}
          >
            {hasNotes ? (
              <div className="w-[53vw] flex justify-between items-center">
                <img src={aila} className="w-20 text-center" />
                <UnorderedListOutlined
                  className="text-xl cursor-pointer text-white"
                  onClick={() => {
                    setIsDrawerOpen(true);
                  }}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <img src={aila} className="w-20 text-center" />
                <UnorderedListOutlined
                  className="absolute right-7 text-xl cursor-pointer text-white"
                  onClick={() => {
                    setIsDrawerOpen(true);
                  }}
                />
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
          className="rounded-t-2xl"
        >
          <Menu mode="vertical" className="flex flex-col text-lg">
            <Menu.Item
              key="1"
              style={{
                display: "flex",
              }}
            >
              <Link to="/projects">
                <FolderOutlined
                  className="text-primary mr-2"
                  style={{ fontSize: "24px" }}
                />
                Projects
              </Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              style={{
                display: "flex",
              }}
            >
              <Link to="/pricing">
                <SlDiamond
                  className="text-primary mr-2"
                  style={{ fontSize: "20px" }}
                />
              </Link>
              Pricing
            </Menu.Item>
            <Menu.Item
              key="3"
              style={{
                display: "flex",
              }}
              onClick={() => {
                setIsSettingsDrawerOpen(true);
                setIsDrawerOpen(false);
              }}
            >
              <SettingOutlined
                className="text-primary mr-2"
                style={{ fontSize: "24px" }}
              />
              Settings
            </Menu.Item>
            <Menu.Item key="4" onClick={() => navigate("/policies")}>
              <MdOutlinePrivacyTip
                className="text-primary mr-2"
                style={{ fontSize: "24px" }}
              />
              Terms & policies
            </Menu.Item>
            <Menu.Item key="5" style={{}} onClick={handleLogout}>
              <LogoutOutlined
                className="text-primary mr-2"
                style={{ fontSize: "24px" }}
              />
              Logout
            </Menu.Item>
          </Menu>
        </Drawer>

        {/* Settings modal */}
        <Modal
          title="Profile"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={500}
        >
          <Flex className="justify-center items-center p-7">
            <ProfilePage />
          </Flex>
        </Modal>

        {/* Settings Drawer */}
        <Drawer
          placement="bottom"
          closable={true}
          open={isSettingsDrawerOpen}
          onClose={() => {
            setIsSettingsDrawerOpen(false);
            setIsDrawerOpen(true);
          }}
          className="rounded-t-2xl"
        >
          <Menu mode="vertical" className="flex flex-col text-lg">
            <Menu.Item
              key="1"
              style={{ fontSize: "18px" }}
              onClick={handleSettingsClick}
            >
              <UserOutlined
                className="text-primary mr-2"
                style={{ fontSize: "24px" }}
              />
              Profile
            </Menu.Item>
            <Menu.Item
              key="2"
              style={{ fontSize: "18px" }}
              onClick={handleSettingsClick}
            >
              <InboxOutlined
                className="text-primary mr-2"
                style={{ fontSize: "24px" }}
              />
              Archived
            </Menu.Item>
            <Menu.Item
              key="3"
              style={{ fontSize: "18px" }}
              onClick={handleSettingsClick}
            >
              <HistoryOutlined
                className="text-primary mr-2"
                style={{ fontSize: "24px" }}
              />
              History
            </Menu.Item>
          </Menu>
        </Drawer>

        {/* Settings Content Drawer */}
        <Drawer
          placement="bottom"
          closable={true}
          open={isSettingsContentDrawerOpen}
          onClose={() => setIsSettingsContentDrawerOpen(false)}
          height="100%"
        >
          <ProfilePage />{" "}
        </Drawer>
      </>
    );
  }
};

export default Navbar;
