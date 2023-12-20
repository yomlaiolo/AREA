// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     [
//       [
//         'module-resolver',
//         {
//           extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
//           root: ['.'],
//           alias: {
//             '@ressources': './app/shared/res',
//             '@components': './app/shared/components',
//           },
//         },
//       ],
//       [
//         'module:react-native-dotenv',
//         {
//           envName: 'APP_ENV',
//           moduleName: '@env',
//           path: '.env',
//         },
//       ],
//     ],
//   ],
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
          root: ['.'],
          alias: {
            '@ressources': './app/shared/res',
            '@components': './app/shared/components',
          },
        },
      ],
    ],
  };
};
