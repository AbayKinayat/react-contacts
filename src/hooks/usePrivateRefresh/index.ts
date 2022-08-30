import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { refresh } from './../../app/reducers/auth-slice/actionCreators';
import useAppDispatch from '../useAppDispatch';
import useAppSelector from '../useAppSelector';
import { routes } from '../../routes';

const usePrivateRefresh = (navigatePath: string = routes.login.path) => {
    const [userRefreshSuccess, setUserRefreshSuccess] = React.useState(false);
    const token = localStorage.getItem("token");

    const { user, isRefreshLoading } = useAppSelector(state => state.authReducer);
    const dispath = useAppDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const isCurrentRoute = location.pathname === navigatePath;

    React.useEffect(() => {
        if (!user) {
            dispath(refresh(token || ""));
        }
    }, [])

    React.useEffect(() => {
        if (!token && !isCurrentRoute) {
            navigate(navigatePath, {
                state: {
                    from: location.pathname
                }
            });
        }
        if (user) {
            setUserRefreshSuccess(true);
        }
    }, [user]);

    return [user, userRefreshSuccess, isRefreshLoading];
}

export default usePrivateRefresh;