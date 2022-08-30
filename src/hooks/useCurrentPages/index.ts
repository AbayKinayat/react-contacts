import React from "react";
import { AppRoute } from "../../models/AppRoute";
import useAppSelector from "../useAppSelector";

function useCurrentPages() {
    const { page } = useAppSelector(state => state.currentPageReducer);

    const findParentRoutes = (route: AppRoute): AppRoute[] => {
        if (route.getParentRoute) {
            const parentRoute = findParentRoutes(route.getParentRoute());
            return [...parentRoute, route];
        }
        return [route];
    }

    const currentPages = React.useMemo(() => {
        if (page) {
            return findParentRoutes(page);
        } else {
            return [];
        }
    }, [page]);

    return [currentPages];
}

export default useCurrentPages;