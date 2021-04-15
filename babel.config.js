module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          assets: './src/assets',
          components: './src/components',
          contexts: './src/contexts',
          hooks: './src/hooks',
          graphqlActions: './src/graphql',
          navigation: './src/navigation',
          screens: './src/screens',
          types: './src/types',
          utils: './src/utils',
        },
      },
    ],
  ],
}
