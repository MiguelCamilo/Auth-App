// custom imports
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import convertToBase64 from "../helper/convert";
import { registerValidation } from "../helper/validate";
import { registerUser } from "../helper/axios";

// react imports
import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// UI imports
import toast, { Toaster } from "react-hot-toast";
import { ScrollReveal } from "reveal-on-scroll-react";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = () => {
	const [file, setFile] = useState(localStorage.getItem("IMG"));
	const navigate = useNavigate();
	// useFormik Hook
	const formik = useFormik({
		initialValues: {
			// empty string for initial value
			username: "",
			email: "",
			password: "",
		},
		// only validate on submit instead of:
		validate: registerValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			values = await Object.assign(values, { profile: file || "" });
			// await is not need since the registerUser func returns a Promise.resolve
			let registerPromise = registerUser(values);
			toast.promise(registerPromise, {
				loading: "Loading",
				success: <p>Account created!</p>,
				error: <p>Unable to create account!</p>,
			});
			// on success navigate
			registerPromise
				.then(() => { navigate("/"); })
				.catch((error) => {
					console.log(error)
				});
		},
	});

	const onUpload = async (e) => {
		// using [0] to grab the first file in the array
		const base64 = await convertToBase64(e.target.files[0]);
		setFile(base64);
	};

	return (
		<>
			{/* Global Container */}
			<div className="h-full w-full md:w-[50%] fixed z-[1] top-0 overflow-hidden pt-6 md:pt-20 bg-white">
				<Toaster
					position="top-center"
					reverseOrder={false}
					toastOptions={{
						duration: 2000,
					}}
				/>
				{/* Left Side */}
				<div className="w-full py-8 px-20">
					<div className="flex justify-center mx-auto">
						<ScrollReveal.h1
							delay={0}
							easing="anticipate"
							className="text-[48px] font-black text-center text-[#6366f1] tracking-tighter"
						>
							Register
						</ScrollReveal.h1>
					</div>
					<ScrollReveal.h2
						delay={0.3}
						easing="anticipate"
						className="w-[100%] min-w-[245px] text-gray-500 text-md text-center font-normal italic leading-8"
					>
						Let's create an account!
					</ScrollReveal.h2>

					<ScrollReveal.div delay={0.6} easing="anticipate">
						<form onSubmit={formik.handleSubmit} className="py-1">
							<div className="profile flex justify-center py-4">
								<label htmlFor="profile" className="relative">

									<div className="absolute bottom-0 right-2">
										<FontAwesomeIcon
											icon={faPencil}
											style={{ color: "white" }}
											className="bg-[#6366f1] p-1.5 rounded-full cursor-pointer"
										/>
									</div>
									{/* to hide the defautl input style look at css file */}
									<img
										// conditional render depending on what data exist
										src={file || avatar}
										alt="avatar"
										className={styles.profile_img}
									/>
									<input
										onChange={onUpload}
										type="file"
										id="profile"
										name="profile"
									/>
								</label>
							</div>

							<div className="flex flex-col items-center gap-6">
								{/* username */}
								<div className="flex w-full relative">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faUser}
											style={{ color: "#919191" }}
										/>
									</div>
									<input
										type="text"
										// sends the username to the formik initial value
										{...formik.getFieldProps("username")}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5"
										placeholder="Username"
									/>
								</div>

								{/* email */}
								<div className="flex w-full relative">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faEnvelope}
											style={{ color: "#919191" }}
										/>
									</div>
									<input
										type="email"
										// sends the username to the formik initial value
										{...formik.getFieldProps("email")}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5"
										placeholder="Email"
									/>
								</div>

								{/* password */}
								<div className="flex w-full relative">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faLock}
											style={{ color: "#919191" }}
										/>
									</div>
									<input
										type="password"
										// sends the username to the formik initial value
										{...formik.getFieldProps("password")}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5"
										placeholder="Password"
									/>
								</div>

								<button
									type="submit"
									className="border bg-indigo-500 w-full py-2 rounded-lg text-gray-50 text-md shadow-xl text-center hover:bg-[#ff6a6a]"
								>
									Create Account
								</button>
							</div>
						</form>

						<div className="flex items-center justify-center mt-4">
							{/* <span className="w-1/5 md:w-1/4" /> */}
							<Link to="/">
								<span className="text-xs text-center uppercase text-gray-400">
									Already have an account?
								</span>{" "}
								<span className="text-xs text-center uppercase text-blue-500 hover:text-[#ff6a6a]">
									Login
								</span>
							</Link>
							{/* <span className="w-1/5 md:w-1/4" /> */}
						</div>
					</ScrollReveal.div>
				</div>
				{/* Right Side */}
				<div className="h-full w-[50%] fixed -z-[1] top-0 overflow-hidden right-0">
					<div
						className="w-full h-full gradient-bg hidden md:block bg-cover"
						style={{
							backgroundColor: "#6366f1",
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default Register;
