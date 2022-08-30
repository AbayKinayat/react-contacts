import React from 'react';
import { useAppSelector } from '../../hooks';
import usePrivateRefresh from '../../hooks/usePrivateRefresh';

interface PrivateRouteProps {
  children: any,
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  usePrivateRefresh();
  const { isRefreshSuccess, isSuccess } = useAppSelector(state => state.authReducer);
  return <>
    {
      isRefreshSuccess || isSuccess
        ? children
        : <div>Загрузка...</div>
    }
  </>
}

export default PrivateRoute;