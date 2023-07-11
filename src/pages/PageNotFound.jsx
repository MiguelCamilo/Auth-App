import { Link } from "react-router-dom";

const PageNotFound = () => {
	return (
		<>
			<section className="bg-white">
				<div className="flex min-h-screen justify-center items-center mx-auto lg:items-center lg:gap-12">
					<div className="lg:w-1/2">
						<p className="text-7xl font-extrabold text-indigo-500">404 error</p>
						<h1 className="mt-3 text-md font-semibold text-gray-800 md:text-xl">
							Page not found
						</h1>
						<p className="mt-4 text-gray-500 dark:text-gray-400">
							Sorry, the page you are looking for doesn't exist.
						</p>
						<div className="flex items-center mt-6 gap-x-3">
							<button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-white transition-colors duration-200 bg-indigo-500 hover:bg-indigo-600 border rounded-lg gap-x-2 sm:w-auto">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-5 h-5 rtl:rotate-180"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
									/>
								</svg>
								<Link to={"/dashboard"}>Take me home</Link>
							</button>
						</div>                        
					</div>

				</div>
			</section>
		</>
	);
};

export default PageNotFound;
