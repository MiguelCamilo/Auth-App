import { Avatar } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const UserCards = ({ username, firstName, lastName, profile, about, jobTitle }) => {
	return (
		<>
			<div className="p-2">
				<div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden shadow-md">
					<div className="relative">
					<Avatar 
						size="md"
						className="absolute top-2 right-5"
						img={profile}
					/>
					</div>
					<div className="p-6">
						{!firstName || !lastName ? (
							<h2 className="tracking-widest capitalize text-xs title-font font-medium text-gray-400 mb-1">
								Auth App Member
							</h2>
						) : (
							<h2 className="tracking-widest capitalize text-xs title-font font-medium text-gray-400 mb-1">
								{firstName} {lastName}
							</h2>
						)}
						<h1 className="title-font capitalize text-md font-sans font-black text-gray-900 mb-3">
							{/* <span className="text-xs title-font font-medium text-gray-400">Username: {" "}</span> */}
							{jobTitle}
						</h1>
						<p className="leading-relaxed text-sm mb-3">
							{about || "No about section added, but don't be afraid to learn more and reach out!"}
						</p>
						<div className="flex items-center flex-wrap ">
							<a className="text-indigo-500 hover:text-indigo-600 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer">
								Learn More
								<svg
									className="w-4 h-4 ml-2"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M5 12h14" />
									<path d="M12 5l7 7-7 7" />
								</svg>
							</a>
							<span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
								<FontAwesomeIcon 
									icon={faHeart}
									size="xl"
									className="mr-2 text-red-500 hover:text-red-600 cursor-pointer"
								/>
								{/* 1.2K */}
							</span>
							<span className="text-gray-400 inline-flex items-center leading-none text-sm">
								<svg
									className="w-4 h-4 mr-1"
									stroke="currentColor"
									strokeWidth={2}
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									viewBox="0 0 24 24"
								>
									<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
								</svg>
								6
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserCards;
