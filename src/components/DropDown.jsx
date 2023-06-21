import { Fragment, useState } from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { useFormik } from "formik";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const DropDown = ({ handleLogout, handleReveal }) => {
	const [isOpen, setIsOpen] = useState(false);

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
		<div className="flex justify-end w-[50%] fixed top-5 right-2 md:-left-2 z-50">
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <FontAwesomeIcon icon={faGear} className="text-gray-500 h-7 w-7 hover:rotate-45 duration-150 drop-shadow-xl" />
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="px-1 py-1 ">
							<Menu.Item>
								{({ active }) => (
									<button
                                        onClick={handleReveal}
										className={`${
											active ? "bg-gray-100" : "text-gray-900"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										<FontAwesomeIcon
											icon={faPenToSquare}
											className="h-3.5 w-3.5 mr-2 text-gray-600"
										/>
										Update
									</button>
								)}
							</Menu.Item>
                            <hr className="my-1"/>
							<Menu.Item>
								{({ active }) => (
									<button
                                        onClick={handleLogout}
										className={`${
											active ? "bg-red-500 text-white" : "text-gray-900"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										<FontAwesomeIcon
											icon={faArrowRightFromBracket}
											className={`${ active ? "mr-2" : "h-3.5 w-3.5 mr-2 text-gray-600"}`}
										/>
										Logout
									</button>
								)}
							</Menu.Item>
                            <hr className="my-1"/>
							<br />
							<Menu.Item>
								{({ active }) => (
									<button
                                        onClick={() => {setIsOpen(!isOpen)}}
										className={`${
											active ? "bg-gray-100" : "text-gray-900"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										<FontAwesomeIcon
											icon={faComment}
											className={`${ active ? "mr-2" : "h-3.5 w-3.5 mr-2 text-gray-600"}`}
										/>
										Report Feedback
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>

			{/* FEEDBACK MODAL */}
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
																id="name-input"
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
																id="email-input"
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
																id="feedback-input"
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
	);
};

export default DropDown;
