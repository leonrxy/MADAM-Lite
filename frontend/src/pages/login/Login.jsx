import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import { Button, Checkbox, Form, Input, Layout } from "antd";
import { Helmet } from "react-helmet";

const { Content, Footer } = Layout;

const Login = () => {
  const [loading, setLoading] = useState(false); // Ubah menjadi satu state saja untuk loading
  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (values) => {
    console.log("value" + values);
    if (values.username == undefined && values.password == undefined) {
      setErrorMessagePassword("Please input your password!");
      setErrorMessageUsername("Please input your username!");
      return;
    } else if (values.username == undefined) {
      setErrorMessageUsername("Please input your username!");
      return;
    } else if (values.password == undefined) {
      setErrorMessagePassword("Please input your password!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const { token } = await response.json();
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + 1);
        const tokenData = { value: token, expiresAt: expiration.getTime() };

        sessionStorage.setItem("token", JSON.stringify(tokenData));
        navigateTo("/dashboard");
      } else {
        //const responseData = await response.json();
        if (response.status === 404) {
          setErrorMessageUsername("Incorrect username");
          setErrorMessagePassword("");
        } else if (response.status === 401) {
          setErrorMessagePassword("Incorrect password");
          setErrorMessageUsername("");
        }
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - MADAM Lite</title>
        <meta name="description" content="MADAM Lite" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Helmet>
      <Layout>
        <Layout>
          <Content className="h-screen flex justify-center items-center">
            <div className="w-full max-w-md">
              <div className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4">
                <h3 className="text-center mb-4 flex items-center justify-center space-x-1">
                  <img src={Logo} alt="Logo" className="h-10" />
                </h3>
                <h2 className="text-3xl font-bold mb-4 text-left">Login</h2>
                <p className="text-base text-left mb-4 text-gray-600">
                  Welcome! Please enter your profile
                </p>

                <Form
                  requiredMark={false}
                  name="login"
                  initialValues={{
                    remember: false,
                  }}
                  onFinish={handleLogin}
                  autoComplete="off"
                  layout="vertical"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    validateStatus={errorMessageUsername ? "error" : ""} // Tentukan status validasi berdasarkan pesan kesalahan
                    help={errorMessageUsername} // Tampilkan pesan kesalahan di bawah input field
                    validateTrigger={[]}
                  >
                    <Input placeholder="Enter your username" size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    validateStatus={errorMessagePassword ? "error" : ""} // Tentukan status validasi berdasarkan pesan kesalahan
                    help={errorMessagePassword} // Tampilkan pesan kesalahan di bawah input field
                    validateTrigger={[]}
                  >
                    <Input.Password
                      placeholder="Enter your password"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="submit"
                      loading={loading}
                      className="h-10 w-full bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                      disabled={loading}
                      htmlType="submit"
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Content>
        </Layout>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
};
export default Login;
