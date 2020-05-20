import './header.css';
import { Link } from 'gatsby';
import React from 'react';
import { ConsoleSimulator } from '../../components/console-simulator';
import { site } from '../../store';
import { createConsoleCommands } from '../../components/console-simulator-commands';

const consoleCommands = createConsoleCommands();

export const Header = ({ siteTitle }: { siteTitle: string }) => (
    <header>
        <div>
            <h1>
                <Link to='/'>
                    {siteTitle}
                </Link>
                <ConsoleSimulator initialDirectory={site.siteMetadata.title} onCommand={consoleCommands.onCommand} />
            </h1>
        </div>
    </header>
);
