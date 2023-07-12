import { Avatar } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import FavoriteContext from "../context/FavoriteContext";

const UserCards = ({ id, firstName, lastName, profile, about, jobTitle }) => {
	const favoritesCtx = useContext(FavoriteContext);
	const itemIsFavorite = favoritesCtx.itemIsFavorite(id);

	const toggleFavoriteEvents = () => {
		if (itemIsFavorite) {
			favoritesCtx.removeFavorite(id);
		} else {
			favoritesCtx.addFavorite({
				id,
				firstName,
				lastName,
				// profile,
				about,
				jobTitle,
			}); // sends an user to favorited array
		}
	};

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
							{jobTitle || "Occupation Title Private" }

							<span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
								<button onClick={toggleFavoriteEvents}>
									{itemIsFavorite ? (
										<FontAwesomeIcon
											icon={SolidHeart}
											size="xl"
											className="text-red-600 hover:text-red-500 cursor-pointer ml-3"
										/>
									) : (
										<FontAwesomeIcon
											icon={faHeart}
											size="xl"
											className="text-red-600 hover:text-red-500 cursor-pointer ml-3"
										/>
									)}
								</button>
							</span>
						</h1>

						<p className="leading-relaxed text-sm mb-3">
							{about ||
								"Member currently has no about section added, but don't be afraid to learn more and reach out!"}
						</p>
						<div className="flex items-center flex-wrap ">
							{/* <a className="text-indigo-500 hover:text-indigo-600 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer">
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
							</a> */}

							<span className="text-gray-400 inline-flex items-center leading-none text-sm">
								{/* times liked button has been clicked for each card */}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserCards;
