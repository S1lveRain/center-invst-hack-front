import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {ConfigProvider} from "antd";
import {Provider} from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#3FC143",
                        colorFill: "#F2FFF0",
                        colorWarningBg: "#EBFF00",
                    },
                }}
            >
                <App/>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
