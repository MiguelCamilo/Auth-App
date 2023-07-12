import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";

const Breadcrum = () => {
	

	const LOCATION = useLocation();

	const PATH = LOCATION.pathname;
	let HREF_PATH = "";
	let Breadcrum_PathName = "";

	if (PATH === "/dashboard") {
		Breadcrum_PathName = "Favorites";
		HREF_PATH = "/favorites";

	} else if (PATH === "/favorites") {
		Breadcrum_PathName = "Dashboard";
        HREF_PATH = "/dashboard";
	}

	return (
		<Breadcrumb aria-label="breadcrum navigation">
			<Breadcrumb.Item>
				<p className="capitalize cursor-default">{PATH.replace("/","")}</p>
			</Breadcrumb.Item>
			<Breadcrumb.Item>
				<Link to={HREF_PATH} className="text-indigo-600 font-bold">{Breadcrum_PathName}</Link>
			</Breadcrumb.Item>
		</Breadcrumb>
	);
};

export default Breadcrum;
