import styles from "../styles/Username.module.css";
import { resetPasswordValidation } from '../helper/validate'

import { useFormik } from "formik";
import { Toaster } from "react-hot-toast"
import { ScrollReveal } from "reveal-on-scroll-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const Reset = () => {
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
            console.log(values)
        }
    })

	return (
		<>
			{/* Global Container */}
			<div className="h-full w-full md:w-[50%] fixed z-[1] top-0 overflow-hidden pt-[10rem] bg-white">
				<Toaster
					position="top-center"
					reverseOrder={false}
					toastOptions={{
						duration: 2000,
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
						className="w-[100%] min-w-[300px] text-gray-500 text-md text-center font-normal italic leading-8"
					>
						Enter new password
					</ScrollReveal.h2>

					<ScrollReveal.div delay={0.6} easing="anticipate">
						<form onSubmit={formik.handleSubmit} className="py-1">

							<div className="flex flex-col items-center gap-6">
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
										{...formik.getFieldProps("password")}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5"
										placeholder="Password"
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
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5"
										placeholder="Password"
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

						{/* <div className="flex items-center justify-between mt-4">
							<span className="w-1/5 md:w-1/4" />
							<Link to="/recovery">
								<span className="text-xs text-center uppercase text-gray-400">
									Forgot password?
								</span>{" "}
								<span className="text-xs text-center uppercase text-blue-500 hover:text-[#ff6a6a]">
									Recover Password
								</span>
							</Link>
							<span className="w-1/5 md:w-1/4" />
						</div> */}
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
