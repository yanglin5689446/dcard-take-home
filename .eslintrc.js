const path = require("path");

module.exports = {
  "extends": ["airbnb", "react-app"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": [
          path.resolve(__dirname, "src"),
        ]
      }
    },
  },
  "rules": {
    // react
    "react/no-unused-prop-types": ["error", { "skipShapeProps": true }],
    "react/no-did-mount-set-state": 0,
    "react/forbid-prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "react/prefer-stateless-function": [0],
    "react/sort-comp": ["error", { "order": [ "static-methods", "lifecycle", "everything-else", "render" ] } ],
    // basic
    "accessor-pairs": "error",
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "block-spacing": ["error", "always"],
    "max-len": ["error", 120],
    "no-bitwise": 0,
    "no-console": ["error"],
    "no-underscore-dangle": 0,
    "semi": ["error", "never"],
    "import/prefer-default-export": "off",
    "no-param-reassign": ["error", { "props": false }],
    "react/no-multi-comp": "off",
  }
}

