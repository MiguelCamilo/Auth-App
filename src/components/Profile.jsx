import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import convertToBase64 from "../helper/convert";
import { profileValidation } from "../helper/validate";

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { ScrollReveal } from "reveal-on-scroll-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
	const [file, setFile] = useState(localStorage.getItem("IMG"));
	// useFormik Hook
	const formik = useFormik({
		initialValues: {
			// empty string for initial value
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: ""
		},
		// only validate on submit instead of:
		validate: profileValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			values = await Object.assign(values, { profile: file || "" });
			console.log(values);
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
							className="text-[48px] font-black text-center text-[#6366f1] tracking-tighter cursor-default"
						>
							Profile
						</ScrollReveal.h1>
					</div>
					<ScrollReveal.h2
						delay={0.3}
						easing="anticipate"
						className="w-[100%] min-w-[300px] text-gray-500 text-md text-center font-normal italic leading-8"
					>
						Welcome back!
					</ScrollReveal.h2>

					<ScrollReveal.div delay={0.6} easing="anticipate">
						<form onSubmit={formik.handleSubmit} className="py-1">
							<div className="profile flex justify-center py-4">
								<label htmlFor="profile">
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
								{/* USER information */}
								<div className="flex w-3/4 gap-10">
									<div className="flex w-full relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<FontAwesomeIcon
												icon={faUser}
												style={{ color: "#919191" }}
											/>
										</div>
										<input
											type="text"
											// sends the firstName to the formik initial value
											{...formik.getFieldProps("firstName")}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5 cursor-pointer"
											placeholder="Firstname"
										/>
									</div>
									<div className="flex w-full relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<FontAwesomeIcon
												icon={faUser}
												style={{ color: "#919191" }}
											/>
										</div>
										<input
											type="text"											
											{...formik.getFieldProps("lastName")}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5 cursor-pointer"
											placeholder="Lastname"
										/>
									</div>
								</div>

								{/* CONTACT information */}
								<div className="flex w-3/4 gap-10">
									<div className="flex w-full relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<FontAwesomeIcon
												icon={faPhone}
												style={{ color: "#919191" }}
											/>
										</div>
										<input
											type="tel"	
											maxlength="10" 										
											{...formik.getFieldProps("phoneNumber")}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5 cursor-pointer"
											placeholder="Phone Number"
										/>
									</div>
									<div className="flex w-full relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<FontAwesomeIcon
												icon={faEnvelope}
												style={{ color: "#919191" }}
											/>
										</div>
										<input
											type="email"											
											{...formik.getFieldProps("email")}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5 cursor-pointer"
											placeholder="Email"
										/>
									</div>
								</div>

								<button
									type="submit"
									className="border bg-indigo-500 w-full py-2 rounded-lg text-gray-50 text-md shadow-xl text-center hover:bg-[#ff6a6a]"
								>
									Update
								</button>
							</div>
						</form>

						<div className="flex items-center justify-between mt-4">
							<span className="w-1/5 md:w-1/4" />
							<Link to="/">
								<button onClick={() => {}} className="text-xs text-center uppercase text-white bg-red-600 p-1.5 px-4 rounded-md hover:shadow-xl">
									Logout
								</button>
							</Link>
							<span className="w-1/5 md:w-1/4" />
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

export default Profile;
