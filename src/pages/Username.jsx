import Modal from "../components/Modal";
import NotifcationToast from "../components/NotifcationToast";
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../config/zustand-store";

// react imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

// style imports
import { ScrollReveal } from "reveal-on-scroll-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Username = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	// zustand state managment
	const setUsername = useAuthStore((state) => state.setUsername);

	// useFormik Hook
	const userNameFormik = useFormik({
		initialValues: {
			username: "",
		},
		// only validate on submit instead of:
		validate: usernameValidate,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			setUsername(values.username);
			sessionStorage.setItem("username", values.username);
			navigate("/password");
			// console.log(values);
		},
	});

	return (
		<>
			<section className="bg-white">
				<div className="lg:grid lg:min-h-screen lg:grid-cols-12">
					<div className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
						<img
							alt="Night"
							src="https://images.unsplash.com/photo-1496115965489-21be7e6e59a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbm5lY3Rpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
							className="absolute inset-0 h-full w-full object-cover opacity-80"
						/>

						<div className="hidden lg:relative lg:block lg:p-12">
							<span className="sr-only">Home</span>
							<img
								src="https://flowbite.com/docs/images/logo.svg"
								className="h-8 sm:h-10 bg-white p-2 rounded-md"
								alt="Flowbite Logo"
							/>

							<ScrollReveal.h2
								delay={0.2}
								easing={"anticipate"}
								className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl"
							>
								Welcome to Auth App Co.
							</ScrollReveal.h2>

							<ScrollReveal.p
								delay={0.4}
								easing={"anticipate"}
								className="mt-4 leading-relaxed text-white/90"
							>
								Connect, Organize, & Build your community of connections in one
								seamless and organized place.
							</ScrollReveal.p>
						</div>
					</div>

					<main className="flex justify-center w-full lg:mt-[10rem] px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
						<div className="max-w-xl lg:max-w-3xl space-y-5">
							<div className="relative -mt-16 block lg:hidden">
								<a
									className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
									href="/"
								>
									<img
										src="https://flowbite.com/docs/images/logo.svg"
										className="h-8 sm:h-10"
										alt="Flowbite Logo"
									/>
								</a>

								<h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
									Welcome to Auth App Co.
								</h1>

								<p className="mt-4 leading-relaxed text-gray-500">
									Connect, Organize, & Build your community of connections in
									one seamless and organized place.
								</p>
							</div>
							<NotifcationToast />
							<h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
								Log in to your Account
							</h2>
							<p className="leading-relaxed text-gray-500 text-center">
								Welcome back!
							</p>

							<form onSubmit={userNameFormik.handleSubmit} className="mt-2">
								<div className="mb-5">
									<label className="block text-sm font-medium text-gray-700 relative">
										Username
									</label>
									<div className="absolute flex items-center px-3 mt-4">
										<FontAwesomeIcon
											icon={faUser}
											style={{ color: "#919191" }}
										/>
									</div>

									<input
										// sends the username to the formik initial value
										{...userNameFormik.getFieldProps("username")}
										type="text"
										className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-md hover:shadow-lg pl-10 py-2.5"
									/>
								</div>
								<button
									type="submit"
									className="w-full inline-block shrink-0 rounded-md border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-blue-500"
								>
									Continue
								</button>
							</form>

							<div className="mt-3 border-t border-gray-300" />

							<Link to="/register">
								<div className="flex flex-row justify-center text-sm text-gray-500 mt-5">
									Don't have an account?
									<div className="text-gray-700 ml-1 underline">Register</div>
								</div>
							</Link>

							{/* FEEDBACK MODAL */}
							<div className="flex flex-col space-y-2 items-center justify-center">
								<label
									htmlFor="button"
									className="text-xs text-center uppercase text-gray-400"
								>
									How can we improve?
								</label>
								<button
									type="button"
									onClick={() => {
										setIsOpen(!isOpen);
									}}
									className="rounded-md bg-black bg-opacity-20 px-2 py-2 text-xs font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
								>
									Report Feedback
								</button>
							</div>
							<Modal isOpen={isOpen} setIsOpen={setIsOpen} />
						</div>
					</main>
				</div>
			</section>
		</>
	);
};

export default Username;
