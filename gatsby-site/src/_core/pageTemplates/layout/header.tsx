import { Link } from 'gatsby';
import React from 'react';

export const Header = ({ siteTitle }: { siteTitle: string }) => (
    <header style={{ background: `#222222`, maxWidth: 960 }}>
        <div style={{ margin: `0`, padding: `1.45rem 1.0875rem` }}>
            <h1 style={{ margin: 0 }}>
                <Link to='/' style={{ color: `white`, textDecoration: `none` }}>
                    {siteTitle}
                </Link>
            </h1>
        </div>
    </header>
);
