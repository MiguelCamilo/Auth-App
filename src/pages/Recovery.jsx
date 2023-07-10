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
				if (OTP)
					return toast.success("OTP has been sent to your email.", {
						style: {
							border: "2px solid green",
							padding: "16px",
							color: "green",
							background: "#f4f5f6",
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
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					duration: 6000,
				}}
			/>
			<div className="flex flex-col justify-center items-center px-4 pb-10 pt-[15rem] sm:px-6 lg:px-8 cursor-default">
				<div className="mx-auto max-w-lg text-center">
					<h1 className="text-2xl font-bold sm:text-3xl">
						OTP Recover Password
					</h1>

					<p className="my-4 text-gray-500">
						Enter OTP Code sent to your email.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col w-1/2 space-y-5">
					<div>
						<label htmlFor="password" className="sr-only">
							Password
						</label>

						<div className="relative">
							<input
								onChange={(e) => setOTP(e.target.value)}
								type="text"
								maxLength={4}
								inputMode="numeric"
								autoComplete="one-time-code"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-center"
								placeholder="4 Digit OTP Code"
							/>

							<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
								<FontAwesomeIcon icon={faUnlock} className="text-gray-500" />
							</span>
						</div>
					</div>

					<div className="flex flex-row items-center justify-between">
						<button
							onClick={() => {
								navigate("/password");
							}}
							className="inline-block rounded-lg bg-transparent  border-2 border-indigo-600  px-5 py-3 mt-2 mr-2 text-sm font-medium text-indigo-600 w-full"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="inline-block rounded-lg text-white bg-indigo-600 border-2 border-indigo-600  px-5 py-3 mt-2 text-sm font-medium w-full"
						>
							Verify
						</button>
					</div>
				</form>

				<p className="text-sm text-gray-500 mt-3">
					Didn't Receive OTP Code?
					<button
						onClick={handleResendOTP}
						type="submit"
						className="text-gray-700 hover:text-indigo-600 underline ml-2"
					>
						Resend
					</button>
				</p>
			</div>
		</div>
	);
};

export default Recovery;
