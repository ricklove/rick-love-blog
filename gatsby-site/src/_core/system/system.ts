/* eslint-disable no-console */

export const images = {
    getLocalImage: (path: string, options: { maxWidth: number }) => {
        // This will get called during gatsby prerender which is late, but it can always do a double build
        console.log(`getLocalImage`, { path, options });

        // TODO: Register image usage at build time
        // - Build optimized size
        // - Return optimized size if available (at runtime)
        // - (Or use gatsby plugins directly, or generate gatsby static queries and use the gatsby system)
        return path;
    },
};
