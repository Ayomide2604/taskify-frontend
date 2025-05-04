import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";
import heroBg from "../assets/img/hero.jpg";

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
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
			const response = await api.post("/auth/jwt/create", formData);
			const { access, refresh } = response.data;
			localStorage.setItem("access", access);
			localStorage.setItem("refresh", refresh);
			toast.success("Login Successful");
			navigate("/tasks");
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.detail || "Login Failed");
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
						className="card p-5 shadow justify-content-center  "
						style={{ width: "100%", maxWidth: "500px" }}
					>
						<h4 className="mb-3 text-center text-dark">Login</h4>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">
									Email:
								</label>
								<input
									type="email"
									className="form-control"
									id="email"
									name="email"
									placeholder="Enter Email..."
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

export default Login;
