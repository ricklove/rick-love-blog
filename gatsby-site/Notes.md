## Useful cli commands:

- print eslint rules
    `npx eslint --print-config .\src\fake.ts > .eslint-all-rules.debug.json`
- Convert JS to TSX (and convert prop-types)
    `npx react-proptypes-to-typescript "./src/**/*.js" --remove-original-files`
- Fix all files with eslint
    `npx eslint src/** --fix`