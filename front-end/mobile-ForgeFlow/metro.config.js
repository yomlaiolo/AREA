const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const config = {
  resolver: {
    extraNodeModules: {
      '@components': path.resolve(__dirname, 'app/shared/components'),
      '@resources': path.resolve(__dirname, 'app/shared/res'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
