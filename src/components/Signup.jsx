import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import heroBg from "../assets/img/hero.jpg";
import { toast } from "react-toastify";
const Signup = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await api.post("/auth/users/", formData);
			toast.success("User Account Created successfully");
			navigate("/login");
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.detail || "User Registration Failed");
				console.error(error.response.data);
			} else {
				toast.error("Network Error");
				console.error(error.message);
			}
		}
	};

	return (
		<section id="hero" className="hero section dark-background">
			<img src={heroBg} alt="" data-aos="fade-in" className="hero-img" />
			<div className=" login-container ">
				<div className="d-flex justify-content-center align-items-center">
					<div
						className="card p-5 mx-4 shadow justify-content-center  "
						style={{ width: "100%", maxWidth: "500px" }}
					>
						<h4 className="mb-3 text-center text-dark">Signup</h4>
						<form onSubmit={handleSubmit}>
							<div className="d-flex col-12 gap-3">
								<div className=" col-6 mb-3">
									<label htmlFor="first_name" className="form-label">
										First Name:
									</label>
									<input
										type="text"
										className="form-control"
										id="first_name"
										name="first_name"
										placeholder=""
										onChange={handleChange}
										value={formData.first_name}
									/>
								</div>
								<div className=" col-6 mb-3">
									<label htmlFor="last_name" className="form-label">
										Last Name:
									</label>
									<input
										type="text"
										className="form-control"
										id="last_name"
										name="last_name"
										placeholder=""
										onChange={handleChange}
										value={formData.last_name}
									/>
								</div>
							</div>
							<div className="mb-3">
								<label htmlFor="username" className="form-label">
									Username:
								</label>
								<input
									type="text"
									className="form-control"
									id="username"
									name="username"
									placeholder=""
									onChange={handleChange}
									value={formData.username}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">
									Email:
								</label>
								<input
									type="email"
									className="form-control"
									id="email"
									name="email"
									placeholder=""
									onChange={handleChange}
									value={formData.email}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="password" className="form-label">
									Password:
								</label>
								<input
									type="password"
									className="form-control"
									id="password"
									name="password"
									placeholder=""
									onChange={handleChange}
									value={formData.password}
								/>
							</div>
							<button type="submit" className="w-100 btn btn-primary py-2">
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Signup;
