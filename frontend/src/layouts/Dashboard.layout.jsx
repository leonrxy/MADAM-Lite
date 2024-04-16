import { useState, useCallback } from "react";
import { Breadcrumb, Layout, Button, Menu, Dropdown, Typography } from "antd";
import Logo from "../assets/Logo.svg";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import menuItems from "../components/MenuItems";
import useActiveMenuItem from "../hooks/useActiveMenuItem";
import useBreadcrumbs from "../hooks/useBreadcrumbs";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const DashboardLayout = ({ children }) => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [collapsed, setCollapsed] = useState(false);
  const { activeMenuItem } = useActiveMenuItem();
  const { breadcrumbItems } = useBreadcrumbs();
  const navigateTo = useNavigate();

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  }, []);

  const onLogout = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userData");
    navigateTo("/login");
  }, [navigateTo]);

  const menuNavbar = (
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
          defaultSelectedKeys={[activeMenuItem?.key]}
          selectedKeys={[activeMenuItem?.key]}
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
            <Text className="text-2xl font-medium">{activeMenuItem?.text}</Text>
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
            {breadcrumbItems}
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