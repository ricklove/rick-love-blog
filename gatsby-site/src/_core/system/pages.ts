export type SitePages = {
    includePagesFolder: boolean;
    pages: {
        sitePath: string;
        Component: () => JSX.Element;
    }[];
};
