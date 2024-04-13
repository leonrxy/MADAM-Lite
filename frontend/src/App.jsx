import { useEffect, useState } from "react";
import Routes from "./routes/Index";
import { useNavigate } from "react-router-dom";
import { ConfigProvider } from "antd";

export default function App() {
  const navigateTo = useNavigate();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const isAuthenticated = !!(
    sessionStorage.getItem("token") && sessionStorage.getItem("userData")
  );
  // Redirect otomatis jika token tersedia
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (!isAuthenticated) {
          navigateTo("/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigateTo("/login");
      } finally {
        setCheckedAuth(true);
      }
    };

    if (!checkedAuth) {
      checkAuthentication();
    }
  }, [navigateTo, isAuthenticated]);

  if (!checkedAuth) {
    return;
  }

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Poppins, sans-serif",
            colorPrimary: "#dc362e",
          },
          components: {
            Menu: {
              itemHeight: 60,
              colorBgTextActive: "#dc362e",
              colorIconHover: "#dc362e",
              itemHoverColor: "#dc362e",
              itemSelectedColor: "#dc362e",
            },
            Table: {
              cellPaddingBlock: 10,
              
            },
          },
        }}
      >
        <Routes />
      </ConfigProvider>
    </>
  );
}
