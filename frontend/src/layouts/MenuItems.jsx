import CategoryIcon from "../assets/Category.svg";
import ChartIcon from "../assets/Chart.svg";
import FolderIcon from "../assets/Folder.svg";
import SettingIcon from "../assets/Setting.svg";

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
        link: "/aio-analysis",
      },
      {
        key: "history",
        text: "History",
        link: "/history",
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
        link: "/user-management",
      },
    ],
  },
];

export default menuItems;