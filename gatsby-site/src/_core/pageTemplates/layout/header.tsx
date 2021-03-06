import './header.css';
import { Link } from 'gatsby';
import React from 'react';
import { ConsoleSimulator } from '../../components/console-simulator';
import { site } from '../../store';
import { createConsoleCommands } from '../../components/console-simulator-commands';

const initDir = site.siteMetadata.title;
const consoleCommands = createConsoleCommands(initDir);

export const Header = ({ siteTitle }: { siteTitle: string }) => (
    <header>
        <div>
            <h1>
                <Link to='/'>&nbsp;&gt;&nbsp;</Link>
                <ConsoleSimulator initialPrompt={`${initDir}>`} onCommand={consoleCommands.onCommand} />
            </h1>
        </div>
    </header>
);
