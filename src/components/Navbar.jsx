import { useState } from "react";
import { useFetch } from "../hooks/fetch.hook";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

import { Dropdown, Avatar } from "flowbite-react";
import { Toaster, toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHouse } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function NavbarWithDropdown({ file }) {
	const [isOpen, setIsOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [{ apiData }] = useFetch();

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<nav className="bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					duration: 4000,
				}}
			/>
			<div className="flex flex-wrap items-center justify-between p-4">
				<div className="flex">
					<img
						src="https://flowbite.com/docs/images/logo.svg"
						className="h-8 mr-3"
						alt="Flowbite Logo"
					/>
					<span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
						Auth App Co.
					</span>
				</div>
				<div className="flex text-white">
					<Dropdown
						inline
						show={dropdownOpen}
						onToggle={() => setDropdownOpen(!dropdownOpen)}						
						label={
							<Avatar
								alt="User Profile Image"
								img={file || apiData?.profile}
								rounded
								className="border-2 border-indigo-600 rounded-full"
							/>
						}
					>
						<Dropdown.Header>
							<span className="text-sm">
								{apiData?.firstName} {apiData?.lastName}
							</span>
							<span className="block truncate text-sm">{apiData?.email}</span>
						</Dropdown.Header>
						<Dropdown.Item
							onClick={() => {
								toast.custom(
									(t) => (
										<div
											className={`${
												t.visible ? "animate-enter" : "animate-leave"
											} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
										>
											<div className="flex-1 w-0 p-4">
												<div className="flex items-start">
													<div className="flex-shrink-0 pt-0.5">
														<img
															className="h-10 w-10 rounded-full"
															src="https://flowbite.com/docs/images/logo.svg"
															alt=""
														/>
													</div>
													<div className="ml-3 flex-1">
														<p className="text-lg font-bold text-gray-900">
															Auth App Co.
														</p>
														<p className="mt-1 text-sm text-gray-700">
															This feature is coming soon, thank you for
															waiting!
														</p>
													</div>
												</div>
											</div>
											<div className="flex border-l border-gray-200">
												<button
													onClick={() => toast.dismiss(t.id)}
													className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-black hover:text-indigo-500"
												>
													Close
												</button>
											</div>
										</div>
									),
									{
										id: "auth-app",
									}
								);
							}}
						>
							<FontAwesomeIcon icon={faHouse} className="mr-1" />
							Dashboard
						</Dropdown.Item>

						<Dropdown.Divider />

						<Dropdown.Item
							onClick={() => {
								navigate("/profile");								
							}}
						>
							<FontAwesomeIcon icon={faGear} className="mr-1" />
							Profile Settings
						</Dropdown.Item>

						<Dropdown.Divider />

						<Dropdown.Item
							onClick={() => {
								setIsOpen(!isOpen);				
							}}
						>
							<FontAwesomeIcon icon={faComment} className="mr-1" />
							Report Feedback
						</Dropdown.Item>

						<Dropdown.Divider />

						<Dropdown.Item onClick={handleLogout}>
							<FontAwesomeIcon
								icon={faArrowRightFromBracket}
								className="mr-1"
							/>
							Sign out
						</Dropdown.Item>
					</Dropdown>
					<p className="text-white m-2 hidden sm:block">{apiData?.username}</p>
				</div>
				<Modal isOpen={isOpen} setIsOpen={setIsOpen} />
			</div>
		</nav>
	);
}
