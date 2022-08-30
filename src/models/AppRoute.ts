export interface AppRoute {
    title: string;
    path: string;
    generatePath?: (id?: number) => string;
    generateFullPath?: (id?: number) => string;
    getParentRoute?: () => AppRoute;
    private?: boolean;
}

