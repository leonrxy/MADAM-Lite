import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import Logo from "../assets/Logo.svg";
import CategoryIcon from "../assets/Category.svg";
import ChartIcon from "../assets/Chart.svg";
import FolderIcon from "../assets/Folder.svg";
import SettingIcon from "../assets/Setting.svg";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

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

  const handleClick = (key) => {
    setActiveMenu(key);
  };

  return (
    <div className="flex flex-col w-80 h-screen bg-white text-white">
      {/* Logo */}
      <div className="p-4 mt-4 mb-2">
        <img src={Logo} alt="Logo" className="w-42 h-auto mx-auto" />
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        <Menu theme="light" mode="inline" className="text-black">
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
      </div>
    </div>
  );
};

export default Sidebar;
