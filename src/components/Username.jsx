import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../config/zustand-store";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";

// react imports
import { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";

// style imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ScrollReveal } from "reveal-on-scroll-react";
import { Dialog, Transition } from "@headlessui/react";

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

	const feedBackFormik = useFormik({
		initialValues: {
			name: "",
			email: "",
			feedback: "",
		},
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values, { resetForm }) => {
			let userFeedbackPromise = submitUserFeedback(values);
			toast.promise(userFeedbackPromise, {
				loading: "Loading",
				success: <p>Thank you for your feedback!</p>,
				error: <p>Unable to submit feedback, try again.</p>,
			});
			userFeedbackPromise
				.then(() => {
					resetForm();
					setIsOpen(!isOpen);
				})
				.catch((error) => console.log(error));		
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
						duration: 4000,
					}}
				/>
				{/* Left Side */}
				<div className="w-full py-1 md:py-8 px-20">
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
						className="w-[100%] min-w-[245px] text-gray-500 text-md text-center font-normal italic leading-8"
					>
						Explore more by connecting with us.
					</ScrollReveal.h2>

					<ScrollReveal.div delay={0.6} easing="anticipate">
						<form onSubmit={userNameFormik.handleSubmit} className="py-1">
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
										{...userNameFormik.getFieldProps("username")}
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

						<div className="flex relative flex-row w-full justify-center mt-4">
							<Link to="/register">
								<span className="text-xs text-center uppercase text-gray-400">
									Don't have an account?
								</span>{" "}
								<span className="text-xs text-center uppercase text-indigo-500 hover:text-[#ff6a6a]">
									Register
								</span>
							</Link>

							{/* FEEDBACK MODAL */}
							<div className="flex flex-col space-y-2 absolute top-10 items-center justify-center">
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

							<Transition appear show={isOpen} as={Fragment}>
								<Dialog
									as="div"
									className="absolute top-[12rem] md:top-[15rem] bottom-0 left-0 right-0 z-10"
									onClose={() => {
										setIsOpen(!isOpen);
									}}
								>
									<Transition.Child
										as={Fragment}
										enter="ease-out duration-300"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in duration-200"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="fixed inset-0 bg-black bg-opacity-30" />
									</Transition.Child>

									<div>
										<div className="flex min-h-full items-center justify-center p-4 text-center">
											<Transition.Child
												as={Fragment}
												enter="ease-out duration-300"
												enterFrom="opacity-0 scale-95"
												enterTo="opacity-100 scale-100"
												leave="ease-in duration-200"
												leaveFrom="opacity-100 scale-100"
												leaveTo="opacity-0 scale-95"
											>
												<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
													<form onSubmit={feedBackFormik.handleSubmit}>
														<label className="text-lg text-gray-700 ">
															How can we improve?
														</label>
														<div className="mb-3">
															<input
																{...feedBackFormik.getFieldProps("name")}
																type="text"
																id="large-input"
																placeholder="Name"
																required
																className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-sm"
															/>
															<input
																type="hidden"
																name="_gotcha"
																style={{ display: "none !important" }}
															/>
														</div>
														<div className="mb-2">
															<input
																{...feedBackFormik.getFieldProps("email")}
																type="text"
																id="large-input"
																placeholder="Email"
																required
																className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-sm"
															/>
														</div>
														<div className="mb-3">
															<label
																htmlFor="message"
																className="block mb-1 text-sm font-medium text-gray-900"
															>
																Your thoughts:
															</label>
															<textarea
																{...feedBackFormik.getFieldProps("feedback")}
																id="message"
																rows={4}
																className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
																placeholder="Feedback..."
															/>
														</div>

														<button
															type="submit"
															className="w-full text-white bg-indigo-500 hover:bg-[#ff6a6a] focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex justify-center"
														>
															SUBMIT
															<svg
																aria-hidden="true"
																className="w-5 h-5 ml-2 -mr-1"
																fill="currentColor"
																viewBox="0 0 20 20"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
																	clipRule="evenodd"
																/>
															</svg>
														</button>
													</form>
												</Dialog.Panel>
											</Transition.Child>
										</div>
									</div>
								</Dialog>
							</Transition>
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
