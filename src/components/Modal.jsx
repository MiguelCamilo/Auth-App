import { Fragment } from "react";
import { submitUserFeedback } from "../helper/axios";

import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({ isOpen, setIsOpen }) => {
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
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="absolute top-[12rem] md:top-[15rem] bottom-0 left-0 right-0 z-20"
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
		</>
	);
};

export default Modal;
