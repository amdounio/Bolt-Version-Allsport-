import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.2points.allsports.imagesaver',
  appName: 'ImageGallerySaver',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    // Add the configuration for the ImageGallerySaver plugin if necessary
    'ImageGallerySaver': {
      platforms: ['ios'],  // If the plugin supports both platforms
    },
  },
};

export default config;
