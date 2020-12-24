module.exports = {
    extends: [
      'airbnb-base',
      'plugin:import/errors'
    ],
    settings: {
      'import/resolver': 'node',
    },
    env: {
      es6: true,
      node: true,
    },
    rules: {
      'no-unused-vars': 1,
      'no-await-in-loop': 1,
      'camelcase': 0,
      'no-console': 0,
      'prefer-destructuring': 0,
      'prefer-template': 0,
      'comma-dangle': 0,
      'eol-last': 0,
      'quotes' :0,
        "linebreak-style": 0   // <----------
    },
  };
