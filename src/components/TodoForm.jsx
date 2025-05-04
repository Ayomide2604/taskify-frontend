const TodoForm = ({ handleSubmit, handleChange, formData }) => {
	return (
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
	);
};

export default TodoForm;
