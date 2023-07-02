import { useState } from "react";

import { useFetch } from "../hooks/fetch.hook";
import { getAllUsers } from "../helper/axios";

const Dashboard = () => {
	let username = sessionStorage.getItem("username")
	const [{ isLoading, apiData, serverError }] = useFetch(`/getallusers`);
	return (
		<>
			{!apiData 
			? <h1>Loading...</h1>
			: apiData.map((data) => (
				<h1 className="text-black">{data.username}</h1>				
			))
		}
		</>
	);
};

export default Dashboard;
