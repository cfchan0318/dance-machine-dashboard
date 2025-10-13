import React from "react";
import { Typography } from "antd";
const { Title } = Typography;

function PageTitle({ children }) {
    return <Title>{children}</Title>;
}

export default PageTitle;
