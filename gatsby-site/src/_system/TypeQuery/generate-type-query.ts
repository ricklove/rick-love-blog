/* eslint-disable no-console */
import ts, { SyntaxKind } from 'typescript';

const createVisitor = (sourceFile: ts.SourceFile) => {
    let text = ``;

    const visitNode = (node: ts.Node) => {
        text += `${JSON.stringify({ kind: SyntaxKind[node.kind], raw: node.getFullText(sourceFile) })}\n`;
    };

    const getText = () => text;

    return { visitNode, getText };
};

export const generateTypeQuery = (filename: string): string => {
    const program = ts.createProgram([filename], {});
    const sourceFile = program.getSourceFile(filename);

    if (!sourceFile) { throw new Error(`Could not find source file`); }

    const visitor = createVisitor(sourceFile);
    ts.forEachChild(sourceFile, visitor.visitNode);

    return visitor.getText();

};
