// /* eslint-disable unicorn/consistent-function-scoping */
// /* eslint-disable @typescript-eslint/camelcase */
// /* eslint-disable unicorn/no-useless-undefined */
// /* eslint-disable no-console */
// export const toGql_builtins: () => {
//     // export type GatsbyImageSharpFluidFragment = {
//     //     /* ...GatsbyImageSharpFluid */
//     //   };
//     return undefined;
// };

import { FluidObject } from 'gatsby-image';

export type TQGatsbyImage<RelativePath, MaxWidth> = { __realtivePath: RelativePath, __maxWidth: MaxWidth, childImageSharp: { fluid: FluidObject } };
