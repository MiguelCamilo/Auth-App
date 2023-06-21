import { resetPasswordValidation } from '../helper/validate'
import { resetPassword } from '../helper/axios';
import { useAuthStore } from "../config/zustand-store";
import { useFetch } from '../hooks/fetch.hook';
import LoadingAnim from './LoadingAnim';

import { useFormik } from "formik";
import { useNavigate, Navigate } from 'react-router-dom';
import { Toaster, toast } from "react-hot-toast"
import { ScrollReveal } from "reveal-on-scroll-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUnlock } from '@fortawesome/free-solid-svg-icons';

const Reset = () => {
	const { username } = useAuthStore(state => state.auth)
	const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')

	const navigate = useNavigate()

    // useFormik Hook 
    const formik = useFormik({
        initialValues: {
            // empty string for initial value
            password: '',
            confirm_password: ''
        }, 
        // only validate on submit instead of:
        validate: resetPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
			let resetPromise = resetPassword({ username, password: values.password })
			
			toast.promise(resetPromise, {
				loading: "Loading",
				success: <b>Password Succesfully Reset!</b>,
				error: <b>Unable to reset password, try again.</b>,
			})

			resetPromise.then(() => {
				return navigate("/password")
			}).catch(error => {
				console.log(error)
			})
        }
    })

	if(isLoading) return <LoadingAnim />
	if(serverError) return <Navigate to={"*"} />
	if(status && status !== 201) return <Navigate to={'/password'} replace={true} />

	return (
		<>
			{/* Global Container */}
			<div className="h-full w-full md:w-[50%] fixed z-[1] top-0 overflow-hidden pt-[10rem] bg-white">
				<Toaster
					position="top-center"
					reverseOrder={false}
					toastOptions={{
						duration: 4000,
					}}
				/>
				{/* Left Side */}
				<div className="w-full py-8 px-20">
					<div className="flex justify-center mx-auto">
						<ScrollReveal.h1
							delay={0}
							easing="anticipate"
							className="text-[48px] font-black text-center text-[#6366f1] tracking-tighter"
						>
							Reset Password
						</ScrollReveal.h1>
					</div>
					<ScrollReveal.h2
						delay={0.3}
						easing="anticipate"
						className="w-[100%] min-w-[300px] text-gray-500 text-md text-center font-bold text-md leading-8"
					>
						Enter new password
					</ScrollReveal.h2>

					<ScrollReveal.div delay={0.6} easing="anticipate">
						<form onSubmit={formik.handleSubmit} className="py-1">

							<div className="flex flex-col items-center gap-6">
								<div className="flex w-full relative">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faUnlock}
											style={{ color: "#919191" }}
										/>
									</div>
									<input
										type="password"
										// sends the username to the formik initial value
										{...formik.getFieldProps("password")}
										className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5"
										placeholder="New Password"
									/>
								</div>

								{/* CONFIRM PASSWORD Input */}
								<div className="flex w-full relative">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faLock}
											style={{ color: "#919191" }}
										/>
									</div>
									<input
										type="password"
										// sends the username to the formik initial value
										{...formik.getFieldProps("confirm_password")}
										className="bg-gray-50 border-2 border-indigo-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5"
										placeholder="Confirm New Password"
									/>
								</div>
								<button
									type="submit"
									className="border bg-indigo-500 w-full py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
								>
									Reset
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
	)
};

export default Reset;
