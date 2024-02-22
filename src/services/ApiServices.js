import axios from "axios";
import { useNavigate } from "react-router";


export const useHttpApiHook = () => {
    const navigate = useNavigate();
    const getToken = () => {
        const token = localStorage.getItem('accessToken');
        if (!token) navigate('/login');
        return token;
    }
    const getHeaders = (secure) => {
        let defaultHeaders = {
            'Content-Type': 'application/json',
        };

        if (secure) {
            const accessToken = getToken();
            if (accessToken) {
                defaultHeaders.Authorization = `Bearer ${accessToken}`
            }

        }
        return defaultHeaders;
    }

    const getApi = async (url, secure = true) => {
        try {
            const headers = getHeaders(secure);
            const options = {
                headers
            }
            const result = await axios.get(url, options);
            return result
        } catch (err) {
            throw err;
        }
    }
    const postApi = async (url, payload={}, secure = true) => {
        try {
            const headers = getHeaders(secure);
            const options = {
                method: 'post',
                headers
            }
            debugger
            const result = await axios.post(url, payload, options);
            return result
        } catch (err) {
            throw err;
        }
    }
    const putApi = async (url, payload={}, secure = true) => {
        try {
            const headers = getHeaders(secure);
            const options = {
                headers
            }
            const result = await axios.put(url,payload, options);
            return result
        } catch (err) {
            throw err;
        }
    }
    const deleteApi = async (url, secure = true) => {
        try {
            const headers = getHeaders(secure);
            const options = {
                headers
            }
            const result = await axios.delete(url, options);
            return result
        } catch (err) {
            throw err;
        }
    }

    return {
        getApi,
        postApi,
        putApi,
        deleteApi
    }

}
