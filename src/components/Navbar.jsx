import { useFetch } from "../hooks/fetch.hook";

import { Dropdown, Navbar, Avatar } from "flowbite-react";

export default function NavbarWithDropdown({ file }) {
	const [{ apiData }] = useFetch();

	return (
		<Navbar fluid className="bg-gray-900">
			<Navbar.Brand>
				<img
					src="https://flowbite.com/docs/images/logo.svg"
					className="h-8 mr-3"
					alt="Flowbite Logo"
				/>
				<span className="self-center whitespace-nowrap text-xl font-semibold text-white">
					Auth App Co.
				</span>
			</Navbar.Brand>
			<div className="flex md:order-2 z-50 text-white">
				<Dropdown
					inline                    
					label={
						<Avatar
							alt="User settings"
                            img={file || apiData?.profile}                   
							rounded
                            className="border-2 border-indigo-600 rounded-full"
						/>
					}
				>
					<Dropdown.Header className="z-50">
						<span className="block text-sm">{apiData?.firstName} {apiData?.lastName}</span>
						<span className="block truncate text-sm font-medium">
							{apiData?.email}
						</span>
					</Dropdown.Header>
					<Dropdown.Item>Dashboard</Dropdown.Item>
					<Dropdown.Item>Settings</Dropdown.Item>
					<Dropdown.Item>Earnings</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item>Sign out</Dropdown.Item>
				</Dropdown>
			</div>
		</Navbar>
	);
}
