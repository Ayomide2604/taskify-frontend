import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<App />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				theme="light"
				style={{ position: "fixed", zIndex: "9999" }}
			/>
		</BrowserRouter>
	</StrictMode>
);
