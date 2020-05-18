export type SitePages<T> = {
    includePagesFolder: boolean;
    pages: SitePageInfo<T>[];
};

export type SitePageInfo<T> = {
    sitePath: string;
    data: T;
}

export type SitePageComponent = {
    Component: () => JSX.Element;
}
