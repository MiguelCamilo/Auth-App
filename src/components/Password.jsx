import avatar from "../assets/profile.png";
import { useFetch } from "../hooks/fetch.hook";
import { useAuthStore } from "../config/zustand-store";
import { passwordValidate } from '../helper/validate'
import { login } from "../helper/axios";
import styles from "../styles/Username.module.css";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast"
import { ScrollReveal } from "reveal-on-scroll-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";


const Password = () => {
	// with the zustand store, the username is being stored in auth.username
	// from the Username component from setUsername
	// const { username } = useAuthStore(state => state.auth)
	let username = sessionStorage.getItem("username")
	const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

	const navigate = useNavigate()
    
    const formik = useFormik({
        initialValues: {
            // empty string for initial value
            password: ''
        }, 
        // only validate on submit instead of:
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
			// password is stored in the values object
			// login takes two arguments username and password
			let loginPromise = login({ username, password: values.password })
			toast.promise(loginPromise, {
				loading: "Loading",
				success: <b>Login Succesful!</b>,
				error: <b>Authentication Error, try again.</b>,
			})
			loginPromise
				.then((res) => {
					// retrieving the jwt token from the data
					let { token } = res.data
					// store for access in the updateUser func in axios
					localStorage.setItem("token", token)
					navigate("/profile")
				}).catch((error) => {
					console.log(error)
				})
        }
    })

	
	if(isLoading) return <h2 className="text-xl font-bold">Loading</h2>
	if(serverError) return <h3 className="text-xl text-red-600">{serverError.message}</h3>

	return (
		<>
			{/* Global Container */}
			<div className="h-full w-full md:w-[50%] fixed z-[1] top-0 overflow-hidden pt-6 md:pt-20 bg-white">
				<Toaster
					position="top-center"
					reverseOrder={false}
					toastOptions={{
						duration: 2000,
					}}
				/>
				{/* Left Side */}
				<div className="w-full py-8 px-20">
					{/* add if needed */}
					{/* <button className="relative right-10 bottom-20">Back</button> */}
					<div className="flex justify-center mx-auto">
						<ScrollReveal.h1
							delay={0}
							easing="anticipate"
							className="text-[48px] font-black text-center text-[#6366f1] tracking-tighter"
						>
							Hello {apiData?.firstName || apiData?.username}!
						</ScrollReveal.h1>
					</div>
					<ScrollReveal.h2
						delay={0.3}
						easing="anticipate"
						className="w-[100%] min-w-[300px] text-gray-500 text-md text-center font-normal italic leading-8"
					>
						Explore more by connecting with us.
					</ScrollReveal.h2>

					<ScrollReveal.div delay={0.6} easing="anticipate">
						<form onSubmit={formik.handleSubmit} className="py-1">
							<div className="profile flex justify-center py-4">
								<img src={apiData?.profile || avatar} alt="avatar" className={styles.profile_img} />
							</div>

							<div className="flex flex-col items-center gap-6">
								<div className="flex w-full relative">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<FontAwesomeIcon
											icon={faLock}
											style={{ color: "#919191" }}
										/>
									</div>
									<input
										type="password"
										// sends the username to the formik initial value
										{...formik.getFieldProps("password")}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 py-2.5"
										placeholder="Password"
									/>
								</div>
								<button
									type="submit"
									className="border bg-indigo-500 w-full py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
								>
									Log in
								</button>
							</div>
						</form>

						<div className="flex items-center justify-between mt-4">
							<span className="w-1/5 md:w-1/4" />
							<Link to="/recovery">
								<span className="text-xs text-center uppercase text-gray-400">
									forgot password?
								</span>{" "}
								<span className="text-xs text-center uppercase text-blue-500 hover:text-[#ff6a6a]">
									reset password
								</span>
							</Link>
							<span className="w-1/5 md:w-1/4" />
						</div>
					</ScrollReveal.div>
				</div>
				{/* Right Side */}
				<div className="h-full w-[50%] fixed -z-[1] top-0 overflow-hidden right-0">
					<div
						className="w-full h-full gradient-bg hidden md:block bg-cover"
						style={{
							backgroundColor: "#6366f1",
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default Password;
