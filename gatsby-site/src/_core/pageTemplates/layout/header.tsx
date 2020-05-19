import { Link } from 'gatsby';
import React from 'react';

export const Header = ({ siteTitle }: { siteTitle: string }) => (
    <header>
        <div>
            <h1>
                <Link to='/' style={{ color: `white`, textDecoration: `none` }}>
                    {siteTitle}
                </Link>
            </h1>
        </div>
    </header>
);
