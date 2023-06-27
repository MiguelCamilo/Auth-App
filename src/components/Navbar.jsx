import { useFetch } from "../hooks/fetch.hook";
import { useNavigate } from "react-router-dom";

import { Dropdown, Avatar } from "flowbite-react";

export default function NavbarWithDropdown({ file }) {
	const [{ apiData }] = useFetch();

    const navigate = useNavigate()

    const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<nav className="bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
			<div className="flex flex-wrap items-center justify-between p-4">
				<a href="https://flowbite.com/" className="flex items-center">
					<img
						src="https://flowbite.com/docs/images/logo.svg"
						className="h-8 mr-3"
						alt="Flowbite Logo"
					/>
					<span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                        Auth App Co.
					</span>
				</a>
				<div className="flex text-white">
					<Dropdown
						inline
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
							<span className="block sm:hidden text-sm">
								{apiData?.firstName} {apiData?.lastName}
							</span>
							<span className="block truncate text-sm">
								{apiData?.email}
							</span>
						</Dropdown.Header>
						<Dropdown.Item>Dashboard</Dropdown.Item>
						{/* <Dropdown.Item>Settings</Dropdown.Item>
						<Dropdown.Item>Earnings</Dropdown.Item> */}
						<Dropdown.Divider />
						<Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
					</Dropdown>
                    <p className="text-white m-2 hidden sm:block">{apiData?.firstName} {apiData?.lastName}</p>
				</div>
			</div>
		</nav>
	);
}
