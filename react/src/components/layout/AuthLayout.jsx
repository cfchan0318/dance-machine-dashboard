import React from "react";
import { Outlet } from "react-router";
import { theme } from "antd";

const { useToken } = theme;

function AuthLayout({ children }) {
    const { token } = useToken();

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "grid",
                placeItems: "center",
                backgroundColor: token.colorPrimaryBg,
            }}>
            {children}
        </div>
    );
}

export default AuthLayout;
