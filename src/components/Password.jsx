import { useFetch } from "../hooks/fetch.hook";
import { useAuthStore } from "../config/zustand-store";
import { passwordValidate } from "../helper/validate";
import { login } from "../helper/axios";
import LoadingAnim from "./LoadingAnim";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { Avatar } from "flowbite-react";
import { useFormik } from "formik";
import { ScrollReveal } from "reveal-on-scroll-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const Password = () => {
	// with the zustand store, the username is being stored in auth.username
	// from the Username component from setUsername
	// const { username } = useAuthStore(state => state.auth)
	let username = sessionStorage.getItem("username");
	const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			// empty string for initial value
			password: "",
		},
		// only validate on submit instead of:
		validate: passwordValidate,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			// password is stored in the values object
			// login takes two arguments username and password
			let loginPromise = login({ username, password: values.password });
			toast.promise(loginPromise, {
				loading: "Loading",
				success: <b>Login Succesful!</b>,
				error: <b>Authentication Error, try again.</b>,
			});
			loginPromise
				.then((res) => {
					// retrieving the jwt token from the data
					let { token } = res.data;
					// store for access in the updateUser func in axios
					localStorage.setItem("token", token);
					navigate("/profile");
				})
				.catch((error) => {
					console.log(error);
				});
		},
	});

	if (isLoading) return <LoadingAnim />;
	if (serverError)
		return <h3 className="text-xl text-red-600">{serverError.message}</h3>;

	return (
		<>
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					duration: 2000,
				}}
			/>
			<section className="bg-white">
				<div className="lg:grid lg:min-h-screen lg:grid-cols-12">
					<div className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
						<img
							alt="Night"
							src="https://images.unsplash.com/photo-1496115965489-21be7e6e59a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbm5lY3Rpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
							className="absolute inset-0 h-full w-full object-cover opacity-80"
						/>

						<div className="hidden lg:relative lg:block lg:p-12">
							<span className="sr-only">Home</span>
							<img
								src="https://flowbite.com/docs/images/logo.svg"
								className="h-8 sm:h-10 bg-white p-2 rounded-md"
								alt="Flowbite Logo"
							/>

							<ScrollReveal.h2
								delay={0.2}
								easing={"anticipate"}
								className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl"
							>
								Welcome to Auth App Co.
							</ScrollReveal.h2>

							<ScrollReveal.p
								delay={0.4}
								easing={"anticipate"}
								className="mt-4 leading-relaxed text-white/90"
							>
								Connect, Organize, & Build your community of connections in one
								seamless and organized place.
							</ScrollReveal.p>
						</div>
					</div>

					<main className="flex justify-center w-full mt-0 md:mt-[10rem] px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
						<div className="max-w-xl lg:max-w-3xl space-y-5">
							<div className="relative -mt-16 block lg:hidden">
								<a
									className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
									href="/"
								>
									<span className="sr-only">Home</span>
									<img
										src="https://flowbite.com/docs/images/logo.svg"
										className="h-8 sm:h-10"
										alt="Flowbite Logo"
									/>
								</a>

								<h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
									Welcome to Auth App Co.
								</h1>

								<p className="mt-4 leading-relaxed text-gray-500">
									Connect, Organize, & Build your community of connections in
									one seamless and organized place.
								</p>
							</div>

							<Avatar 
								img={apiData?.profile}
								size="lg"								
							/>

							<h2 className="text-[48px] font-sans font-bold text-center text-slate-800 tracking-wide">
								Welcome back, {apiData?.username}!
							</h2>
							<p className="text-sm font-sans font-normal text-center text-gray-400"></p>

							<form onSubmit={formik.handleSubmit} className="mt-2">
								<div className="mb-5">
									<label className="block text-sm font-medium text-gray-700 relative">
										Password
									</label>
									<div className="absolute flex items-center px-3 mt-4">
										<FontAwesomeIcon
											icon={faLock}
											style={{ color: "#919191" }}
										/>
									</div>
									<input
										// sends the username to the formik initial value
										{...formik.getFieldProps("password")}
										type="password"
										className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm pl-10 py-2.5"
									/>
								</div>
								<button
									type="submit"
									className="w-full inline-block shrink-0 rounded-md border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-blue-500"
								>
									Login
								</button>
							</form>
							<div className="mt-6 border-t border-gray-300" />
							<Link to="/recovery">
								<div className="flex flex-row justify-center text-sm text-gray-500 mt-5">
									Forgot Password?
									<div className="text-gray-700 ml-1 underline">
										Reset Password
									</div>
								</div>
							</Link>
						</div>
					</main>
				</div>
			</section>
		</>
	);
};

export default Password;
