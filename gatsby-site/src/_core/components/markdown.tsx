import React, { } from 'react';
import ReactMarkdown from 'react-markdown';

// import './markdown-github.css';
import './markdown-retro.css';

// export type MarkdownStyle = {
//     root?: TextStyle,
//     view?: TextStyle,
//     codeBlock?: TextStyle,
//     codeInline?: TextStyle,
//     del?: TextStyle,
//     em?: TextStyle,
//     headingContainer?: TextStyle,
//     heading?: TextStyle,
//     heading1?: TextStyle,
//     heading2?: TextStyle,
//     heading3?: TextStyle,
//     heading4?: TextStyle,
//     heading5?: TextStyle,
//     heading6?: TextStyle,
//     hr?: TextStyle,
//     blockquote?: TextStyle,
//     inlineCode?: TextStyle,
//     list?: TextStyle,
//     listItem?: TextStyle,
//     listUnordered?: TextStyle,
//     listUnorderedItem?: TextStyle,
//     listUnorderedItemIcon?: TextStyle,
//     listUnorderedItemText?: TextStyle,
//     listOrdered?: TextStyle,
//     listOrderedItem?: TextStyle,
//     listOrderedItemIcon?: TextStyle,
//     listOrderedItemText?: TextStyle,
//     paragraph?: TextStyle,
//     hardbreak?: TextStyle,
//     strong?: TextStyle,
//     table?: TextStyle,
//     tableHeader?: TextStyle,
//     tableHeaderCell?: TextStyle,
//     tableRow?: TextStyle,
//     tableRowCell?: TextStyle,
//     text?: TextStyle,
//     strikethrough?: TextStyle,
//     link?: TextStyle,
//     blocklink?: TextStyle,
//     u?: TextStyle,
//     image?: TextStyle,
// };

export const Markdown = (props: { markdown: string }) => {
    return (
        <div className='markdown-body'>
            <div>
                <ReactMarkdown source={props.markdown} />
            </div>
        </div>
    );
};
