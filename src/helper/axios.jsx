import ENV from "../hooks/fetch.url"

import axios from "axios";
import jwt_decode from "jwt-decode"


axios.defaults.baseURL = ENV.BASE


export const authenticate = async (username) => {
	try {
		// returning the username since the verifyUser middleware expects
		// username
		return await axios.post("/api/authenticate", { username });
	} catch (error) {
		return { error: "Username does not exist." };
	}
};


// get user details
// reason for the username in an object cause we are destructuring the 
// username from the returned object
export const getUser = async ({ username }) => {
    try {
        const { data } = await axios.get(`/api/user/${username}`)
        return { data }
    } catch (error) {
        return { error: "Password doesn't match." }
    }
}

// get username fromt token func
export const getUserName = async () => {
    const token = localStorage.getItem("token")
    if(!token) {
        return Promise.reject("Token Authorization Required.")
    }

    let decode = jwt_decode(token)
    return decode
}


// register user
export const registerUser = async (credentials) => {
    try {
        // the post req will return a status code and a message that we are destructuring
        // and storing in the data var
        const { data: { message } , status } = await axios.post(`api/register`, credentials)

        let { username, email } = credentials
        // send email
        if(status === 201) {
            await axios.post("/api/registerMail", { username, userEmail: email, text: message })
        }

        // best practice to handle promises in an async func
        return Promise.resolve(message)
    } catch (error) {
        return Promise.reject({ error })
    }
}

// login user
export const login = async ({ username, password }) => {
    try {
        if(username) {
            const { data } = await axios.post("/api/login", { username, password })
            return Promise.resolve({ data })
        }
    } catch (error) {
        return Promise.reject({ error: " Password doesn't match."})
    }
}

// update user profile function
export const updateUser = async(response) => {
    try {
        const token = await localStorage.getItem("token")
        // response will hold updated data
        const data = await axios.put("/api/updateuser", response, { headers: { "Authorization": `Bearer ${token}` }})
        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error: "Could not update profile!"})
    }
}

// generate OTP
export const generateOTP = async (username) => {
    try {
        const { data: { code }, status } = await axios.get("/api/generateOTP", { params: { username } })

        // send mail with OTP
        if(status === 201) {
            let { data: { email }} = await getUser({ username })
            let text = `Your Password Recovery OTP: ${code}`
            await axios.post("/api/registerMail", { username, userEmail: email, text, subject: "Password Recovery OTP" })

            return Promise.resolve(code)
        }
    } catch (error) {
        return Promise.reject({ error })
    }
}

// verify OTP
export const verifyOTP = async ({ username, code }) => {
    try {
        const { data, status } = await axios.get("/api/verifyOTP", { params: { username, code }})
        return { data, status }
    } catch (error) {
        return Promise.reject({ error })
    }
}


export const resetPassword = async ({ username, password }) => {
    try {
        const { data, status } = await axios.put("/api/resetPassword", { username, password })

        return Promise.resolve({ data, status })

    } catch (error) {
        return Promise.reject({ error })
    }
}

export const submitUserFeedback = async({ name, email, feedback }) => {
    try {
            axios.post("https://getform.io/f/b712b844-23b5-4a25-921c-79d5c5421090", {
            name: name, message: feedback, email: email, 
        }, { headers: {'Accept': 'application/json'}})

        return Promise.resolve({ status })
                
        } catch (error) {
            return Promise.reject({ error })
        }
    }


/* 
    We are not using Promises in the getUser function because the function uses async/await syntax 
    to handle the asynchronous operation, which returns a Promise automatically. 
    However, we are using Promises explicitly in the registerUser function to follow best practices 
    and to ensure that the function always returns a Promise, even if it encounters an error.
*/