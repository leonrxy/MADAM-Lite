import { useEffect } from "react";
import Routes from "../routes/Index";
import { useNavigate } from "react-router-dom";
import { ConfigProvider } from "antd";

export default function App() {
  const navigateTo = useNavigate();
  const isAuthenticated = !!sessionStorage.getItem("token"); // Cek apakah token tersedia di localStorage
  // Redirect otomatis jika token tersedia
  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/dashboard");
    } else {
      navigateTo("/login");
    }
  }, [navigateTo, isAuthenticated]);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Poppins, sans-serif",
            colorPrimary: '#dc362e',
          },
        }}
      >
        <Routes />
      </ConfigProvider>
    </>
  );
}
