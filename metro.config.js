const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add the assets extension resolver
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'ttf');
config.resolver.assetExts.push('ttf');


module.exports = config;
