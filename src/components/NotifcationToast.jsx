import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Button, Toast } from "flowbite-react";

import "../App.css";

const NotifcationToast = () => {
	return (
		<>
			<Toast className="absolute top-0 right-5 animate-slide-in-right shadow-xl">
				<div className="flex items-start z-50">
					<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
						<FontAwesomeIcon icon={faTriangleExclamation} />
					</div>
					<div className="ml-3 text-sm font-normal">
						<span className="mb-1 text-sm font-extrabold font-sans text-gray-900 dark:text-white">
							Attention!
						</span>
						<div className="mb-2 text-sm font-normal tracking-tight">Due to Auth App being in BETA and a recent update with the platform if you've previously registered an account, you will have to do so again.
                        </div>
						<Link to={"/register"}>
							<Button
								className="bg-white text-red-600 border-red-600 hover:bg-red-600 hover:text-white flex w-full duration-300"
								size="xs"
							>
								Register
							</Button>
						</Link>
					</div>
					<Toast.Toggle />
				</div>
			</Toast>
		</>
	);
};

export default NotifcationToast;
