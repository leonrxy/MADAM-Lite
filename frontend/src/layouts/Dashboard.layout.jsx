import React, { useState } from "react";
import { Layout, Button, Menu, Dropdown, Typography } from "antd";
import Logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import CategoryIcon from "../assets/Category.svg";
import ChartIcon from "../assets/Chart.svg";
import FolderIcon from "../assets/Folder.svg";
import SettingIcon from "../assets/Setting.svg";
import { FaUserCircle, FaBars, FaTimes, FaAngleDown } from "react-icons/fa";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const menuItems = [
  {
    key: "dashboard",
    icon: <img src={CategoryIcon} alt="Category" className="menu-icon" />,
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    key: "master-data",
    icon: <img src={FolderIcon} alt="Folder" className="menu-icon" />,
    text: "Master Data",
    subMenuItems: [
      {
        key: "demograph",
        text: "Demograph",
        link: "/master/demograph",
      },
      {
        key: "psychograph",
        text: "Psychograph",
        link: "/master/psychograph",
      },
    ],
  },
  {
    key: "data-analysis",
    icon: <img src={ChartIcon} alt="Chart" className="menu-icon" />,
    text: "Data Analysis",
    subMenuItems: [
      {
        key: "aio-analysis",
        text: "AIO Analysis",
        link: "/analysis",
      },
      {
        key: "history",
        text: "History",
        link: "/analysis",
      },
    ],
  },
  {
    key: "system-administrator",
    icon: <img src={SettingIcon} alt="Setting" className="menu-icon" />,
    text: "System Administrator",
    subMenuItems: [
      {
        key: "user-management",
        text: "User Management",
        link: "/admin/user-management",
      },
    ],
  },
];

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (key) => {
    setActiveMenu(key);
  };

  const onLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width={250}
        style={{
            borderRight: "1px solid #e8e8e8", // Menambahkan outline
          }}
      >
        <div className="p-4 mt-4 mb-2">
          <img src={Logo} alt="Logo" className="w-42 h-auto mx-auto" />
        </div>
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.key}>
              {index > 0 && <div style={{ height: "15px" }} />}{" "}
              {/* Menambahkan jarak vertikal */}
              {item.subMenuItems ? (
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={
                    <span
                      style={{
                        color: activeMenu === item.key ? "red" : "inherit",
                      }}
                      onClick={() => handleClick(item.key)}
                    >
                      {item.text}
                    </span>
                  }
                >
                  {item.subMenuItems.map((subItem) => (
                    <Menu.Item key={subItem.key}>
                      <Link to={subItem.link}>{subItem.text}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={() => handleClick(item.key)}
                >
                  <Link to={item.link}>
                    <span
                      style={{
                        color: activeMenu === item.key ? "red" : "inherit",
                      }}
                    >
                      {item.text}
                    </span>
                  </Link>
                </Menu.Item>
              )}
            </React.Fragment>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBlock: "40px",
          }}
        >
          <Button
            type="link"
            onClick={toggleCollapsed}
            style={{
              marginLeft: 16,
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {collapsed ? (
              <FaTimes className="text-xl text-gray-800 hover:text-black" />
            ) : (
              <FaBars className="text-xl text-gray-800 hover:text-black" />
            )}
          </Button>
          <Button
            className="flex items-center mr-4 bg-gray-100 hover:bg-gray-400 p-6 rounded-xl focus:outline-none focus:shadow-outline"
            shape="round"
            classNames=""
            // style={{ padding: "24px 10px", background: "#F4F0F0"}} // Menambahkan padding
          >
            <Dropdown overlay={menu} trigger={["click"]}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center mr-1">
                  <FaUserCircle className="text-2xl mr-2" />
                </div>
                <div className="flex flex-col items-start mr-1">
                  <Text style={{ fontSize: "14px" }}>John Doe</Text>
                  <Text style={{ fontSize: "12px" }}>Superadmin</Text>
                </div>
                <FaAngleDown />
              </div>
            </Dropdown>
          </Button>
        </Header>
        <Content
          className="site-layout-background rounded-xl"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
