import React,{ useState } from "react";
import { Layout, Button, Menu } from "antd";
import Logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import CategoryIcon from "../assets/Category.svg";
import ChartIcon from "../assets/Chart.svg";
import FolderIcon from "../assets/Folder.svg";
import SettingIcon from "../assets/Setting.svg";
import { FaBars, FaTimes } from "react-icons/fa";

const { Header, Sider, Content } = Layout;

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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width={250}
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
          style={{ padding: 0, background: "#fff" }}
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
        </Header>
        <Content
          className="site-layout-background"
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
