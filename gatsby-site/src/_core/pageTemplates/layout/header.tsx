import './header.css';
import { Link } from 'gatsby';
import React from 'react';
import { ConsoleSimulator } from '../../components/console-simulator';

export const Header = ({ siteTitle }: { siteTitle: string }) => (
    <header>
        <div>
            <h1>
                <Link to='/'>
                    {siteTitle}
                </Link>
                <ConsoleSimulator />
            </h1>
        </div>
    </header>
);
