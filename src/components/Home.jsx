import { Link } from "react-router-dom";
const Home = () => {
	const token = localStorage.getItem("access");
	return (
		<section id="hero" className="hero section dark-background">
			<img src="/hero2.jpg" alt="" data-aos="fade-in" className="hero-img" />

			<div
				className="container d-grid gap-3"
				data-aos="fade-up"
				data-aos-delay="100"
			>
				<h2>Welcome to Taskify</h2>
				<div className="d-flex">
					{token ? (
						<button className="btn btn-outline-info btn-lg ms-3">
							<Link to="/todos">View Tasks</Link>
						</button>
					) : (
						<>
							<button className="btn btn-outline-info btn-lg ms-3  ">
								<Link to="/login">Login</Link>
							</button>
							<button className="btn btn-outline-info btn-lg ms-3 ">
								<Link to="/signup">Signup</Link>
							</button>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default Home;
