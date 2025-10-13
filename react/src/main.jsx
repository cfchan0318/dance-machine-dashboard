import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { ConfigProvider } from "antd";

import "./style.css";

import BasicTheme from "./theme/BasicTheme.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <ConfigProvider theme={BasicTheme}>
                <App />
            </ConfigProvider>
        </Provider>
    </StrictMode>
);
