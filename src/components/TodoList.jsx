import { titleCase } from "title-case";
import { HiOutlineX } from "react-icons/hi";

const TodoList = ({ todos, handleDelete, handleToggle }) => {
	return (
		<div className="todo-list-items">
			{todos.length > 0 ? (
				todos?.map((todo) => (
					<div key={todo.id} className="list-wrapper ">
						<ul className="d-flex flex-column-reverse todo-list">
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
						</ul>
					</div>
				))
			) : (
				<div className=" d-grid gap-5 justify-content-center align-items-center ">
					<h4 className="text-center text-dark">You have no Tasks</h4>
				</div>
			)}
		</div>
	);
};

export default TodoList;
