import Navbar from "./Navbar";

const Dashboard = () => {
	return (
		<>
			<Navbar />
			<div className="h-full max-w-[2520px] mx-auto xl:px-28 md:px-20 sm:px-2 px-4 bg-gray-100">
				{/* container */}
				<h2 className="flex pt-10 text-xl font-black">Settings</h2>
				<hr />
				<div className="flex pt-[2rem]">
					{/* <div className="flex justify-center items-center h-[10rem] w-[12rem] mr-20 bg-white rounded">
						<div className="flex flex-col space-y-2">
                            <p>Dashboard</p>
                            <p>Data</p>
                            <p>Etc</p>
                        </div>
					</div> */}

					<div className="flex flex-col justify-start h-[45rem] p-10 w-full bg-white rounded">
						{/* FIRST ROW CONTAINER */}
						<div className="flex justify-start w-full ">
							<div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
								<svg
									className="absolute w-22 h-22 text-gray-400 -left-1"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
										clipRule="evenodd"
									/>
								</svg>
							</div>

							<div className="flex flex-col justify-start w-full">
								<div className="flex flex-col ">
									<h2 className="ml-10 text-lg font-semibold">Avatar</h2>
									<p className="ml-10 text-sm text-gray-500">
										600x600 or larger recommended
									</p>
									<button className="shrink-0 ml-9 p-2 mt-2 bg-orange-700 hover:bg-orange-600 rounded-2xl text-white text-sm w-[50%] md:w-[30%] lg:w-[10%]">
										Upload new
									</button>
								</div>
							</div>
						</div>
						<div className="pt-10 font-extrabold">
							<h3>Personal details</h3>
							<hr />
						</div>

						{/* FORM */}
						<form>
							<div className="relative z-0 w-full mb-6 group">
								<input
									type="email"
									name="floating_email"
									id="floating_email"
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									required=""
								/>
								<label
									htmlFor="floating_email"
									className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
								>
									Email address
								</label>
							</div>
							<div className="relative z-0 w-full mb-6 group">
								<input
									type="password"
									name="floating_password"
									id="floating_password"
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									required=""
								/>
								<label
									htmlFor="floating_password"
									className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
								>
									Password
								</label>
							</div>
							<div className="relative z-0 w-full mb-6 group">
								<input
									type="password"
									name="repeat_password"
									id="floating_repeat_password"
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									required=""
								/>
								<label
									htmlFor="floating_repeat_password"
									className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
								>
									Confirm password
								</label>
							</div>
							<div className="grid md:grid-cols-2 md:gap-6">
								<div className="relative z-0 w-full mb-6 group">
									<input
										type="text"
										name="floating_first_name"
										id="floating_first_name"
										className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" "
										required=""
									/>
									<label
										htmlFor="floating_first_name"
										className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
									>
										First name
									</label>
								</div>
								<div className="relative z-0 w-full mb-6 group">
									<input
										type="text"
										name="floating_last_name"
										id="floating_last_name"
										className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" "
										required=""
									/>
									<label
										htmlFor="floating_last_name"
										className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
									>
										Last name
									</label>
								</div>
							</div>
							<div className="grid md:grid-cols-2 md:gap-6">
								<div className="relative z-0 w-full mb-6 group">
									<input
										type="tel"
										pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
										name="floating_phone"
										id="floating_phone"
										className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" "
										required=""
									/>
									<label
										htmlFor="floating_phone"
										className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
									>
										Phone number (123-456-7890)
									</label>
								</div>
								<div className="relative z-0 w-full mb-6 group">
									<input
										type="text"
										name="floating_company"
										id="floating_company"
										className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" "
										required=""
									/>
									<label
										htmlFor="floating_company"
										className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
									>
										Company (Ex. Google)
									</label>
								</div>
							</div>
							<button
								type="submit"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
