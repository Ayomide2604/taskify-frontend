import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";
import Loader from "../components/Loader";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const TaskScreen = () => {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [initialFormData, setInitialFormData] = useState({
		task: "",
		is_completed: "false",
	});
	const [formData, setFormData] = useState(initialFormData);

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				setLoading(true);
				const response = await api.get("/todos");
				setTodos(response.data);
			} catch (error) {
				console.error(error.message);
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchTodos();
	}, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleToggle = async (id) => {
		try {
			const response = await api.get(`todos/${id}/`);
			const todo = response.data;
			console.log(todo);
			await api.patch(`todos/${id}/`, { is_completed: !todo?.is_completed });

			const updatedTodos = todos.map((task) =>
				task.id === id ? { ...task, is_completed: !todo?.is_completed } : task
			);
			setTodos(updatedTodos);
		} catch (error) {
			toast.error(error.message);
			console.error(error.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const exists = todos.some(
			(todo) => todo.task.toLowerCase() === formData.task.toLowerCase()
		);
		if (exists) {
			toast.info("Todo already exists");
		} else {
			const form = new FormData();
			form.append("task", formData.task.trim().toLowerCase());
			form.append("is_completed", formData.is_completed);
			try {
				const response = await api.post("todos/", form);
				const todo = response.data;
				setTodos([...todos, todo]);
				setFormData(initialFormData);
			} catch (error) {
				if (error.response) {
					toast.error("Unable to add task");
				} else {
					toast.error("Network Error");
					console.error(error.message);
				}
			}
		}
	};

	const handleDelete = async (id) => {
		try {
			await api.delete(`todos/${id}/`);
			const filteredTodos = todos.filter((task) => task.id !== id);
			setTodos(filteredTodos);
		} catch (error) {
			toast.error("unable to remove task");
			console.error(error.message);
		}
	};

	if (loading) {
		return (
			<>
				<Loader />
			</>
		);
	}

	return (
		<section id="hero" className=" hero section dark-background vh-100">
			<img
				src="/hero2.jpg"
				alt=""
				data-aos="fade-in"
				className="hero-img img-fluid"
			/>

			<div className="task-container" id="page-content ">
				<div className="row md:container d-flex justify-content-center vw-75">
					<div className=" col-md-12">
						<div className="card px-3">
							<div className="card-body ">
								<h4 className=" text-center mb-3 text-dark ">All Tasks</h4>
								<TodoForm
									handleSubmit={handleSubmit}
									handleChange={handleChange}
									formData={formData}
								/>
								<TodoList
									todos={todos}
									handleDelete={handleDelete}
									handleToggle={handleToggle}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TaskScreen;
