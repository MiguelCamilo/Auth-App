import Navbar from "./Navbar";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";


const Dashboard = () => {
	return (
		<>
			<Navbar />
			<div className="h-full max-w-[2520px] mx-auto xl:px-28 md:px-20 sm:px-2 px-4 bg-gray-100">
				{/* container */}
				<h2 className="flex pt-10 text-xl font-black">Settings</h2>
				<hr />
				<div className="flex pt-[2rem]">
					<div className="flex flex-col justify-start h-[45rem] p-10 w-full bg-white rounded">
						{/* FIRST ROW CONTAINER */}
						<div className="flex justify-start w-full ">
							<div className="profile flex justify-center">
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
										src={avatar}
										alt="avatar"
										className={styles.profile_img}
									/>

									{/* <input
										onChange={onUpload}
										type="file"
										id="profile"
										name="profile"
										accept="image/*"
										disabled={reveal ? true : false}
									/> */}
								</label>
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
						<form action="#" className="mt-8 grid grid-cols-6 gap-6 mx-5">
							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="FirstName"
									className="block text-sm font-medium text-gray-700"
								>
									First Name
								</label>

								<input
									type="text"
									id="FirstName"
									name="first_name"
									className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="LastName"
									className="block text-sm font-medium text-gray-700"
								>
									Last Name
								</label>

								<input
									type="text"
									id="LastName"
									name="last_name"
									className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="Email"
									className="block text-sm font-medium text-gray-700"
								>
									Email
								</label>

								<input
									type="email"
									id="Email"
									name="email"
									className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="Email"
									className="block text-sm font-medium text-gray-700"
								>
									Phone Number
								</label>

								<input
									type="email"
									id="Email"
									name="email"
									className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
