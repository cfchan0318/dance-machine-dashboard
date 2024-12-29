import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const userLogin = async (user) => {
        const res = await axios.post('/api/auth/login', user);
        const data = res.data;
        if (data.status === 200) {
            const token = data.token;
            localStorage.setItem('token', `Bearer ${token}`);
            navigate('/')
        }
    };

    const onFinish = (values) => {
        const user = {
            username: values.username,
            password: values.password,
        };
        userLogin(user)
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your Username!",
                    },
                ]}>
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!",
                    },
                ]}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
