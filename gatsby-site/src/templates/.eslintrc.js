module.exports = {
    rules: {
        // Default is bad for sure, but it is required for Gatsby Pages
        "import/prefer-default-export": "off",
        "import/no-default-export": "off",
        "import/no-named-export": "off",
        // Allow nameless arrow functions: Gatsby Pages
        "import/no-anonymous-default-export": [2, { "allowArrowFunction": true }],
    },
}