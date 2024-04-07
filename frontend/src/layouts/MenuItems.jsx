import CategoryIcon from "../assets/Category.svg";
import ChartIcon from "../assets/Chart.svg";
import FolderIcon from "../assets/Folder.svg";
import SettingIcon from "../assets/Setting.svg";
import { Link } from "react-router-dom";

function getItem(text, label, key, link, icon, children) {
  return {
    key,
    link,
    icon,
    children,
    label,
    text,
  };
}

const menuItems = [
  getItem(
    "Dashboard",
    <Link to="/dashboard">Dashboard</Link>,
    "dashboard",
    "/dashboard",
    <img src={CategoryIcon} alt="Category" className="menu-icon" />
  ),
  getItem(
    "Master Data",
    "Master Data",
    "master-data",
    "/master-data",
    <img src={FolderIcon} alt="Category" className="menu-icon" />,
    [
      getItem(
        "Demograph",
        <Link to="/demograph">Demograph</Link>,
        "demograph",
        "/demograph"
      ),
      getItem(
        "Psychograph",
        <Link to="/psychograph">Psychograph</Link>,
        "psychograph",
        "/psychograph"
      ),
    ]
  ),
  getItem(
    "Data Analysis",
    "Data Analysis",
    "data-analysis",
    "/data-analysis",
    <img src={ChartIcon} alt="Category" className="menu-icon" />,
    [
      getItem(
        "AIO Analysis",
        <Link to="/aio-analysis">AIO Analysis</Link>,
        "aio-analysis",
        "/aio-analysis"
      ),
      getItem(
        "History",
        <Link to="/history">History</Link>,
        "history",
        "/history"
      ),
    ]
  ),
  getItem(
    "System Administrator",
    "System Administrator",
    "system-administrator",
    "/system-administrator",
    <img src={SettingIcon} alt="Category" className="menu-icon" />,
    [
      getItem(
        "User Management",
        <Link to="/user-management">User Management</Link>,
        "user-management",
        "/user-management"
      ),
    ]
  ),
];

export default menuItems;
