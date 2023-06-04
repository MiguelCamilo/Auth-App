import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import convertToBase64 from "../helper/convert";
import { registerValidation } from "../helper/validate";

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

const Profile = () => {
    const [file, setFile] = useState(localStorage.getItem("IMG"))
	// useFormik Hook
	const formik = useFormik({
		initialValues: {
			// empty string for initial value
			username: "",
			email: "",
			password: "",
		},
		// only validate on submit instead of:
		validate: registerValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
            values = await Object.assign(values, { profile: file || '' })
			console.log(values);
		},
	});

    const onUpload = async(e) => {
        // using [0] to grab the first file in the array
        const base64 = await convertToBase64(e.target.files[0])
        setFile(base64)
    }

	return (
		<div className="container mx-auto">
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					duration: 2000,
				}}
			/>
			<div className="flex justify-center items-center h-screen">
				<div className={styles.glass} style={{ width: "45%", height: "85%"}}>
					<div className="title flex flex-col items-center">
						<h4 className="text-5xl font-bold">Profile</h4>
						<span className="py-4 text-xl w-2/3 text-center text-gray-500">
							Let's create an account!
						</span>

						<form onSubmit={formik.handleSubmit} className="py-1">
							<div className="profile flex justify-center py-4">
								<label htmlFor="profile">
                                    {/* to hide the defautl input style look at css file */}
									<img
                                        // conditional render depending on what data exist
										src={file || avatar}
										alt="avatar"
										className={styles.profile_img}
									/>
									<input onChange={onUpload} type="file" id="profile" name="profile" />
								</label>
							</div>

							<div className="textbox flex flex-col items-center gap-6">
								<input
									// sends the username to the formik initial value
									{...formik.getFieldProps("username")}
									type="text"
									placeholder="Username*"
									className={styles.textbox}
								/>
								<input
									// sends the username to the formik initial value
									{...formik.getFieldProps("email")}
									type="email"
									placeholder="Email*"
									className={styles.textbox}
								/>
								<input
									// sends the username to the formik initial value
									{...formik.getFieldProps("password")}
									type="password"
									placeholder="Password*"
									className={styles.textbox}
								/>
								<button
									type="submit"
									className="border bg-indigo-500 w-full py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
								>
									Create account
								</button>
							</div>

							<div className="text-center py-4">
								<span className="text-gray-500">
									Already have an account?{" "}
									<Link className="text-red-600" to="/">
										Login
									</Link>
								</span>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
