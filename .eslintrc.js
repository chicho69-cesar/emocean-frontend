module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    '@react-native-community'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    semi: ['error', 'never'],
    'comma-dangle': [2, 'never'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: false }
    ]
  }
}
