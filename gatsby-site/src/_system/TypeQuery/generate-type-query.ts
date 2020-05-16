/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable no-console */
import ts, { SyntaxKind } from 'typescript';


const createToGql = (sourceFile: ts.SourceFile) => {
    // Target Generated Code:
    // const useSiteTitleStaticQuery = (): SiteTileStaticQuery => {

    //     return useStaticQuery(graphql`
    //     query SiteTileQuery {
    //       site {
    //         siteMetadata {
    //           title
    //           author
    //         }
    //       }
    //     }
    //   `);
    //   };

    const toGql_queryBodyRegex = (typeText: string): string => {
        return typeText
            .replace(/\??:\s*{/g, ` {`)
            .replace(/\??:([^,;]+[,;])/g, ``)
            .replace(/}[,;]/g, `}`)
            .trim();
    };

    const toGql_typeAliasDeclaration = (node: ts.TypeAliasDeclaration) => {
        // const raw = node.getFullText(sourceFile);
        // const kind = SyntaxKind[node.kind];
        const name = node.name.getFullText(sourceFile).trim();
        const typeText = node.type.getFullText(sourceFile).trim();

        // text += `${JSON.stringify({ kind, name, typeText, raw }, undefined, 2)}\n`;

        const queryBody = toGql_queryBodyRegex(typeText);;

        return `
type ${name} = ${typeText};

export const use${name} = (): ${name} => {
    return useStaticQuery(graphql\`
        query ${name} ${queryBody}
    \`);
};`;
    };

    const toGql_node = (node: ts.Node) => {
        if (node.kind === SyntaxKind.TypeAliasDeclaration) {
            return `${toGql_typeAliasDeclaration(node as ts.TypeAliasDeclaration)}`;
        }

        return undefined;
    };

    const toGql = () => {
        const parts = sourceFile.statements.map(x => toGql_node(x)).filter(x => x);
        if (parts.length <= 0) { return undefined; }

        const content = `// Generated by TypeQuery
import { useStaticQuery, graphql } from 'gatsby';

${parts.join(`\n`)}
`;
        return { filename: sourceFile.fileName, content };
    };

    return { toGql };
};

// const createVisitor = (sourceFile: ts.SourceFile) => {
//     let text = ``;

//     // const vistTypeAliasDeclaration = (node: ts.TypeAliasDeclaration) => {
//     //     const raw = node.getFullText(sourceFile);
//     //     const kind = SyntaxKind[node.kind];
//     //     const name = node.name.getFullText(sourceFile);
//     //     const typeText = node.type.getFullText(sourceFile);

//     //     text += `${JSON.stringify({ kind, name, typeText, raw }, undefined, 2)}\n`;
//     // };

//     const visitNode = (node: ts.Node) => {
//         // if (node.kind === SyntaxKind.TypeAliasDeclaration) {
//         //     vistTypeAliasDeclaration(node as ts.TypeAliasDeclaration);
//         // }

//         const r = createToGql(sourceFile).toGql(node);
//         if (r) {
//             text += `${r}\n`;
//         }
//     };

//     const getText = () => text;

//     return { visitNode, getText };
// };


export const generateTypeQuery = (filename: string): string | undefined => {
    const program = ts.createProgram([filename], {});
    const sourceFile = program.getSourceFile(filename);

    if (!sourceFile) { throw new Error(`Could not find source file`); }

    const visitor = createToGql(sourceFile);
    return visitor.toGql()?.content ?? undefined;
};
