import avatar from "../assets/profile.png";
import { passwordValidate } from '../helper/validate'
import styles from "../styles/Username.module.css";

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast"

const Password = () => {
    // useFormik Hook 
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
            console.log(values)
        }
    })

	return (
		<div className="container mx-auto">
		<Toaster position="top-center" reverseOrder={false} toastOptions={{
            duration: 2000
        }} />
			<div className="flex justify-center items-center h-screen">
				<div className={styles.glass}>
					<div className="title flex flex-col items-center">
						<h4 className="text-5xl font-bold">Hello Again!</h4>
						<span className="py-4 text-xl w-2/3 text-center text-gray-500">
							Explore more by connecting with us.
						</span>

						<form onSubmit={formik.handleSubmit} className="py-1">
							<div className="profile flex justify-center py-4">
								<img src={avatar} alt="avatar" className={styles.profile_img} />
							</div>

							<div className="textbox flex flex-col items-center gap-6">
								<input
                                    // sends the username to the formik initial value 
                                    { ...formik.getFieldProps('password')}
									type="password"
									placeholder="Password"
									className={styles.textbox}
								/>
								<button
									type="submit"
									className="border bg-indigo-500 w-full py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
								>
									Let's Go
								</button>
							</div>

							<div className="text-center py-4">
								<span className="text-gray-500">
									Forgot Password? {" "}
									<Link className="text-red-600" to="/recovery">
                                        Recover Password
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

export default Password;
