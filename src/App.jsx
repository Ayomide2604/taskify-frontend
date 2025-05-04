import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Signup from "./components/Signup";
import TaskScreen from "./Screens/TaskScreen";
import Todo from "./components/Todo";
import "./App.css";

function App() {
	return (
		<div className="app">
			<Header />

			<main className="">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/tasks"
						element={
							<ProtectedRoute>
								<TaskScreen />
							</ProtectedRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
