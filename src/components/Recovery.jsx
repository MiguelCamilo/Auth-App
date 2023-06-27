import { Toaster, toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollReveal } from "reveal-on-scroll-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";

import { useAuthStore } from "../config/zustand-store";
import { generateOTP, verifyOTP } from "../helper/axios";

const Recovery = () => {
	let { username } = useAuthStore((state) => state.auth);
	const [OTP, setOTP] = useState();

	const navigate = useNavigate();

	// useEffect(() => {
	// 	generateOTP(username)
	// 		.then((OTP) => {
	// 			// console.log(OTP);
	// 			if (OTP) return toast.success("OTP has been sent to your email.", {
	// 				style: {
	// 					border: "2px solid green",
	// 					padding: "16px",
	// 					color: "green",
	// 					background: "#f4f5f6"
	// 				},
	// 			});
	// 			return toast.error("Unable to generate OTP.");
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }, [username]);

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			let { status } = await verifyOTP({ username, code: OTP });
			if (status === 201) {
				toast.success("OTP Verification Succesful.");
				return navigate("/reset");
			}
		} catch (error) {
			return toast.error("Invalid OTP try again.");
		}
	};

	// resend OTP
	const handleResendOTP = () => {
		let sendPromise = generateOTP(username);
		toast.promise(sendPromise, {
			loading: "Generating New OTP",
			success: <b>OTP sent to your email.</b>,
			error: <b>Unable to send OTP.</b>,
		});
	};

	return (
		<div>
			{/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

			<div className="flex flex-col justify-center items-center px-4 pb-10 pt-[15rem] sm:px-6 lg:px-8">
				<div className="mx-auto max-w-lg text-center">
					<h1 className="text-2xl font-bold sm:text-3xl">
						OTP Recover Password
					</h1>

					<p className="mt-4 text-gray-500">
						Enter OTP CODE sent to your email.
					</p>
				</div>

				<form action="" className="flex flex-col w-1/2 space-y-5">
					<div>
						<label htmlFor="email" className="sr-only">
							Email
						</label>

						<div className="relative">
							<input
								type="email"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter email"
							/>

							<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
									/>
								</svg>
							</span>
						</div>
					</div>

					<div>
						<label htmlFor="password" className="sr-only">
							Password
						</label>

						<div className="relative">
							<input
								type="password"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter password"
							/>

							<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							</span>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-500">
							No account?
							<a className="underline" href="">
								Sign up
							</a>
						</p>

						<button
							type="submit"
							className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Recovery;
