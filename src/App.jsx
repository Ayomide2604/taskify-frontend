import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Todo from "./components/todo";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";

function App() {
	return (
		<div className="app">
			<Header />
			<main className="">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/todos"
						element={
							<ProtectedRoute>
								<Todo />
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
