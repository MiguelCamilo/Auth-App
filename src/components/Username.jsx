import avatar from "../assets/profile.png";
import { usernameValidate } from "../helper/validate";
import styles from "../styles/Username.module.css";

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { ScrollReveal } from "reveal-on-scroll-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Username = () => {
	// useFormik Hook
	const formik = useFormik({
		initialValues: {
			username: "",
		},
		// only validate on submit instead of:
		validate: usernameValidate,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			console.log(values);
		},
	});

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
							Hello Again!
						</ScrollReveal.h1>
					</div>
					<ScrollReveal.h2
						delay={0.3}
						easing="anticipate"
						className="w-[100%] min-w-[300px] text-gray-500 text-md text-center font-normal italic leading-8"
					>
						Explore more by connecting with us.
					</ScrollReveal.h2>

					<ScrollReveal.div delay={0.6} easing="anticipate">
						<form onSubmit={formik.handleSubmit} className="py-1">
							<div className="profile flex justify-center py-4">
								<img src={avatar} alt="avatar" className={styles.profile_img} />
							</div>

							<div className="flex flex-col items-center gap-6">
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
								<button
									type="submit"
									className="border bg-indigo-500 w-full py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
								>
									Continue
								</button>
							</div>
						</form>

						<div className="flex flex-wrap w-full justify-center mt-4">							
							<Link to="/register">
								<span className="text-xs text-center uppercase text-gray-400">
									Don't have an account?
								</span>{" "}
								<span className="text-xs text-center uppercase text-blue-500 hover:text-[#ff6a6a]">
									Create an account
								</span>
							</Link>							
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

export default Username;
