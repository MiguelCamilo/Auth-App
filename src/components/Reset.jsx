import { resetPasswordValidation } from "../helper/validate";
import { resetPassword } from "../helper/axios";
import { useAuthStore } from "../config/zustand-store";
import { useFetch } from "../hooks/fetch.hook";
import LoadingAnim from "./LoadingAnim";

import { useFormik } from "formik";
import { useNavigate, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { ScrollReveal } from "reveal-on-scroll-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";

const Reset = () => {
	// let username = localStorage.getItem("username")
	const { username } = useAuthStore((state) => state.auth);
	const [{ isLoading, apiData, status, serverError }] =
		useFetch("createResetSession");

	const navigate = useNavigate();

	// useFormik Hook
	const formik = useFormik({
		initialValues: {
			// empty string for initial value
			password: "",
			confirm_password: "",
		},
		// only validate on submit instead of:
		validate: resetPasswordValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			let resetPromise = resetPassword({ username, password: values.password });

			toast.promise(resetPromise, {
				loading: "Loading",
				success: <b>Password Succesfully Reset!</b>,
				error: <b>Unable to reset password, try again.</b>,
			});

			resetPromise
				.then(() => {
					return navigate("/password");
				})
				.catch((error) => {
					console.log(error);
				});
		},
	});

	if (isLoading) return <LoadingAnim />;
	if (serverError) return <Navigate to={"*"} />;
	if (status && status !== 201)
		return <Navigate to={"/password"} replace={true} />;

	return (
		<>
			<div>
				<Toaster
					position="top-center"
					reverseOrder={false}
					toastOptions={{
						duration: 6000,
					}}
				/>
				<div className="flex flex-col justify-center items-center px-4 pb-10 pt-[15rem] sm:px-6 lg:px-8 cursor-default">
					<div className="mx-auto max-w-lg text-center">
						<h1 className="text-2xl font-bold sm:text-3xl">Reset Password</h1>

						<p className="my-4 text-gray-500">Enter new password</p>
					</div>

					<form
						onSubmit={formik.handleSubmit}
						className="flex flex-col w-1/2 space-y-5"
					>
						<div>
							<label htmlFor="password" className="sr-only">
								Reset Password
							</label>

							<div className="relative">
								<input
									{...formik.getFieldProps("password")}
									type="password"
									className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-center"
									placeholder="New Password"
								/>

								<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
									<FontAwesomeIcon icon={faUnlock} className="text-gray-500" />
								</span>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="sr-only">
								Enter New Password
							</label>

							<div className="relative">
								<input
									{...formik.getFieldProps("confirm_password")}
									type="password"
									className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-center"
									placeholder="Confirm Password"
								/>

								<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
									<FontAwesomeIcon icon={faLock} className="text-gray-500" />
								</span>
							</div>
						</div>

						<div className="flex flex-col items-center justify-between">
							<button
								type="submit"
								className="inline-block rounded-lg bg-indigo-600 hover:bg-transparent border-2 border-indigo-600 hover:text-indigo-600 px-5 py-3 mt-2 text-sm font-medium text-white w-full"
							>
								Confirm
							</button>

							<button
								onClick={() => {
									navigate("/recovery")
								}}
								className="inline-block rounded-lg bg-transparent border-2 border-indigo-600 hover:text-indigo-600 px-5 py-3 mt-2 text-sm font-medium text-indigo-600 w-full"
							>
								Back
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Reset;
