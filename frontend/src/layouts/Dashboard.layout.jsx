import React, { useState } from "react";
import { Breadcrumb, Layout, Button, Menu, Dropdown, Typography } from "antd";
import Logo from "../assets/Logo.svg";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import menuItems from "./MenuItems";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

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

  const menuNavbar = (
    <Menu>
      <Menu.Item key="1" onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const getBreadcrumbs = () => {
    // Ambil bagian dari URL yang sesuai dengan setiap menu item dalam menuItems
    const pathSnippets = location.pathname.split("/").filter((i) => i);

    // Dapatkan daftar menuItems yang sesuai dengan URL yang sedang aktif
    const activeMenuItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      return menuItems.find((item) => {
        if (item.link === url) {
          return true;
        }
        if (item.subMenuItems) {
          return item.subMenuItems.some((subItem) =>
            url.startsWith(subItem.link)
          );
        }
        return false;
      });
    });

    // Buat elemen Breadcrumb.Item untuk setiap menu dan submenu yang sesuai
    const breadcrumbItems = activeMenuItems.map((menuItem, index) => {
      // Pastikan menuItem tidak bernilai undefined
      if (!menuItem) return null;

      // Jika menuItem adalah submenu
      if (menuItem.subMenuItems) {
        const subMenuItem = menuItem.subMenuItems.find((subItem) =>
          location.pathname.startsWith(subItem.link)
        );
        if (subMenuItem) {
          return (
            <React.Fragment
              key={`breadcrumb-${menuItem.key}-${subMenuItem.key}`}
            >
              <Breadcrumb.Item key={`home-${index}`}>Home</Breadcrumb.Item>
              <Breadcrumb.Item key={menuItem.key}>
                {menuItem.text}
              </Breadcrumb.Item>
              <Breadcrumb.Item key={subMenuItem.key}>
                {subMenuItem.text}
              </Breadcrumb.Item>
            </React.Fragment>
          );
        }
      }

      // Jika menuItem adalah menu utama atau tidak ada submenu yang cocok
      return (
        <React.Fragment key={`breadcrumb-${menuItem.key}`}>
          <Breadcrumb.Item key={`home-${index}`}>Home</Breadcrumb.Item>
          <Breadcrumb.Item key={menuItem.key}>{menuItem.text}</Breadcrumb.Item>
        </React.Fragment>
      );
    });

    return breadcrumbItems;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        theme="light"
        width={260}
        style={{
          borderRight: "1px solid #e8e8e8",
        }}
      >
        <div className="p-4 mt-4 mb-2">
          <img src={Logo} alt="Logo" className="w-42 h-auto mx-auto" />
        </div>
        <Menu mode="inline" defaultSelectedKeys={["dashboard"]}>
          {menuItems.map((item) => (
            <React.Fragment key={item.key}>
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
            borderBottom: "1px solid #e8e8e8",
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
          >
            <Dropdown overlay={menuNavbar} trigger={["click"]}>
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
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBlock: "5px",
            borderBottom: "1px solid #e8e8e8",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
              background: "#fff",
              padding: "20px",
            }}
          >
            {getBreadcrumbs()}
          </Breadcrumb>
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
