import { resetPasswordValidation } from '../helper/validate'
import styles from "../styles/Username.module.css";

import { useFormik } from "formik";
import { Toaster } from "react-hot-toast"

const Reset = () => {
    // useFormik Hook 
    const formik = useFormik({
        initialValues: {
            // empty string for initial value
            password: '',
            confirm_password: ''
        }, 
        // only validate on submit instead of:
        validate: resetPasswordValidation,
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
						<h4 className="text-5xl font-bold">Reset Password</h4>
						<span className="py-4 text-xl w-2/3 text-center text-gray-500">
							Enter new password
						</span>

						<form onSubmit={formik.handleSubmit} className="pt-20">

							<div className="textbox flex flex-col items-center gap-6">
								<input
                                    // sends the username to the formik initial value 
                                    { ...formik.getFieldProps('password')}
									type="password"
									placeholder="Password"
									className={styles.textbox}
								/>
								<input
                                    // sends the username to the formik initial value 
                                    { ...formik.getFieldProps('confirm_password')}
									type="password"
									placeholder="Confirm password"
									className={styles.textbox}
								/>
								<button
									type="submit"
									className="border bg-indigo-500 w-full py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
								>
									Let's Go
								</button>
							</div> 
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Reset;
