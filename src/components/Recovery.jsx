import { Toaster } from "react-hot-toast";
import { ScrollReveal } from "reveal-on-scroll-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";

import { useFetch } from "../hooks/fetch.hook";

const Recovery = () => {
	let username = sessionStorage.getItem("username")
	const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

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
							OTP Recover Password
						</ScrollReveal.h1>
					</div>
					<ScrollReveal.h2
						delay={0.3}
						easing="anticipate"
						className="w-[100%] min-w-[250px] md:min-w-[300px] text-gray-500 text-md text-center font-normal italic leading-8"
					>
						<FontAwesomeIcon icon={faUnlock} style={{ color: "#919191" }} />
						{" "}
						Enter OTP recieved to {apiData?.email}
					</ScrollReveal.h2>

					<ScrollReveal.div delay={0.6} easing="anticipate">
						<form onSubmit={() => {}} className="py-1">
							<div className="flex flex-col items-center gap-6">
								<div className="flex w-full relative">
									{/* inputs start */}
									<div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
										<div className="w-16 h-16 ">
											<input												
												className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
												type="text"
												maxLength="1"												
											/>
										</div>
										<div className="w-16 h-16 ">
											<input
												className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
												type="text"
												maxLength="1"
											/>
										</div>
										<div className="w-16 h-16 ">
											<input
												className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
												type="text"
												maxLength="1"
											/>
										</div>
										<div className="w-16 h-16 ">
											<input
												className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
												type="text"
												maxLength="1"
											/>
										</div>
									</div>

									{/* <input
										type="text"
										inputMode="numeric"
										autoComplete="one-time-code"
										placeholder="OTP"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5"
									/> */}
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
							<button className="text-xs text-center uppercase text-blue-500 hover:text-red-600">
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
