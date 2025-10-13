import { Form, Input, Button, Card, Image, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import AuthLayout from "../components/layout/AuthLayout";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const userLogin = async (user) => {
        const res = await axios.post("/api/auth/login", user);
        const data = res.data;
        if (data.status === 200) {
            const token = data.token;
            localStorage.setItem("token", `Bearer ${token}`);
            localStorage.setItem("username", data.username);
            navigate("/");
        }
    };

    const handleOnFinish = (values) => {
        const user = {
            username: values.username,
            password: values.password,
        };
        userLogin(user);
    };

    return (
        <AuthLayout>
            <Card className="w-[400px] h-[400px] p-3 flex justify-center items-center">
                <div className="w-full flex justify-center mb-5">
                    <Image preview={false} className="w-full" />
                </div>

                <Space direction="vertical" size="middle">
                    <Form onFinish={handleOnFinish}>
                        <Form.Item
                            className="w-full"
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className="w-full"
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button
                                className="w-full"
                                type="primary"
                                htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Card>
        </AuthLayout>
    );
};

export default Login;
