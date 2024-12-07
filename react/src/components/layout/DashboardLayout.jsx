// src/components/layout/DashboardLayout.jsx
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { UnorderedListOutlined, VideoCameraOutlined } from "@ant-design/icons";

const { Sider, Content } = Layout;

const DashboardLayout = () => {
    const navigate = useNavigate();

    const menuItems = [
        {
            key: "weeks",
            icon: <UnorderedListOutlined />,
            label: "Weeks",
            onClick: () => navigate("/"),
        },
        {
            key: "postures",
            icon: <VideoCameraOutlined />,
            label: "Postures",
            onClick: () => navigate("/poses"),
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider>
                {/* Site Title in Sider */}
                <div
                    className="logo"
                    style={{
                        height: 64,
                        padding: "16px",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textAlign: "center",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}>
                    Dance Machine Dashboard
                </div>
                <Menu theme="dark" mode="inline" items={menuItems} />
            </Sider>
            <Layout>
               
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        background: "#fff",
                    }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
