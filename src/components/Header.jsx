import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
	BiMenu,
	BiX,
	BiHome,
	BiTask,
	BiLogInCircle,
	BiLogOutCircle,
	BiUserCircle,
} from "react-icons/bi";

const Header = () => {
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const currentPath = useLocation().pathname;
	const token = localStorage.getItem("access");

	const handleMenuToggle = () => {
		setMenuOpen(!menuOpen);
	};
	const handleLogout = (e) => {
		try {
			localStorage.removeItem("access");
			localStorage.removeItem("refresh");
			navigate("/");
			alert("Logged Out successfully");
		} catch (error) {
			console.error(error.message);
		}
	};
	return (
		<header
			id="header"
			className={
				menuOpen
					? "header header-show dark-background d-flex flex-column"
					: "header  dark-background d-flex flex-column"
			}
		>
			{menuOpen ? (
				<BiX
					className="header-toggle d-xl-none bi bi-list"
					onClick={handleMenuToggle}
				/>
			) : (
				<BiMenu
					className="header-toggle d-xl-none bi bi-list"
					onClick={handleMenuToggle}
				/>
			)}

			<div className="profile-img mt-5">
				{/* <img src="/default.jpg" alt="" className="img-fluid rounded-circle" /> */}
			</div>
			<Link
				to="/"
				className="logo d-flex align-items-center justify-content-center"
			>
				{/* Uncomment the line below if you also wish to use an image logo  */}
				<img src="/logo.png" alt="" />
				<h1 className="sitename">Taskify</h1>
			</Link>

			<nav id="navmenu" className="navmenu">
				<ul onClick={handleMenuToggle}>
					<li>
						<Link className={currentPath === "/" ? "active" : ""} to="/">
							<BiHome size={25} className="navicon" />
							Home
						</Link>
					</li>
					<li>
						<Link
							className={currentPath === "/todos" ? "active" : ""}
							to="/todos"
						>
							<BiTask size={25} className="navicon" /> Tasks
						</Link>
					</li>

					{token ? (
						<li>
							<Link onClick={handleLogout}>
								<BiLogOutCircle size={25} className="navicon" /> Logout
							</Link>
						</li>
					) : (
						<>
							<li>
								<Link
									className={currentPath === "/login" ? "active" : ""}
									to="/login"
								>
									<BiLogInCircle size={25} className="navicon" /> Login
								</Link>
							</li>
							<li>
								<Link
									className={currentPath === "/login" ? "active" : ""}
									to="/signup"
								>
									<BiUserCircle size={25} className="navicon" /> Signup
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
