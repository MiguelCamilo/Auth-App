import { getUserName } from "../helper/axios"

import axios from "axios"
import { useEffect, useState } from "react"

axios.defaults.baseURL = "http://localhost:8080"

// custom hook to pass any api route and have it fetch the data and status
// the useFetch hook is a reusable way to fetch data from an API and handle loading and error states
export const useFetch = (query) => {
    const [getData, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }))

                const { username } = await getUserName()

                const { data, status } = !query ? await axios.get(`/api/user/${username}`)  : await axios.get(`/api/${query}`)

                if(status === 201) {
                    setData(prev => ({ ...prev, isLoading: false }))
                    setData(prev => ({ ...prev, apiData: data, status: status }))
                }
                    setData(prev => ({ ...prev, isLoading: false }))

            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        }
        fetchData()
    },[query])

    return [getData, setData]
}