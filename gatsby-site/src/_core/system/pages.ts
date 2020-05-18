export type SitePages = {
    includePagesFolder: boolean;
    pages: {
        sitePath: string;
        info: unknown;
        // Component: () => JSX.Element;
    }[];
};
