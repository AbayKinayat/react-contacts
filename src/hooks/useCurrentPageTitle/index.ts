import React from 'react'
import { useLocation } from 'react-router-dom';

import { setPage } from '../../app/reducers/current-page-slice/CurrentPageSlice';
import { AppRoute } from '../../models/AppRoute';
import useAppDispatch from '../useAppDispatch';
import { routes } from '../../routes';

const useCurrentPageTitle = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const clearPagePath = (path: string): string[] => {
        const pathSplitted = path.split("/");
        pathSplitted.splice(pathSplitted.length - 1, 1);
        pathSplitted.splice(0, 1);
        return pathSplitted;
    }

    React.useEffect(() => {
        const routesCopy = routes as { [index: string]: AppRoute };
        for (let key in routesCopy) {
            const route = routesCopy[key];
            if (route.generatePath && route.generateFullPath) {
                const locationArr = clearPagePath(location.pathname);
                const routeFullPathArr = clearPagePath(route.generateFullPath());
                if ("/" + locationArr.join("/") === "/" + routeFullPathArr.join("/")) {
                    document.title = route.title;
                    dispatch(setPage(route));
                }
            } else if (
                route.generateFullPath &&
                route.generateFullPath() === location.pathname ||
                route.path === location.pathname
            ) {
                document.title = route.title;
                dispatch(setPage(route));
            }
        }
    }, [location])
}

export default useCurrentPageTitle