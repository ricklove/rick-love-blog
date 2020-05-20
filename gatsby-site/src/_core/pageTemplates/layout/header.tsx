import './header.css';
import { Link } from 'gatsby';
import React from 'react';

export const Header = ({ siteTitle }: { siteTitle: string }) => (
    <header>
        <div>
            <h1>
                <Link to='/'>
                    {siteTitle}
                </Link>
            </h1>
        </div>
    </header>
);
