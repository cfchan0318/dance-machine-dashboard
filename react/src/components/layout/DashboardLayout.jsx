import React from "react";
import { Flex, Layout, Menu, Grid } from "antd";
import { useLocation, matchPath } from "react-router";
import { theme } from "antd";
import { useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";
import { useEffect } from "react";


const { Header, Sider, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

import SidebarMenu from "./SidebarMenu";


const DashboardLayout = () => {
    const screens = useBreakpoint();
    const location = useLocation();

    useEffect(() => {
        if (!screens.md) {
            setCollapsed(true); // collapse on small screens
        } else {
            setCollapsed(false); // expand on larger screens
        }
    }, [screens]);

    

    const [collapsed, setCollapsed] = useState(false);
    const { token } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100dvh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                //breakpoint="sm"
                collapsedWidth={80}
                defaultCollapsed={true}
                style={{
                    background: token.colorBgContainer,
                    height: "100dvh",
                    zIndex: 10,
                    position: "sticky",
                    top: 0,
                    overflow: "auto",
                }}
                trigger={null}>
                <div className="h-[100dvh]">
                    <SidebarMenu
                        collapsed={collapsed}
                        toggleCollapsed={() => setCollapsed(!collapsed)}
                    />
                </div>
            </Sider>
            <Layout>

                <Content className="p-3">
                    <div
                        style={{
                            background: "#fff",
                            width: "100%",
                            height: "100%",
                            padding: 12,
                            borderRadius: token.borderRadiusLG,
                        }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
