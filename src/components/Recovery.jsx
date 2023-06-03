import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";

const Recovery = () => {
	return (
		<div className="container mx-auto">
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					duration: 2000,
				}}
			/>
			<div className="flex justify-center items-center h-screen">
				<div className={styles.glass}>
					<div className="title flex flex-col items-center">
						<h4 className="text-5xl font-bold">Recover Password</h4>
						<span className="py-4 text-xl w-2/3 text-center text-gray-500">
							Enter OTP to recover password.
						</span>

						<form className="pt-20">
							{/* <div className="profile flex justify-center py-4">
								<img src={avatar} alt="avatar" className={styles.profile_img} />
							</div> */}                

							<div className="textbox flex flex-col items-center gap-6">
								<div className="input text-center">
									<span className="py-4 text-sm text-left text-gray-500 ">
										Enter 6 digit OTP sent to your email address.
									</span>
									<input
										type="text"
										inputmode="numeric"
										autocomplete="one-time-code"
										placeholder="OTP"
										className={styles.textbox}
									/>
								</div>

								<button
									type="submit"
									className="border bg-indigo-500 w-full py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
								>
									Recover
								</button>
							</div>

							<div className="text-center py-4">
								<span className="text-gray-500">
									Didn't get OTP? {""}
									<button className="text-red-600">Resend</button>
								</span>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Recovery;
