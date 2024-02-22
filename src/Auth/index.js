
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useHttpApiHook } from '../services/ApiServices';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const { getApi, postApi } = useHttpApiHook();

    let refreshToken = localStorage.getItem('refreshToken')
    const fetchData = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            if (!accessToken) { return getRefreshToken() }
            const res = await getApi('/api/users/profile')
            if (res.status === 401) {
                throw res;
            }
        } catch (e) {
            await getRefreshToken()
        }
    }
    const getRefreshToken = async () => {
        if (!refreshToken) {
            navigate('/login');
        }
        try {
            const { status, data } = await postApi(`/api/users/refresh-token`, { refreshToken }, false)
            if (status === 200) {
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('accessToken', data.accessToken);
            } else {
                alert('failed to Authentication');
                navigate('/login')
            }
        } catch (err) {
            navigate('/login')
            alert('failed to Authentication');
            return false
        }
    }

    useEffect(() => {
        console.log("Auth Guard");
        fetchData();
    }, []);

    return <React.Fragment>{children}</React.Fragment>
}

export default AuthGuard;