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

	useEffect(() => {
		generateOTP(username)
			.then((OTP) => {
				// console.log(OTP);
				if (OTP) return toast.success("OTP has been sent to your email.", {
					style: {
						border: "2px solid green",
						padding: "16px",
						color: "green",
						background: "#f4f5f6"
					},
				});
				return toast.error("Unable to generate OTP.");
			})
			.catch((error) => {
				console.log(error);
			});
	}, [username]);

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			let { status } = await verifyOTP({ username, code: OTP });
			if (status === 201) {
				toast.success("OTP Verification Succesful.");
				return navigate("/reset");
			}
		} catch(error) {
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
		<>
			{/* Global Container */}
			<div className="h-full w-full md:w-[50%] fixed z-[1] top-0 overflow-hidden pt-[10rem] bg-white">
				<Toaster
					position="top-center"
					reverseOrder={false}
					toastOptions={{
						duration: 6000,						
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
							OTP Recover Password
						</ScrollReveal.h1>
					</div>
					<ScrollReveal.h2
						delay={0.3}
						easing="anticipate"
						className="w-[100%] min-w-[250px] md:min-w-[300px] text-gray-500 text-md text-center font-normal italic leading-8"
					>
						<FontAwesomeIcon icon={faUnlock} style={{ color: "#919191" }} />{" "}
						Enter OTP CODE sent to your email.
					</ScrollReveal.h2>

					<ScrollReveal.div delay={0.6} easing="anticipate">
						<form onSubmit={handleSubmit} className="py-1">
							<div className="flex flex-col items-center gap-6">
								<div className="flex w-full relative">
									{/* inputs start */}
									<div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
										<input										
										onChange={e => setOTP(e.target.value)}
										type="text"
										maxLength={4}
										inputMode="numeric"
										autoComplete="one-time-code"
										placeholder="OTP"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5"
									/>
									</div>

									
								</div>
								<button
									type="submit"
									className="border bg-indigo-500 w-full py-2 rounded-lg text-gray-50 text-md shadow-sm text-center hover:bg-[#ff6a6a]"
								>
									Recover
								</button>
							</div>
						</form>

						<div className="flex flex-col items-center justify-between mt-4">
							<span className="w-1/5 md:w-1/4" />
							<span className="text-xs text-center uppercase text-gray-400">
								Didn't get OTP?
							</span>
							<button
								onClick={handleResendOTP}
								type="submit"
								className="text-xs text-center uppercase text-blue-500 hover:text-red-600"
							>
								Resend
							</button>
							<span className="w-1/5 md:w-1/4" />
						</div>
					</ScrollReveal.div>
				</div>
				{/* Right Side */}

				{/* ADD RECOVERY IMAGE HERE  */}
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

export default Recovery;
