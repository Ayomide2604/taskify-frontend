import { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { Alert } from "react-bootstrap";
import { titleCase } from "title-case";
import api from "../utils/api";
import Loader from "./Loader";

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [initialFormData, setInitialFormData] = useState({ task: "" });
	const [formData, setFormData] = useState({ task: "" });

	const fetchTodos = async () => {
		try {
			setLoading(true);
			const response = await api.get("/todos");
			setTodos(response.data);
			setError(null);
		} catch (error) {
			console.error(error.message);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};
	const fetchTodosById = async (id) => {
		try {
			setLoading(true);
			const response = await api.get(`todos/${id}/`);
			setTodo(response.data);
		} catch (error) {
			setError(error.message);
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchTodos();
	}, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleToggle = async (id) => {
		try {
			fetchTodosById(id);
			await api.patch(`todos/${id}/`, { is_completed: !todo?.is_completed });
			fetchTodos();
		} catch (error) {
			setError(error.message);
			console.error(error.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const exists = todos.some(
			(todo) => todo.task.toLowerCase() === formData.task.toLowerCase()
		);
		if (exists) {
			alert("Todo already exists");
		} else {
			const form = new FormData();
			form.append("task", formData.task.trim().toLowerCase());
			try {
				await api.post("todos/", form);
				fetchTodos();
				setFormData(initialFormData);
			} catch (error) {
				if (error.response) {
					console.error(error.response.data.detail);
					// alert(error.response.data.detail || "Failed to add todo");
					setError(error.message);
				} else {
					alert("Network Error");
				}
			}
		}
	};

	const handleDelete = async (id) => {
		try {
			await api.delete(`todos/${id}/`);
			fetchTodos();
		} catch (error) {
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

	if (error) {
		<>
			<Alert title={error} />
		</>;
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
								<form
									className="add-items d-grid gap-3 d-md-flex"
									onSubmit={handleSubmit}
									style={{ minHeight: "50px" }}
								>
									<input
										type="text"
										name="task"
										onChange={handleChange}
										value={formData.task}
										className="form-control mb-3 h-100 "
										placeholder="What do you need to do today?"
									/>
									<button
										className={` btn btn-dark btn-medium mb-3 h-100 ${
											formData.task.length === 0 ? "disabled" : ""
										} `}
									>
										Add
									</button>
								</form>
								<div className="list-wrapper ">
									<ul className="d-flex flex-column-reverse todo-list">
										{todos.length > 0 ? (
											todos?.map((todo) => (
												<li className={todo.is_completed ? "completed" : ""}>
													<div className="form-check">
														<label className="form-check-label">
															<input
																className="checkbox"
																type="checkbox"
																checked={todo.is_completed}
																onChange={() => handleToggle(todo.id)}
															/>
															{titleCase(todo.task)}
															<i className="input-helper"></i>
														</label>
													</div>
													<HiOutlineX
														className="remove mdi mdi-close-circle-outline"
														onClick={() => {
															handleDelete(todo.id);
														}}
													/>
												</li>
											))
										) : (
											<div className=" d-grid gap-5 justify-content-center align-items-center ">
												<h4 className="text-center text-dark">
													You have no Tasks
												</h4>
											</div>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Todo;
