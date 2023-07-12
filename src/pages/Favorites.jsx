import Navbar from "../components/Navbar";
import Breadcrum from "../components/Breadcrum";
import UserCards from "../components/UserCards.";

import { useContext } from "react";
import FavoriteContext from "../context/FavoriteContext";
import { Link } from "react-router-dom";

const Favorites = () => {
	const favoritesCtx = useContext(FavoriteContext);

	const NoLoadedDataWarning = () => {
		if (favoritesCtx.totalFavorites === 0) {
			return (
				<div className="flex flex-col justify-center items-center min-h-screen text-black font-bold text-xl">
					<label className="mb-5 text-center text-md sm:text-xl">
						You currently have no favorites, lets add some?
					</label>
					<Link
						to={"/dashboard"}
						className="group relative inline-block focus:outline-none focus:ring"
					>
						<span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-indigo-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

						<span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
							View All Events
						</span>
					</Link>
				</div>
			);
		}
	};

	return (
		<>
			<Navbar />
			<div className="pl-10 relative">
				<h1 className="mt-24 capitalize font-extrabold text-3xl">Favorites</h1>
				<p className="text-xs title-font font-medium text-gray-500">
					List of your favorite connections, don't forget to reach out!
				</p>

				<div className="absolute top-0 right-5">
					<Breadcrum />
				</div>
			</div>

			<NoLoadedDataWarning />

			<UserCards favorites={favoritesCtx.favorites} />
		</>
	);
};

export default Favorites;
