import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import menuItems from "../components/MenuItems";
import { Breadcrumb } from "antd";

const useBreadcrumbs = () => {
  const location = useLocation();
  const pathSnippets = useMemo(
    () => location.pathname.split("/").filter((i) => i),
    [location.pathname]
  );

  const breadcrumbItems = useMemo(() => {
    const items = [<Breadcrumb.Item key="home">Home</Breadcrumb.Item>];

    let currentPath = "";
    for (const pathSnippet of pathSnippets) {
      currentPath += `/${pathSnippet}`;
      const menuItem = menuItems.find(
        (item) =>
          item.link === currentPath ||
          (item.children &&
            item.children.some((child) => child.link === currentPath))
      );
      if (menuItem) {
        items.push(
          <Breadcrumb.Item key={menuItem.key}>{menuItem.text}</Breadcrumb.Item>
        );
      }
    }

    return items;
  }, [pathSnippets, menuItems]);

  return { breadcrumbItems };
};

export default useBreadcrumbs;