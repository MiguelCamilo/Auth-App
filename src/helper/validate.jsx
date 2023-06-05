import toast from 'react-hot-toast'

// verify username
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error("Username Required!");
        
    }else if(values.username.includes(" ")){
        error.username = toast.error("Invalid Username!")
    }

    return error;
}

// validate login username
export const usernameValidate = async (values) => {
    const errors = usernameVerify({}, values)
    
    return errors
}


// verify password 
function passwordVerify(errors = {}, values) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password) {
        errors.password = toast.error("Password Required!")

    } else if (values.password.includes(" ")) {
        errors.password = toast.error("Wrong Password!")

    } else if(values.password.length < 4) {
        errors.password = toast.error("Password must be more than 4 characters!")

    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error("Password must have special characters!")
    }

    return errors
}

// validate password
export const passwordValidate = async (values) => {
    const errors = passwordVerify({}, values)

    return errors
}


// validate reset password
export const resetPasswordValidation = async (values) => {
    const errors = passwordVerify({}, values)

    if(values.password !== values.confirm_password) {
        errors.exist = toast.error("Passwords do not match, try again.")
    }

    return errors
}

// verify email
function emailVerify(error = {}, values) {
    if(!values.email) {
        error.email = toast.error("Email is required!")

    } else if (values.email.includes(" ")) {
        error.email = toast.error("Invalid email, try again.")

    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error
}

// validate register form
export const registerValidation = async (values) => {
    const errors = usernameVerify({}, values)
    passwordVerify(errors, values)
    emailVerify(errors, values)

    return errors
}

// validate profile data
export const profileValidation = async (values) => {
    const errors = emailVerify({}, values)

    return errors 
}


