import styles from "../styles/Username.module.css";
import convertToBase64 from "../helper/convert";
import { useFetch } from "../hooks/fetch.hook";
import { profileValidation } from "../helper/validate";
import { updateUser } from "../helper/axios";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import LoadingAnim from "./LoadingAnim";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import { ScrollReveal } from "reveal-on-scroll-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
	const [reveal, setReveal] = useState(true);
	const [file, setFile] = useState();
	const [{ isLoading, apiData, serverError }] = useFetch();
	const navigate = useNavigate();

	// useFormik Hook
	const formik = useFormik({
		initialValues: {
			// empty string for initial value
			firstName: apiData?.firstName || "",
			lastName: apiData?.lastName || "",
			email: apiData?.email || "",
			phoneNumber: apiData?.phoneNumber || "",
		},
		validate: profileValidation,
		enableReinitialize: true,
		// only validate on submit instead of:
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			values = await Object.assign(values, {
				profile: file || apiData?.profile || "",
			});
			let updatePromise = updateUser(values);

			toast.promise(updatePromise, {
				loading: "Updating",
				success: <b>Update Succesful!</b>,
				error: <b>Unable to update, try again.</b>,
			});

			setReveal(!reveal);
		},
	});

	const onUpload = async (e) => {
		// using [0] to grab the first file in the array
		const base64 = await convertToBase64(e.target.files[0]);
		setFile(base64);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	const handleReveal = () => {
		setReveal(!reveal);
	};

	if (isLoading) return <LoadingAnim />;
	if (serverError)
		return <h3 className="text-xl text-red-600">{serverError.message}</h3>;

	return (
		<>
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					duration: 2000,
				}}
			/>
			<Navbar file={file} />
			<div className="h-screen max-w-[2520px] mx-auto xl:px-28 md:px-20 sm:px-2 px-4 bg-gray-100">
				{/* container */}
				<ScrollReveal.h1
					delay={0}
					easing="anticipate"
					className="flex pt-5 text-xl font-black"
				>
					Settings
				</ScrollReveal.h1>
				<hr />
				<div className="flex pt-[2rem]">
					<div className="flex flex-col justify-start h-[40rem] p-10 w-full bg-white rounded">
						{/* FIRST ROW CONTAINER */}
						<div className="flex justify-start w-full ">
							<ScrollReveal.div
								delay={0.3}
								easing="anticipate"
								className="relative"
							>
								<label htmlFor="">
									{/* to hide the defautl input style look at css file */}
									<img
										// conditional render depending on what data exist
										src={file || apiData?.profile}
										alt="avatar"
										className={styles.profile_img}
									/>
								</label>
							</ScrollReveal.div>

							<div className="flex flex-col justify-start w-full">
								<div className="flex flex-col ">
									<ScrollReveal.h2
										delay={0.6}
										easing="anticipate"
										className="ml-10 text-lg font-semibold"
									>
										Avatar
									</ScrollReveal.h2>
									<ScrollReveal.p
										delay={0.6}
										easing="anticipate"
										className="ml-10 text-sm text-gray-500"
									>
										600x600 or larger recommended
									</ScrollReveal.p>
									<ScrollReveal.div
										htmlFor="profile"
										delay={0.6}
										easing="anticipate"
										className="profile"
									>
										<label htmlFor="profile">
											<div
												className={`${
													reveal
														? "text-center shrink-0 ml-9 p-2 mt-2 bg-gray-500 hover:bg-gray-600 rounded-2xl text-white text-sm w-[60%] md:w-[30%] lg:w-[10%] cursor-not-allowed"
														: "text-center shrink-0 ml-9 p-2 mt-2 bg-indigo-500 hover:bg-indigo-600 rounded-2xl text-white text-sm w-[60%] md:w-[30%] lg:w-[10%] cursor-pointer"
												}`}
											>
												Upload New
											</div>
											<input
												onChange={onUpload}
												type="file"
												id="profile"
												name="profile"
												accept="image/*"
												disabled={reveal ? true : false}
											/>
										</label>
									</ScrollReveal.div>
								</div>
							</div>
						</div>
						<div className="pt-10 font-extrabold">
							<h3>Personal details</h3>
							<hr />
						</div>

						{/* FORM */}
						<form onSubmit={formik.handleSubmit}>
							<div className="mt-8 grid grid-cols-6 gap-6 mx-5">
								<div className="col-span-6 sm:col-span-3 relative">
									<label
										htmlFor="FirstName"
										className="block text-sm font-medium text-gray-700"
									>
										First Name
									</label>
									<div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faUser}
											className={`${
												reveal
													? "text-gray-500"
													: "text-green-500 animate-pulse"
											}`}
										/>
									</div>
									<input
										{...formik.getFieldProps("firstName")}
										type="text"
										id="FirstName"
										name="first_name"
										className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm cursor-pointer pl-10"
										disabled={reveal ? true : false}
									/>
								</div>

								<div className="col-span-6 sm:col-span-3 relative">
									<label
										htmlFor="LastName"
										className="block text-sm font-medium text-gray-700"
									>
										Last Name
									</label>
									<div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faUser}
											className={`${
												reveal
													? "text-gray-500"
													: "text-green-500 animate-pulse"
											}`}
										/>
									</div>

									<input
										{...formik.getFieldProps("lastName")}
										type="text"
										id="LastName"
										name="last_name"
										className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm cursor-pointer pl-10"
										disabled={reveal ? true : false}
									/>
								</div>

								<div className="col-span-6 sm:col-span-3 relative">
									<label
										htmlFor="Email"
										className="block text-sm font-medium text-gray-700"
									>
										Email
									</label>
									<div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faEnvelope}
											className={`${
												reveal
													? "text-gray-500"
													: "text-green-500 animate-pulse"
											}`}
										/>
									</div>

									<input
										type={`${reveal ? "password" : "email"}`}
										{...formik.getFieldProps("email")}
										id="Email"
										name="email"
										className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm cursor-pointer pl-10"
										disabled={reveal ? true : false}
									/>
								</div>

								<div className="col-span-6 sm:col-span-3 relative">
									<label
										htmlFor="Email"
										className="block text-sm font-medium text-gray-700"
									>
										Phone Number
									</label>
									<div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faPhone}
											className={`${
												reveal
													? "text-gray-500"
													: "text-green-500 animate-pulse"
											}`}
										/>
									</div>
									<input
										type={`${reveal ? "password" : "tel"}`}
										{...formik.getFieldProps("phoneNumber")}
										id="Email"
										name="email"
										className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm cursor-pointer pl-10"
										disabled={reveal ? true : false}
									/>
								</div>
							</div>
							<button
								type="submit"
								className={`${
									reveal
										? "hidden"
										: "border bg-indigo-500 w-full py-2 mt-5 rounded-lg text-gray-50 text-md shadow-xl text-center hover:bg-[#ff6a6a]"
								}`}
							>
								Update
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
