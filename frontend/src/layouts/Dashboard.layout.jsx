import { useState, useEffect } from "react";
import { Breadcrumb, Layout, Button, Menu, Dropdown, Typography } from "antd";
import Logo from "../assets/Logo.svg";
import { useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import menuItems from "./MenuItems";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const DashboardLayout = ({ children }) => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const location = useLocation();

  const getActiveMenu = () => {
    for (let j = 0; j < menuItems.length; j++) {
      const menuItem = menuItems[j];
      if (menuItem.children) {
        const subMenuItem = menuItem.children.find(
          (subItem) => subItem.link === location.pathname
        );
        if (subMenuItem && subMenuItem.role.includes(userData.role)) {
          setActiveSubMenu(subMenuItem);
          setActiveMenu(menuItem);
          return menuItem;
        }
      } else if (
        menuItem.link === location.pathname &&
        menuItem.role.includes(userData.role)
      ) {
        setActiveMenu(menuItem);
        return menuItem;
      }
    }
    return null;
  };

  useEffect(() => {
    setActiveMenu(getActiveMenu() ? getActiveMenu() : null);
  }, [location.pathname]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userData");
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

    // Initialize breadcrumb items with "Home"
    let breadcrumbItems = [<Breadcrumb.Item key="home">Home</Breadcrumb.Item>];

    // Iterate through path snippets to find corresponding menu items
    let currentPath = "";
    for (let i = 0; i < pathSnippets.length; i++) {
      currentPath += `/${pathSnippets[i]}`;

      // Find the menu item that matches the current path
      const menuItem = menuItems.find((item) => item.link === currentPath);
      if (menuItem) {
        breadcrumbItems.push(
          <Breadcrumb.Item key={menuItem.key}>{menuItem.text}</Breadcrumb.Item>
        );
      } else {
        for (let j = 0; j < menuItems.length; j++) {
          const menuItem = menuItems[j];
          if (menuItem.children) {
            const subMenuItem = menuItem.children.find(
              (subItem) => subItem.link === currentPath
            );
            if (subMenuItem) {
              breadcrumbItems.push(
                <Breadcrumb.Item key={menuItem.key}>
                  {menuItem.text}
                </Breadcrumb.Item>
              );
              breadcrumbItems.push(
                <Breadcrumb.Item key={subMenuItem.key}>
                  {subMenuItem.text}
                </Breadcrumb.Item>
              );
              break;
            }
          }
        }
      }
    }

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
        <Menu
          mode="inline"
          defaultSelectedKeys={[activeMenu?.key, activeSubMenu?.key]}
          selectedKeys={[activeSubMenu?.key, activeMenu?.key]}
          items={menuItems.filter((item) => item.role.includes(userData.role))}
        ></Menu>
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
          <div className="space-between items-center flex">
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
            <Text className="text-2xl font-medium">
              {activeSubMenu ? activeSubMenu?.text : activeMenu?.text}
            </Text>
          </div>
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
                <div className="flex flex-col items-start mr-2">
                  <Text style={{ fontSize: "14px" }}>{userData?.name}</Text>
                  <Text style={{ fontSize: "12px" }}>{userData?.role}</Text>
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
            margin: "15px 16px",
            padding: 0,
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
