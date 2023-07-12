import LoadingAnim from "../components/LoadingAnim";
import UserList from "../components/UserList";
import Navbar from "../components/Navbar";
import Breadcrum from "../components/Breadcrum";
import FavoriteContext from "../context/FavoriteContext";

import { useFetch } from "../hooks/fetch.hook";
import { useContext } from "react";

const Dashboard = () => {
	// best practice initializing apiData as an emtpy array allow .map to still run even if the returned value is undefined
	const [{ isLoading, apiData = [], serverError }] = useFetch(`/getallusers`);

	const favoritesCtx = useContext(FavoriteContext)

	if (isLoading) return <LoadingAnim />;
	if(serverError) return <h2 className="flex items-center justify-center min-h-screen font-extrabold text-2xl">{serverError.message}</h2>
	return (
		<>
			<Navbar />
			<div className="pl-5 relative">
				<h1 className="mt-24 capitalize font-extrabold text-3xl">Members</h1>
				<p className="text-xs title-font font-medium text-gray-500">
					Connect & Favorite Members to build your community!
				</p>

				<div className="flex flex-row absolute top-0 right-3">
					<Breadcrum />
					<span className="ml-2">{favoritesCtx.totalFavorites}</span>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-5">
				<UserList users={apiData} />
			</div>
		</>
	);
};

export default Dashboard;
