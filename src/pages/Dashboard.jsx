import LoadingAnim from "../components/LoadingAnim";
import UserCards from "../components/UserCards.";
import Navbar from "../components/Navbar";
import Breadcrum from "../components/Breadcrum";

import { useFetch } from "../hooks/fetch.hook";

const Dashboard = () => {
	// let username = sessionStorage.getItem("username");
	// best practice initializing apiData as an emtpy array allow .map to still run even if the returned value is undefined
	const [{ isLoading, apiData = [], serverError }] = useFetch(`/getallusers`);

	if (isLoading) return <LoadingAnim />;
	if(serverError) return <h2 className="flex items-center justify-center min-h-screen font-extrabold text-2xl">{serverError.message}</h2>
	return (
		<>
			<Navbar />
			<div className="pl-10 relative">
				<h1 className="mt-24 capitalize font-extrabold text-3xl">Members</h1>
				<p className="text-xs title-font font-medium text-gray-500">
					Connect & Favorite Members to build your community!
				</p>

				<div className="absolute top-0 right-5">
					<Breadcrum />
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-5">
				{apiData.map((data) => (
					<UserCards
						key={data._id}
						username={data.username}
						profile={data.profile}
						firstName={data.firstName}
						lastName={data.lastName}
						about={data.about}
						jobTitle={data.jobTitle}
					/>
				))}
			</div>
		</>
	);
};

export default Dashboard;
