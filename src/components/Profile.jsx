import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import convertToBase64 from "../helper/convert";
import { useFetch } from "../hooks/fetch.hook";
import { profileValidation } from "../helper/validate";
import { updateUser } from "../helper/axios";
import DropDown from "./DropDown";
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
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
	const [reveal, setReveal] = useState(true)
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
			values = await Object.assign(values, { profile: file || apiData?.profile || "" });
			let updatePromise = updateUser(values);
			
			toast.promise(updatePromise, {
				loading: "Updating",
				success: <b>Update Succesful!</b>,
				error: <b>Unable to update, try again.</b>,
			});

			setReveal(!reveal)
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
        setReveal(!reveal)
    }

	if (isLoading) return <LoadingAnim/>;
	if (serverError)
		return <h3 className="text-xl text-red-600">{serverError.message}</h3>;

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
				<div className="w-full py-8 px-14">					
					<div className="flex justify-center mx-auto">

					<DropDown
						handleLogout={handleLogout}
						handleReveal={handleReveal}
					/>

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
						Hello {apiData?.username}!
					</ScrollReveal.h2>

					<ScrollReveal.div delay={0.6} easing="anticipate">
						<form onSubmit={formik.handleSubmit} className="py-1">
							<div className="profile flex justify-center py-4">
								<label htmlFor="profile" className="relative">
									<div className="absolute -bottom-1 right-1">
										 <FontAwesomeIcon
											icon={faPencil}
											style={{ color: "white" }}
											className="bg-[#6366f1] p-1.5 rounded-full cursor-pointer"
										/> 
									</div>
									{/* to hide the defautl input style look at css file */}
									<img
										// conditional render depending on what data exist
										src={file || apiData?.profile}
										alt="avatar"
										className={styles.profile_img}
									/>

									<input
										onChange={onUpload}
										type="file"
										id="profile"
										name="profile"
										accept="image/*"
										disabled={ reveal ? true : false }
									/>
								</label>
							</div>

							<div className="flex flex-col items-center gap-6">
								{/* USER information */}
								<div className="flex flex-col w-full gap-5">
									<div className="flex w-full relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<FontAwesomeIcon
												icon={faUser}												
												className={`${ reveal ? "text-gray-500" : "text-green-500 animate-pulse" }`}
											/>
										</div>
										<input
											type="text"
											// sends the firstName to the formik initial value
											{...formik.getFieldProps("firstName")}											
											className={`${ reveal ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5 cursor-pointer" : "bg-gray-50 border-2 border-green-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5 cursor-pointer"}`}		
											disabled={ reveal ? true : false }									
											placeholder="Firstname"
										/>
									</div>
									<div className="flex w-full relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<FontAwesomeIcon
												icon={faUser}
												className={`${ reveal ? "text-gray-500" : "text-green-500 animate-pulse" }`}
											/>
										</div>
										<input
											type="text"
											{...formik.getFieldProps("lastName")}
											className={`${ reveal ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5 cursor-pointer" : "bg-gray-50 border-2 border-green-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5 cursor-pointer"}`}
											disabled={ reveal ? true : false }
											placeholder="Lastname"
										/>
									</div>
								</div>

								{/* CONTACT information */}
								<div className="flex flex-col w-full gap-5">
									<div className="flex w-full relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<FontAwesomeIcon
												icon={faPhone}
												className={`${ reveal ? "text-gray-500" : "text-green-500 animate-pulse" }`}
											/>
										</div>
										<input
											type={`${ reveal ? "password" : "tel"}`}										
											maxLength="10"
											{...formik.getFieldProps("phoneNumber")}
											className={`${ reveal ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5 cursor-pointer" : "bg-gray-50 border-2 border-green-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5 cursor-pointer"}`}
											disabled={ reveal ? true : false }
											placeholder="123-456-7890"
										/>
									</div>
									<div className="flex w-full relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<FontAwesomeIcon
												icon={faEnvelope}
												className={`${ reveal ? "text-gray-500" : "text-green-500 animate-pulse" }`}
											/>
										</div>
										<input
											type={`${ reveal ? "password" : "email"}`}
											{...formik.getFieldProps("email")}
											className={`${ reveal ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5 cursor-pointer" : "bg-gray-50 border-2 border-green-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5 cursor-pointer"}`}
											disabled={ reveal ? true : false }
											placeholder="Email"
										/>
									</div>
								</div>

								<button
									type="submit"
									className={`${ reveal ? "hidden" : "border bg-indigo-500 w-full py-2 rounded-lg text-gray-50 text-md shadow-xl text-center hover:bg-[#ff6a6a]"}`}
								>
									Update
								</button>
							</div>
						</form>						
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
