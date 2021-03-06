// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "semi": ["error", "never"],
    "no-sparse-arrays": "error",
    "no-template-curly-in-string": "error",
    "func-call-spacing": ["error", "never"],
    "func-names": ["error", "as-needed"],
    "func-style": ["error", "declaration"],
    "no-debugger": "error",
    "valid-typeof": "error",
    "consistent-return": "error",
    "curly": ["error", "multi-or-nest", "consistent"],
    "dot-location": ["error", "property"],
    "dot-notation": "error",
    "newline-after-var": ["error", "always"],
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-implied-eval": "error",
    "no-labels": "error",
    "no-loop-func": "error",
    "no-magic-numbers": ["error", {
      "ignore": [1, 0, -1, 1000],
      "ignoreArrayIndexes": true
    }],
    "no-multi-spaces": ["error", {
      "exceptions": {
        "VariableDeclarator": true,
        "ImportDeclaration": true,
        "Property": true
      }
    }],
    "key-spacing": ["error", {
      "beforeColon": false,
      "afterColon": true,
      "mode": "minimum"
    }],
    "space-infix-ops": ["error", {
      "int32Hint": true
    }],
    "space-in-parens": ["error", "never"],
    "space-unary-ops": "error",
    "keyword-spacing": ["error"],
    "no-new-wrappers": "error",
    "no-param-reassign": ["error", {
      "props": false
    }],
    "no-proto": "error",
    "no-redeclare": "error",
    "no-self-assign": ["error", {
      "props": true
    }],
    "no-throw-literal": "error",
    "no-with": "error",
    "comma-spacing": ["error", {
      "before": false,
      "after": true
    }],
    "comma-dangle": ["error", {
      "arrays": "ignore",
      "objects": "ignore",
      "imports": "never",
      "exports": "ignore",
      "functions": "never"
    }],
    "camelcase": ["error", {
      "properties": "never"
    }],
    "max-len": ["error", {
      "code": 80,
      "ignoreTrailingComments": true,
      "ignoreUrls": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
      "ignoreRegExpLiterals": true
    }],
    "array-bracket-spacing": ["error", "never"],
    "block-spacing": "error",
    "eol-last": ["error", "always"],
    "new-parens": "error",
    "newline-per-chained-call": ["error", {
      "ignoreChainWithDepth": 2
    }],
    "no-lonely-if": "error",
    "no-mixed-spaces-and-tabs": "error",
    "no-multiple-empty-lines": ["error", {
      "max": 1,
      "maxEOF": 1
    }],
    "no-trailing-spaces": "error",
    "prefer-const": "error",
    "arrow-spacing": "error"
  }
  }
}
