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
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					duration: 4000,
				}}
			/>
			<section className="bg-white">
				<div className="lg:grid lg:min-h-screen lg:grid-cols-12">
					<div className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
						<div
							className="absolute inset-0 h-full w-full object-cover opacity-80"
							style={{
								backgroundColor: "#6366f1",
							}}
						/>

						<div className="hidden lg:relative lg:block lg:p-12">
							<span className="sr-only">Home</span>
							{/* <img
								src="https://flowbite.com/docs/images/logo.svg"
								className="h-8 sm:h-10 bg-white p-2 rounded-md"
								alt="Flowbite Logo"
							/> */}

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
								Lorem, ipsum dolor sit amet consectetur adipisicing elit.
								Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
							</ScrollReveal.p>
						</div>
					</div>

					<main className="flex justify-center w-full mt-0 md:mt-[15rem] px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
						<div className="max-w-xl lg:max-w-3xl">
							<div className="relative -mt-16 block lg:hidden">
								<a
									className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
									href="/"
								>
									<span className="sr-only">Home</span>
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
									Lorem, ipsum dolor sit amet consectetur adipisicing elit.
									Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
								</p>
							</div>

							<h2 className="text-[48px] font-black text-center text-[#6366f1] tracking-tighter">
								Hello Again!
							</h2>

							<form onSubmit={userNameFormik.handleSubmit} className="mt-2">
								<div className="mb-5">
									<label className="block text-sm font-medium text-gray-700">
										Username
									</label>

									<input
										// sends the username to the formik initial value
										{...userNameFormik.getFieldProps("username")}
										type="text"
										className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
									/>
								</div>
								<button
									type="submit"
									className="w-full inline-block shrink-0 rounded-md border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-blue-500"
								>
									Continue
								</button>
							</form>

							<Link to="/register">
								<div className="flex flex-row justify-center text-sm text-gray-500 mt-5">
									Don't have an account?
									<div className="text-gray-700 ml-1 underline">Register</div>
								</div>
							</Link>

							{/* FEEDBACK MODAL */}
							<div className="flex flex-col space-y-2 absolute bottom-[3rem] sm:bottom-[12rem] right-[7.5rem] sm:right-[19rem] items-center justify-center">
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
					</main>
				</div>
			</section>
		</>
	);
};

export default Username;
