// custom imports
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
	const [file, setFile] = useState();
	const navigate = useNavigate();
	// useFormik Hook
	const formik = useFormik({
		initialValues: {
			// empty string for initial value
			firstName: "",
			lastName: "",
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
				.then(() => {
					navigate("/");
				})
				.catch((error) => {
					console.log(error);
				});
				// console.log(values)
		},
	});

	const onUpload = async (e) => {
		// using [0] to grab the first file in the array
		const base64 = await convertToBase64(e.target.files[0]);
		setFile(base64);
	};

	return (
		<>
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					duration: 4000,
				}}
			/>
			<section className="bg-white">
				<div className="lg:grid lg:min-h-screen lg:grid-cols-12">
					<aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
						<img
							alt="Pattern"
							src="https://images.unsplash.com/photo-1546349851-64285be8e9fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGF0dGVybnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
							className="absolute inset-0 h-full w-full object-cover"
						/>
					</aside>

					<main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
						<div className="max-w-xl lg:max-w-3xl">
							<span className="sr-only">Home</span>
							<ScrollReveal.div delay={0.2} easing={"anticipate"}>
								<img
									src="https://flowbite.com/docs/images/logo.svg"
									className="h-8 mr-3"
									alt="Flowbite Logo"
								/>
							</ScrollReveal.div>

							<ScrollReveal.h1
								delay={0.2}
								easing={"anticipate"}
								className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
							>
								Welcome to Auth App Co.
							</ScrollReveal.h1>

							<ScrollReveal.p
								delay={0.4}
								easing={"anticipate"}
								className="mt-4 mb-6 leading-relaxed text-gray-500"
							>
								We are glad to have you, let's create an account and get you
								connected with the rest of the community!
							</ScrollReveal.p>

							<div>
								<form
									onSubmit={formik.handleSubmit}
									className="mt-8 grid grid-cols-6 gap-6"
								>
									<div className="col-span-6">
										<label
											className="block my-2 text-sm font-medium text-gray-900"
											htmlFor="file_input"
										>
											Upload a Profile Image
										</label>
										<input
											className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
											onChange={onUpload}
											type="file"
											id="profile"
											name="profile"
											accept="image/*"
										/>
										<p
											className="mt-1 text-sm text-gray-500"
											id="file_input_help"
										>
											PNG or JPG RECOMMENDED (MIN. 600x600px).
										</p>
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label											
											className="block text-sm font-medium text-gray-700 relative"
										>
											First Name
										</label>
										<div className="absolute flex items-center px-3 mt-4">
											<FontAwesomeIcon
												icon={faUser}
												style={{ color: "#919191" }}
											/>
										</div>

										<input
											{...formik.getFieldProps("firstName")}
											type="text"
											className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-md hover:shadow-lg pl-10 py-2.5"
										/>
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label											
											className="block text-sm font-medium text-gray-700 relative"
										>
											Last Name
										</label>
										<div className="absolute flex items-center px-3 mt-4">
											<FontAwesomeIcon
												icon={faUser}
												style={{ color: "#919191" }}
											/>
										</div>

										<input
											{...formik.getFieldProps("lastName")}
											type="text"
											className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-md hover:shadow-lg pl-10 py-2.5"
										/>
									</div>

									

									<div className="col-span-6">
										<label											
											className="block text-sm font-medium text-gray-700 relative"
										>
											Username
										</label>
										<div className="absolute flex items-center px-3 mt-4">
											<FontAwesomeIcon
												icon={faUser}
												style={{ color: "#919191" }}
											/>
										</div>

										<input
											{...formik.getFieldProps("username")}
											type="text"
											className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-md hover:shadow-lg pl-10 py-2.5"
										/>
									</div>

									<div className="col-span-6">
										<label
											htmlFor="Email"
											className="block text-sm font-medium text-gray-700 relative"
										>
											Email
										</label>
										<div className="absolute flex items-center px-3 mt-4">
											<FontAwesomeIcon
												icon={faEnvelope}
												style={{ color: "#919191" }}
											/>
										</div>

										<input
											{...formik.getFieldProps("email")}
											type="email"
											id="Email"
											name="email"
											className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-md hover:shadow-lg pl-10 py-2.5"
										/>
									</div>

									<div className="col-span-6">
										<label
											htmlFor="Password"
											className="block text-sm font-medium text-gray-700 relative"
										>
											Password
										</label>
										<div className="absolute flex items-center px-3 mt-4">
											<FontAwesomeIcon
												icon={faLock}
												style={{ color: "#919191" }}
											/>
										</div>

										<input
											{...formik.getFieldProps("password")}
											type="password"
											id="Password"
											name="password"
											className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-md hover:shadow-lg pl-10 py-2.5"
										/>
									</div>

									<div className="col-span-6">
										<button type="submit" className="inline-block w-full rounded-md border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
											Create an account
										</button>
									</div>
								</form>

								<div className="mt-6 border-t border-gray-300" />
							</div>

							<div
								className="mt-5 col-span-6 flex flex-col sm:items-center sm:gap-4"
							>
								<p className="mt-4 text-sm text-center text-gray-500 sm:mt-0">
									Already have an account?
									<Link to={"/"} className="text-gray-700 underline ml-2">
										Log in
									</Link>
									.
								</p>
							</div>
						</div>
					</main>
				</div>
			</section>
		</>
	);
};

export default Register;
